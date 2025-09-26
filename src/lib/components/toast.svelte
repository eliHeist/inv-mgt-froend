<script lang="ts">
	import { toast } from "$lib/stores/toast"
	import { fly } from "svelte/transition"

	import * as Alert from "$lib/components/ui/alert/index.js"

	let currentToast: {
		title: string
		message: string
		type: string | undefined
	} | null = null

	$: toast.subscribe((value) => (currentToast = value))
</script>

{#if currentToast}
    <div transition:fly={{ y: 20, duration: 300 }}>
        <Alert.Root 
            variant={currentToast.type}>
            {#if currentToast.title}
                <Alert.Title>{currentToast.title}</Alert.Title>
            {/if}
            <Alert.Description>{currentToast.message}</Alert.Description>
        </Alert.Root>
    </div>
{/if}
