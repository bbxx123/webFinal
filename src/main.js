/*
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-26 08:29:56
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-18 11:14:19
 * @FilePath: \毕设\webFinal\src\main.js
 * @Description: 
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'amfe-flexible'
import ElementUI from 'element-ui';
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-tiptap/lib/index.css';
import animated from 'animate.css'
import dayjs from 'dayjs'

// Vue.use(animated)
Vue.use(ElementUI);
Vue.prototype.$dayjs = dayjs;

Vue.use(ElementTiptapPlugin, {
  /* 插件配置项 */
  lang: 'zh',
});
// 防止el-button重复点击
Vue.directive('preventReClick', {
	inserted(el, binding) {
   	  el.addEventListener('click', () => {
     	if (!el.disabled) {
      	 el.disabled = true;
      	 el.style.cursur='not-allowed'
       setTimeout(() => {
        	 el.disabled = false
        	 el.style.cursor ='pointer'
       	}, binding.value || 2000)
     	}

   	})
	 }
});

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
