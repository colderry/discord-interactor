import { APIApplicationCommand, RESTGetAPIApplicationCommandResult } from "discord-api-types/v10";
import { Client } from "../client";

export class ApplicationCommand {
	public constructor (client: Client, data: RESTGetAPIApplicationCommandResult) {
		this.#updateProps(data);
	}

	#updateProps(data: RESTGetAPIApplicationCommandResult) {
		if (data.id) this.id = data.id;
		if (data.type) this.type = data.type;
		if (data.application_id) this.applicationId = data.application_id;
		if (data.guild_id) this.guild_id = data.guild_id;
		if (data.name) this.name = data.name;
		if (data.name_localizations) this.nameLocalizations = data.name_localizations;
		if (data.description) this.description = data.description;
		if (data.description_localizations) this.descriptionLocalizations = data.description_localizations;
		if (data.options) this.options = data.options;
		if (data.default_member_permissions) this.defaultMemberPermissions = data.default_member_permissions;
		if (data.dm_permission) this.dmPermission = data.dm_permission;
		if (data.default_permission) this.defaultPermission = data.default_permission;
		if (data.version) this.version = data.version;
	}
}

export interface ApplicationCommand {
	id: string;
	type: APIApplicationCommand["type"];
	applicationId: string;
	guild_id: string;
	name: string;
	nameLocalizations?: APIApplicationCommand["name_localizations"];
	description: string;
	descriptionLocalizations?: APIApplicationCommand["description_localizations"];
	options?: APIApplicationCommand["options"];
	defaultMemberPermissions: string;
	dmPermission?: boolean;
	defaultPermission?: boolean;
	version: string;	
}