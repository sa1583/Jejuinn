/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package com.jejuinn.backend.api.dto;

import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.kurento.client.Continuation;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.IceCandidateFoundEvent;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;
import org.kurento.jsonrpc.JsonUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.JsonObject;

public class UserSessionDto implements Closeable {

    private static final Logger logger = LoggerFactory.getLogger(UserSessionDto.class);

    // 유저 이름, 사용자의 웹소켓정보, 미디어 파이프라인(스트림을 통해 일련의 작업을 수행할 수 있는 일을 하는 기계, Kurento Media Server와의 파이프라인)
    private final String name;
    private final WebSocketSession session;
    private final MediaPipeline pipeline;

    private final String roomName;
    // WebRTC 끝점에 대한 제어 인터페이스, RTP통신(실시간 전송 프로토콜)을 처리한다.
    // 연결이 되어 기계(Mediapipeline)가 만들어지면 그 기계와 종단 IP를 연결하기 위해 WebRTCEndpoint를 사용한다.
    // WebRTCEndpoint는 쉽게 한 명의 사용자라고 생각하면 편하다.
    private final WebRtcEndpoint outgoingMedia;
    private final ConcurrentMap<String, WebRtcEndpoint> incomingMedia = new ConcurrentHashMap<>();

    public UserSessionDto(final String name, String roomName, final WebSocketSession session, MediaPipeline pipeline) {

        this.pipeline = pipeline;
        this.name = name;
        this.session = session;
        this.roomName = roomName;
        this.outgoingMedia = new WebRtcEndpoint.Builder(pipeline).build();

        // ICE Candidate(Interactive Connective Establishment) : P2P 접속 프로토콜, 가능한 네트워크 후보
        this.outgoingMedia.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

            @Override
            public void onEvent(IceCandidateFoundEvent event) {
                JsonObject response = new JsonObject();
                response.addProperty("id", "iceCandidate");
                response.addProperty("name", name);
                response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
                try {
                    synchronized (session) {
                        session.sendMessage(new TextMessage(response.toString()));
                    }
                } catch (IOException e) {
                    logger.debug(e.getMessage());
                }
            }
        });
    }

    public WebRtcEndpoint getOutgoingWebRtcPeer() {
        return outgoingMedia;
    }

    public String getName() {
        return name;
    }

    public WebSocketSession getSession() {
        return session;
    }

    public String getRoomName() {
        return this.roomName;
    }

    // sdpOffer : 먼저 연결하고자 하는 Peer가 만든 SDP(Session Description Protocol : Peer 간 정보를 이해하기 위해 사용)
    public void receiveVideoFrom(UserSessionDto sender, String sdpOffer) throws IOException {
        logger.info("사용자 {} 가 {} 와 {} 방에서 연결되었습니다.", this.name, sender.getName(), this.roomName);

        logger.trace("사용자 {} 가 {} 에게 요청한 SDP 방식은 {} 입니다.", this.name, sender.getName(), sdpOffer);

        final String ipSdpAnswer = this.getEndpointForUser(sender).processOffer(sdpOffer);
        final JsonObject scParams = new JsonObject();
        scParams.addProperty("id", "receiveVideoAnswer");
        scParams.addProperty("name", sender.getName());
        scParams.addProperty("sdpAnswer", ipSdpAnswer);

        logger.trace("사용자 {} 가 {} 에게 응답한 SDP 방식은 {} 입니다.", this.name, sender.getName(), ipSdpAnswer);
        this.sendMessage(scParams);
        logger.debug("gather candidates");
        this.getEndpointForUser(sender).gatherCandidates();
    }

    // 한 참가자와 연결된 다른 참가자들의 명단을 제공하는 메서드
    private WebRtcEndpoint getEndpointForUser(final UserSessionDto sender) {
        if (sender.getName().equals(name)) {
            logger.debug("참여자 {}: 루프백 구성중...", this.name);
            return outgoingMedia;
        }

        logger.debug("참여자 {}가 {} 로부터 미디어를 제공받았습니다.", this.name, sender.getName());

        WebRtcEndpoint incoming = incomingMedia.get(sender.getName());
        if (incoming == null) {
            logger.debug("참여자 {}가 {}와 새로 연결됩니다.", this.name, sender.getName());
            incoming = new WebRtcEndpoint.Builder(pipeline).build();

            incoming.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

                @Override
                public void onEvent(IceCandidateFoundEvent event) {
                    JsonObject response = new JsonObject();
                    response.addProperty("id", "iceCandidate");
                    response.addProperty("name", sender.getName());
                    response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
                    try {
                        synchronized (session) {
                            session.sendMessage(new TextMessage(response.toString()));
                        }
                    } catch (IOException e) {
                        logger.debug(e.getMessage());
                    }
                }
            });

            incomingMedia.put(sender.getName(), incoming);
        }

        logger.debug("참여자 {}가 {}와 연결되었습니다.", this.name, sender.getName());
        sender.getOutgoingWebRtcPeer().connect(incoming);

        return incoming;
    }

    public void cancelVideoFrom(final UserSessionDto sender) {
        this.cancelVideoFrom(sender.getName());
    }

    public void cancelVideoFrom(final String senderName) {
        logger.debug("참여자 {}: {} 로부터 비디오 수신 취소 요청", this.name, senderName);
        final WebRtcEndpoint incoming = incomingMedia.remove(senderName);

        logger.debug("참여자 {}: {} 로부터 비디오 수신 취소중", this.name, senderName);
        incoming.release(new Continuation<Void>() {
            @Override
            public void onSuccess(Void result) throws Exception {
                logger.trace("참여자 {}:{} 에 대한 요청 성공", UserSessionDto.this.name, senderName);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                logger.warn("참여자 {}:{} 에 대한 요청 실패", UserSessionDto.this.name, senderName);
            }
        });
    }

    // 방이 닫히면 그 방에 대한 참여자들의 리소스 해제를 하는 메서드
    @Override
    public void close() throws IOException {
        logger.debug("참여자 {}: 리소스 해제", this.name);
        for (final String remoteParticipantName : incomingMedia.keySet()) {

            logger.trace("참여자 {}: {} 에 대한 리소스 해제", this.name, remoteParticipantName);

            final WebRtcEndpoint ep = this.incomingMedia.get(remoteParticipantName);

            ep.release(new Continuation<Void>() {

                @Override
                public void onSuccess(Void result) throws Exception {
                    logger.trace("PARTICIPANT {}: Released successfully incoming EP for {}",
                            UserSessionDto.this.name, remoteParticipantName);
                }

                @Override
                public void onError(Throwable cause) throws Exception {
                    logger.warn("PARTICIPANT {}: Could not release incoming EP for {}", UserSessionDto.this.name,
                            remoteParticipantName);
                }
            });
        }

        outgoingMedia.release(new Continuation<Void>() {

            @Override
            public void onSuccess(Void result) throws Exception {
                logger.trace("PARTICIPANT {}: Released outgoing EP", UserSessionDto.this.name);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                logger.warn("USER {}: Could not release outgoing EP", UserSessionDto.this.name);
            }
        });
    }

    public void sendMessage(JsonObject message) throws IOException {
        logger.debug(" {} : {}", name, message);
        synchronized (session) {
            session.sendMessage(new TextMessage(message.toString()));
        }
    }

    public void addCandidate(IceCandidate candidate, String name) {
        if (this.name.compareTo(name) == 0) {
            outgoingMedia.addIceCandidate(candidate);
        } else {
            WebRtcEndpoint webRtc = incomingMedia.get(name);
            if (webRtc != null) {
                webRtc.addIceCandidate(candidate);
            }
        }
    }

    // 새로운 참가자의 이름이 현존하는 참가자의 이름과 같은지 판단하는 메서드
    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }
        if (obj == null || !(obj instanceof UserSessionDto)) {
            return false;
        }
        UserSessionDto other = (UserSessionDto) obj;
        boolean eq = name.equals(other.name);
        eq &= roomName.equals(other.roomName);
        return eq;
    }

    @Override
    public int hashCode() {
        int result = 1;
        result = 31 * result + name.hashCode();
        result = 31 * result + roomName.hashCode();
        return result;
    }
}
