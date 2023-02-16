package com.jejuinn.backend.api.dto.request.recruitment;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecruitmentBodyDto {

    private InsertRecruitmentPostReq recruitment;

    private List<InsertWorkPostReq> works;
}
