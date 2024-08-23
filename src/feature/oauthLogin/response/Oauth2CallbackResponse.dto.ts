export class Oauth2CallbackResponseDto {
  access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
