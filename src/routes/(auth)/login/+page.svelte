<script lang="ts">
	import { login } from "$lib/stores/auth"
	import { goto } from "$app/navigation"

	let email = ""
	let password = ""
	let error = ""

	async function submit(e: Event) {
		e.preventDefault()
		error = ""
		try {
			await login(email, password)
			goto("/app")
		} catch (err) {
			error = err instanceof Error ? err.message : "Login failed"
		}
	}
</script>

<form on:submit={submit} class="space-y-2">
	<input type="email" name="email" bind:value={email} placeholder="email" required class="border p-2" />
	<input
		type="password"
		name="password"
		bind:value={password}
		placeholder="Password"
		required
		class="border p-2" />
	<button type="submit" class="bg-blue-500 text-white px-4 py-2">Login</button>
	{#if error}
		<p class="text-red-600">{error}</p>
	{/if}
</form>
