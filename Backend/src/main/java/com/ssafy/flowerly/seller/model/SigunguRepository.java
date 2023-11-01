package com.ssafy.flowerly.seller.model;


import com.ssafy.flowerly.entity.Sido;
import com.ssafy.flowerly.entity.Sigungu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SigunguRepository extends JpaRepository<Sigungu, Long > {

    @Query(
            "Select s FROM Sigungu s " +
                    "Where s.sido = :sido AND s.sigunguName = '전체' "
    )
    Sigungu findBysigunguCodeAllCode(Sido sido);

    List<Sigungu> findSigungusBySido_SidoCode(Long sidoCode);
}
