export interface JwtConfigurationInterface {
  secret: string;
  audience: string;
  issuer: string;
  expiresIn: number;
}

export interface JwtTokenUserDetail {
  aud?: string;
  userId: string;
  fullName: string;
  refreshToken: string;
}
