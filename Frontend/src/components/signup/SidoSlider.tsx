import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface sidoDataType {
  sidoCode: number;
  sidoName: string;
}

const SidoSlider = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [sidoData, setSidoData] = useState<sidoDataType[]>([]);

  useEffect(() => {
    const getSidoData = async () => {
      try {
        const response = await axios.get("https://flower-ly.co.kr/api/address/sido");
        // console.log(response);
        setSidoData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSidoData();
  }, []);

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
  };

  const [slideState, setSlideState] = useState({ activeSlide: 0, activeSlide2: 0 });

  const settings = {
    slide: "div",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    beforeChange: (current: number, next: number) =>
      setSlideState({ activeSlide: next, activeSlide2: current }),
  };

  return (
    <>
      <Slider {...settings}>
        {sidoData &&
          sidoData.map((data, dataIndex) => (
            <div
              key={data.sidoCode + dataIndex}
              onClick={() => {
                handleCellClick(data.sidoCode.toString());
              }}
            >
              {data.sidoName}
            </div>
            // <div key={dataIndex}>
            //   <table>
            //     <tbody>
            //       {["1", "2", "3"].map((row, rowIndex) => (
            //         <tr key={row}>
            //           {Array.from(data).map((colData: string, colIndex: number) => {
            //             const cellId = `${row}-${colIndex}`;
            //             return (
            //               <td
            //                 key={colIndex}
            //                 onClick={() => handleCellClick(cellId)}
            //                 style={{
            //                   cursor: "pointer",
            //                   background: selectedCell === cellId ? "lightgray" : "white",
            //                 }}
            //               >
            //                 {colData}
            //               </td>
            //             );
            //           })}
            //         </tr>
            //       ))}
            //     </tbody>
            //   </table>
            // </div>
          ))}
      </Slider>
    </>
  );
};

export default SidoSlider;
