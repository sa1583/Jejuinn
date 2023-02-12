package com.jejuinn.backend.api.dto.SMS;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SMSResponseDto {
    private String requestId;

    private LocalDateTime reqeustTime;

    private String statusCode;

    private String statusName;
}
