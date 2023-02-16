package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Favorite findByUserUidAndTypeUidAndTypeName(Long userUid, Long typeUid, String TypeName);

    @Query("select f.typeUid from Favorite f where f.userUid = :userUid and f.typeName = :typeName")
    List<Long> findByUserUidAndTypeName(@Param("userUid") Long userUid, @Param("typeName") String typeName);
}
