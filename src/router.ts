import { readable, writable } from 'svelte/store'

export const location = writable(window.location, function start(set) {
  window.addEventListener('popstate', () => {
    set(document.location)
  })
})

export const go = (route: string) => {
  window.history.pushState({ page: 2 }, route, route)
  location.set(document.location)
}
