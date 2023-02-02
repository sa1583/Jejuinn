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
        position="fixed"
        sx={{
          background: '#FFFFFF',
          height: '95px',
          boxShadow: '0px 2px 6px -1px rgb(0 0 0 / 10%)',
        }}
      >
        <Toolbar sx={{ width: '80%', margin: 'auto' }}>
          <Link
            to={''}
            style={{
              flexGrow: 25,
              fontSize: '35px',
              fontStyle: 'normal',
              fontFamily: 'SBAggroB',
              color: '#FF7600',
              textDecoration: 'none',
            }}
          >
            JEJUINN
          </Link>

          {pages.map((page) => (
            <Typography
              sx={{
                flexGrow: 1.3,
                fontSize: '21px',
                fontFamily: 'SBAggroB',
              }}
              key={page.name}
            >
              <Link
                to={page.url}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                {page.name}
              </Link>
            </Typography>
          ))}
          {!isLogin && (
            <Typography
              sx={{
                fontSize: '21px',
                fontFamily: 'SBAggroB',
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
