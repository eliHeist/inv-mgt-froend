<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index"
    import { AspectRatio } from "$lib/components/ui/aspect-ratio/index";

    import { authStore } from "$lib/stores/auth"

    let user:App.User|null = $derived($authStore.user)

	let { children } = $props()

	let open: boolean = $state(true)
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
                        <div class="bg-primary rounded-sm text-primary-foreground grid place-content-center size-8  ">
                            {user?.company.name.charAt(0)}
                        </div>
                        <span class="flex-1 font-semibold">{user?.company.name}</span>
                    </div>
                </Sidebar.Header>
                <Sidebar.Content>
                    <Sidebar.Group>
                        <Sidebar.GroupContent>
                            <Sidebar.Menu>
                            <!-- {#each items as item (item.title)}
                                <Sidebar.MenuItem>
                                    <Sidebar.MenuButton>
                                        {#snippet child({ props })}
                                        <a href={item.url} {...props}>
                                            <span>{item.title}</span>
                                        </a>
                                        {/snippet}
                                    </Sidebar.MenuButton>
                                </Sidebar.MenuItem>
                            {/each} -->
                            </Sidebar.Menu>
                        </Sidebar.GroupContent>
                    </Sidebar.Group>
                </Sidebar.Content>
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
