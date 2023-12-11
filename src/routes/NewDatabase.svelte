<script lang="ts">
	import Input from "../lib/components/common/Input.svelte"
	import Button from "../lib/components/common/Button.svelte"
	import { createForm } from "felte"
	import { createDatabase, isError, unwrapResponse } from "../lib/api"
	import { DBType } from "../lib/api/types"
	import { userInfo, userInstanceData } from "../lib/auth/stores"
	import { navigate } from "svelte-routing"

	let error: any = undefined
	const { form } = createForm({
		onSubmit: async (values) => {
			return unwrapResponse(
				await createDatabase(
					$userInfo?.slug,
					values["slug"],
					DBType.SQLite,
					$userInstanceData!,
				),
			)
		},
		onSuccess: (data: any) => {
			navigate(`/u/${data["entity"]}/${data["database"]}/overview`)
		},
		onError: (err) => {
			error = err
			console.error(err)
		},
	})
</script>

<div class="md:w-8/12">
	{#if error != null}
		<h1 class="text-2xl text-red">Error</h1>
		<span>{error.toString()}</span>
	{:else}
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create a new database</h1>

		<form class="mt-5 flex flex-col gap-6" use:form>
			<label class="block" for="database-name">
				Name
				<Input name="slug" id="database-name" placeholder="awesome-project" />
			</label>

			<Button>Create database</Button>
		</form>
	{/if}
</div>
