import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function CallRoom() {
  const randomID = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const randomName = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const location = useLocation();
  const roomID = getUrlParams(location.search).get('roomID') || randomID(10);
  const { userDetails } = useSelector((state) => state.userAuth);
  const userId = randomID(10);
  const userName = randomName(10);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = Number(process.env.REACT_APP_ZEGO_APP_ID);
    const serverSecret = process.env.REACT_APP_ZEGO_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      369077748,
      'e2bd7b443810c2b405e3532a50767f91',
      roomID,
      userId,
      userName
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Meeting link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
        // To implement 1-on-1 calls, modify the parameter here to
        [ZegoUIKitPrebuilt.OneONoneCall]: true,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
