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

import org.springframework.web.socket.WebSocketSession;

public class UserRegistryDto {

    // 각각 유저의 이름과 SessionId 에 따라 user를 구분한다.
    private final ConcurrentHashMap<String, UserSessionDto> usersByName = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, UserSessionDto> usersBySessionId = new ConcurrentHashMap<>();

    public void register(UserSessionDto user) {
        usersByName.put(user.getName(), user);
        usersBySessionId.put(user.getSession().getId(), user);
    }

    public UserSessionDto getByName(String name) {
        return usersByName.get(name);
    }

    public UserSessionDto getBySession(WebSocketSession session) {
        return usersBySessionId.get(session.getId());
    }

    public boolean exists(String name) {
        return usersByName.keySet().contains(name);
    }

    public UserSessionDto removeBySession(WebSocketSession session) {
        final UserSessionDto user = getBySession(session);
        usersByName.remove(user.getName());
        usersBySessionId.remove(session.getId());
        return user;
    }

}
