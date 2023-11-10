import React, { useEffect, useState } from "react";
import style from "components/navi/Navi.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Navi = () => {
  const router = useRouter();

  const determineInitialButton = () => {
    const pathSegments = router.pathname.split("/").filter(Boolean);
    switch (pathSegments[0]) {
      case "list":
        return "list";
      case "flly":
        return "flly";
      case "chatting":
        return "chat";
      case "mypage":
        return "my";
      default:
        return "home";
    }
  };

  const [selectedButton, setSelectedButton] = useState<string>(determineInitialButton());

  // 이미지 경로를 동적으로 반환하는 helper 함수
  const getImageSrc = (baseName: string) => {
    return `/navi/${baseName}${selectedButton === baseName ? "-dark" : "-white"}.png`;
  };

  const moveNavi = (loc: string) => {
    setSelectedButton(loc);
    if (loc === "home") {
      router.push("/");
    } else if (loc === "list") {
      router.push("/list");
    } else if (loc === "flly") {
      router.push("/flly");
    } else if (loc === "chat") {
      router.push("/chatting");
    } else if (loc === "my") {
      router.push("/mypage");
    }
  };

  useEffect(() => {
    // 라우터 경로가 변경될 때마다 setSelectedButton을 업데이트
    setSelectedButton(determineInitialButton());
    console.log("aa");
  }, []);

  return (
    <div className={style.naviMain}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("home")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("home")} alt="홈" width={33} height={33} priority />
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("list")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("list")} alt="현황" width={35} height={30} priority />
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("flly")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("flly")} alt="플리" width={37} height={37} priority />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("chat")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("chat")} alt="채팅" width={35} height={40} priority />
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("my")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("my")} alt="마이" width={35} height={35} priority />
        </div>
      </motion.div>
    </div>
  );
};

export default Navi;
