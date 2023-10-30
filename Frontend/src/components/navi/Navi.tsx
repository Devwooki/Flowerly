import React, { useState } from "react";
import style from "components/navi/Navi.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Navi = () => {
  const [selectedButton, setSelectedButton] = useState<string>("home"); // 현재 선택된 버튼을 저장하는 state

  const router = useRouter();

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
    }
  };

  return (
    <div className={style.naviMain}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("home")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("home")} alt="홈" width={35} height={35} />
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("list")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("list")} alt="현황" width={35} height={25} />
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("flly")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("flly")} alt="플리" width={40} height={40} />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("chat")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("chat")} alt="채팅" width={40} height={35} />
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.6 }}
        onClick={() => moveNavi("my")}
      >
        <div className={style.item}>
          <Image src={getImageSrc("my")} alt="마이" width={30} height={35} />
        </div>
      </motion.div>
    </div>
  );
};

export default Navi;
