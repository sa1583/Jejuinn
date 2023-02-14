import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
export default function SpeedDialComponent({ actions }) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: '5%', right: '14%' }}
      icon={<SpeedDialIcon />}
      FabProps={{
        sx: {
          bgcolor: 'primary.main',
          color: 'secondary.main',
          '&:hover': {
            bgcolor: 'primary.main',
          },
        },
      }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.handle}
        />
      ))}
    </SpeedDial>
  );
}
