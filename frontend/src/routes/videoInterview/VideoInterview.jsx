import { Box } from '@mui/material';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserVideoComponent from '../../components/videoInterview/UserVideoComponent';
import VideoInterviewHeader from '../../components/videoInterview/VideoInterviewHeader';
import { selectUserInfo } from '../../store/user';

const APPLICATION_SERVER_URL = 'https://jejuinn.com:8443';
const OPENVIDU_SERVER_SECRET = 'jejuinn';

export default function VideoInterview() {
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [openVidu, setOpenVidu] = useState(new OpenVidu());
  const [mySessionId, setMySessionId] = useState(sessionId);
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [participants, setParticipants] = useState([]);

  const [audioOff, setAudioOff] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const joinSession = () => {
    setSession(openVidu.initSession());
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(undefined);
    setOpenVidu(undefined);
    setParticipants([]);
    setMySessionId('');
    setPublisher(undefined);
    navigate('/');
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    try {
      const {
        data: { id },
      } = await axios.post(
        `${APPLICATION_SERVER_URL}/openvidu/api/sessions`,
        { customSessionId: sessionId },
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        },
      );
      return id;
    } catch (error) {
      if (error?.response?.status === 409) {
        return sessionId;
      }
    }
  };

  const createToken = async (sessionId) => {
    const {
      data: { token },
    } = await axios.post(
      `${APPLICATION_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
      {},
      {
        headers: {
          Authorization:
            'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        },
      },
    );
    return token;
  };

  const deleteSubscriber = (streamManager) => {
    setParticipants((prev) =>
      prev.filter((subscriber) => subscriber !== streamManager),
    );
  };

  const handleVideo = () => {
    publisher.publishVideo(videoOff);
    setVideoOff((prev) => !prev);
  };

  const handleAudio = () => {
    publisher.publishAudio(audioOff);
    setAudioOff((prev) => !prev);
  };

  useEffect(() => {
    openVidu.enableProdMode();
    joinSession();
    window.addEventListener('beforeunload', () => leaveSession());

    return () =>
      window.removeEventListener('beforeunload', () => leaveSession());
  }, []);

  useEffect(() => {
    if (session) {
      session.on('streamCreated', (event) => {
        const sub = session.subscribe(event.stream, undefined);
        sub.speaking = false;
        sub.videoOff = false;
        sub.audioOff = false;
        setParticipants((prev) => [...prev, sub]);
      });

      session.on('streamDestroyed', (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      session.on('exception', (exception) => {
        console.warn(exception);
      });

      session.on('publisherStartSpeaking', (event) => {
        setParticipants((prev) => {
          const newState = [];
          prev.forEach((sub) => {
            const tmp = sub;
            if (
              sub.stream.connection.connectionId ===
              event.connection.connectionId
            ) {
              tmp.speaking = true;
            }
            newState.push(tmp);
          });
          return newState;
        });
      });

      session.on('publisherStopSpeaking', (event) => {
        setParticipants((prev) => {
          const newState = [];
          prev.forEach((sub) => {
            const tmp = sub;
            if (
              sub.stream.connection.connectionId ===
              event.connection.connectionId
            ) {
              tmp.speaking = false;
            }
            newState.push(tmp);
          });
          return newState;
        });
      });

      session.on('streamPropertyChanged', (event) => {
        if (event.changedProperty === 'videoActive') {
          if (event.newValue === false) {
            setParticipants((prev) => {
              const newState = [];
              prev.forEach((sub) => {
                const tmp = sub;
                if (
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId
                ) {
                  tmp.videoOff = true;
                }
                newState.push(tmp);
              });
              return newState;
            });
          } else {
            setParticipants((prev) => {
              const newState = [];
              prev.forEach((sub) => {
                const tmp = sub;
                if (
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId
                ) {
                  tmp.videoOff = false;
                }
                newState.push(tmp);
              });
              return newState;
            });
          }
        } else if (event.changedProperty === 'audioActive') {
          if (event.oldValue === true && event.newValue === false) {
            setParticipants((prev) => {
              const newState = [];
              prev.forEach((sub) => {
                const tmp = sub;
                if (
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId
                ) {
                  tmp.audioOff = true;
                }
                newState.push(tmp);
              });
              return newState;
            });
          } else if (event.oldValue === false && event.newValue === true) {
            setParticipants((prev) => {
              const newState = [];
              prev.forEach((sub) => {
                const tmp = sub;
                if (
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId
                ) {
                  tmp.audioOff = false;
                  tmp.speaking = false;
                }
                newState.push(tmp);
              });
              return newState;
            });
          }
        }
      });

      const sessionConnect = async () => {
        const token = await getToken();
        await session.connect(token, { clientData: userInfo.username });
        const publisher = await openVidu.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });
        session.publish(publisher);
        publisher.speaking = false;
        publisher.videoOff = false;
        publisher.audioOff = false;
        setParticipants((prev) => [...prev, publisher]);
        setPublisher(publisher);
      };
      sessionConnect();
    }
  }, [session]);

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          minHeight: session ? '83vh' : '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {session !== undefined ? (
          <div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                margin: 'auto',
              }}
            >
              {participants.map((sub) => {
                return (
                  <div key={sub.stream.connection.connectionId}>
                    <UserVideoComponent
                      streamManager={sub}
                      main={false}
                      num={participants.length}
                      speaking={sub.speaking}
                      videoOfff={sub.videoOff}
                      audioOff={sub.audioOff}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Box>
      {session && (
        <VideoInterviewHeader
          handleVideo={handleVideo}
          handleAudio={handleAudio}
          leaveSession={leaveSession}
          videoOff={videoOff}
          audioOff={audioOff}
        />
      )}
    </div>
  );
}
