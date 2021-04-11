import HttpService from "./HttpService";

export default class OrderService {

	static baseURL() {return HttpService.apiURL()+"/order"; }

	static create(image, text, options, address) {
		return new Promise((resolve, reject) => {
			HttpService.post(`${OrderService.baseURL()}/`, {
				image: image,
				text: text,
				options: options,
				address: address,
			}, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}

	static get(id) {
		return new Promise((resolve, reject) => {
			HttpService.get(`${OrderService.baseURL()}/${id}`
			, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}

	static getList() {
		return new Promise((resolve, reject) => {
			HttpService.get(`${OrderService.baseURL()}/`
			, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}
}
