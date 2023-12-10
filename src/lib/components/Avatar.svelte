<script lang="ts">
	import { createAvatar } from "@dicebear/core"
	import { identicon } from "@dicebear/collection"

	export let slug: string
	export let className: string | undefined = undefined

	const avatar = createAvatar(identicon, {
		seed: slug,
	})
</script>

<img src={avatar.toDataUriSync()} alt={`${slug}'s avatar`} class={className} />
