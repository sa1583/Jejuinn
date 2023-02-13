package com.jejuinn.backend.api.dto.response.resumeinfo;

import com.jejuinn.backend.db.entity.StaffRecord;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffRecordDetail {

    private Long uid;

    private Long guestHouseUid;

    private String guestHouseName;

    private LocalDate startDate;

    private LocalDate endDate;

    private String workName;

    public static List<StaffRecordDetail> of(List<StaffRecord> staffRecords) {
        List<StaffRecordDetail> result = new ArrayList<>();
        for(StaffRecord staffRecord : staffRecords) {
            StaffRecordDetail staff = StaffRecordDetail.builder()
                    .uid(staffRecord.getUid())
                    .guestHouseUid(staffRecord.getGuestHouseUid())
                    .guestHouseName(staffRecord.getGuestHouseName())
                    .startDate(staffRecord.getStartDate())
                    .endDate(staffRecord.getEndDate())
                    .workName(staffRecord.getWorkName())
                    .build();
            result.add(staff);
        }
        return result;
    }

}
