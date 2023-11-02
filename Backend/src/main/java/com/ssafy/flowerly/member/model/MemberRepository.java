package com.ssafy.flowerly.member.model;

import com.ssafy.flowerly.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findBySocialId(String socialId);
    Optional<Member> findByMemberId(Long memberId);

    @Query(
            "SELECT m FROM Member m " +
                    "Where m.memberId = :memberId " +
                    " and m.role != 'DELETE' "
    )
    Optional<Member> findByMemberIdActivate(@Param("memberId") Long memberID);

}
