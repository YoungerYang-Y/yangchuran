import type Response from '@/util/axios/Response';
import Request from '@/util/axios/Request';

interface User {
  id: number
  name: string
}

const request = new Request({
  baseURL: '/userBusiness',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function loginApi(data: { password: string, username: string }): Promise<Response<User>> {
  return request.post({
    url: '/login1',
    data,
  });
}

export function getUserByUserName(data: { size: number, current: number }): Promise<Response<User>> {
  return request.post({
    url: '/sys_user/page',
    data,
  });
}
