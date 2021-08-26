/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  root: './src',
  alias: {
    public: './public',
    src: './src'
  },
  plugins: ['@snowpack/plugin-typescript', '@snowpack/plugin-svelte', '@snowpack/plugin-dotenv'],
  routes: [
    /* Example: Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' }
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: 'none',
    openUrl: '/ui',
    port: 8000
  },
  buildOptions: {
    /* ... */
  }
}
