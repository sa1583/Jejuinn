import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { deepOrange } from '@mui/material/colors';
import ImageSlider from '../imageSlider/ImageSlider';
import CommentBox from '../commentComponent/CommentBox';
import CommentInput from '../commentComponent/CommentInput';
import CommentList from '../commentComponent/CommentList';
import { v4 as uuidv4 } from 'uuid';

export default function ReviewContent({ reviewContent }) {
  const comments = [
    {
      img: 'J',
      name: 'JangJeongMin',
      comment:
        '나는 코로나의 황제다 후하하하하나는 코로나의 황제다 후하하하하나는 코로나의 황제다 후하하하하나는 코로나의 황제다 후하하하하나는 코로나의 황제다 후하하하하나는 코로나의 황제다 후하하하하나는 코로나의 황제다 후하하하하나는 코로나의 황제다 후하하하하',
    },
    {
      img: 'L',
      name: 'LeeJaeWook',
      comment: '정민이 케익 개꿀맛 엌',
    },
  ];

  // 리뷰에서 댓글만 뽑아서 comments로 저장하는 로직
  // const [comments, setComments] = useState([])
  // useEffect(() => {
  //   setComments(review.comments)
  // },[review])

  return (
    <Box sx={{ padding: '5%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', alignSelf: 'center' }}>
        <ImageSlider items={reviewContent?.images} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>Cho</Avatar>
        <p style={{ fontSize: '1.5vw', fontWeight: 'bolder' }}>초이유태</p>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: reviewContent?.content }} />
      <h2 style={{ color: '#FF7600' }}>댓글</h2>
      <CommentBox cpn={<CommentInput />} />
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          borderBottom: '3px solid #FF7600',
          margin: '10px 0 10px',
          borderRadius: '50px',
        }}
      ></div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {comments.map((comment) => {
          return (
            <CommentBox
              key={uuidv4()}
              cpn={<CommentList comment={comment} />}
            />
          );
        })}
      </Box>
    </Box>
  );
}