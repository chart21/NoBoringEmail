import HttpService from "./HttpService";

export default class UserService {

	static baseURL() {return HttpService.apiURL()+"/image"; }

	static upload(image) {
		var formdata = new FormData();
		formdata.append('image', image);

		return new Promise((resolve, reject) => {
			HttpService.postFiles(`${this.baseURL()}/`, formdata,
			function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}

	static getList() {
		return new Promise((resolve, reject) => {
			HttpService.get(`${this.baseURL()}/`
			, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}

	static getListByLocation(location) {
		return new Promise((resolve, reject) => {
			HttpService.get(`${this.baseURL()}/?location=${location}`
				, function(data) {
					resolve(data);
				}, function(textStatus) {
					reject(textStatus);
				});
		});
	}

	static getListByLngLat(lng, lat) {
		return new Promise((resolve, reject) => {
			HttpService.get(`${this.baseURL()}/?lng=${lng}&lat=${lat}`
				, function(data) {
					resolve(data);
				}, function(textStatus) {
					reject(textStatus);
				});
		});
	}
}
