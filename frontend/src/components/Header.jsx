import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const pages = ['게스트하우스', '일하기', '놀고먹기'];
const settings = [''];

export default function ButtonAppBar() {
  // 로그인 상태를 저장하는 임시 state
  const [isLogin, setIsLogin] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: '#FF7600', height: '10.7421875vh' }}
      >
        <Toolbar sx={{ width: '85%', margin: 'auto' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 25,
              fontSize: '40px',
              fontStyle: 'normal',
            }}
          >
            LOGO
          </Typography>
          {pages.map((page) => (
            <Typography sx={{ flexGrow: 1 }} key={page}>
              <Box sx={{ fontSize: '24px' }}>{page}</Box>
            </Typography>
          ))}
          {!isLogin && (
            <Typography sx={{ flexGrow: 2 }}>
              <Box
                sx={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                }}
              >
                로그인
              </Box>
            </Typography>
          )}
          {isLogin && (
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, flexGrow: 1 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          )}

          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
