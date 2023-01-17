import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';


const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FF7600',
      opacity: '83%'
    }, '&:hover fieldset': {
      borderColor: '#FF7600',
    },'&.Mui-focused fieldset': {
      borderColor: 'green',
    },}
})

export default function LoginForm() {
  return (
    <form
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6vh',
      }}
    >
      <h1>로그인</h1>
      <CustomTextField
        label="아이디"
        style={{ width: '80%', marginTop: '6vh' }}
      />
      <CustomTextField label="비밀번호" style={{ width: '80%', marginTop: '4vh' }} />

      {/* 아래 인풋은 버튼 컴포넌트로 바꿀거임 */}
      <input
        type="submit"
        value={'로그인'}
        style={{ width: '80%', height: '6vh', marginTop: '6vh', background:'#FF7600', borderRadius:'38px', color:'white', border:'none', fontSize:'1.5vw'}}
      />


      {/* 소셜 로그인 부분 */}
      <h3 style={{marginTop: '4vh', color:'#FF7600'}}>소셜 로그인</h3>
      <Box sx={{ display: 'flex', gap: '1.5vw' }}>
        {socialBtn('images/naver_login.png')}
        {socialBtn('images/kakao_login.png')}
        {socialBtn('images/google_login.png')}
      </Box>

      {/* 회원가입 및 유저 정보 찾기 부분 */}
      <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', marginTop:'4vh' }}>
        {findBtn('회원가입')}
        <p style={{ margin: '1rem', fontSize: '1vw' }}>|</p>
        {findBtn('아이디 찾기')}
        <p style={{ margin: '1rem', fontSize: '1vw' }}>|</p>
        {findBtn('비밀번호 찾기')}
      </Box>
    </form>
  );
}


const findBtn = (inp) => {
  return <p style={{fontSize:'1vw'}}>{inp}</p>
}


const socialBtn = (src) => {
  return <img src={src} alt='' style={{
    height: '2rem',
  }}></img>
}
