import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { NoEncryption } from '@mui/icons-material';

// const pages = ['게스트하우스', '일하기', '놀고먹기'];
const pages = [
  { name: '게스트하우스', url: 'guesthouse' },
  { name: '일하기', url: 'worklist' },
  { name: '놀고먹기', url: 'staffpicklist' },
];
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
        sx={{
          background: '#FFFFFF',
          height: '80px',
          boxShadow: 'none',
          borderColor: '#e7e7e7',
          borderStyle: 'solid',
          borderWidth: '0.1px',
        }}
      >
        <Toolbar sx={{ width: '60%', margin: 'auto' }}>
          <Link
            to={''}
            style={{
              flexGrow: 25,
              fontSize: '28px',
              fontStyle: 'normal',
              color: '#FF7600',
              textDecoration: 'none',
            }}
          >
            JEJUINN
          </Link>

          {pages.map((page) => (
            <Typography
              sx={{ flexGrow: 1.3, fontSize: '16px' }}
              key={page.name}
            >
              <Link
                to={page.url}
                style={{ textDecoration: 'none', color: '#FF7600' }}
              >
                {page.name}
              </Link>
            </Typography>
          ))}
          {!isLogin && (
            <Typography
              sx={{
                fontSize: '17px',
              }}
            >
              <Link
                to={'login'}
                style={{
                  textDecoration: 'none',
                  color: '#FF7600',
                  fontWeight: 'Bold',
                }}
              >
                로그인
              </Link>
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