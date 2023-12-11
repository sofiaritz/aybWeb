import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import license from "rollup-plugin-license"
import * as Path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	build: {
		rollupOptions: {
			plugins: [
				license({
					thirdParty: {
						output: Path.resolve(__dirname, "./dist/assets/vendor.LICENSE.txt"),
					},
				}),
			],
		},
	},
	esbuild: {
		banner: "/*! licenses: /assets/vendor.LICENSE.txt */",
		legalComments: "none",
	},
})
