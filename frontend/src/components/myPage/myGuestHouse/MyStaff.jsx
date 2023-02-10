import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { images } from '../../../assets/images';

export default function MyStaff({ myStaff }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingX: '2vh',
      }}
    >
      <Avatar
        sx={{ width: '3rem', height: '3rem', marginRight: '10px' }}
        alt="스탭 사진 받아올 수 있남"
        src={images.sample_profile}
      />
      <Box>
        <h4 style={{ color: '#FF7600', marginBottom: '2px' }}>
          {myStaff.workName}
        </h4>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <h3 style={{ marginTop: '0', marginRight: '10px' }}>
            {myStaff.name}
          </h3>
          <p style={{ marginTop: '0px' }}>
            {myStaff.startDate} - {myStaff.endDate}
          </p>
        </Box>
      </Box>
    </Box>
  );
}
