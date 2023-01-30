package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    public List<Image> findAllByPostTypeAndPostUid(String postType, Long postUid);
}
