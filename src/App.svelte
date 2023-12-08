<script lang="ts">
	import Header from "./lib/components/Header.svelte"
	import { Router, Route } from "svelte-routing"
	import { loggedIn } from "./lib/auth/stores"
	import Redirect from "./lib/components/Redirect.svelte"
	import Login from "./routes/Login.svelte"
	import Confirm from "./routes/Confirm.svelte"
	import Home from "./routes/Home.svelte";
	import DatabaseOverview from "./routes/DatabaseOverview.svelte";
	import DatabaseQuery from "./routes/DatabaseQuery.svelte";
</script>

<Router>
	<Header />
	<div class="mt-8 flex min-h-full flex-col items-center">
		<main class="flex w-[95vw] flex-col items-center md:w-[60vw]">
			{#if $loggedIn}
				<Route path="/"><Home/></Route>
				<Route path="/database/:entity/:slug/overview" let:params>
					<DatabaseOverview entity={params.entity} slug={params.slug} />
				</Route>
				<Route path="/database/:entity/:slug/query" let:params>
					<DatabaseQuery entity={params.entity} slug={params.slug} />
				</Route>
				<Route path="/auth/login"><Redirect to="/"/></Route>
				<Route path="/auth/confirm"><Redirect to="/"/></Route>
				<Route path="/auth/confirm/:token">
					<Redirect to="/"/>
				</Route>
			{:else}
				<Route path="/"><Redirect to="/auth/login" /></Route>
				<Route path="/auth/login"><Login /></Route>
				<Route path="/auth/confirm"><Confirm token={undefined} /></Route>
				<Route path="/auth/confirm/:token" let:params>
					<Confirm token={params.token} />
				</Route>
			{/if}
		</main>
	</div>
</Router>
