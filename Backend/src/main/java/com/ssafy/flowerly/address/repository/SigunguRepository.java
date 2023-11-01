package com.ssafy.flowerly.address.repository;

import com.ssafy.flowerly.entity.Sido;
import com.ssafy.flowerly.entity.Sigungu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SigunguRepository  extends JpaRepository<Sigungu, Long> {
    List<Sido> findBySidoCode(Long sidoCode);
}
