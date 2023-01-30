import { styled, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FilterDate, FilterArea, FilterName, FilterStyle } from './Filters';
const CustomButton = styled(Button)({
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FF7600',
  },
});

export default function WorkFilterBox() {
  // 필터 정보 담을 변수필요
  // 필터 정보가 비어있으면 allWorkList 호출
  // 필터 정보가 있으면 filteredWorkList 호출

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '3vh 3vh 3vh 3vh',
        gap: '5vh',
        height: '15vh',
      }}
    >
      <Grid container spacing={1}>
        <Grid item md={4}>
          <FilterName />
        </Grid>
        <Grid item md={4}>
          <FilterArea />
        </Grid>
        <Grid item md={4}>
          <FilterDate />
        </Grid>

        <Grid item md={7}>
          <FilterStyle />
        </Grid>
        <Grid item md={4}>
          <CustomButton
            variant="contained"
            sx={{
              borderRadius: '62px',
              backgroundColor: '#FF7600',
              fontFamily: 'border',
            }}
            size="large"
            startIcon={<SearchIcon />}
          >
            조건 검색
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
