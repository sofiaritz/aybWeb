<script lang="ts">
	export let type: string = ""
</script>

<button
	class="rounded-lg bg-blue-700 px-5 py-3 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
	{type}><slot /></button
>
