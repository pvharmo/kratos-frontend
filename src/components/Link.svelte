<script lang="typescript">
	export let to: string
	export let style = ''
	export let className = ''
	import { go } from '../router'
</script>

<span {style} class={className} role="link" on:click={() => go(to)}>
	<slot />
</span>

<style>
	span:hover {
		color: rgb(70, 70, 70);
	}

	span {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
