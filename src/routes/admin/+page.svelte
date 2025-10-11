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
	<h1>Admin Panel</h1>

	{#if user}
		<p>Welcome to the admin panel, {user.first_name}!</p>
		<p>This page is only accessible to company administrators.</p>
		<button on:click={handleLogout}>Logout</button>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
