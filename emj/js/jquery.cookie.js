var cookieMy = new Object();
//遍历数组方法
cookieMy.arrsearch = function(value, arr) {

		for(var i = 0; i < arr.length; i++) {
			if(value == arr[i]) {
				return true;
			}
		}
		return false;

	}
	//添加cookie
cookieMy.addCookie = function(key, value, day) {

	var date = new Date();
	date.setDate(date.getDate() + day);
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;

}

//获取cookie
cookieMy.getCookie = function(key) {

	var str = decodeURI(document.cookie);
	var arr = str.split('; ');
	for(var i = 0; i < arr.length; i++) {
		var arr1 = arr[i].split('=');
		if(key == arr1[0]) {
			return arr1[1];
		}
	}

}

//删除cookie
cookieMy.delCookie = function(key, value) {

	addCookie(key, value, -1)

}

//遍历数组1
cookieMy.arrsearchXia = function(value, arr) {

	for(var i = 0; i < arr.length; i++) {
		if(value == arr[i]) {
			return i; //位置后一位
		}
	}
	return false;

}