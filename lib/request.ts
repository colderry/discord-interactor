import axios, { AxiosError, AxiosResponse } from "axios";
import { Client } from "./client";
import { Endpoints, UserAgent } from "./constant";
import { DiscordInteractorError } from "./error";

export class RequestHandler {
	public client!: Client;
	public nextRequest!: NextRequest;
	public options!: RequestHandlerOptions;

	public constructor (client: Client, options?: Partial<RequestHandlerOptions>) {
		Object.defineProperty(this, "client", {
			value: client,
			enumerable: false,
			writable: true
		});

		this.options = Object.assign({
			baseUrl: Endpoints.base,
			userAgent: UserAgent
		}, options);

		this.nextRequest = {} as any;
	}

	public request (): Promise<AxiosResponse> {
		return new Promise((resolve, reject) => {
			const headers: Record<string, any> = {
				"Authorization": `Bot ${this.nextRequest.token ?? this.client.token}`,
				...this.nextRequest.headers
			}

			if (!headers["Content-Type"]) {
				headers["Content-Type"] = "application/json";
			}

			if (!headers["User-Agent"]) {
				headers["User-Agent"] = this.options.userAgent;
			}

			return axios(this.nextRequest.url, {
				data: this.nextRequest.data ?? undefined,
				method: this.nextRequest.method,
				headers
			}).then(response => {
				this.refresh();
				return resolve(response);
			}).catch(error => {
				if (!(error instanceof AxiosError)) {
					return reject(error);
				}

				if (error.response?.status === 401) {
					return reject(new DiscordInteractorError("tokenInvalid"));
				}

				if (error.response?.status === 429) {
					return reject(new DiscordInteractorError(error.response.data.message));
				}
			});
		});
	}

	/**
	 * The method to use in the next request.
	 * @param {RequestMethod} method - The request method to use.
	 * @param {RequestHandler} Request
	 */
	public method(method: RequestMethod): RequestHandler {
		this.nextRequest.method = method;
		return this;
	}

	/**
	 * Refreshes the `nextRequest` object
	 * @returns {RequestHandler} Request
	 */
	public refresh(): RequestHandler {
		this.nextRequest = {} as any;
		return this;
	}

	/**
	 * @param {string} endpoint - The endpoint to request
	 * @returns {RequestHandler} Request
	 */
	public to(endpoint: string): RequestHandler;
	/**
	 * @param {string} baseUrl - The base url to request
	 * @param {string} endpoint - The endpoint of the base url to request
	 * @returns {RequestHandler} Request
	 */
	public to(baseUrl: string, endpoint: string): RequestHandler;
	public to (): this {
		const url: string = arguments[1] ? arguments[0] : this.options.baseUrl;
		const endpoint: string = arguments[1] ? arguments[1] : arguments[0];

		this.nextRequest.url = url + endpoint;
		return this;
	}

	/**
	 * The data/body to send in next request.
	 * @param {NextRequest["data"]} data - The data to set.
	 * @returns {RequestHandler} Request
	 */
	public withData(data: NextRequest["data"]): RequestHandler {
		this.nextRequest.data = data;
		return this;
	}

	/**
	 * The headers to use in next request.
	 * @param {NextRequest["headers"]} headers - The headers to set.
	 * @returns {RequestHandler} Request
	 */
	public withHeaders(headers: NextRequest["headers"]): RequestHandler {
		this.nextRequest.headers = headers;
		return this;
	}

	/**
	 * The auth token to use in next request.
	 * @param {string} token - The token to set.
	 * @param {RequestHandler} Request
	 */
	public withToken(token: string): RequestHandler {
		this.nextRequest.token = token;
		return this;
	}

	/**
	 * The queries to use in next request url.
	 * @param {QueryRecord} queries - The queries to set in url.
	 * @returns {RequestHandler} Request
	 */
	public withQueries(queries: QueryRecord): RequestHandler {
		let query = "?";

		Object.keys(queries).forEach(key => {
			if (query === "?") {
				query += `${key}=${queries[key]}`;
			} else {
				query += `&${key}=${queries[key]}`
			}
		});

		this.nextRequest.url = encodeURI(this.nextRequest.url + query);
		return this;
	}
}

export interface RequestHandlerOptions {
	baseUrl: string;
	userAgent: string;
}

export interface NextRequest {
	data: Record<string, any>;
	headers: Record<string, any>;
	method: RequestMethod;
	token: string;
	url: string;
}

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type QueryRecord = Record<string, any>;