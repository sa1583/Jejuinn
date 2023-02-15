import { Box } from '@mui/material';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserVideoComponent from '../../components/videoInterview/UserVideoComponent';
import VideoInterviewHeader from '../../components/videoInterview/VideoInterviewHeader';
import { selectIsLogin, selectUserInfo } from '../../store/user';

const APPLICATION_SERVER_URL = 'https://jejuinn.com:8443';
const OPENVIDU_SERVER_SECRET = 'jejuinn';

export default function VideoInterview() {
  const userInfo = useSelector(selectUserInfo);
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

  const navigate = useNavigate();

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(undefined);
    setParticipants([]);
    setMySessionId('');
    setPublisher(undefined);
    return navigate('/');
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

  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (!isLogin) navigate('/login');
    joinSession();
    return () => {
      return leaveSession();
    };
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
          const changedSub = prev.filter(
            (sub) =>
              sub.stream.connection.connectionId ===
              event.connection.connectionId,
          );
          const newState = prev.filter(
            (sub) =>
              sub.stream.connection.connectionId !==
              event.connection.connectionId,
          );
          changedSub[0].speaking = true;
          newState.push(changedSub[0]);
          return newState;
        });
      });

      session.on('publisherStopSpeaking', (event) => {
        setParticipants((prev) => {
          const changedSub = prev.filter(
            (sub) =>
              sub.stream.connection.connectionId ===
              event.connection.connectionId,
          );
          const newState = prev.filter(
            (sub) =>
              sub.stream.connection.connectionId !==
              event.connection.connectionId,
          );
          changedSub[0].speaking = false;
          newState.push(changedSub[0]);
          return newState;
        });
      });

      session.on('streamPropertyChanged', (event) => {
        if (event.changedProperty === 'videoActive') {
          if (event.newValue === false) {
            setParticipants((prev) => {
              const changedSub = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId,
              );
              const newState = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId !==
                  event.stream.connection.connectionId,
              );
              changedSub[0].videoOff = true;
              newState.push(changedSub[0]);
              return newState;
            });
          } else {
            setParticipants((prev) => {
              const changedSub = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId,
              );
              const newState = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId !==
                  event.stream.connection.connectionId,
              );
              changedSub[0].videoOff = false;
              newState.push(changedSub[0]);
              return newState;
            });
          }
        } else if (event.changedProperty === 'audioActive') {
          if (event.oldValue === true && event.newValue === false) {
            setParticipants((prev) => {
              const changedSub = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId,
              );
              const newState = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId !==
                  event.stream.connection.connectionId,
              );
              changedSub[0].audioOff = true;
              newState.push(changedSub[0]);
              return newState;
            });
          } else if (event.oldValue === false && event.newValue === true) {
            setParticipants((prev) => {
              const changedSub = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId ===
                  event.stream.connection.connectionId,
              );
              const newState = prev.filter(
                (sub) =>
                  sub.stream.connection.connectionId !==
                  event.stream.connection.connectionId,
              );
              changedSub[0].audioOff = false;
              changedSub[0].speaking = false;
              newState.push(changedSub[0]);
              return newState;
            });
          }
        }
      });

      const sessionConnect = async () => {
        try {
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
        } catch (error) {
          alert('존재하지 않는 세션입니다.');
          navigate('/');
        }
      };
      sessionConnect();
    }
  }, [session]);

  useEffect(() => {
    console.log(participants);
  }, [participants]);

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
        {/* {session === undefined ? (
          <div>
            <div>
              <h1> Join a video session </h1>
              <p>
                <label>Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  type="text"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <button onClick={joinSession}>JOIN</button>
              </p>
            </div>
          </div>
        ) : null} */}
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
                console.log('sub', sub);
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
