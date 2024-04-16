import api from "./api"


// 로그인 ?username=${username}&password=${password}
export const login = (userData) => api.post(`/api/v1/auth/signIn`, userData);


// 회원 가입
export const join = (data) => api.post(`/api/v1/auth/signUp`, data)

// 사용자 정보
export const info = () => api.get(`/users/info`)