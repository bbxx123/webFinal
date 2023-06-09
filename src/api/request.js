/*
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-21 09:42:29
 * @LastEditors: Chai chai 2787922490@qq.com
 * @LastEditTime: 2023-04-24 20:45:02
 * @FilePath: \webFinal\src\api\request.js
 * @Description: 
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
 */
import axios from "axios";

const server = axios.create({
    baseURL: "http://127.0.0.1:3000/chai",
    // baseURL: "http://192.168.2.35:3000/chai",
    responseType: "json",
    timeout: 60000
})
//请求拦截器
server.interceptors.response.use(resp => {
    return Promise.resolve(resp);
});
export default server;