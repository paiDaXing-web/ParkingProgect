import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.serviceUrl = "http://139.9.155.149/"





Vue.prototype.token = ""


//时间戳转换
Vue.prototype.add0 = function (m) {

	return m < 10 ? '0' + m : m
};

Vue.prototype.getDatey = function (str) {

	var time = new Date(str);
	
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' ;
};

//消息时间戳转换
Vue.prototype.getDate = function (str) {
	
	if(str==0){
		return "";
	}

	var time = new Date(str);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
};

const app = new Vue({
    ...App
})
app.$mount()
