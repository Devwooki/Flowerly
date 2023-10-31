package com.ssafy.flowerly.s3;

import com.ssafy.flowerly.entity.type.UploadType;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.s3.model.S3Service;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/s3")
@RequiredArgsConstructor
@Slf4j
public class S3Controller {
    private final S3Service s3Service;
    @PostMapping("/upload/store")
    public DataResponse<?>  uploadStoreThumbnail(@RequestPart("image") MultipartFile[] uploadImgs) throws IOException {
        if(uploadImgs == null) throw new CustomException(ErrorCode.INVALID_UPLOAD_FILE);
        log.info("업로드 파일 크기 : {}", uploadImgs.length );
        return new DataResponse<>(HttpStatus.OK.value(),
                "대표사진 업로드 완",
                s3Service.upload(uploadImgs, UploadType.STORE_THUMBNAIL)
        );
    }
    @PostMapping("/upload/flower")
    public DataResponse<?>  uploadFlower(@RequestPart MultipartFile[] uploadImgs) throws IOException {
        return new DataResponse<>(HttpStatus.OK.value(),
                "꽃 사진들 업로드 완",
                s3Service.upload(uploadImgs, UploadType.FlOWER)
        );
    }
    @PostMapping("/upload/request")
    public DataResponse<?>  uploadRequest(@RequestPart MultipartFile uploadImg) throws IOException {
        return new DataResponse<>(HttpStatus.OK.value(),
                "의뢰사진 업로드 완",
                s3Service.uploadOneImage(uploadImg, UploadType.REQUEST
        ));
    }
    @PostMapping("/upload/order")
    public DataResponse<?>  uploadOrder(@RequestPart MultipartFile uploadImg) throws IOException {
        return new DataResponse<>(HttpStatus.OK.value(),
                "주문사진 업로드 완",
                s3Service.uploadOneImage(uploadImg, UploadType.ORDER)
        );
    }

    @PostMapping("/upload/chat")
    public DataResponse<?>  uploadChat(@RequestPart MultipartFile uploadImg) throws IOException{
        return new DataResponse<>(HttpStatus.OK.value(),
                "채팅 사진 업로드 업로드 완",
                s3Service.uploadOneImage(uploadImg, UploadType.STORE_THUMBNAIL)
        );
    }
}
