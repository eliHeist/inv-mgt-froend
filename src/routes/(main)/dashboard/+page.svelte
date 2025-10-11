<script lang="ts">
	import { authStore } from "$lib/stores/auth"
	import { logout } from "$lib/auth"
	import { goto } from "$app/navigation"

	$: user = $authStore.user

	async function handleLogout() {
		await logout()
		goto("/login")
	}
</script>

<div>
	<h1>Dashboard</h1>

	{#if user}
		<p>Welcome, {user.profile.first_name}!</p>
		<p>Email: {user.email}</p>
		<button on:click={handleLogout}>Logout</button>
	{:else}
		<p>Loading user information...</p>
	{/if}
</div>
