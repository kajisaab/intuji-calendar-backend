export interface UserEntityRequestDto {
  id: string;
  name: string;
  profileImageUrl: string;
  refreshToken: string | null | undefined;
}
