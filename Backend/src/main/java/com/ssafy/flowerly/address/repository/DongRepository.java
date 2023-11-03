package com.ssafy.flowerly.address.repository;

import com.ssafy.flowerly.entity.Dong;
import com.ssafy.flowerly.entity.Sigungu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DongRepository extends JpaRepository<Dong, Long> {

    Optional<Dong> findByNameAndSigungu(String name, Sigungu sigungu);

    Optional<Dong> findByCodeAndSigungu(Integer code, Sigungu sigungu);

    @Query(
            "SELECT d FROM Dong d " +
                    "WHERE d.sigungu = :sigungu AND d.dongName = '전체' ")
    Dong findByDongCodeAllCode(Sigungu sigungu);

    Optional<Page<Dong>> findDongsBySigunguSigunguCode(Pageable pageable, Long sigunguCode);

}
