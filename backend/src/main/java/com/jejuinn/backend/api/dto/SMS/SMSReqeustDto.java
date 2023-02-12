package com.jejuinn.backend.api.dto.SMS;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SMSReqeustDto {
    private String type;

    private String contentType;

    private String countryCode;

    private String from;

    private String content;

    private List<MessageDto> messages;
}
