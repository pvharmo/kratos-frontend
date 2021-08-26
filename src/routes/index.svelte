<script lang="ts">
  import { onMount } from 'svelte'
  import * as api from '../auth'

  onMount(async () => {
    try {
      await api.fetchUser()
    } catch {
      console.log('test')
    }
  })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
