# aybWeb

A web interface for [ayb](https://github.com/marcua/ayb).

The objective of this project is to create a simple-to-use web interface for ayb with maximum compatibility.

**Breaking changes _will_ happen until ayb reaches 1.0**

## instances

-   [aybWeb.sofiaritz.com](https://aybweb.sofiaritz.com)
    -   Updated manually every day
-   _Your instance_
    -   Do you host an aybWeb instance? Create a new issue or PR and I'll add it

## mirror

A mirror is available at my personal git server:
https://git.sofiaritz.com/sofia/aybWeb

## webFrontendDetails support

webFrontendDetails is how your aybWeb instance provides information about things like endpoints to your ayb server.

**Built-in webFrontendDetails support is not implemented yet**

### how to add webFrontendDetails?

webFrontendDetails doesn't need to live in the same place as aybWeb, right now we recommend creating a Gist-like JSON file or hosting the JSON file in your server using match
rules and things like that.

Another alternative when deploying instance-bound aybWeb instances is to create the webInfo file at `public/.well-known/ayb/webInfo.json`.

**webFrontendDetails example file**

```json
{
	"$schema": "https://raw.githubusercontent.com/marcua/ayb/main/docs/config/endpoints/schema.json",
	"base_url": "<LINK_TO_AYB_WEB_INSTANCE>",
	"endpoints": {
		"profile": "/u/{entity}",
		"confirmation": "/auth/confirm/{token}"
	}
}
```
