import style from "./ChattingMenu.module.css";
import Image from "next/image";

type ChattingMenuProps = {
  sendOrderFormHandler: Function;
};

const ChattingMenu: React.FC<ChattingMenuProps> = ({ sendOrderFormHandler }) => {
  return (
    <>
      <div className={style.menuMain}>
        <div className={style.menuItem}>
          <div className={style.menuIcon}>
            <Image
              className={style.icon}
              src="/img/icon/chatting-photo.png"
              width={28}
              height={28}
              alt="사진"
            />
          </div>
          <div className={style.menuName}>사진</div>
        </div>
        <div className={style.menuItem}>
          <div
            className={style.menuIcon}
            onClick={() => {
              sendOrderFormHandler();
            }}
          >
            <Image
              className={style.icon}
              src="/img/icon/chatting-order.png"
              width={30}
              height={30}
              alt="주문 양식"
            />
          </div>
          <div className={style.menuName}>주문 양식</div>
        </div>
        <div className={style.menuItem}>
          <div className={style.menuIcon}>
            <Image
              className={style.icon}
              src="/img/icon/chatting-report.png"
              width={32}
              height={32}
              alt="신고"
            />
          </div>
          <div className={style.menuName}>신고</div>
        </div>
      </div>
    </>
  );
};

export default ChattingMenu;
