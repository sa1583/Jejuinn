package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByPostTypeAndPostUid(String postType, Long postUid);

//    @Query("select i from Image i where i.postType = :postType and i.postUid = :postUid LIMIT 1")
//    Image findOneByPostTypeAndPostUid(@Param("postType") String postType, @Param("postUid") Long postUid);

    @Query("select i.imgPath from Image i where i.uid = :uid")
    String findImgPathByUid(@Param("uid") Long uid);

    @Query("select i.imgPath from Image i where i.postType = :postType and i.postUid = :postUid")
    String findImgPathByPostTypeAndPostUid(@Param("postType") String postType, @Param("postUid") Long postUid);

//    @Query("select i.imgPath from Image i where i.postType = :postType and i.postUid = :postUid limit 1")
//    String findOneImgPathByPostTypeAndPostUid(@Param("postType") String postType, @Param("postUid") Long postUid);
}
