import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const rawBackendHost = env.VITE_BACKEND_HOST?.trim() ?? "";

  let proxyTarget: string | undefined;
  let proxyBasePath = "";
  if (rawBackendHost) {
    try {
      const url = new URL(rawBackendHost);
      proxyTarget = url.origin;
      proxyBasePath = url.pathname.replace(/\/+$/, "");
    } catch {
      proxyTarget = undefined;
    }
  }

  const proxyEntries = proxyTarget
    ? proxyBasePath
      ? {
          [proxyBasePath]: {
            target: proxyTarget,
            changeOrigin: true,
            secure: false,
          },
        }
      : {
          "/loginSubmit": {
            target: proxyTarget,
            changeOrigin: true,
            secure: false,
          },
          "/cate": {
            target: proxyTarget,
            changeOrigin: true,
            secure: false,
          },
        }
    : undefined;

  return {
    plugins: [svelte()],
    base: "./", // Use relative paths for assets
    server: proxyEntries
      ? {
          proxy: proxyEntries,
        }
      : undefined,
  };
});
