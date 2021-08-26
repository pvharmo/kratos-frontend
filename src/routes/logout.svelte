<script lang="ts">
	import { onMount } from 'svelte'
	import * as api from '../auth'

	onMount(() => {
		api.logout()
	})
</script>
