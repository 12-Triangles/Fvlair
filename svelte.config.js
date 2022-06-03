import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import firebase from 'svelte-adapter-firebase'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],
  outDir: 'build/',
  kit: {
    adapter: firebase({
      esbuildBuildOptions(defaultOptions) {
        return {
          ...defaultOptions,
          target: 'esm',
        }
      },
      firebaseJsonPath: 'firebase.json',
    }),
  },
}

export default config
