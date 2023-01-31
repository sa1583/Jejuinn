import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
export default function MapApi() {
  const mapElement = useRef(null);

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
    var marker = new naver.maps.Marker({
      position: location,
      map: map,
    });
    naver.maps.Event.addListener(map, 'click', function (e) {
      marker.setPosition(e.coord);
    });
    new naver.maps.Marker({
      // position: location,
      // map,
    });
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
