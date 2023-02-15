import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { getRecommendName } from '../../api/staffPick';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

export default function StaffPickCreateSpotName({
  spotName,
  handleSpotName,
  setNewPinByNameSearch,
}) {
  const getNameRecommend = async () => {
    const datas = (await getRecommendName(spotName)).data.items;
    setNameList(datas);
  };

  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    if (spotName) {
      getNameRecommend();
    } else {
      setNameList([]);
    }
  }, [spotName]);

  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '1rem',
          marginBottom: '2rem',
        }}
      >
        <Typography sx={{ fontSize: 20 }}>
          새로운 명소에 대한 이름을 입력하시거나
        </Typography>
        <Typography sx={{ fontSize: 20 }}>
          아래 나타나는 추천 이름을 선택하여 정확한 위치를 지정할 수 있습니다.
        </Typography>
      </Box>

      <Box sx={{ width: '60%' }}>
        <TextField
          sx={{ width: '100%' }}
          label="명소의 이름을 입력해주세요."
          value={spotName}
          onChange={(e) => handleSpotName(e.target.value)}
        />
        <List sx={style} component="nav" aria-label="mailbox folders">
          {nameList.map((item) => (
            <ListItem button divider key={uuidv4()}>
              <ListItemText
                primary={item.title}
                onClick={(e) => {
                  handleSpotName(e.target.textContent);
                  setNewPinByNameSearch(item);
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
