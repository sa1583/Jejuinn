package com.jejuinn.backend.config;


import com.jejuinn.backend.api.dto.RoomManagerDto;
import com.jejuinn.backend.api.dto.UserRegistryDto;
import org.kurento.client.KurentoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@EnableWebSocket
public class WebRTCConfig implements WebSocketConfigurer {

    @Bean
    public UserRegistryDto registry() {
        return new UserRegistryDto();
    }

    @Bean
    public RoomManagerDto roomManager() {
        return new RoomManagerDto();
    }

    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create();
    }

    // WebSocket의 런타임 특성 제어
    @Bean
    public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(32768);
        return container;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

    }
}
