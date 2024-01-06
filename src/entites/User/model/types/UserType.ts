export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export interface RefreshToken {
  expireAt: string;
  phoneNumber: string;
  tokenString: string;
}

export interface UserLoginData {
  accessToken: string;
  accessTokenExpireAt: string;
  refreshToken: RefreshToken;
}

export interface UserAuthData {
  userAuthData: UserLoginData | undefined;
}

export interface UserModalState {
  isOpen: boolean;
}
export interface Currency {
  id: number;
  symbol: string;
  name: string;
}

export interface AboutMeResponse {
  isOk: boolean;
  message: "Пользователь найден";
  result: UserData;
}
export interface UserData {
  id: number;
  name: string;
  surname: string;
  gender: number;
  dateOfBirth: string;
  countryID: number;
  languageID: number;
  email: string;
  emaiIsVerified: boolean;
  phoneNumbers: PhoneNumber[];
}
interface PhoneNumber {
  id: number;
  phoneNumber: string;
  isMain: boolean;
}
export interface UserState {
  userAuthData: UserLoginData | undefined;
  userAuthModal: UserModalState;
  isLoggin: boolean;
  userData: UserData | undefined;
  userCurrency: Currency;
  isLoaded: boolean;
}

export interface UserErrorResponse {
  isOk: boolean;
  message: string;
  result: null;
}

export interface ResetPasswordRequest {
  token: string;
  resetPassword: {
    newPassword: string;
    confirmNewPassword: string;
  };
}

export interface VerifyEmail {
  isOk: boolean;
  message: string;
  result: string;
}
