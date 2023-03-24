import { baseUrl } from './api';
import { setCookie } from './cookies';

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const saveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const refreshTokenRequest = () => {
  return fetch(baseUrl + `/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse)
}

export const requestWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    console.log(err)
    if (err.message === 'jwt expired') {
      const { refreshToken, accessToken } = await refreshTokenRequest();
      saveTokens(refreshToken, accessToken);
      options.headers.Authorization = accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
