import React from "react";
import style from "./StoreImgModal.module.css";
import { tokenHttp } from "@/api/tokenHttp";
import { useRouter } from "next/router";

interface Props {
  ModalChangeHandler: () => void;
  imageInfo: { id: number; url: string }[];
  UpdateImg: (img: string) => void;
  index: number | null;
}

const StoreImgModal = ({ ModalChangeHandler, imageInfo, UpdateImg, index }: Props) => {
  const [showFileInput, setShowFileInput] = React.useState(false);
  const router = useRouter();
  const [newUrl, setNewUrl] = React.useState("");
  const NotClickEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // 수정 버튼 클릭 시 파일 인풋 창 띄우기
  const onEditClick = () => {
    setShowFileInput(true);
  };

  // 이미지 업로드

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: File[] = Array.from(e.target.files || []);

    if (fileList.length === 0) {
      return;
    }

    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append("image", file);
    });

    tokenHttp
      .post("/s3/upload/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          const uploadedUrl = res.data.data[0] as string;
          setNewUrl(uploadedUrl);
          console.log(uploadedUrl);

          const newImageData = {
            imageUrls: [uploadedUrl],
          };

          tokenHttp.post("/s3/regist-image", newImageData).then((res) => {
            if (res.data.code === 200) {
              UpdateImg(uploadedUrl);
              console.log(uploadedUrl);
              if (res.headers.authorization) {
                localStorage.setItem("accessToken", res.headers.authorization);
              }
            }
          });

          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          router.push("/fllylogin");
        }
      });
  };

  // 이미지 수정하기
  const updateHandler = (newUrl: string) => {
    if (index !== null && imageInfo[index]?.id) {
      const updatedImageData = {
        imageIDs: [imageInfo[index]?.id],
        uploadImgs: [newUrl],
      };

      tokenHttp
        .put("/s3/update/store", updatedImageData)
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res.data.data);
            UpdateImg(newUrl);

            ModalChangeHandler();
            if (res.headers.authorization) {
              localStorage.setItem("accessToken", res.headers.authorization);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 파일을 먼저 보내고 그 다음에 url을 등록한다..

      const newImageData = {
        imageUrls: [newUrl],
      };

      tokenHttp
        .post("/s3/regist-image", newImageData)
        .then((res) => {
          if (res.data.code === 200) {
            UpdateImg(newUrl);
            ModalChangeHandler();

            if (res.headers.authorization) {
              localStorage.setItem("accessToken", res.headers.authorization);
            }
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            router.push("/fllylogin");
          }
        });
    }
  };

  const deleteHandler = () => {
    if (index !== null && imageInfo[index]?.id) {
      const updatedImageData = {
        imageIDs: [imageInfo[index]?.id],
        uploadImgs: [""],
      };

      tokenHttp
        .put("/s3/update/store", updatedImageData)
        .then((res) => {
          if (res.data.code === 200) {
            UpdateImg("");

            ModalChangeHandler();
            if (res.headers.authorization) {
              localStorage.setItem("accessToken", res.headers.authorization);
            }
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            router.push("/fllylogin");
          }
        });
    }
  };

  return (
    <>
      <div className={style.checkBack} onClick={ModalChangeHandler}>
        <div className={style.modalBack} onClick={NotClickEventHandler}>
          <div className={style.modalMain}>
            <div>이미지를 수정하시겠습니까?</div>
            <div></div>
          </div>
          <div className={style.modalBtnBox}>
            <div onClick={() => deleteHandler()}>삭제</div>

            <div onClick={onEditClick}>수정</div>
            {showFileInput && (
              <div className={style.imgBox}>
                <input type="file" onChange={fileInputHandler} />
                <button onClick={() => updateHandler(newUrl)} className={style.confirmBtn}>
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default StoreImgModal;
