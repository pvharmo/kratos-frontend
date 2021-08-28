<script>
	import * as api from '../auth'
	import { onMount } from 'svelte'
	import Link from '../components/Link.svelte'
	import Form from 'src/layout/Form.svelte'
	import { go } from 'src/router'

	let config

	onMount(async () => {
		try {
			config = await api.initializeLoginFlow()
		} catch (e) {
			console.error(e)
			window.location.replace('http://drive.local.io')
		}
	})

	const submitForm = async (event) => {
		event.preventDefault()
		const values = { traits: {} }
		for (let target of event.target) {
			if (['csrf_token', 'password', 'method', 'password_identifier'].includes(target.name)) {
				values[target.name] = target.value
			} else {
				const splitName = target.name.split('.')
				values.traits[splitName[splitName.length - 1]] = target.value
			}
		}
		const res = await api.submitLogin(config.ui.action, values)
		for (let target of event.target) {
			target.value = ''
		}
		window.location.replace('http://drive.local.io')
	}
</script>

<div>
	<Form title="Sign in" {config} on:submit={submitForm}>
		<div class="alternate-links">
			<div>
				<Link to="/register">Create an account</Link>
			</div>
			<div style="flex:1;" />
			<div>
				<Link to="/forgot-password">Forgot password</Link>
			</div>
		</div>
	</Form>
</div>

<style>
	.alternate-links {
		margin-top: 15px;
		font-size: 0.8em;
		display: flex;
	}
</style>
