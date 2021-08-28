<script lang="ts">
	import { Card } from 'minmat'
	import { H5 } from 'minmat'
	import type { FormElements } from '../auth'

	export let config: FormElements
	export let title = ''
</script>

<div class="main-container">
	<Card>
		<div class="form-container">
			<H5 style="margin: 10px auto">{title}</H5>
			{#if config}
				<form on:submit>
					{#each config.ui.nodes as { attributes, meta }}
						<div class="input-container">
							{#if attributes.type === 'submit'}
								<button
									name={attributes.name}
									type={attributes.type}
									value={attributes.value || ''}
									required={attributes.required}
									disabled={attributes.disabled}
								>
									{meta.label.text}
								</button>
							{:else}
								<input
									type={attributes.type}
									name={attributes.name}
									value={attributes.value || ''}
									required={attributes.required}
									disabled={attributes.disabled}
								/>
							{/if}
						</div>
					{/each}
				</form>
			{/if}
			<slot />
		</div>
	</Card>
</div>

<style>
	.form-container {
		display: flex;
		flex-direction: column;
		margin: 10px;
	}

	.main-container {
		margin: 100px auto;
		max-width: 400px;
	}

	input {
		width: 100%;
	}

	input[type='submit'] {
		width: max-content;
	}

	.input-container {
		padding: 5px;
	}
</style>
