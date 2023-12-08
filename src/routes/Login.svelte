<script lang="ts">
	import { createForm } from "felte"
	import { Button, Input } from "../lib/components/common"
	import { login } from "../lib/api"
	import { unwrapResponse } from "../lib/api"
	import { Link } from "svelte-routing"

	enum State {
		Waiting,
		EmailSent,
		Error,
	}

	let state = State.Waiting
	let error: any

	const { form } = createForm({
		onSubmit: async (values) => {
			return unwrapResponse(
				await login(values.username, {
					endpoint: values["instance"],
					entity: values["username"],
				}),
			)
		},
		onSuccess: () => {
			state = State.EmailSent
		},
		onError: (err) => {
			error = err
			state = State.Error
			console.error(err)
		},
	})
</script>

<div class="md:w-8/12">
	{#if state === State.EmailSent}
		<h1 class="text-2xl font-bold text-gray-900">Check your mailbox</h1>
		<div>
			<p>We have sent you an e-mail with the confirmation link.</p>
			<p>
				You may received a CLI command instead, if that's the case follow this link: <Link
					to="/auth/confirm">/auth/confirm</Link
				>
			</p>
		</div>
	{:else if state === State.Error}
		<h1 class="text-2xl text-red">Error</h1>
		<span>{error.toString()}</span>
	{:else if state === State.Waiting}
		<h1 class="mb-6 text-2xl font-bold text-gray-900">Login</h1>
		<form class="flex flex-col gap-3.5" use:form>
			<label class="block" for="instance-input">
				Instance
				<Input
					type="url"
					name="instance"
					id="instance-input"
					placeholder="https://ayb.sofiaritz.com"
				/>
				<span class="text-sm text-gray-700"
					>You can find an updated instance list at <a
						href="https://git.sofiaritz.com/sofia/wip">ayb.host/instances</a
					></span
				>
			</label>
			<label class="block" for="username-input">
				Username
				<Input name="username" id="username-input" placeholder="alice" />
			</label>
			<Button type="submit">Send login link</Button>
		</form>
	{/if}
</div>
