package com.jejuinn.backend.api.service;

import com.jejuinn.backend.api.dto.recommend.RecommendWorkDto;
import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import com.jejuinn.backend.db.repository.GuestHouseRepository;
import com.jejuinn.backend.db.repository.WorkRepository;
import com.jejuinn.backend.exception.NoContentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommenderService {
    private final WorkRepository workRepository;
    private final GuestHouseRepository guestHouseRepository;

    public RecommendWorkDto getWorkInfo(Long workUid) {
        // 해당 직무 정보를 가져옵니다.
        Work work= workRepository.findById(workUid)
                .orElseThrow(() -> new NoContentException("직무가 없습니다."));

        // 해당 직무의 구인글 정보를 가져옵니다.
        Recruitment recruitment = work.getRecruitment();

        // 해당 직무의 타입 리스트, 직무 정보, 게스트하우스 uid를 담은 work dto를 생성합니다.
        RecommendWorkDto dto = RecommendWorkDto.of(work);
        dto.setGuestHouseUid(recruitment.getGuestHouseUid());

        // 게스트 하우스 지역 가져오기


        dto.setPersonTypes(recruitment.getWanted()
                .stream().map(personType -> personType.getType())
                .collect(Collectors.toList()));
        return dto;
    }
}
