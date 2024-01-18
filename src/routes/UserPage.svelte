<script lang="ts">
	import { createForm } from "felte"
	import { entityInfo, unwrapResponse, updateProfile } from "../lib/api"
	import { userInfo, userInstanceData } from "../lib/auth/stores"
	import Avatar from "../lib/components/Avatar.svelte"
	import Button from "../lib/components/common/Button.svelte"
	import Input from "../lib/components/common/Input.svelte"
	import Textarea from "../lib/components/common/Textarea.svelte"
	import DatabaseCard from "../lib/components/database/DatabaseCard.svelte"
	import type { EntityProfile } from "../lib/api/types"

	export let entity: string

	let canEditProfile = $userInfo?.slug === entity
	let isSelf = $userInfo?.slug === entity
	let editingProfile = false

	let error: any

	const { form } = createForm({
		onSubmit: async (values) => {
			let links = [1, 2, 3, 4]
				.map((i) => {
					return values[`link${i}`].length === 0
						? undefined
						: {
								url: values[`link${i}`],
						  }
				})
				.filter((v) => v != null) as EntityProfile["links"]

			unwrapResponse(
				await updateProfile(
					entity,
					{
						display_name:
							values["display_name"].length > 0 ? values["display_name"] : null,
						description:
							values["description"].length > 0 ? values["description"] : null,
						organization:
							values["organization"].length > 0 ? values["organization"] : null,
						location: values["location"].length > 0 ? values["location"] : null,
						links: JSON.stringify(links),
					},
					$userInstanceData,
				),
			)
		},
		onSuccess: async () => {
			editingProfile = false
			canEditProfile = false
			window.location.reload()
		},
		onError: (err) => {
			error = err
			editingProfile = false
			console.error(err)
		},
	})

	const fetchEntity = async (entity: string) =>
		unwrapResponse(await entityInfo(entity, $userInstanceData))
	const isNotFound = (message: string) =>
		message.trim().toLowerCase().startsWith("entity not found")
</script>

{#await fetchEntity(entity)}
	<h1 class="text-2xl">Loading...</h1>
{:then entity}
	<div class="mb-6 flex w-full gap-9">
		<div class="flex w-4/12 flex-col gap-6">
			<Avatar
				className="w-full border-gray-300 dark:border-gray-700 dark:border-2 bg-white border rounded-full"
				slug={entity.slug}
			/>
			<div>
				{#if entity.profile?.display_name}
					<h1 class="text-2xl">{entity.profile.display_name}</h1>
				{/if}
				<h2 class="text-xl text-gray-700 dark:text-gray-300">{entity.slug}</h2>
			</div>
			{#if entity.profile?.description}
				<p>{entity.profile.description}</p>
			{/if}
			<div>
				{#if entity.profile?.location}
					<span class="block break-words text-sm tracking-tight"
						><i class="fa-solid fa-location-dot mr-1 w-4"></i>
						{entity.profile.location}</span
					>
				{/if}
				{#if entity.profile?.organization}
					<span class="block break-words text-sm tracking-tight"
						><i class="fa-solid fa-building mr-1 w-4"></i>
						{entity.profile.organization}</span
					>
				{/if}
				{#if entity.profile?.links.length > 0}
					<ul>
						{#each entity.profile.links as link}
							<li>
								<i class="fa-solid fa-link mr-1 w-4"></i>
								<a
									class="break-words text-sm tracking-tight text-white no-underline"
									href={link.url}>{link.url}</a
								>
								{#if link.verified}
									<i class="fa-solid fa-check ml-1 text-green-500"></i>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			{#if canEditProfile}
				{#if editingProfile}
					<form class="flex flex-col gap-2" use:form>
						<label for="profile-display-name">
							Display name
							<Input
								name="display_name"
								id="profile-display-name"
								value={entity.profile?.display_name}
							/>
						</label>
						<label for="profile-description">
							Description
							<Textarea
								name="description"
								id="profile-description"
								value={entity.profile?.description}
							/>
						</label>
						<label for="profile-location">
							Location
							<Input
								name="location"
								id="profile-location"
								value={entity.profile?.location}
							/>
						</label>
						<label for="profile-organization">
							Organization
							<Input
								name="organization"
								id="profile-organization"
								value={entity.profile?.organization}
							/>
						</label>
						<label for="profile-link1">
							Link #1
							<Input
								name="link1"
								id="profile-link1"
								type="url"
								value={entity.profile?.links[0]?.url}
							/>
						</label>
						<label for="profile-link2">
							Link #2
							<Input
								name="link2"
								id="profile-link2"
								type="url"
								value={entity.profile?.links[1]?.url}
							/>
						</label>
						<label for="profile-link3">
							Link #3
							<Input
								name="link3"
								id="profile-link3"
								type="url"
								value={entity.profile?.links[2]?.url}
							/>
						</label>
						<label for="profile-link4">
							Link #4
							<Input
								name="link4"
								id="profile-link4"
								type="url"
								value={entity.profile?.links[3]?.url}
							/>
						</label>
						<div class="flex justify-between">
							<Button
								alternate={true}
								preventDefault={true}
								on:click={() => (editingProfile = false)}>Cancel</Button
							>
							<Button type="submit">Update</Button>
						</div>
					</form>
				{:else}
					<Button preventDefault={true} on:click={() => (editingProfile = true)}
						>Update profile</Button
					>
				{/if}
			{/if}
		</div>
		<div class="flex w-full flex-col gap-6">
			{#if entity.databases.length === 0}
				{#if isSelf}
					<h1 class="text-2xl">You have not created any databases yet</h1>
				{:else}
					<h1 class="text-2xl">
						You do not have access to any databases owned by <code>{entity.slug}</code>
					</h1>
				{/if}
			{/if}
			{#each entity.databases as database (database.slug)}
				<DatabaseCard
					entity={entity.slug}
					slug={database.slug}
					type={database.database_type}
				/>
			{/each}
		</div>
	</div>
{:catch error}
	{#if isNotFound(error.message)}
		<h1 class="mb-5 text-5xl">404</h1>
		<h1 class="text-sm">
			The entity you are trying to see either does not exist or you are not authorized to view
			it.
		</h1>
	{/if}
{/await}
