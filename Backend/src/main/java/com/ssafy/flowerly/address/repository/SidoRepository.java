package com.ssafy.flowerly.address.repository;

import com.ssafy.flowerly.entity.Sido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SidoRepository extends JpaRepository<Sido, Long> {

    Optional<Sido> findByName(String name);

    Optional<Sido> findByCode(Integer code);
}
