/*
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-21 09:42:29
 * @LastEditors: Chai chai 2787922490@qq.com
 * @LastEditTime: 2023-04-12 22:41:11
 * @FilePath: \Vue-Second-dimensional-personal-blog\src\api\request.js
 * @Description: 
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
 */
import axios from "axios";

const server = axios.create({
    baseURL: "http://127.0.0.1:3000/chai",
    responseType: "json",
    timeout: 60000
})
//请求拦截器
server.interceptors.response.use(resp => {
    return Promise.resolve(resp);
});
export default server;