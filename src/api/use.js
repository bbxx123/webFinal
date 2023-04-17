/*
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-15 08:38:05
 * @LastEditors: Chai chai 2787922490@qq.com
 * @LastEditTime: 2023-04-16 17:57:22
 * @FilePath: \Vue-Second-dimensional-personal-blog\src\api\use.js
 * @Description: 
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
 */
import axios from "axios";
import serve from "./request"

export function Login() {
    return serve({
        url: '/search',
        method: 'get',
    })
}
export function searchAuther() {
    return serve({
        url: '/searchAuther',
        method: 'get',
    })
}
export function searchIntegral(data) {
    return serve({
        url: '/searchIntegral',
        method: 'post',
        data
    })
}
export function searchPaper(data) {
    return serve({
        url: '/searchPaper',
        method: 'post',
        data
    })
}

export function newPaper(data) {
    return serve({
        url: '/newPaper',
        method: 'post',
        data
    })
}
export function changeIntegral(data) {
    return serve({
        url: '/changeIntegral',
        method: 'post',
        data
    })
}
export function Regest(data) {
    return serve({
        url: '/add',
        method: 'post',
        data
    })
}

export function Homeliset() {
    return serve({
        url: '/searchhome',
        method: 'get',
    })
}

export function Add(data) {
    return serve({
        url: '/addhome',
        method: 'post',
        data
    })
}

export function Change(data) {
    return serve({
        url: '/changehome',
        method: 'post',
        data
    })
}

export function Del(data) {
    return serve({
        url: '/delhome',
        method: 'post',
        data
    })
}

export function changeBack(data) {
    return serve({
        url: '/changeback',
        method: 'post',
        data
    })
}

export function delBack(data) {
    return serve({
        url: '/delback',
        method: 'post',
        data
    })
}
