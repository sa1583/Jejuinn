import { allWorkList, filteredWorkList } from "../../api/work";
import WorkFilterBox from "../../components/Work/WorkFilterBox";
import WorkListBox from "../../components/Work/WorkListBox";
import { Grid, Box, Button } from "@mui/material";

export default function WorkList() {
  return (
    <>
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <WorkFilterBox/>
        </Grid>
        <Grid item xs={12} md={8}>
          <WorkListBox/>
        </Grid>
      </Grid>
    </Box>
    {/* <Button>모집글 추가하는 버튼 우측 하단에 고정...!</Button> */}
    </>
  );
}