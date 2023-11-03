package com.ssafy.flowerly.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileInfo {
    @Id
    @GeneratedValue
    private Long fileInfoId;

    @Lob
    private String originalFileName;
    @Lob
    private String uploadFileName;
    @Lob
    private String uploadFilePath;
    @Lob
    private String uploadFileUrl;

    @Builder
    public FileInfo(String originalFileName, String uploadFileName, String uploadFilePath, String uploadFileUrl) {
        this.originalFileName = originalFileName;
        this.uploadFileName = uploadFileName;
        this.uploadFilePath = uploadFilePath;
        this.uploadFileUrl = uploadFileUrl;
    }
}
