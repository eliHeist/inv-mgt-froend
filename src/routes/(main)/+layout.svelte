<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index"
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index"
	import * as Avatar from "$lib/components/ui/avatar/index"
	
    import { LogOut } from "@lucide/svelte";

	import { authStore } from "$lib/stores/auth"
	import { goto } from "$app/navigation"
	import { logout } from "$lib/auth"

	let user: App.User | null = $derived($authStore.user)

	let { children } = $props()

	let open: boolean = $state(true)

    async function handleLogout() {
		await logout()
		goto("/login")
	}
</script>

<svelte:head>
	<title>Tereka Online | User</title>
</svelte:head>

<div class="h-screen w-screen bg-background text-foreground">
	<div>
		<Sidebar.Provider {open}>
			<Sidebar.Root collapsible="offcanvas">
				<Sidebar.Header>
					<div class="flex gap-2 items-center">
						<div
							class="bg-primary rounded-sm text-primary-foreground grid place-content-center size-8">
							{user?.company.name.charAt(0)}
						</div>
						<span class="flex-1 font-semibold">{user?.company.name}</span>
					</div>
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<a href="/branches">
											<span>Branches</span>
										</a>
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
				<Sidebar.Footer>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton
											{...props}
											class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
											<Avatar.Root>
												<Avatar.Image
													src="https://dakdot.com/"
													alt={user?.name} />
												<Avatar.Fallback>{user?.profile?.first_name.charAt(0)}</Avatar.Fallback>
											</Avatar.Root>
											<span>{user?.email}</span>
										</Sidebar.MenuButton>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content
									side="top"
									class="w-(--bits-dropdown-menu-anchor-width)">
                                    <div class="grid justify-center p-4">
                                        <h3 class="font-semibold">{user?.profile?.first_name}</h3>
                                    </div>
									<DropdownMenu.Item onclick={handleLogout}>
                                        
										<span>Sign out</span>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Footer>
			</Sidebar.Root>
			<Sidebar.Inset class="h-screen">
				<header class="flex h-12 items-center justify-between px-4">
					<Sidebar.Trigger />
				</header>
				<section class="px-4 pb-4">
					{@render children?.()}
				</section>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</div>
</div>
