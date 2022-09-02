import { APIApplication } from "discord-api-types/v10";
import { ApplicationCommand } from "./applicationCommand";

export class Application {
	public id!: string;
	public name!: string;
	public description!: string;
	public botPublic!: boolean;
	public commands = new Map<string, ApplicationCommand>();

	public constructor (data: APIApplication) {
		this.#updateProps(data);
	}

	#updateProps (data: APIApplication) {
		if (data.id) {
			this.id = data.id;
		}

		if (data.name) {
			this.name = data.name;
		}

		if (data.description) {
			this.description = data.description;
		}

		if (data.bot_public) {
			this.botPublic = data.bot_public;
		}
	}
}

export type RestPostApplicationCommand = {
	name: string;
	description: string;
	options?: string;
	default_member_permissions?: string;
	dm_permission?: boolean;
	default_permission?: string;
	type?: string;
}