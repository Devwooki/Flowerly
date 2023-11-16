package com.ssafy.flowerly.s3.vo;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Data
public class UpdateTumbNailRequest {
    List<Integer> imageIDs;
    List<String> uploadImgs;
}
