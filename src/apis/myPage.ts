import axios from "axios";
import { HOST_URL, MYPAGE } from "./urls";

// 공통 API 응답 타입
export interface Result<T> {
    status: string;
    data: T;
    message: string;
    reason: string;
    authToken?: string;
    refreshToken?: string;
}

// 이메일 인증 코드 전송
export const sendEmailVerification = async (params: { email: string }): Promise<Result<string> | any> => {
    try {
        return await axios.post(HOST_URL + MYPAGE.EMAIL_VERFY_SEND, params);
    } catch (e: any) {
        return e.message;
    }
};

// 이메일 인증 코드 검증
export const verifyEmailVerification = async (params: {
    email: string;
    code: string;
}): Promise<Result<string> | any> => {
    try {
        return await axios.post(HOST_URL + MYPAGE.EMAIL_VERFI, params);
    } catch (e: any) {
        return e.message;
    }
};

// 헬로 페이지(테스트용)
export const getHello = async (): Promise<any> => {
    try {
        return await axios.get(HOST_URL + MYPAGE.GET_HELLO);
    } catch (e: any) {
        return e.message;
    }
};

// 마이페이지 정보 조회
export const getMyPage = async (memberId: string): Promise<Result<any> | any> => {
    try {
        return await axios.get(HOST_URL + MYPAGE.GET_MYPAGE + memberId);
    } catch (e: any) {
        return e.message;
    }
};

// 이메일 인증 상태 조회
export const getEmailVerificationStatus = async (memberId: string): Promise<Result<any> | any> => {
    try {
        return await axios.get(HOST_URL + MYPAGE.GET_EMAIL_VERFI_STATUS + memberId);
    } catch (e: any) {
        return e.message;
    }
};
