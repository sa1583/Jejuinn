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

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class RoomManagerDto {

    private final Logger logger = LoggerFactory.getLogger(RoomManagerDto.class);

    @Autowired
    private KurentoClient kurento;

    private final ConcurrentMap<String, RoomDto> rooms = new ConcurrentHashMap<>();

    public RoomDto getRoom(String roomName) {
        logger.debug("{}을 찾는중...", roomName);
        RoomDto room = rooms.get(roomName);

        if (room == null) {
            logger.debug("{}방이 존재하지 않습니다! 방을 생성합니다.", roomName);
            room = new RoomDto(roomName, kurento.createMediaPipeline());
            rooms.put(roomName, room);
        }
        logger.debug("{} 방을 발견했습니다.", roomName);
        return room;
    }

    public void removeRoom(RoomDto room) {
        this.rooms.remove(room.getName());
        room.close();
        logger.info("Room {} removed and closed", room.getName());
    }

}
