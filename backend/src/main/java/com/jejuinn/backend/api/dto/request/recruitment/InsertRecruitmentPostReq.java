package com.jejuinn.backend.api.dto.request.recruitment;

import com.jejuinn.backend.db.entity.PersonType;
import com.jejuinn.backend.db.entity.Recruitment;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsertRecruitmentPostReq {

    @ApiModelProperty(name = "채용 공고 제목")
    @NotNull
    private String title;

    @ApiModelProperty(name = "채용 공고 복지")
    @NotNull
    private String welfare;

    @ApiModelProperty(name = "채용 공고 추가 정보")
    private String addInfo;

    @ApiModelProperty(name = "채용 공고를 작성한 게스트하우스uid")
    @NotNull
    private Long guestHouseUid;

    @ApiModelProperty(name = "채용 공고에서 원하는 인재상")
    @NotNull
    private List<String> wanted;

    public List<PersonType> toPersonType() {
        List<PersonType> list = new ArrayList<>();
        for(String s : this.getWanted()) {
            list.add(PersonType.builder().type(s).build());
        }
        return list;
    }

    public Recruitment toRecruitment() {
        return Recruitment.builder()
                .title(this.title)
                .welfare(this.welfare)
                .addInfo(this.addInfo)
                .guestHouseUid(guestHouseUid)
                .wanted(toPersonType())
                .build();
    }

}
