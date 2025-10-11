<script lang="ts">
	import { Button } from "$lib/components/ui/button/index"
	import { Label } from "$lib/components/ui/label/index"
	import { Input } from "$lib/components/ui/input/index"
	import * as Card from "$lib/components/ui/card/index"

	import { goto } from "$app/navigation"
	import { login } from "$lib/auth"

	let email = ""
	let password = ""
	let error = ""
	let loading = false

	async function handleLogin(event:Event) {
        event.preventDefault()
        
		error = ""
		loading = true

		try {
			const success = await login(email, password)

			if (success) {
				goto("/dashboard")
			} else {
				error = "Invalid email or password"
			}
		} catch (err) {
			error = "An error occurred during login"
		} finally {
			loading = false
		}
	}
</script>

<Card.Root class="w-full min-w-sm">
	<Card.Header>
		<Card.Title>Login to your account</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<form onsubmit={handleLogin}>
		<Card.Content>
			<div class="flex flex-col gap-6">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						required
						bind:value={email} />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a
							href="##"
							class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required bind:value={password} />
				</div>
				<div class="grid gap-2">
					{#if error}
						<p class="text-sm text-red-600">{error}</p>
					{/if}
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex-col gap-2 mt-4">
			<Button type="submit" class="w-full">Login</Button>
		</Card.Footer>
	</form>
</Card.Root>
