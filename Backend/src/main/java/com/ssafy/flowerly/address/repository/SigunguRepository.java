package com.ssafy.flowerly.address.repository;


import com.ssafy.flowerly.entity.Sido;
import com.ssafy.flowerly.entity.Sigungu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SigunguRepository extends JpaRepository<Sigungu, Long > {

    Optional<Sigungu> findBySigunguNameAndSido(String sigunguName, Sido sido);

    Optional<Sigungu> findBySigunguCodeAndSido(Long sigunguCode, Sido sido);

    @Query(
            "Select s FROM Sigungu s " +
                    "Where s.sido = :sido AND s.sigunguName = '전체' "
    )
    Sigungu findBysigunguCodeAllCode(Sido sido);

    Optional<Page<Sigungu>> findSigungusBySido_SidoCode(Pageable pageable, Long sidoCode);
}
