package com.jejuinn.backend.db.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * 이미지 엔티티
 */
@Entity
@Table(name = "images")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @Column(name = "uid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(name = "post_type", length = 25)
    @NotNull
    private String postType;

    @Column(name = "post_uid")
    @NotNull
    private Long postUid;

    @Column(name = "img_path")
    @NotNull
    private String imgPath;

    public static Image init(String postType, Long postUid, String imgPath){
        return Image.builder()
                .postType(postType)
                .postUid(postUid)
                .imgPath(imgPath)
                .build();
    }
}
