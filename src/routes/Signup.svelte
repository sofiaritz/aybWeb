<script lang="ts">
	import { createForm } from "felte"
	import { Button, Input } from "../lib/components/common"
	import { register } from "../lib/api"
	import { unwrapResponse } from "../lib/api"
	import { Link } from "svelte-routing"
	import { AYB_HOST, AYB_HOST_TOS } from "../lib/consts"

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
				await register(values.username, values.email, {
					endpoint: AYB_HOST ?? values["instance"],
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
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Check your mailbox</h1>
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
		<h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Signup</h1>
		<form class="flex flex-col gap-3.5" use:form>
			{#if AYB_HOST == null}
				<label class="block" for="instance-input">
					Instance
					<Input
						type="url"
						name="instance"
						id="instance-input"
						placeholder="https://aybServer.sofiaritz.com"
					/>
					<span class="text-sm text-gray-700 dark:text-gray-400"
						>You can find an updated instance list at <a
							href="https://git.sofiaritz.com/sofia/wip">ayb.host/instances</a
						></span
					>
				</label>
			{/if}
			<label class="block" for="username-input">
				Username
				<Input name="username" id="username-input" placeholder="alice" />
			</label>
			<label class="block" for="email-input">
				E-mail
				<Input name="email" id="email-input" placeholder="alice@mail.host" />
			</label>
			{#if AYB_HOST_TOS != null}
				<p>
					By signing up you accept the Terms of Service available at: <a
						href={AYB_HOST_TOS}>{AYB_HOST_TOS}</a
					>
				</p>
			{/if}
			<Button type="submit">Send login link</Button>
			<Link to="/auth/login">Login instead?</Link>
		</form>
	{/if}
</div>
