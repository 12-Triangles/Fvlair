// @ts-nocheck
import { mdsvex } from 'mdsvex'
import firebase from 'svelte-adapter-firebase'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess(), mdsvex(mdsvexConfig)],
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  outDir: 'public/',
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true,
    }),
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
