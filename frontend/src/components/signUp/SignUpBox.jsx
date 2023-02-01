import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

import { useState } from 'react';
import SignAgree from './SignUpAgree';
import StepLabel from '@mui/material/StepLabel';
import SignUpInfo from './SignUpInfo';

const steps = ['약관 동의', '정보 입력', '완료'];

export default function SignUpBox() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getSignUpCpn = () => {
    switch (activeStep) {
      case 0:
        return <SignAgree handleNext={handleNext} />;
      case 1:
        return <SignUpInfo />;
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          // justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          paddingX: '5%',
          paddingTop: '3vh',
        }}
      >
        <h1>회원가입</h1>
        <Box sx={{ width: '100%', marginTop: '1%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {getSignUpCpn()}
      </Box>
    </Box>
  );
}
