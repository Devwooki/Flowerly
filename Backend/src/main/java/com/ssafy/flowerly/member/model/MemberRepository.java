package com.ssafy.flowerly.member.model;

import com.ssafy.flowerly.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findBySocialId(String socialId);
    Optional<Member> findByMemberId(Long memberId);
    Optional<Member> findByMemberIdAndIsRemovedFalse(Long memberId);

}
