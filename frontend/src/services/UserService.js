import HttpService from "./HttpService";

export default class UserService {

	static baseURL() {return HttpService.apiURL()+"/auth"; }

	static register(mail, pass, name) {
		return new Promise((resolve, reject) => {
			HttpService.post(`${UserService.baseURL()}/register`, {
				mail: mail,
				password: pass,
				name: name
			}, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}

	static login(mail, pass) {
		return new Promise((resolve, reject) => {
			HttpService.post(`${UserService.baseURL()}/login`, {
				mail: mail,
				password: pass
			}, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}

	static logout(){
		window.localStorage.removeItem('jwtToken');
	}

	static getCurrentUser() {
		let token = window.localStorage['jwtToken'];
		if (!token) return {};

		let base64Url = token.split('.')[1];
		let base64 = base64Url.replace('-', '+').replace('_', '/');
		return {
			id : JSON.parse(window.atob(base64)).id,
			mail: JSON.parse(window.atob(base64)).mail
		};
	}

	static isAuthenticated() {
		return !!window.localStorage['jwtToken'];
	}

	static getAccount() {
		return new Promise((resolve, reject) => {
			HttpService.get(`${UserService.baseURL()}/account`
			, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}
}
