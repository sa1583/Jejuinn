import { workDetail } from '../../api/work';
import { Grid, Box } from '@mui/material';
import JobDetail from '../../components/work/JobDetail';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function WorkDetail() {
  // 받아온 데이터 피그마에 있는 모양으로 렌더링하기
  // 공고 갯수 만큼 반복하면서 WorkDetailContent 컴포넌트 재사용
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <WhiteBox cpn={<HouseInfo />} />
      <h1 style={{ color: '#FF7600' }}>직무공고명</h1>
      <h2 style={{ color: '#FF7600' }}>직무별 상세 및 지원</h2>
      <div>
        채용 디테일 설명 구구절절.. 사장님이 작성한 내용 가져올거임......!
        <div></div>- 점장 : 주 5일~6일 근무 (오전 8시~12시 / 휴무시간 / 16~22시)
        * 수습기간 협의 (1개월~ 3개월 180만원 제공) * 사업장 관리, 예약관리,
        청소 등 업무 일괄 * 게스트하우스 스텝 시스템 운영 중 (휴무일은 스텝이
        대체 운영) - 업무사항 - 사업장 운영 (게스트하우스 운영 전담) - 특수사항
        - 유튜브 및 SNS 이해도 높으신 분 환영 (본사가 광고 대행사 이기에 해당
        영역 촬영 및 출연이 발생 할 수 있음) - 본 내용을 모두 숙지 하시고
        가능하다고 생각 되시는 분들 도전해 보고 싶은 분들만 이력서 제출해 주시길
        바랍니다. 모든 질문은 이메일 자기소개서에만 포함해 전달 주시길 바랍니다.
        *** 서류 확인 후 카카오톡 메시지로 연락 드립니다. *** 접수후 카카오톡
        jepisode 로 메시지 주시면 확인이 더 빠릅니다.
      </div>
      <Grid container>
        <Grid item xs={12} md={12} my={4}></Grid>
        <Grid item xs={12} md={12}></Grid>
        <Grid item xs={12} md={12} my={4}></Grid>

        <Grid item md={12}>
          <h2 style={{ color: '#FF7600' }}>
            해당 게스트하우스에서 진행중인 다른 채용
          </h2>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <WhiteBox cpn={<JobDetail />} />
          </Grid>
          <Grid item xs={12} md={4}>
            <WhiteBox cpn={<JobDetail />} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Box>
  );
}
