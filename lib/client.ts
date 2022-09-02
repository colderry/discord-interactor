import EventEmitter from "events";
import TypedEmitter from "typed-emitter";

import { Application } from "./struct/application";
import { RequestHandler } from "./request";

import {
    APIApplicationCommand,
	RESTPostAPIApplicationCommandsJSONBody, 
	Routes
} from "discord-api-types/v10";
import { ApplicationCommand } from "./struct/applicationCommand";
import { DiscordInteractorError } from "./error";

export class Client extends (EventEmitter as new () => TypedEmitter<ClientEvents>) {
	public application!: Application;
	public token!: string;
	public request: RequestHandler;

	public constructor () {
		super();

		Object.defineProperty(this, "token", {
			value: null,
			enumerable: false,
			writable: true
		});

		this.request = new RequestHandler(this);
	}

	public createCommand(id: string, token: string, options: RESTPostAPIApplicationCommandsJSONBody): Promise<ApplicationCommand>;
	public createCommand(options: RESTPostAPIApplicationCommandsJSONBody): Promise<ApplicationCommand>;
	public createCommand(): Promise<ApplicationCommand> {
		if (arguments.length >= 2) {
			return this.request.method("POST")
			.withData(arguments[2])
			.withToken(arguments[1])
			.to(Routes.applicationCommands(arguments[0]))
			.request().then(res => {
				return new ApplicationCommand(this, res.data);
			});
		} else {
			if (!this.token || !this.application) {
				throw new DiscordInteractorError("utilizeToken");
			}

			return this.request.method("POST")
			.withData(arguments[0])
			.withToken(this.token)
			.to(Routes.applicationCommands(this.application.id))
			.request().then(res => {
				return new ApplicationCommand(this, res.data);
			});
		}
	}

	public getCommands(with_localizations?: boolean): Promise<ApplicationCommand[]>;
	public getCommands(id: string, token: string, with_localizations?: boolean): Promise<ApplicationCommand[]>;
	public getCommands(): Promise<ApplicationCommand[]> {
		if (arguments.length >= 2) {
			return this.request.method("GET")
			.withToken(arguments[1])
			.withQueries({
				with_localizations: Boolean(arguments[2])
			})
			.to(Routes.applicationCommands(arguments[0]))
			.request().then(res => {
				const commands = res.data.map((cmd: APIApplicationCommand) => {
					return new ApplicationCommand(this, cmd);
				});

				return commands;
			});
		} else {
			if (!this.token || !this.application) {
				throw new DiscordInteractorError("utilizeToken");
			}

			return this.request.method("GET")
			.withToken(this.token)
			.withQueries({
				with_localizations: Boolean(arguments[0])
			})
			.to(Routes.applicationCommands(this.application.id))
			.request().then(res => {
				const commands = res.data.map((cmd: APIApplicationCommand) => {
					return new ApplicationCommand(this, cmd);
				});

				return commands;
			});
		}
	};

	/**
	 * Utilize a token. Note: This will override the previous one if utilized before.
	 * @param {string | "use client"} token - The token to utilize.
	 * @param {Function} callback - The function to call when the token utilized.
	 */
	public utilizeToken (
		token: string, 
		callback: (error: Error | null, bot?: Application) => void
	): void {
		this.request.method("GET")
		.withToken(token)
		.to(`/oauth2/applications/@me`)
		.request()
		.then(async res => {
			this.application = new Application(res.data);
			this.token = token;

			this.emit("tokenUtilized", this.application);
			callback(null, this.application);
		});
	}
}

export type ClientEvents = {
	tokenUtilized: (application: Application) => void;
}

export interface ClientOptions {
	api?: ClientOptionsApi;
	token?: string;
}

export interface ClientOptionsApi {
	url?: string;
	version?: string;
}

export interface GetClientCommandOptions {
	name: string;
	with_localizations?: boolean;
}