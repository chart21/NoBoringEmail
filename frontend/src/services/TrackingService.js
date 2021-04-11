import HttpService from "./HttpService";

export default class TrackingService {

	static baseURL() {return HttpService.apiURL()+"/tracking"; }

	static get(id) {
		return new Promise((resolve, reject) => {
			HttpService.get(`${TrackingService.baseURL()}/${id}`
			, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}

	static getByOrder(oid) {
		return new Promise((resolve, reject) => {
			HttpService.get(`${TrackingService.baseURL()}/?order=${oid}`
			, function(data) {
				resolve(data);
			}, function(textStatus) {
				reject(textStatus);
			});
		});
	}
}
