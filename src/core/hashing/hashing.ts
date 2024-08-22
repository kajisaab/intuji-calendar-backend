import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

function deriveSalt(userIdentifier: string, userName: string): string {
  const hmac = crypto.createHmac('sha512', userIdentifier);

  const data = hmac.update(userName);

  return data.digest('hex');
}

export async function hashPassword(
  password: string,
  userIdentifier: string,
  userName: string
): Promise<string> {
  const salt = deriveSalt(userIdentifier, userName);
  const saltedPassword = password + salt;
  return await bcrypt.hash(saltedPassword, 12);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
  userIdentifier: string,
  userName: string
): Promise<boolean> {
  const salt = deriveSalt(userIdentifier, userName);
  const saltedPassword = password + salt;
  try {
    return await bcrypt.compare(saltedPassword, hashedPassword);
  } catch (e) {
    return false;
  }
}
