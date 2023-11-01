package com.ssafy.flowerly.seller.model;

import com.ssafy.flowerly.entity.Dong;
import com.ssafy.flowerly.entity.Sigungu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DongRepository extends JpaRepository<Dong, Long> {

    @Query(
            "SELECT d FROM Dong d " +
                    "WHERE d.sigungu = :sigungu AND d.dongName = '전체' ")
    Dong findByDongCodeAllCode(Sigungu sigungu);

}
