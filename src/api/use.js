/*
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-15 08:38:05
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-18 16:56:29
 * @FilePath: \毕设\webFinal\src\api\use.js
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
export function searchSixPage() {
    return serve({
        url: '/searchSixPage',
        method: 'get',
    })
}
export function searchNinePage() {
    return serve({
        url: '/searchNinePage',
        method: 'get',
    })
}
export function searchOnePage() {
    return serve({
        url: '/searchOnePage',
        method: 'get',
    })
}
export function searchAuther() {
    return serve({
        url: '/searchAuther',
        method: 'get',
    })
}
export function deleteWatch() {
    return serve({
        url: '/deleteWatch',
        method: 'get',
    })
}
export function watchInfo() {
    return serve({
        url: '/watchInfo',
        method: 'get',
    })
}
export function watchR(data) {
    return serve({
        url: '/watch',
        method: 'post',
        data
    })
}
export function isWatch(data) {
    return serve({
        url: '/isWatch',
        method: 'post',
        data
    })
}

export function changeLikeStatus(data) {
    return serve({
        url: '/changeLikeStatus',
        method: 'post',
        data
    })
}
export function changeCaseStatus(data) {
    return serve({
        url: '/changeCaseStatus',
        method: 'post',
        data
    })
}
export function searchIntegral(data) {
    return serve({
        url: '/searchIntegral',
        method: 'post',
        data
    })
}
export function searchLikes(data) {
    return serve({
        url: '/searchLikes',
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
export function changeLikes(data) {
    return serve({
        url: '/changeLikes',
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
