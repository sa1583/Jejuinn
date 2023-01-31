package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByPostTypeAndPostUid(String postType, Long postUid);

    @Query("select i.imgPath from Image i where i.uid = :uid")
    String findImgPathByUid(@Param("uid") Long uid);
}
