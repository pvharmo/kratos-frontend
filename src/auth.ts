import { writable } from 'svelte/store'

export const user = writable({})

export const apiBasePath = 'http://local.io/.ory/kratos/public'

export const fetchUser = async () => {
	const res = await fetch(apiBasePath + '/sessions/whoami')
	const data = await res.json()
	if (data.error?.code === 401) {
		throw 'User is not logged in'
	}
	user.set(data)
}

export const initializeRegistration = async () => {
	const res = await fetch(apiBasePath + '/self-service/registration/browser', {
		headers: {
			Accept: 'application/json'
		}
	})
	return await res.json()
}

export const submitRegistration = async (actionUrl: string, values: any) => {
	const res = await fetch(actionUrl, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			credentials: 'include'
		},
		body: JSON.stringify(values)
	})
	return await res.json()
}

export const initializeLoginFlow = async () => {
	const res = await fetch(apiBasePath + '/self-service/login/browser', {
		headers: {
			Accept: 'application/json'
		}
	})
	return await res.json()
}

export const logout = async () => {
	const res = await fetch(apiBasePath + '/self-service/logout/browser', {
		headers: {
			Accept: 'application/json'
		}
	})
	const logoutUrl = (await res.json()).logout_url
	await fetch(logoutUrl, {
		headers: {
			Accept: 'application/json'
		}
	})
}

export const submitLogin = async (actionUrl: string, values: any) => {
	const res = await fetch(actionUrl, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			credentials: 'include'
		},
		body: JSON.stringify(values)
	})
	return await res.json()
}

export interface FormElements {
	id: string
	type: string
	expires_at: string
	issued_at: string
	request_url: string
	ui: {
		action: string
		method: string
		nodes: {
			type: string
			group: string
			attributes: {
				name: string
				type: string
				value: any
				disabled: boolean
				required?: boolean
			}
			messages: string[]
			meta: {
				label: {
					id: number
					text: string
					type: string
					context: any
				}
			}
		}[]
	}
}
