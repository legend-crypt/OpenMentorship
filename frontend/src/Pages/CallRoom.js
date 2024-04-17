// import React, { useRef, useEffect, useState } from 'react';

// const CallRoom = () => {
//   const localVideoref = useRef(null); // Reference to local video element
//   const remoteVideoref = useRef(null); // Reference to remote video element
//   const pc = useRef(null); // Reference to the RTCPeerConnection
//   const socket = useRef(new WebSocket('ws://127.0.0.1:8000/meeting/4432/')); // WebSocket connection to the signaling server


//   useEffect(() => {
//         // Function to handle peer connection setup and cleanup
//     const pc_config = null;

//     pc.current = new RTCPeerConnection(pc_config);
//     pc.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         console.log(JSON.stringify(e.candidate));

//       }
//     };

//     pc.current.oniceconnectionstatechange = (e) => {
//       console.log(e);
//     };

//     pc.current.ontrack = (e) => {
//       remoteVideoref.current.srcObject = e.streams[0];
//     };

//     const success = (stream) => {
//       window.localStream = stream;
//       localVideoref.current.srcObject = stream;
//       stream.getTracks().forEach(track => pc.current.addTrack(track, stream));
//     };

//     const failure = (e) => {
//       console.log('getUserMedia Error: ', e);
//     };

//     const constraints = {
//       audio: false,
//       video: true,
//     };

//     // navigator.mediaDevices.getUserMedia(constraints)
//     //   .then(success)
//     //   .catch(failure);


    

//     return () => {
//       // Cleanup function
//       // Close peer connection and release resources
//       if (pc.current) {
//         pc.current.close();
//       }
//     };
//   },);
  
//   useEffect(() => {
//         // WebSocket event listeners for connection, error, and message

//     // Handle WebSocket connection opened
//     socket.current.onopen = () => {
//       console.log('connected');
//     };

//     // Handle WebSocket connection error
//     socket.current.onerror = (error) => {
//       alert('error', error);
//     };

    
//     // Handle WebSocket message received
//     socket.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       const sdp = JSON.parse(data.payload);
//       console.log("////////////////////////////");
//       console.log("Pc state1", pc.current);

//       // Handle offer message
//       if (data.type === 'offer' && pc.current.localDescription === null) {
//         console.log('offer received');
//         setRemoteDescription(sdp);
//       }

//       // Handle answer message
//       if (data.type === 'answer' && pc.current.remoteDescription === null) {
//         console.log('answer received');
//         const sdp = JSON.parse(data.payload);
//         const candidate = JSON.parse(data.candidate);
//         console.log("answer candidate", candidate)
//         setRemoteDescription(sdp);
//         addCandidate(candidate);
//       }
//       console.log("Pc state2", pc.current);

//     };

//   }, []);
  

// const createOffer = () => {
//     // Function to create an offer for WebRTC connection
//   console.log('Offer sent');
//   pc.current.createOffer({ offerToReceiveVideo: 1 })
//     .then(sdp => {
//       pc.current.setLocalDescription(sdp)
//         .then(() => {
//           console.log('Local desc local laol', pc.current.localDescription);
//           if (!pc.current.localDescription) {
//             console.error("Cannot create offer without local description.", pc.current.localDescription);
//             return;
//           }
//           // Send offer to peer via WebSocket
//           socket.current.send(JSON.stringify({
//             type: 'offer',
//             payload: JSON.stringify(sdp),
//           }));
//         })
//         .catch(error => {
//           console.error("Error setting local description:", error);
//         });
//     })
//     .catch(error => {
//       console.error("Error creating offer:", error);
//     });
// };

//   const createAnswer = () => {
//       // Function to create an answer for WebRTC connection
//     if (!pc.current.remoteDescription) {
//       console.error("Cannot create answer without remote description.", pc.current.remoteDescription);
//       return;
//     }
//     pc.current.createAnswer({ offerToReceiveVideo: 1 })
//       .then(sdp => {
//         pc.current.setLocalDescription(sdp)
//           .then(() => {
//             try {
              
//               pc.current.onicecandidate = (e) => {
//                 if (e.candidate) {
//                   // Send answer and ICE candidate to peer via WebSocket
//                   socket.current.send(JSON.stringify({
//                     type: "answer",
//                     payload: JSON.stringify(sdp),
//                     candidate: JSON.stringify(e.candidate)
//                     }
//                   ));
//                 }
//               }
//             }
//             catch{
//                 console.log("error")
//             }
//             })
//             .catch((e) => {
//               console.error("Error creating answer", e);

//           });
//         });
//   };


//     // Function to set remote description received from peer
//   const setRemoteDescription = (data) => {
//     const desc = data
    
//     pc.current.setRemoteDescription(new RTCSessionDescription(desc));
//   };

//   //Function to add ICE candidate received from peer
//   const addCandidate = (data) => {
//     const candidate = data;
//     console.log('Adding candidate:', candidate);
//     pc.current.addIceCandidate(new RTCIceCandidate(candidate));
//   };



//   return (
//     <div>
//       <video
//         style={{
//           width: 240,
//           height: 240,
//           margin: 5,
//           backgroundColor: 'black'
//         }}
//         ref={localVideoref}
//         autoPlay>
//       </video>
//       <video
//         style={{
//           width: 240,
//           height: 240,
//           margin: 5,
//           backgroundColor: 'black'
//         }}
//         ref={remoteVideoref}
//         autoPlay>
//       </video>
//       <br />

//       <button onClick={createOffer}
//        style={{
//         backgroundColor: 'blue',
//         margin: 5,
//       }}
//       >Offer</button>
//       <br></br>
//       <button onClick={createAnswer}
//         style={{
//             backgroundColor: 'blue',
//         }}
//       >Answer</button>
//     </div>
//   );
// };

// export default CallRoom;


import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 438154999;
      const serverSecret = 'ce2b4aef93678367d2647f66e692e690';
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
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