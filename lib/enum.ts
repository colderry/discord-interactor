export enum ApplicationCommandOptionType {
	SUB_COMMAND =1,
	SUB_COMMAND_GROUP =2,
	STRING =3,
	INTEGER =4,
	BOOLEAN =5,
	USER =6,
	CHANNEL =7,
	ROLE =8,
	MENTIONABLE =9,
	NUMBER =10,
	ATTACHMEN = 11,

	SubCommand = 1,
	SubCommandGroup = 2,
	String = 3,
	Integer = 4,
	Boolean = 5,
	User = 6,
	Channel = 7,
	Role = 8,
	Mentionable = 9,
	Number = 10,
	Attachment = 11
}

export enum ApplicationCommandType {
	CHAT_INPUT = 1,
	USER = 2,
	MESSAGE = 3,

	ChatInput = 1,
	User = 2,
	Message = 3
}

export enum InteractionCallbackType {
	PONG =  1,
	CHANNEL_MESSAGE_WITH_SOURC = 4,
	DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
	DEFERRED_UPDATE_MESSAGE = 6,
	UPDATE_MESSAGE = 7,
	APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
	MODAL = 9,

	Pong = 1,
	ChannelMessageWithSource = 4,
	DeferredChannelMessageWithSource = 5,
	DeferredUpdateMessage = 6,
	UpdateMessage = 7,
	ApplicationCommandAutoCompleteResult = 8,
	Modal = 9
}

export enum InteractionType {
	PING = 1,
	APPLICATION_COMMAND = 2,
	MESSAGE_COMPONENT = 3,
	APPLICATION_COMMAND_AUTOCOMPLETE = 4,
	MODAL_SUBMIT = 5,

	Ping = 1,
	ApplicationCommand = 2,
	MessageComponent = 3,
	ApplicationCommandAutoComplete = 4,
	ModalSubmit = 5
}