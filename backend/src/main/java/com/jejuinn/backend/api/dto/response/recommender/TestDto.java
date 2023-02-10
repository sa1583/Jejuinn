package com.jejuinn.backend.api.dto.response.recommender;

import com.jejuinn.backend.db.entity.PersonType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class TestDto {
    private List<PersonType> list;

    @QueryProjection
    public TestDto(List<PersonType> list) {
        this.list = list;
    }
}
