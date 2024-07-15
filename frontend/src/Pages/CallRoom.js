
import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';




export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function CallRoom() {
      const roomID = getUrlParams().get('roomID');
      const {userDetails} = useSelector((state) => state.userAuth);
      const userId = userDetails.profile_id;
      const userName = userDetails.first_name + ' ' + userDetails.last_name;
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = Number(process.env.REACT_APP_ZEGO_APP_ID);
      const serverSecret = process.env.REACT_APP_ZEGO_SECRET;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  userId,  userName);


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Meeting link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
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