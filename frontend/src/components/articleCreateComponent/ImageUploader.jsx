import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { images } from '../../assets/images';
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
  width: '100%',
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export default function ImageUploader({
  files,
  handleFiles,
  maxNum,
  preImages,
  handlePreImages,
}) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const newImgs = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );
      preImages
        ? handleFiles(
            [...files, ...newImgs].splice(0, maxNum - preImages.length),
          )
        : handleFiles([...files, ...newImgs].splice(0, maxNum));
    },
    maxFiles: maxNum,
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
    handleFiles(files.filter((file) => file !== f));
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={uuidv4()}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          // onunload={() => {
          //   URL.revokeObjectURL(file.preview);
          // }}
          onDoubleClick={() => deleteImage(file)}
        />
      </div>
    </div>
  ));

  const preThumbs =
    preImages &&
    preImages.map((image) => (
      <div style={thumb} key={uuidv4()}>
        <div style={thumbInner}>
          <img
            src={`${images.defalut_url}${image.imgPath}`}
            style={img}
            alt="gogogo"
            onDoubleClick={() => handlePreImages(image.uid)}
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
          border: '2px dashed #dddddd',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          minHeight: '208px',
        }}
      >
        <input {...getInputProps()} />

        {files.length + (preImages ? preImages.length : 0) === 0 ? (
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
              marginY: '3rem',
              marginX: '2rem',
            }}
          >
            <button
              style={{ background: 'white', border: 'none', cursor: 'pointer' }}
            >
              <AddPhotoAlternateOutlinedIcon
                sx={{
                  fontSize: '7rem',
                  color: '#eaeaea',
                  marginBottom: '20px',
                }}
              />
            </button>
            <Typography sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
              이미지를 <span style={{ color: '#FF7600' }}>드래그</span>하거나
              <span style={{ color: '#FF7600' }}> 클릭</span>하여 직접
              선택하세요.
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: 'grey' }}>
              지원 확장자 : jpg, jpeg, png (최대 {maxNum}개)
            </Typography>
          </div>
        ) : (
          <>
            <aside style={thumbsContainer}>
              {preThumbs}
              {thumbs}
              {addBtn}
            </aside>
          </>
        )}
      </div>
    </section>
  );
}
