package com.jejuinn.backend.api.dto.response.travelplace;

import lombok.*;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImgUrlAndReviewUid {
    private Long reviewUid;
    private String imgPath;

    public static ImgUrlAndReviewUid of(Optional<List<String>> images, Long reviewUid){
        String imgPath = null;
        if(images.isPresent() && images.get().size() > 0) imgPath = images.get().get(0);
        return ImgUrlAndReviewUid.builder()
                .reviewUid(reviewUid)
                .imgPath(imgPath)
                .build();
    }
}
