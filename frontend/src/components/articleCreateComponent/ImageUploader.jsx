import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
  alignItems: 'center',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginRight: 8,
  width: '13rem',
  height: '13rem',
  boxSizing: 'border-box',
  position: 'relative',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export default function ImageUploader(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const newImgs = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );
      console.log(newImgs);
      setFiles([...files, newImgs]);
      // setFiles(
      //   // ...files,
      //   acceptedFiles.map((file) =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //     }),
      //   ),
      // );
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
      <AddCircleOutlineIcon sx={{ fontSize: '5rem', color: 'primary.main' }} />
    </button>
  );

  const deleteImage = (f) => {
    setFiles(files.filter((file) => file != f));
    console.log(f);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
            console.log(files);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteImage(file);
          }}
        >
          <CancelIcon
            sx={{
              color: '#ff9900',
              backgroundColor: 'black',
              borderRadius: 100,
              position: 'absolute',
              right: 5,
              top: 5,
              zIndex: 100,
            }}
          />
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

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
          minHeight: '15rem',
        }}
      >
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
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
          </>
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
