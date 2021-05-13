import axios from "axios";

export const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export const fakeapi = axios.create({
  baseURL: "http://localhost:5000",
});

export const api = axios.create({
    baseURL:'http://localhost:3333'
})


