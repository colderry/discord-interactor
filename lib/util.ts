import nacl from "tweetnacl";

export function verifyKey(publicKey: string, options: VerifyKeyOptions) {
		if (typeof options.body === "string") {
			options.body = options.body;
		} else if (typeof options.body === "object") {
			options.body = JSON.stringify(options.body).split("").join("");
		} else {
			throw new Error("Body should be either 'string' or 'object'");
		}

		return nacl.sign.detached.verify(
			Buffer.from(options.timestamp + options.body),
			Buffer.from(options.signature, "hex"),
			Buffer.from(publicKey, "hex")
		);
}

export interface VerifyKeyOptions {
	body: any;
	timestamp: string;
	signature: string;
}