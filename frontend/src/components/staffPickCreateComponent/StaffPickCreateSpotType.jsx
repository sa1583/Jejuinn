import { Box, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from '../articleCreateComponent/ImageUploader';

export default function StaffPickCreateSpotType({
  newtype,
  handleType,
  file,
  handleFile,
}) {
  const types = ['자연', '놀거리', '먹거리', '볼거리'];

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5rem',
      }}
    >
      <Box sx={{ width: '35%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            유형을 선택해주세요.
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="유형을 선택해주세요."
            value={newtype}
            onChange={(e) => handleType(e.target.value)}
          >
            {types.map((type) => (
              <MenuItem value={type} key={uuidv4()}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: '470px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>
          명소 사진을 등록해주세요.
        </Typography>
        <ImageUploader files={file} handleFiles={handleFile} maxNum={1} />
      </Box>
    </Box>
  );
}
