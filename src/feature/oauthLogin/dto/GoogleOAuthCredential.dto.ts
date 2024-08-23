export interface GoogleOAuthCredentialDto {
  access_token?: string | null | undefined;
  refresh_token?: string | null | undefined;
  scope?: string | undefined;
  token_type?: string | null | undefined;
  id_token?: string | null | undefined;
  expiry_date?: number | null | undefined;
}
