import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';

// HandlePinClick: 지도에 있는 핀을 클릭했을 때 발생시키고 싶은 매서드 넣으면 됨
export default function MapApi({ handlePinClick, spots, setNewPin }) {
  const mapElement = useRef(null);

  /// 여기 spots를 axois로 전체 리스트 받아오면 됨
  // 이런 데이터 형식으로 상위 컴포넌트에서 spots로 props 내리면 됨
  // const spots = [
  //   { id: 1, lat: 33.4485, lng: 126.5631 },
  //   { id: 2, lat: 33.478, lng: 126.4948 },
  //   { id: 3, lat: 33.4664, lng: 126.6694 },
  //   { id: 4, lat: 33.2856, lng: 126.4449 },
  // ];

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    var jeju = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(33.2053, 126.1872),
      new naver.maps.LatLng(33.5415, 126.9072),
    );

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(33.3793, 126.5497);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 10,
      minZoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      maxBounds: jeju,
      // mapTypeId: naver.maps.MapTypeId.SATELLITE,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    var markers = [];

    for (let spot of spots) {
      var position = new naver.maps.LatLng(spot.lat, spot.lng),
        id = spot.id;
      var marker = new naver.maps.Marker({
        map: map,
        position: position,
        id: id,
        animation: naver.maps.Animation.DROP,
      });
      markers.push(marker);
      console.log(markers);
    }

    // props로 받은 HandlePinClick 수행
    function getClickHandler(seq) {
      return function () {
        let marker = markers[seq];
        if (handlePinClick) {
          handlePinClick(marker.id);
        }
      };
    }

    for (var i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
    }

    if (setNewPin) {
      var pin = new naver.maps.Marker({
        position: new naver.maps.LatLng(33.3873, 126.5431),
        map: map,
      });

      naver.maps.Event.addListener(map, 'click', function (e) {
        pin.setPosition(e.coord);
        setNewPin(e.coord);
      });
    }
  }, []);
  return (
    <Box
      sx={{
        height: '23rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        ref={mapElement}
        style={{ height: '100%', width: '100%', borderRadius: '39px' }}
      />
    </Box>
  );
}
