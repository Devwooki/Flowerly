package com.ssafy.flowerly.s3;

import com.ssafy.flowerly.entity.type.UploadType;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.s3.model.S3Service;
import com.ssafy.flowerly.util.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/s3")
@RequiredArgsConstructor
@Slf4j
public class S3Controller {
    private final S3Service s3Service;
    @PostMapping("/upload/store")
    public DataResponse<?>  uploadStoreThumbnail(@RequestPart("image") MultipartFile[] uploadImgs) {
        if(uploadImgs == null || uploadImgs.length == 0) throw new CustomException(ErrorCode.INVALID_UPLOAD_FILE);
        log.info("업로드 파일 크기 : {}", uploadImgs.length );
        return new DataResponse<>(HttpStatus.OK.value(),
                "대표사진 업로드 완",
                s3Service.upload(uploadImgs, UploadType.STORE_THUMBNAIL)
        );
    }
    @PostMapping("/upload/flower")
    public DataResponse<?>  uploadFlower(@RequestPart("image") MultipartFile[] uploadImgs)  {
        return new DataResponse<>(HttpStatus.OK.value(),
                "꽃 사진들 업로드 완",
                s3Service.upload(uploadImgs, UploadType.FlOWER)
        );
    }

    @PostMapping("/upload/base64")
    public DataResponse<?>  uploadRequest(@RequestBody Map<String, Object> base64)  {
        String base64Image = (String) base64.get("image");
        String uploadTypeName = (String) base64.get("uploadType");
        UploadType type;
        log.info("base64 업로드 요청 : {}", base64Image);

        if(uploadTypeName.equals("REQUEST")) type = UploadType.REQUEST;
        else if(uploadTypeName.equals("ORDER")) type = UploadType.ORDER;
        else throw new CustomException(ErrorCode.INVALID_UPLOAD_TYPE);

        if(base64Image == null || base64Image.trim().equals("") || base64Image.length() == 0)
            throw new CustomException(ErrorCode.INVALID_BASE64);

        return new DataResponse<>(HttpStatus.OK.value(),
                "의뢰사진 업로드 완",
                s3Service.uploadBase64Image(base64Image, type)
        );
    }

    @PostMapping("/upload/chat")
    public DataResponse<?>  uploadChat(@RequestPart("image") MultipartFile uploadImg) {
        if (uploadImg == null || uploadImg.getSize() == 0) throw new CustomException(ErrorCode.INVALID_UPLOAD_FILE);
        return new DataResponse<>(HttpStatus.OK.value(),
                "채팅 사진 업로드 업로드 완",
                s3Service.uploadOneImage(uploadImg, UploadType.CHAT)
        );
    }
}