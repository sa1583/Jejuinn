import { apiInstance } from './index';

const api = apiInstance();

const allWorkList = () => {
  // 전체 리스트 요청 및 응답 - 맨 처음 페이지 렌더링 하면 보여줌
  return api.get("/api/job-offer",{},{});
  // [response body] 
    // {uid, title, guestHouseName, address, addressDetail, image
    //  , work : [{workName, workType, workTime, effectiveDate }, {workName, ...}] },
    // { uid, ...}, {}, ...
} 

const filteredWorkList = ({tags,wishArea, islandDate}) => {
  // 필터링 요청 및 응답 - 조건 검색 버튼 클릭하면 API 요청\
  const config = {
    body:{
      tags : {tags},
      wishArea : {wishArea},
      islandDate : {islandDate} // 변수명 확인,,,,
    }
  };
  return api.post("/api/job-offer/filter",config,{});
  // [response body]_ 전체 리스트 조회와 동일
}

const workDetail = ({recruitmentUid}) => {
  // 요청한 구인상세 내용 가져오는 API 
  return api.get("/api/job-offer/{recruitmentUid}",{},{});
  // [response body] 
    // {uid, title, guestHouseName, address, addressDetail, image
    //  , work : [{workName, workType, workTime, effectiveDate }, {workName, ...}] },
}

export {workDetail, allWorkList, filteredWorkList}