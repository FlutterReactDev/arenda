export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export interface RefreshToken {
  expireAt: Date;
  phoneNumber: string;
  tokenString: string;
}

export interface UserLoginData {
  accessToken: string;
  accessTokenExpireAt: Date;
  refreshToken: RefreshToken;
}
