import { defineConfig } from "astro/config";
import glsl from "vite-plugin-glsl";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      glsl({
        watch: false,
      }),
    ],
    // server: {
    //   port: 3000,
    // },
  },
  integrations: [react()],
});
