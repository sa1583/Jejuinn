package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AreaRepository extends JpaRepository<Area, Long> {
    List<Area> findAll();
}
