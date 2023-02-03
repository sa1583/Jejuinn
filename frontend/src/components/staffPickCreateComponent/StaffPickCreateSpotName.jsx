import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getRecommendName } from '../../api/staffPick';
import { useEffect, useState } from 'react';

export default function StaffPickCreateSpotName() {
  const gogo = ['ㅁㅁㅁ', 'ㅠㅠㅠ'];

  const [searchName, setSearchName] = useState('');
  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };
  const getNameRecommend = async () => {
    const datas = (await getRecommendName(searchName)).data.items;
    console.log(datas);
    setNameList(datas.map((data) => Object.assign({ label: data.title })));
  };

  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    getNameRecommend();
  }, [searchName]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <Autocomplete
        // disablePortal
        // id="combo-box-demo"
        options={nameList}
        sx={{ width: '50%' }}
        renderInput={(params) => (
          <TextField
            value={searchName}
            onChange={(e) => {
              handleSearchName(e);
            }}
            {...params}
            label="명소 이름을 입력해주세요."
          />
        )}
      />
    </Box>
  );
}
