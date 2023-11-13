package com.ssafy.flowerly.chatting.repository;

import com.ssafy.flowerly.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
