package com.jejuinn.backend.api.dto;

import com.jejuinn.backend.db.entity.Image;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SimpleImgDto {
    @NotNull
    String imgPath;

    public static SimpleImgDto of(Image image){
        if(image == null) return null;
        return SimpleImgDto.builder()
                .imgPath(image.getImgPath())
                .build();
    }
}
