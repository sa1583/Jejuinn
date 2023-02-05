import { Box, Grid, FormControlLabel, Button, Switch, Popover, Typography } from '@mui/material';
import MyResumeApplyCareerBox from './MyResumeApplyCareerBox';
import { useState } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React from 'react';

// resume.autoApply

export default function MyResumeApply({ resume, changeApplyComp }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  return (
    <Box sx={{ paddingBottom: '3rem', paddingX: '10%' }}>
      <Grid container>
        <Grid item md={10}>

      <FormControlLabel
          value="start"
          control={<Switch color="primary"  defaultChecked />}
          label={<div>
            <HelpOutlineOutlinedIcon color="primary" 
        onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} justifyItems='flex-end' alignItems='flex-end'/>
          자동추천
          <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, width: '300px' }}>지원서에 작성한 내용을 바탕으로<br/> 적합한 게스트하우스에 자동으로 지원됩니다.</Typography>
      </Popover>


          </div>}
          labelPlacement="start"
          />
          </Grid>
        <Grid item md={2}>
      <Button onClick={changeApplyComp}>수정</Button>
          </Grid>
          </Grid>
      <Grid container spacing={2}>

        <Grid item md={4}>
          선호 스타일
        </Grid>
        <Grid item md={8}>
          {resume}.tags
        </Grid>

        <Grid item md={4}>
          선호 지역
        </Grid>
        <Grid item md={8}>
        {resume}.interestAreas
        </Grid>

        <Grid item md={4}>
          입도 가능일
        </Grid>
        <Grid item md={8}>
        {resume}.possibleStartDate
        </Grid>

        <Grid item md={4}>
          자기소개
        </Grid>
        <Grid item md={8}>
        {resume}.content
        </Grid>
        <Grid item md={4}>
          근무이력
        </Grid>

        <Grid item md={8}>
          <MyResumeApplyCareerBox />
        </Grid>
      </Grid>
    </Box>
  );
}
