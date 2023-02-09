package com.jejuinn.backend.db.enums;

/**
 * SocialLogin 엔티티의 int type
 * 사용법
 * 1. int index -> String str 변환
 * String str = SocialType.values()[index]
 *   - index = 0 -> KAKAO
 *   - index = 1 -> NAVER
 *
 * 2. String str -> int index 변환
 * int index = SocialType.valueOf(str).ordinal()
 * or
 * int index = SocialType.KAKAO.orinal()
 *           = SocialType.valueOf("KAKAO").ordinal()
 *   - str = KAKAO -> 0
 *   - str = NAVER -> 1
 */
public enum SocialType {
    KAKAO, NAVER, GOOGLE, APPLE
}
