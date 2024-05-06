/**
 *  Cookie Handler to
 * @static SetCookie
 * @static getCookie
 * @static deleteCookie
 * @class CookieHandler
 *
 *
 *
 * @param {string} name - The key in which represent the name of cookie string
 * @param {string}  value - The cookie value
 * @param {object} options: cookie options @type CookieSerializeOptions
 */

class CookieHandler {
	// Set a Cookie
	static setCookie(
		name: string,
		value: string,
		options?: CookieSerializeOptions
	) {
		const {
			days = 7,
			domain = '',
			path = '/',
			priority,
			sameSite,
			secure,
			maxAge,
		} = options || {};
		const expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + days);

		const cookiesAttribute = [
			days ? `Expires=${expireDate.toUTCString()}` : '',
			priority ? `Priority=${priority}` : '',
			sameSite ? `SameSite=${sameSite}` : '',
			secure ? `Secure` : '',
			maxAge ? `Max-Age=${maxAge}` : '',
		]
			.filter((attr) => attr !== '')
			.join('; ');

		const cookieValue =
			encodeURIComponent(value) +
			`${cookiesAttribute ? `; ${cookiesAttribute}` : ''}`;
		document.cookie = `${name}=${cookieValue}; path=${path}${
			domain ? `; domain=${domain}` : ''
		}`;
	}

	// Get a Cookie
	static getCookie(
		name: string,
		options?: CookieSerializeOptions
	): string | undefined {
		const cookies = document.cookie.split('; ').map((cookie) => cookie.trim());

		let decodedValue;

		for (const cookie of cookies) {
			const [cookieName, cookieValue] = cookie.split('=');

			if (cookieName.trim() === name) {
				// Check if cookie matches provided options
				if (options) {
					decodedValue = decodeURIComponent(cookieValue);
					const cookieParts = cookie.split(';').map((part) => part.trim());
					// Check domain
					if (
						options.domain &&
						cookieParts.includes(`domain=${options.domain}`)
					) {
						return decodedValue;
					}
					// Check path
					if (options.path && cookieParts.includes(`path=${options.path}`)) {
						return decodedValue;
					}
					// Check sameSite
					if (options.sameSite) {
						const sameSiteAttribute = cookieParts.find((part) =>
							part.startsWith('SameSite')
						);
						if (
							sameSiteAttribute &&
							sameSiteAttribute.includes(options.sameSite)
						) {
							return decodedValue;
						}
					}
				} else {
					decodedValue = decodeURIComponent(cookieValue);
					return decodedValue;
				}
			}
		}

		return decodedValue;
	}

	// Delete a Cookie
	static deleteCookie(name: string, options?: CookieSerializeOptions) {
		const {domain = '', path = '/', sameSite} = options || {};

		document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}${
			domain ? `; domain=${domain}` : ''
		}; maxAge=${-1}${sameSite ? `; sameSite=${sameSite}` : ''}`;
	}
}

type CookieSerializeOptions = {
	domain?: string | undefined;
	encode?(value: string): string;
	days?: number;
	path?: string | undefined;
	priority?: 'Low' | 'Medium' | 'High' | undefined;
	sameSite?: 'Strict' | 'Lax' | 'None' | undefined;
	secure?: boolean | undefined;
	maxAge?: number;
};

export default CookieHandler;
