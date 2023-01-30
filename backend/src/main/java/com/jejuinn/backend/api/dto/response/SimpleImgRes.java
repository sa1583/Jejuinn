package com.jejuinn.backend.api.dto.response;

import com.jejuinn.backend.db.entity.Image;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SimpleImgRes {
    @NotNull
    String imgPath;

    public static SimpleImgRes of(Image image){
        if(image == null) return null;
        return SimpleImgRes.builder()
                .imgPath(image.getImgPath())
                .build();
    }
}
