/**
 * // NOTE
 * {configureFakeBackend}
 * this is our fake server, so we can start production before backend is ready
 * 
 * AVAILABLE APIS:
	* {BASE}/sportsbooks GET
 */

import { sportsBooksData } from './mock-data/sportsbooks';

export function configureFakeBackend() {
	let realFetch = window.fetch;
	window.fetch = function (url, opts) {
		return new Promise((resolve, reject) => {
			// wrap in timeout to simulate server api call
			setTimeout(() => {
				console.log('calling url', url, opts.method);
				if (url.includes('allSportsBooks') && opts.method === 'GET') {

					const r = { response: sportsBooksData, success: true };
					return resolve({ json: () => Promise.resolve(r) });
				}
				// pass through any requests not handled above
				realFetch(url, opts).then((response) => resolve(response));
			}, 500);
		});
	};
}
