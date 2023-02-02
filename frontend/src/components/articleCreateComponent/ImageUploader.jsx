import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Typography } from '@mui/material';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
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
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
    maxFiles: 5,
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          onClick={console.log(file)}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div
          style={{
            border: 'dotted #969696',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '1rem',
            padding: '1rem',
            height: '15rem',
          }}
        >
          <AddPhotoAlternateOutlinedIcon
            sx={{ fontSize: '6rem' }}
            color="primary"
          />
          <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }}>
            이미지를 <span style={{ color: '#FF7600' }}>드래그</span>하거나
            <br />
            <span style={{ color: '#FF7600' }}>클릭</span>하여 직접 선택하세요.
          </Typography>
          <Typography sx={{ fontSize: '0.8rem' }}>
            지원 확장자 : jpg, jpeg, png (최대 10개)
          </Typography>
        </div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
