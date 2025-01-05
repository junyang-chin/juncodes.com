import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://astro-nano-demo.vercel.app",
  integrations: [mdx(), sitemap(), tailwind()],
  vite: {
    plugins: [gitTagPlugin()],
  },
});

import { defineConfig } from "astro/config";
import { execSync } from "child_process";

function gitTagPlugin() {
  return {
    name: "vite-plugin-git-tag",
    config: () => {
      let version = "unknown";
      try {
        // Get the most recent tag
        version = execSync("git describe --tags --abbrev=0").toString().trim();
      } catch (error) {
        console.warn("Unable to get git tag:", error);
      }

      return {
        define: {
          "import.meta.env.GIT_TAG": JSON.stringify(version),
        },
      };
    },
  };
}
