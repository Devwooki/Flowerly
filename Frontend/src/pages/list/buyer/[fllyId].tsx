import style from "./fllyId.module.css";
import FllyListMain from "@/components/list/listBuyer/fllylistComponent/FllyListMain";
import { motion } from "framer-motion";

const FllyList = () => {
  const BuyerCardPlus = {
    img: "/img/homeBanner/164_red_phalaenopsis.jpg",
    budget: "25,000",
    state: "사랑",
    situation: "대상",
    deadline: " 23.10.02 12:56",
    clientName: "김동민",
    selectedColor: ["분홍색", "노란색", "파랑색"],
    selectedFlower: [
      "분홍 수국 - 소녀의 꿈, 처녀의 꿈",
      "노란 국화 - 김동민의 꿈",
      "파란 수국 - 프론트엔드의 끝ㅁ",
    ],
    orderType: "배달",
    adress: "대전시 유성구",
    request:
      "파랑 수국보다 분홍 수국이 더 많이 들어갔으면 좋겠어요! 20일날 고백하려고해요.. 이쁘게 부탁드려요!!",
  };
  const shopList = [
    {
      reImg:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg",
      shopId: 1,
      shopName: "꼬까게",
      shopLoc: "대전광역시 중구 대둔산로 384 1층 나이테플라워",
      recommandPrice: "25,000",
      recommandComment:
        "요청 사항 대로 예쁘게 만들어 드릴게요. 이렇게 하면 어떠신가요? 만들어줄께 만들어줄께 만들어줄께 만들어줄께",
    },
    {
      reImg:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg",
      shopId: 2,
      shopName: "꽃채운 시루",
      shopLoc: "대전광역시 동구 우암로 216",
      recommandPrice: "18,000",
      recommandComment: "니가 뭘알아, 내가 만들어 주면 넌 사면 돼.",
    },
    {
      reImg:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      shopId: 3,
      shopName: "나이테플라워",
      shopLoc: "대전광역시 중구 대둔산로 384",
      recommandPrice: "32,000",
      recommandComment:
        "내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어",
    },
    {
      reImg: "/test/test-flower-img.png",
      shopId: 4,
      shopName: "플로스유화",
      shopLoc: "대전광역시 서구 둔산북로 22 둔산라이프종합상가 121호",
      recommandPrice: "55,000",
      recommandComment:
        "쿵따리 샤바라 빠빠빠 엉덩이를 흔들어봐요 이히~~ 할아버지 할머니도 흔들어 봐요~~ 그깟나이 무슨 상관이에요~~ 다 같이 흔들어봐요~~",
    },
    {
      reImg:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/9ab5e8bb-56f9-4cff-967b-22075b73e37a010_pink_gookhwa.jpg.jpg",
      shopId: 5,
      shopName: "꼬까게",
      shopLoc: "대전광역시 중구 대둔산로 384 1층 나이테플라워",
      recommandPrice: "25,000",
      recommandComment:
        "요청 사항 대로 예쁘게 만들어 드릴게요. 이렇게 하면 어떠신가요? 만들어줄께 만들어줄께 만들어줄께 만들어줄께",
    },
    {
      reImg:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/da3f0e9f-0c1e-45d8-ba34-86e57331687b011_yellow_gookhwa.jpg.jpg",
      shopId: 6,
      shopName: "꽃채운 시루",
      shopLoc: "대전광역시 동구 우암로 216",
      recommandPrice: "18,000",
      recommandComment: "니가 뭘알아, 내가 만들어 주면 넌 사면 돼.",
    },
    {
      reImg:
        "https://neighbrew.s3.ap-northeast-2.amazonaws.com/FlOWER/f82c544a-7f65-4879-9293-76ceaba5a6d2069_pink_peony.jpg.jpg",
      shopId: 7,
      shopName: "나이테플라워",
      shopLoc: "대전광역시 중구 대둔산로 384",
      recommandPrice: "32,000",
      recommandComment:
        "내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어 내가 제일 잘 만들어",
    },
    {
      reImg: "/test/test-flower-img.png",
      shopId: 8,
      shopName: "플로스유화",
      shopLoc: "대전광역시 서구 둔산북로 22 둔산라이프종합상가 121호",
      recommandPrice: "55,000",
      recommandComment:
        "쿵따리 샤바라 빠빠빠 엉덩이를 흔들어봐요 이히~~ 할아버지 할머니도 흔들어 봐요~~ 그깟나이 무슨 상관이에요~~ 다 같이 흔들어봐요~~",
    },
  ];

  return (
    <motion.div className={style.ListBuyerBack}>
      <div className={style.ListBuyerHeader}>
        <div className={style.headerTitle}>플리스트</div>
      </div>
      <div className={style.ListBuyerMain}>
        {BuyerCardPlus && <FllyListMain card={BuyerCardPlus} shopList={shopList} />}
      </div>
    </motion.div>
  );
};

export default FllyList;
