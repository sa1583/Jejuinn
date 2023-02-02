import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { selectIsLogin, selectUserInfo } from '../store/user';
import { useSelector } from 'react-redux';

// const pages = ['게스트하우스', '일하기', '놀고먹기'];
const pages = [
  { name: '게스트하우스', url: 'guesthouse' },
  { name: '일하기', url: 'worklist' },
  { name: '놀고먹기', url: 'staffpicklist' },
];
const settings = ['마이페이지', '로그아웃'];

export default function ButtonAppBar() {
  const toolbarRef = useRef();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isLogin = useSelector(selectIsLogin);
  const userInfo = useSelector(selectUserInfo);

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
        <Toolbar sx={{ width: '80%', margin: 'auto' }} ref={toolbarRef}>
          <div
            style={{
              flexGrow: 25,
              textDecoration: 'none',
            }}
          >
            <Link
              to={''}
              style={{
                fontSize: '35px',
                fontStyle: 'normal',
                fontFamily: 'SBAggroB',
                textDecoration: 'none',
                color: '#FF7600',
              }}
            >
              JEJUINN
            </Link>
          </div>

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
              {userInfo.profileImg ? (
                <Avatar alt="Remy Sharp" src={userInfo.profileImg} />
              ) : (
                <Avatar sx={{ backgroundColor: 'primary.main' }}>
                  {userInfo.nickname[0].toUpperCase()}
                </Avatar>
              )}
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
