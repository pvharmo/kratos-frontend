<script lang="ts">
	import * as api from '../auth'
	import { onMount } from 'svelte'
	import FormContainer from 'src/layout/FormContainer.svelte'
	import Link from '../components/Link.svelte'

	let config: api.FormElements

	onMount(async () => {
		try {
			config = await api.initializeRegistration()
			console.log(config)
		} catch (e) {
			console.error(e)
		}
	})

	const submitForm = async (event: Event) => {
		event.preventDefault()
		const values: any = { traits: {} }
		if (event.target) {
			for (let target of event.target as any) {
				if (['csrf_token', 'password', 'method'].includes(target.name)) {
					values[target.name] = target.value
				} else {
					const splitName = target.name.split('.')
					values.traits[splitName[splitName.length - 1]] = target.value
				}
			}
			const res = await api.submitRegistration(config.ui.action, values)
			for (let target of event.target as any) {
				target.value = ''
			}
			console.log(res)
		}
	}
</script>

<div>
	<FormContainer>
		{#if config}
			<form on:submit={submitForm}>
				{#each config.ui.nodes as { attributes }}
					<input
						type={attributes.type}
						name={attributes.name}
						value={attributes.value || ''}
						required={attributes.required}
						disabled={attributes.disabled}
					/>
				{/each}
			</form>
		{/if}
		<div>
			already have an account? <Link to="/login">signin</Link>
		</div>
	</FormContainer>
</div>
