<script lang="ts">
	import DatabasePagesHeader from "../lib/components/database/DatabasePagesHeader.svelte";

	export let entity: string
	export let slug: string
</script>

<div class="flex gap-6 md:w-8/12">
	<DatabasePagesHeader selected="overview" {slug} {entity}/>
	<div class="flex flex-col w-full">
		<h1 class="text-2xl">Congratulations, you've got your database set-up!</h1>
		<div class="flex gap-6">
			<div class="border border-gray-300 rounded p-6 mt-6 w-full">
				<h2 class="text-xl">Documentation</h2>
				<span class="text-gray-500 block mt-1">Check out the link below for more information about ayb</span>
				<a class="mt-1 block" href="https://git.sofiaritz.com/sofia/wip">ayb.host/docs</a>
			</div>
			<div class="border border-gray-300 rounded p-6 mt-6 w-full">
				<h2 class="text-xl">Getting help</h2>
				<span class="text-gray-500 block mt-1">Contact the instance owner for support</span>
				<a class="mt-1 block" href="https://git.sofiaritz.com/sofia/wip">ayb.host/support</a>
			</div>
		</div>
		<div class="flex gap-6">
			<div class="border border-gray-300 rounded p-6 mt-6 w-full">
				<h2 class="text-xl">Usage limits</h2>
				<span class="text-gray-500 block mt-1">You are not subject to usage limits right now</span>
				<a class="mt-1 block" href="https://git.sofiaritz.com/sofia/wip">ayb.host/limits</a>
			</div>
		</div>
	</div>
</div>
