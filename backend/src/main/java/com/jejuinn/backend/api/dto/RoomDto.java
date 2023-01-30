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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.annotation.PreDestroy;

import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

public class RoomDto implements Closeable {
    private final Logger logger = LoggerFactory.getLogger(RoomDto.class);

    private final ConcurrentMap<String, UserSessionDto> participants = new ConcurrentHashMap<>();
    private final MediaPipeline pipeline;
    private final String name;

    public String getName() {
        return name;
    }

    public RoomDto(String roomName, MediaPipeline pipeline) {
        this.name = roomName;
        this.pipeline = pipeline;
        logger.info("방 {}이 생성되었습니다.", roomName);
    }

    // Predestroy : 빈 제거 전에 해야할 작업에 사용, 마지막 소멸 단계
    @PreDestroy
    private void shutdown() {
        this.close();
    }

    // 방에 새로운 유저가 들어온 경우
    public UserSessionDto join(String userName, WebSocketSession session) throws IOException {
        logger.info("방 {}에 {}가 들어왔습니다.", this.name, userName);
        final UserSessionDto participant = new UserSessionDto(userName, this.name, session, this.pipeline);
        // 방에 존재하는 참가자들에게 메세지를 전달한다.
        joinRoom(participant);
        // 방 참가자 명단에 새로 들어온 User 정보를 넣는다.
        participants.put(participant.getName(), participant);
        // 방 참가자 명단을 제공한다.
        sendParticipantNames(participant);
        return participant;
    }

    // 방에 있는 참여자들에게 새로운 참가자의 입장을 알리는 메서드
    private Collection<String> joinRoom(UserSessionDto newParticipant) throws IOException {
        final JsonObject newParticipantMsg = new JsonObject();
        newParticipantMsg.addProperty("id", "새 참가자");
        newParticipantMsg.addProperty("name", newParticipant.getName());

        final List<String> participantsList = new ArrayList<>(participants.values().size());
        logger.debug("방 {}: 새로운 참가자 {}의 입장을 알립니다.", name, newParticipant.getName());

        for (final UserSessionDto participant : participants.values()) {
            try {
                participant.sendMessage(newParticipantMsg);
            } catch (final IOException e) {
                logger.debug("방 {}: 참가자 {}의 입장을 통지할 수 없습니다.", name, participant.getName(), e);
            }
            participantsList.add(participant.getName());
        }

        return participantsList;
    }

    // 참가자 명단을 제공하는 메서드
    public void sendParticipantNames(UserSessionDto user) throws IOException {

        final JsonArray participantsArray = new JsonArray();
        for (final UserSessionDto participant : this.getParticipants()) {
            if (!participant.equals(user)) {
                final JsonElement participantName = new JsonPrimitive(participant.getName());
                participantsArray.add(participantName);
            }
        }

        final JsonObject existingParticipantsMsg = new JsonObject();
        existingParticipantsMsg.addProperty("id", "참가자 명단");
        existingParticipantsMsg.add("data", participantsArray);
        logger.debug("참가자 {}: {} 명의 참가자 목록 보내기", user.getName(), participantsArray.size());
        user.sendMessage(existingParticipantsMsg);
    }

    // 참가자가 방을 떠날때, UserSession을 닫는 동시에 참가자 명단에서 참가자를 뺀다.
    public void leave(UserSessionDto user) throws IOException {
        logger.debug("참가자 {}이 {}방을 떠났습니다.", user.getName(), this.name);
        this.removeParticipant(user.getName());
        user.close();
    }

    // 참가자를 참가자 명단에서 빼는 메서드
    private void removeParticipant(String name) throws IOException {
        participants.remove(name);

        logger.debug("방 {}의 모든 유저들에게 {}이 방을 떠났음을 알립니다.", this.name, name);

        final List<String> unnotifiedParticipants = new ArrayList<>();
        final JsonObject participantLeftJson = new JsonObject();
        participantLeftJson.addProperty("id", "participantLeft");
        participantLeftJson.addProperty("name", name);
        for (final UserSessionDto participant : participants.values()) {
            try {
                participant.cancelVideoFrom(name);
                participant.sendMessage(participantLeftJson);
            } catch (final IOException e) {
                unnotifiedParticipants.add(participant.getName());
            }
        }

        if (!unnotifiedParticipants.isEmpty()) {
            logger.debug("방 {}의 모든 유저들에게 {}이 방을 떠났음을 알릴 수 없습니다.", this.name,
                    unnotifiedParticipants, name);
        }

    }

    public Collection<UserSessionDto> getParticipants() {
        return participants.values();
    }

    public UserSessionDto getParticipant(String name) {
        return participants.get(name);
    }

    @Override
    public void close() {
        for (final UserSessionDto user : participants.values()) {
            try {
                user.close();
            } catch (IOException e) {
                logger.debug("방 {}의 {} 참가자에 대한 종료를 할 수 없습니다.", this.name, user.getName(),
                        e);
            }
        }

        participants.clear();

        pipeline.release(new Continuation<Void>() {

            @Override
            public void onSuccess(Void result) throws Exception {
                logger.trace("방 {}: 파이프라인 중단", RoomDto.this.name);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                logger.warn("참가자 {}: 파이프라인 중단 불가", RoomDto.this.name);
            }
        });

        logger.debug("방 {} 폐쇄", this.name);
    }

}
