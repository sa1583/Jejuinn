import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
import { images } from '../../assets/images';

// HandlePinClick: 지도에 있는 핀을 클릭했을 때 발생시키고 싶은 매서드 넣으면 됨
/**
 *
 * @param {} param0 spots로 핀에 표시할 장소 위치정보 상속
 * handlePinClick 으로 표시된 spots의 마커를 누르면 실행할 함수를 상속 (상속 안하면 마커 클릭 기능 없음)
 * setNewPin 으로 새로운 핀을 찍을 때 실행할 함수를 상속 (상속 안하면 새로운 핀 찍기 기능 없음)
 * startSpot 으로 페이지 랜더링 됐을 때 지도 화면 위치 상속 (상속 안하면 미리 지정한 제주도 중앙으로 위치)
 * pickId 로 렌더링 됐을 때 색깔 다른 핀 선택
 * @returns
 */
export default function MapApi({
  handlePinClick,
  spots,
  setNewPin,
  startSpot,
  pickedId,
  high,
}) {
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

    let pickedMarker = 0;

    var jeju = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(33.1, 126),
      new naver.maps.LatLng(33.6, 127),
    );

    // 지도 첫 랜더링 시  중심 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    let location = new naver.maps.LatLng(33.3793, 126.5497);
    if (startSpot) {
      location = new naver.maps.LatLng(startSpot[0]?.lat, startSpot[0]?.lng);
    }

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 10,
      minZoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      zIndex: 100,
      maxBounds: jeju,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    const markers = [];

    // 선택 안된 핀

    const content = [
      '<div>',
      `       <img src=${images.pin_not_selected} width="30" height="30" alt="현재 위치"/>`,
      '</div>',
    ].join('');

    const notPickedIcon = {
      content: content,
      size: new naver.maps.Size(20, 20),
      anchor: new naver.maps.Point(15, 30),
    };

    // 선택 된 핀
    const content2 = [
      '<div>',
      `       <img src=${images.pin_selected} width="30" height="30" alt="현재 위치"/>`,
      '</div>',
    ].join('');

    const pickedIcon = {
      size: new naver.maps.Size(20, 20),
      content: content2,
      anchor: new naver.maps.Point(15, 30),
    };

    if (spots) {
      for (let spot of spots) {
        const position = new naver.maps.LatLng(spot?.lat, spot?.lng);
        const id = spot?.travelPlaceUid && spot.travelPlaceUid;

        const marker = new naver.maps.Marker({
          id: id,
          map: map,
          position: position,
          icon: pickedId == id ? pickedIcon : notPickedIcon,
        });
        markers.push(marker);
      }
    }

    function getClickHandler(seq) {
      return function () {
        if (handlePinClick) {
          const marker = markers[seq];
          handlePinClick(marker);
        }
      };
    }

    for (var i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
    }

    if (setNewPin) {
      if (startSpot) {
        var pin = new naver.maps.Marker({
          position: new naver.maps.LatLng(startSpot[0].lat, startSpot[0].lng),
          map: map,
          icon: notPickedIcon,
        });
      } else {
        var pin = new naver.maps.Marker({
          position: new naver.maps.LatLng(33.3873, 126.5431),
          map: map,
          icon: notPickedIcon,
        });
      }

      naver.maps.Event.addListener(map, 'click', function (e) {
        pin.setPosition(e.coord);
        setNewPin(e.coord);
      });
    }
  }, [spots, pickedId]);

  const style = {
    height: high,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <Box sx={style}>
      <div
        ref={mapElement}
        style={{ height: '100%', width: '100%', borderRadius: '15px' }}
      />
    </Box>
  );
}
