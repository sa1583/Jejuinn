import { Box } from '@mui/material';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

import { useEffect, useState } from 'react';
import UserVideoComponent from '../../components/videoInterview/UserVideoComponent';
import VideoInterviewHeader from '../../components/videoInterview/VideoInterviewHeader';

const APPLICATION_SERVER_URL = 'https://jejuinn.com:8443';
const OPENVIDU_SERVER_SECRET = 'jejuinn';

export default function VideoInterview() {
  const [openVidu, setOpenVidu] = useState(new OpenVidu());
  const [mySessionId, setMySessionId] = useState();
  const [myUserName, setMyUserName] = useState();
  const [session, setSession] = useState();
  const [mainStreamManager, setMainStreamManager] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDivce] = useState();

  const [audioOff, setAudioOff] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const joinSession = (e) => {
    setSession(openVidu.initSession());
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setOpenVidu(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('');
    setMyUserName('');
    setMainStreamManager(undefined);
    setPublisher(undefined);
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
    setSubscribers(
      subscribers.filter((subscriber) => subscriber !== streamManager),
    );
  };

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setSubscribers([
        ...subscribers.filter((sub) => sub !== stream),
        mainStreamManager,
      ]);
      setMainStreamManager(stream);
    }
  };

  const handleVideo = () => {
    publisher.publishVideo(videoOff);
    setVideoOff(!videoOff);
  };

  const handleAudio = () => {
    publisher.publishAudio(audioOff);
    setAudioOff(!audioOff);
  };

  useEffect(() => {
    return () => {
      console.log('leave');
      leaveSession();
    };
  }, []);

  useEffect(() => {
    if (session) {
      session.on('streamCreated', (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
        setSubscribers((prev) => [...prev, subscriber]);
      });

      session.on('streamDestoryed', (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      session.on('exception', (exception) => {
        console.warn(exception);
      });

      const sessionConnect = async () => {
        const token = await getToken();
        await session.connect(token, { clientData: myUserName });
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

        setMainStreamManager(publisher);
        setPublisher(publisher);
      };
      sessionConnect();
    }
  }, [session]);

  return (
    <div>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          height: session ? '84.5vh' : '91vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {session === undefined ? (
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
        ) : null}
        {session !== undefined ? (
          <div>
            <div>
              <h1>{mySessionId}</h1>
            </div>

            {mainStreamManager !== undefined ? (
              <Box>
                <UserVideoComponent
                  streamManager={mainStreamManager}
                  main={true}
                />
              </Box>
            ) : null}
            <div>
              {subscribers.map((sub, i) => (
                <div key={i} onClick={() => handleMainVideoStream(sub)}>
                  <UserVideoComponent streamManager={sub} main={false} />
                </div>
              ))}
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
