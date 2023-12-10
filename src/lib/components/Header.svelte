<script lang="ts">
	import { loggedIn, userInfo } from "../auth/stores"
	import { Link } from "svelte-routing"
</script>

<header class="flex items-center justify-between bg-gray-100 p-4 dark:bg-gray-950 dark:text-white">
	<h1 class="text-xl">
		<Link
			class="text-black no-underline hover:text-black dark:text-white dark:hover:text-white"
			to="/">aybWeb</Link
		>
	</h1>
	{#if $loggedIn}
		<span>Logged in as <code><Link to="/u/{$userInfo.slug}">{$userInfo.slug}</Link></code></span
		>
	{:else}
		<Link
			class="rounded bg-blue-600 px-3 py-1.5 text-white no-underline hover:bg-blue-700 hover:text-white"
			to="/auth/login">Login</Link
		>
	{/if}
</header>
