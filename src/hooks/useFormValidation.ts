import { useState } from 'react';

type ValidationRules = {
  email?: (value: string) => string;
  password?: (value: string) => string;
  confirmPassword?: (value: string) => string;
  nickname?: (value: string) => string;
  birth?: (value: string) => string;
  phone?: (value: string) => string;
  name?: (value: string) => string;
  phoneNumber?: (value: string) => string;
  verificationCode?: (value: string) => string;
  newPassword?: (value: string) => string;
  confirmNewPassword?: (value: string) => string;
};

type FormData = {
  [key: string]: string;
};

export const useFormValidation = (
  initialState: FormData,
  ValidationType: 'login' | 'signup' | 'findId' | 'findPassword' = 'login',
) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormData>({});

  // 이메일, 비밀번호 유효성 검사 - 로그인
  const validateLoginForm: ValidationRules = {
    email: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return '이메일을 입력해주세요.';
      if (!emailRegex.test(value))
        return '올바른 이메일 형식으로 입력해주세요.';
      return '';
    },
    password: (value: string) => {
      if (!value) return '비밀번호를 입력해주세요.';
      if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
      return '';
    },
  };

  // 이메일, 비밀번호, 비밀번호 확인, 닉네임, 생년월일, 전화번호, 이름, 전화번호 유효성 검사 - 회원가입
  const validateSignupForm: ValidationRules = {
    // 로그인 유효성 검사 규칙 사용
    ...validateLoginForm,
    // 이메일 인증 코드
    verificationCode: (value: string) => {
      if (!value) return '인증 코드를 입력해주세요.';
      if (value.length !== 6) return '6자리 인증 코드를 입력해주세요.';
      return '';
    },
    // 비밀번호 확인
    confirmPassword: (value: string) => {
      if (!value) return '비밀번호를 입력해주세요.';
      if (value !== formData.password) return '비밀번호가 일치하지 않습니다.';
      return '';
    },
    //이름
    name: (value: string) => {
      if (!value) return '이름을 입력해주세요.';
      return '';
    },
    // 닉네임
    nickname: (value: string) => {
      if (!value) return '닉네임을 입력해주세요.';
      if (value.length < 2) return '닉네임은 최소 2자 이상이어야 합니다.';
      return '';
    },
    // 생년월일
    birth: (value: string) => {
      if (!value) return '생년월일을 입력해주세요.';
      return '';
    },
    // 전화번호
    phone: (value: string) => {
      if (!value) return '전화번호를 입력해주세요.';
      return '';
    },
  };

  // 아이디 찾기 - 이메일, 휴대폰
  const validateFindIdForm: ValidationRules = {
    email: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return '이메일을 입력해주세요.';
      if (!emailRegex.test(value))
        return '올바른 이메일 형식으로 입력해주세요.';
      return '';
    },
    phone: (value: string) => {
      const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      if (!value) return '휴대폰 번호를 입력해주세요.';
      if (!phoneRegex.test(value))
        return '올바른 휴대폰 번호 형식으로 입력해주세요.';
      return '';
    },
  };

  // 비밀번호 찾기 - 이메일, 인증코드, 새 비밀번호, 비밀번호 확인
  const validateFindPasswordForm: ValidationRules = {
    email: validateLoginForm.email,
    verificationCode: (value: string) => {
      if (!value) return '인증 코드를 입력해주세요.';
      if (value.length !== 6) return '6자리 인증 코드를 입력해주세요.';
      return '';
    },
    newPassword: (value: string) => {
      if (!value) return '새 비밀번호를 입력해주세요.';
      if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(value))
        return '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.';
      return '';
    },
    confirmNewPassword: (value: string) => {
      if (!value) return '비밀번호 확인을 입력해주세요.';
      if (value !== formData.newPassword)
        return '비밀번호가 일치하지 않습니다.';
      return '';
    },
  };

  // 유효성 검사 함수
  const validateForm = (field: string, value: string) => {
    let rules;
    switch (ValidationType) {
      case 'login':
        rules = validateLoginForm;
        break;
      case 'signup':
        rules = validateSignupForm;
        break;
      case 'findId':
        rules = validateFindIdForm;
        break;
      case 'findPassword':
        rules = validateFindPasswordForm;
        break;
      default:
        rules = validateLoginForm;
    }

    const validateField = rules[field as keyof ValidationRules];
    const error = validateField ? validateField(value) : '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  // 폼 검증
  const validateAllFields = () => {
    let isValid = true;
    let rules;

    switch (ValidationType) {
      case 'login':
        rules = validateLoginForm;
        break;
      case 'signup':
        rules = validateSignupForm;
        break;
      case 'findId':
        rules = validateFindIdForm;
        break;
      case 'findPassword':
        rules = validateFindPasswordForm;
        break;
      default:
        rules = validateLoginForm;
    }

    // 필요한 필드만 검증
    Object.keys(formData).forEach((key) => {
      const validate = rules[key as keyof ValidationRules];
      if (validate) {
        const value = formData[key];
        const error = validate(value);
        if (error) {
          isValid = false;
          setErrors((prev) => ({ ...prev, [key]: error }));
        }
      }
    });

    return isValid;
  };

  // 휴대폰 번호 자동 포맷팅
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11,
    )}`;
  };

  // 입력값 변경 처리
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // 전화번호 필드인 경우 자동 포맷팅 적용
    if (name === 'phone' || name === 'phoneNumber') {
      const formattedValue = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      validateForm(name, formattedValue);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateForm(name, value);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    validateAllFields,
    setFormData,
  };
};
