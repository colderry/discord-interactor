export const DiscordInteractorErrorMessage: Record<string, string | Function> = {
	tokenInvalid: "An invalid token was provided.",
	tokenNotProvided: "You didn't provide a token to use.",
	utilizeToken: "You need to utilize a token first."
}

export class DiscordInteractorError extends Error {
	public constructor (message: string, ...args: any[]) {
		if (DiscordInteractorErrorMessage[message])
		{
			if (typeof DiscordInteractorErrorMessage[message] === "function")
			{
				super((DiscordInteractorErrorMessage[message] as Function)(...args))
			} else
			{
				super(DiscordInteractorErrorMessage[message] as string);
			}
		} else {
			super(message);
		}
	}
}