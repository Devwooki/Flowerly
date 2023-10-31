package com.ssafy.flowerly.s3.model;

import com.ssafy.flowerly.entity.FileInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface S3Repository extends JpaRepository<FileInfo, Long> {
    void deleteByUploadFileUrl(String imgSrc);
}
