<script lang="ts">
	import Input from "../lib/components/common/Input.svelte"
	import Button from "../lib/components/common/Button.svelte"
	import { createForm } from "felte"
	import { confirm, entityInfo, isError, unwrapResponse } from "../lib/api"
	import { credentials, loggedIn } from "../lib/auth/stores"
	import { navigate } from "svelte-routing"
	import { AYB_HOST } from "../lib/consts"

	export let token: string | undefined

	let error
	const { form } = createForm({
		onSubmit: async (values) => {
			let response = unwrapResponse(
				await confirm(values.token, {
					endpoint: AYB_HOST ?? values["instance"],
				}),
			)

			return [values, response]
		},
		onSuccess: async (value: any) => {
			let [values, data] = value
			let response = await entityInfo(values["username"], {
				endpoint: AYB_HOST ?? values["instance"],
				entity: values["username"],
				token: data["token"],
			})

			if (isError(response)) {
				error = response
				console.error(error)
				return
			}

			let url = new URL(AYB_HOST ?? values["instance"])
			url.username = values["username"]
			url.password = data["token"]

			credentials.set(url.toString())
			navigate("/")
		},
		onError: (err) => {
			error = err
			console.error(err)
		},
	})
</script>

<div class="md:w-8/12">
	<h1 class="text-2xl">Confirmation</h1>
	<p class="text-xl text-gray-900">We are almost there...</p>
	<form class="mt-5 flex flex-col gap-3.5" use:form>
		{#if AYB_HOST == null}
			<label class="block" for="instance-input">
				Instance
				<Input
					type="url"
					name="instance"
					id="instance-input"
					placeholder="https://aybServer.sofiaritz.com"
				/>
			</label>
		{/if}
		<label class="block" for="username-input">
			Username
			<Input name="username" id="username-input" placeholder="alice" />
		</label>
		<label class="block" for="token-input">
			Token
			<Input
				type="url"
				name="token"
				id="token-input"
				bind:value={token}
				placeholder="gAAAAA(...)"
				disabled={token != null && token.length > 0}
			/>
		</label>
		<Button type="submit">Confirm</Button>
	</form>
</div>
