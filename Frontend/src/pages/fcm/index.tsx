// import React, { useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// interface Config {
//     apiKey: string;
//     authDomain: string;
//     projectId: string;
//     storageBucket: string;
//     messagingSenderId: string;
//     appId: string;
//     vapidKey: string;
//     measurementId : string;
// }

// const firebaseConfig:Config = {
//   apiKey: "AIzaSyCDZIH8n2O56d5pYGfJQR6rl8p3gnxcTfM",
//   authDomain: "flower-ly.firebaseapp.com",
//   projectId: "flower-ly",
//   storageBucket: "flower-ly.appspot.com",
//   messagingSenderId: "973445539914",
//   appId: "1:973445539914:web:4f7c1bf91af1a253a7deb3",
//   vapidKey: "BL3upGYslTflUB5jKpMzKdqp8HZhZQRPoX0lNcFgbMf75oPNtzfrDeKpevifoj0tFO4Y213aOOILFDvIncOWwu8",
//   measurementId: "G-BTY3V627SE"
// };

// let app: any; // Declare app variable outside the component to check if it's already initialized

// const initializeFirebase = () => {
//   if (!app) {
//     app = initializeApp(firebaseConfig);
//   }
// };

// const FCM = () => {
//   useEffect(() => {
//     Notification.requestPermission().then((permission) => {
//       if (permission !== "granted") {
//         console.log("푸시 거부")
//       } else {
//         console.log("푸시 승인")
//       }
//     });

//     initializeFirebase(); // Initialize Firebase only once when the component mounts

//     const messaging = getMessaging(app);

//     const getTokenAndHandle = () => {
//       getToken(messaging)
//         .then((currentToken) => {
//           if (currentToken) {
//             // Send the token to your server and update the UI if necessary
//             console.log(currentToken);
//           } else {
//             // Show permission request UI
//             console.log(
//               "No registration token available. Request permission to generate one."
//             );
//           }
//         })
//         .catch((err) => {
//           console.log("An error occurred while retrieving token. ", err);
//         });
//     };

//     const handleForegroundMessage = () => {
//       onMessage(messaging, (payload) => {
//         console.log("Message received. ", payload);
//         // ...
//       });
//     };

//     getTokenAndHandle();
//     handleForegroundMessage();
//   }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

//   return <></>;
// };

// export default FCM;

// // An error occurred while retrieving token.  FirebaseError: Messaging: We are unable to register the default service worker. Failed to register a ServiceWorker for scope ('http://localhost:3000/firebase-cloud-messaging-push-scope') with script ('http://localhost:3000/firebase-messaging-sw.js'): A bad HTTP response code (404) was received when fetching the script. (messaging/failed-service-worker-registration).
// //     at registerDefaultSw (index.esm2017.js:830:1)
// //     at async updateSwReg (index.esm2017.js:854:1)

import React, { useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage, getToken } from 'firebase/messaging'

const Index = () => {

  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyCDZIH8n2O56d5pYGfJQR6rl8p3gnxcTfM",
      authDomain: "flower-ly.firebaseapp.com",
      projectId: "flower-ly",
      storageBucket: "flower-ly.appspot.com",
      messagingSenderId: "973445539914",
      appId: "1:973445539914:web:4f7c1bf91af1a253a7deb3",
      measurementId: "G-BTY3V627SE"
    })

    const messaging = getMessaging(firebaseApp)

    // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
    getToken(messaging, { vapidKey: 'BL3upGYslTflUB5jKpMzKdqp8HZhZQRPoX0lNcFgbMf75oPNtzfrDeKpevifoj0tFO4Y213aOOILFDvIncOWwu8' }).then((currentToken) => {
      if (currentToken) {
        // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
        console.log("토큰이에요 \n" +currentToken)
      } else {
        console.log('No registration token available. Request permission to generate one.')
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  }

  useEffect(() => {
    onMessageFCM()
  }, [])

  return (
    <div>
      <h1>hello world</h1>
    </div>
  )
}

export default Index