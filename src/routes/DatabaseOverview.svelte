<script lang="ts">
	import DatabasePagesHeader from "../lib/components/database/DatabasePagesHeader.svelte"
	import { Link } from "svelte-routing"

	export let entity: string
	export let slug: string
</script>

<div class="flex gap-6 md:w-8/12">
	<DatabasePagesHeader selected="overview" {slug} {entity} />
	<div class="flex w-full flex-col">
		<h1 class="text-2xl">Congratulations, you've got your database set-up!</h1>
		<div class="flex gap-6">
			<div class="mt-6 w-full rounded border border-gray-300 p-6 dark:border-gray-800">
				<h2 class="text-xl">Documentation</h2>
				<span class="mt-1 block text-gray-500 dark:text-gray-400"
					>Check out the link below for more information about ayb</span
				>
				<a class="mt-1 block" href="https://git.sofiaritz.com/sofia/wip">ayb.host/docs</a>
			</div>
			<div class="mt-6 w-full rounded border border-gray-300 p-6 dark:border-gray-800">
				<h2 class="text-xl">Getting help</h2>
				<span class="mt-1 block text-gray-500 dark:text-gray-400"
					>Contact the instance owner for support</span
				>
				<Link class="mt-1 block" to="/docs/support">aybWeb/support</Link>
			</div>
		</div>
		<div class="flex gap-6">
			<div class="mt-6 w-full rounded border border-gray-300 p-6 dark:border-gray-800">
				<h2 class="text-xl">Usage limits</h2>
				<span class="mt-1 block text-gray-500 dark:text-gray-400"
					>You are not subject to usage limits right now</span
				>
				<a class="mt-1 block" href="https://git.sofiaritz.com/sofia/wip">ayb.host/limits</a>
			</div>
		</div>
	</div>
</div>
