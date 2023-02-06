import { Box } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function StaffPickCreateSpotType({ newtype, handleType }) {
  const types = ['자연', '놀거리', '먹거리', '볼거리'];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
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
    </Box>
  );
}
