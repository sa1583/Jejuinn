package com.jejuinn.backend.api.dto.SMS;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class MessageDto {
    private String to;

    private String content;
}
