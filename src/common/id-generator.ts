import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

export default function generateId(version?: string): string {
  if (version == null || version === '1') {
    return uuidv1();
  }
  return uuidv4();
}

export enum IdType {
  UUIDV1,
  UUIDV4
}
