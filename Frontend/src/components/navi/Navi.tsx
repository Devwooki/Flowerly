import React from "react";
import style from "components/navi/Navi.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const Navi = () => {
  return (
    <div className={style.naviMain}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }}>
        <div className={style.item}>
          <Image src="/navi/home-white.png" alt="홈" width={35} height={35} />
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }}>
        <div className={style.item}>
          <Image src="/navi/list-white.png" alt="현황" width={35} height={25} />
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }}>
        <div className={style.item}>
          <Image src="/navi/fily-white.png" alt="플리" width={40} height={40} />
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }}>
        <div className={style.item}>
          <Image src="/navi/chat-white.png" alt="채팅" width={40} height={35} />
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }}>
        <div className={style.item}>
          <Image src="/navi/my-white.png" alt="마이" width={30} height={35} />
        </div>
      </motion.div>
    </div>
  );
};

export default Navi;
