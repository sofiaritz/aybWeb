<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let alternate = false
	export let preventDefault = false
	export let type: string = ""

	let dispatch = createEventDispatcher()
</script>

<button
	class:bg-gray-700={alternate}
	class:bg-blue-700={!alternate}
	class:hover:bg-gray-800={alternate}
	class:hover:bg-blue-800={!alternate}
	class="rounded-lg px-5 py-3 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
	on:click={(e) => {
		if (preventDefault) {
			e.preventDefault()
		}
		dispatch("click", e.target.value)
	}}
	{type}><slot /></button
>
