import axios from "axios";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { memberInfoState } from "../../recoil/memberInfoRecoil";
import { initializeApp } from "firebase/app";
import { onMessage, getToken } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import { tokenHttp } from "@/api/chattingTokenHttp";
import { ToastErrorMessage, ToastSuccessMessage } from "@/model/toastMessageJHM";

const Temp = () => {
  const [path, setPath] = useState<string | null>(null);
  const [host, setHost] = useState<string | null>(null);
  const router = useRouter();
  const setMemberInfo = useSetRecoilState(memberInfoState);
  const { token } = router.query as { token: string };

  useEffect(() => {
    if (!path && !host) {
      setPath(window.location.pathname);
      setHost(window.location.host);
    }
  }, [path, host]);

  useEffect(() => {
    if (token && host && path) {
      getMemberinfo(token);
      onMessageFCM();
    }
    /* eslint-disable-next-line */
  }, [token, host, path]);

  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_API_ID,
      measurementId: process.env.FIREBASE_MESUREMENT_ID,
    };
    const myVapid = process.env.FIREBASE_VAPID;

    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    if (firebaseConfig) {
      const firebaseApp = initializeApp(firebaseConfig);
      if (firebaseApp) {
        const messaging = getMessaging(firebaseApp);
        // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
        getToken(messaging, { vapidKey: myVapid })
          .then((currentToken) => {
            if (currentToken) {
              // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.

              tokenHttp
                .post("/fcm", {
                  fcmToken: currentToken,
                })
                .then((response) => {})
                .catch((err) => err.response.error.status);
            } else {
            }
          })
          .catch((err) => {});

        // 메세지가 수신되면 역시 콘솔에 출력합니다.
        onMessage(messaging, (payload) => {});
      }
    }
  };

  const getMemberinfo = async (tempToken: string) => {
    try {
      const response = await axios.get("https://flower-ly.co.kr/api/member", {
        // const response = await axios.get("http://localhost:6090/api/member", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${tempToken}`,
          "X-Request-Host": host,
          "X-Request-Path": path,
        },
      });

      if (response.data.code === 200) {
        setMemberInfo(response.data.data);

        const accessToken = response.headers.authorization;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        router.replace("/");
      } else {
        ToastErrorMessage("로그인 실패");
      }
    } catch (error) {}
  };

  return null;
};

export default Temp;
