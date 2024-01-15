<script lang="ts">
	import Header from "./lib/components/Header.svelte"
	import { Router, Route, Link } from "svelte-routing"
	import { loggedIn } from "./lib/auth/stores"
	import Redirect from "./lib/components/Redirect.svelte"
	import Login from "./routes/Login.svelte"
	import Confirm from "./routes/Confirm.svelte"
	import Home from "./routes/Home.svelte"
	import DatabaseOverview from "./routes/DatabaseOverview.svelte"
	import DatabaseQuery from "./routes/DatabaseQuery.svelte"
	import UserPage from "./routes/UserPage.svelte"
	import NewDatabase from "./routes/NewDatabase.svelte"
	import {
		AYB_HOST,
		AYB_HOST_DOCS,
		AYB_WEB_VERSION,
		AYB_DISABLE_SUPPORT,
		AYB_WEB_NOTICES,
	} from "./lib/consts"
	import Support from "./routes/docs/Support.svelte"
	import Signup from "./routes/Signup.svelte"
	import { retrieveNotices } from "./lib/api"

	let notices =
		AYB_WEB_NOTICES == null
			? new Promise((resolve) => resolve([]))
			: retrieveNotices(AYB_WEB_NOTICES)
</script>

<Router>
	<Header />
	<div class="mt-8 flex min-h-[90vh] flex-col items-center justify-between">
		<main class="flex w-[95vw] flex-col items-center md:w-[65vw]">
			{#if !AYB_DISABLE_SUPPORT}
				<Route path="/docs/support"><Support /></Route>
			{/if}
			{#if $loggedIn}
				<Route path="/">
					<div class="w-full pb-2">
						{#await notices then notices}
							{#each notices as notice}
								<div class="aybWeb_notices w-full bg-yellow-500 p-2 text-black">
									{@html notice.content}
								</div>
							{/each}
						{/await}
					</div>
					<Home />
				</Route>
				<Route path="/database/new"><NewDatabase /></Route>
				<Route path="/u/:entity/:slug/overview" let:params>
					<DatabaseOverview entity={params.entity} slug={params.slug} />
				</Route>
				<Route path="/u/:entity/:slug/query" let:params>
					<DatabaseQuery entity={params.entity} slug={params.slug} />
				</Route>
				<Route path="/u/:entity" let:params>
					<UserPage entity={params.entity} />
				</Route>
				<Route path="/auth/login"><Redirect to="/" /></Route>
				<Route path="/auth/confirm"><Redirect to="/" /></Route>
				<Route path="/auth/confirm/:token">
					<Redirect to="/" />
				</Route>
			{:else}
				<Route path="/"><Redirect to="/auth/login" /></Route>
				<Route path="/auth/login"><Login /></Route>
				<Route path="/auth/signup"><Signup /></Route>
				<Route path="/auth/confirm"><Confirm token={undefined} /></Route>
				<Route path="/auth/confirm/:token" let:params>
					<Confirm token={params.token} />
				</Route>
			{/if}
			<Route>
				<h1 class="mb-3 text-5xl">Page not found</h1>
				<span class="text-xl">Go back to <Link to="/">home</Link></span>
			</Route>
		</main>
		<footer
			class="mt-6 flex w-[100vw] justify-between gap-6 bg-gray-100 p-2.5 dark:bg-gray-950"
		>
			<div>
				Powered by <a href="https://github.com/marcua/ayb">ayb</a> and
				<a href="https://github.com/sofiaritz/aybWeb">aybWeb</a>
				{#if AYB_HOST != null}
					· Connected to
					{#if AYB_HOST_DOCS != null}
						<a href={AYB_HOST_DOCS}>{new URL(AYB_HOST).hostname}</a>
					{:else}
						{new URL(AYB_HOST).hostname}
					{/if}
				{/if}
				· aybWeb {AYB_WEB_VERSION}
			</div>
			<div>
				{#if !AYB_DISABLE_SUPPORT}
					<Link to="/docs/support">Support</Link> ·
				{/if}
				<a href="/assets/vendor.LICENSE.txt">Licenses</a>
			</div>
		</footer>
	</div>
</Router>

<style>
	.aybWeb_notices :global(a) {
		@apply text-blue-800;
	}
</style>
