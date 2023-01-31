import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
export default function SpeedDialComponent({ actions }) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: '20%', right: '2%' }}
      icon={<SpeedDialIcon />}
      FabProps={{
        sx: {
          bgcolor: '#FF7600',
          '&:hover': {
            bgcolor: '#FF7600',
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
