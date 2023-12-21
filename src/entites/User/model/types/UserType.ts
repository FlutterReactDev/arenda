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

export interface UserState {
  userAuthData: UserLoginData | undefined;
  userAuthModal: UserModalState;
  isLoggin: boolean;
}
