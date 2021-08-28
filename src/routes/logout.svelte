<script lang="ts">
	import { go } from 'src/router'

	import { onMount } from 'svelte'
	import * as api from '../auth'

	onMount(async () => {
		await api.logout()
		go('/login')
	})
</script>
