import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  gap: '1rem',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  // marginRight: 8,
  width: '13rem',
  height: '13rem',
  boxSizing: 'border-box',
  position: 'relative',
  background: '#f5f5f5ac',
  justifyContent: 'center',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
};

export default function ImageUploader({ files, handleFiles }) {
  // const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const newImgs = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );
      console.log(newImgs);
      // setFiles([...files, ...newImgs].splice(0, 10));
      handleFiles([...files, ...newImgs].splice(0, 10));
    },
    maxFiles: 10,
    noClick: true,
  });

  const addBtn = (
    <button
      style={{
        width: '13rem',
        height: '13rem',
        bolder: 'none',
        background: 'none',
        border: '1px solid #ff7300',
      }}
      className="plus"
      onClick={(e) => {
        e.preventDefault();
        open();
      }}
    >
      <AddPhotoAlternateOutlinedIcon
        sx={{ fontSize: '5rem', color: 'primary.main' }}
      />
      <Typography sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
        이미지를 삭제하려면{' '}
        <span style={{ color: '#FF7600' }}>
          <br />
          더블클릭
        </span>
        하세요.
      </Typography>
    </button>
  );

  const deleteImage = (f) => {
    // setFiles(files.filter((file) => file != f));
    handleFiles(files.filter((file) => file != f));
    console.log(f);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={uuidv4()}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onunload={() => {
            URL.revokeObjectURL(file.preview);
            console.log(files);
          }}
          onDoubleClick={() => deleteImage(file)}
        />
      </div>
    </div>
  ));

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, [files]);

  return (
    <section className="container">
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={{
          border: 'dotted #969696',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              justifySelf: 'center',
            }}
          >
            <button
              style={{ background: 'white', border: 'none', cursor: 'pointer' }}
            >
              <AddPhotoAlternateOutlinedIcon
                sx={{ fontSize: '6rem' }}
                color="primary"
              />
            </button>
            <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }}>
              이미지를 <span style={{ color: '#FF7600' }}>드래그</span>하거나
              <br />
              <span style={{ color: '#FF7600' }}>클릭</span>하여 직접
              선택하세요.
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }}>
              지원 확장자 : jpg, jpeg, png (최대 10개)
            </Typography>
          </div>
        ) : (
          <>
            <aside style={thumbsContainer}>
              {thumbs}
              {addBtn}
            </aside>
          </>
        )}
      </div>
    </section>
  );
}
