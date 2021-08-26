<script>
	import * as api from '../auth'
	import { onMount } from 'svelte'
	import Link from '../components/Link.svelte'
	import FormContainer from 'src/layout/FormContainer.svelte'

	let config

	onMount(async () => {
		try {
			config = await api.initializeLoginFlow()
			console.log(config)
		} catch (e) {
			console.error(e)
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
		const res = await api.submitLogin(config.id, values)
		for (let target of event.target) {
			target.value = ''
		}
		await api.fetchUser()
	}
</script>

<div>
	<FormContainer>
		{#if config}
			<form on:submit={submitForm}>
				{#each config.ui.nodes as { attributes }}
					<div>
						<input
							type={attributes.type}
							name={attributes.name}
							value={attributes.value || ''}
							required={attributes.required}
							disabled={attributes.disabled}
						/>
					</div>
				{/each}
			</form>
		{/if}
		<div>
			<Link to="/register">Create an account</Link>
		</div>
		<div>
			<Link to="/forgot-password">Forgot password</Link>
		</div>
	</FormContainer>
</div>
