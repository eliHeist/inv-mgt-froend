<script lang="ts">
    import { logout } from "$lib/auth"
	import { goto } from "$app/navigation"

    import { Button } from "$lib/components/ui/button/index"

    async function handleLogout() {
		await logout()
		goto("/login")
	}
</script>

<Button onclick={handleLogout}>
    Logout
</Button>

