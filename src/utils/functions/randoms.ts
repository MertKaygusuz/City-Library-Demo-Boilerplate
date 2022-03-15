import { v4 as uuidv4 } from 'uuid';

export function generateUid(): string {
  return uuidv4();
}

export const randomString = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);
  return head + tail;
};
