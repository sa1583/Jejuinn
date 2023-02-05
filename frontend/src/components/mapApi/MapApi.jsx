import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { images } from '../../assets/images';

// HandlePinClick: 지도에 있는 핀을 클릭했을 때 발생시키고 싶은 매서드 넣으면 됨
/**
 *
 * @param {} param0 spots로 핀에 표시할 장소 위치정보 상속
 * handlePinClick 으로 표시된 spots의 마커를 누르면 실행할 함수를 상속 (상속 안하면 마커 클릭 기능 없음)
 * setNewPin 으로 새로운 핀을 찍을 때 실행할 함수를 상속 (상속 안하면 새로운 핀 찍기 기능 없음)
 * startSpot 으로 페이지 랜더링 됐을 때 지도 화면 위치 상속 (상속 안하면 미리 지정한 제주도 중앙으로 위치)
 * @returns
 */
export default function MapApi({
  handlePinClick,
  spots,
  setNewPin,
  startSpot,
}) {
  const mapElement = useRef(null);
  const [pickedMarker, setPickedMarker] = useState(false);
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

    // 지도 첫 랜더링 시  중심 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    let location = new naver.maps.LatLng(33.3793, 126.5497);
    if (startSpot) {
      location = new naver.maps.LatLng(startSpot[0].lat, startSpot[0].lng);
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
      // mapTypeId: naver.maps.MapTypeId.SATELLITE,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    var markers = [];

    //여기

    if (spots) {
      for (let spot of spots) {
        var position = new naver.maps.LatLng(spot.lat, spot.lng);
        var id = spot.id;

        // const picked = () => {
        //   if (id === pickedMarker) return { url: images.pin_selected };
        //   else return { url: images.pin_not_selected };
        // };

        var marker = new naver.maps.Marker({
          id: id,
          map: map,
          position: position,
          animation: naver.maps.Animation.DROP,
          // icon: {
          //   url: images.pin_not_selected,
          // },
        });
        // naver.maps.Event.addListener(marker, 'click', getClickHandler(marker));

        markers.push(marker);
      }
    }

    // function getClickHandler(seq) {
    //   return function () {
    //     if (handlePinClick) {
    //       var marker = markers[seq];
    //       // seq.setIcon(images.pin_selected);
    //       setPickedMarker(marker.id);
    //       console.log(marker.id);
    //       // 여기
    //       handlePinClick(marker);
    //     }
    //   };
    // }

    // for (var i = 0, ii = markers.length; i < ii; i++) {
    //   naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
    // }

    function getClickHandler(mar) {
      return function () {
        if (handlePinClick) {
          mar.setIcon(images.pin_selected);
          // setPickedMarker(mar.id);
          console.log(mar.id);
          // 여기
          handlePinClick(mar);
        }
      };
    }

    for (var marker of markers) {
      naver.maps.Event.addListener(marker, 'click', getClickHandler(marker));
    }

    if (setNewPin) {
      if (startSpot) {
        var pin = new naver.maps.Marker({
          position: new naver.maps.LatLng(startSpot[0].lat, startSpot[0].lng),
          map: map,
        });
      } else {
        var pin = new naver.maps.Marker({
          position: new naver.maps.LatLng(33.3873, 126.5431),
          map: map,
        });
      }

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
