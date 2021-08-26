<script lang="typescript">
	// import Layout from './layout/Layout.svelte'
	import { location } from './router'
	import Login from './routes/login.svelte'
	import Register from './routes/register.svelte'
	import Home from './routes/index.svelte'

	$: route = $location
</script>

<head>
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
</head>

<div class="App">
	{#if route.pathname === '/login'}
		<Login />
	{:else if route.pathname === '/register'}
		<Register />
	{:else}
		<Home />
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
	}

	.App {
		height: 100vh;
	}
</style>
