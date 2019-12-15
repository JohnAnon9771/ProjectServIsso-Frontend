import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3333"
});
//interceptors -> intercepta uma requesiçaõ
//request -> requisição

/**
 Aqui foi utilizado o interceptors do Axios,
como o nome sugere eleintercepta uma requisição 
request antes dela efetivamente acontecer, nesse
instante é verificado se existe um token no localStorage, 
e existindo, ele adiciona o Header de Authorization na request.
Isso possibilitará o acesso a páginas que precisam de autenticação **/

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
