export interface loginFindUserDbQueryResonseDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  userName: string;
  userType: string;
  password: string;
  loginAttemps: string | number;
  maxLoginAttempts: string | number;
}
