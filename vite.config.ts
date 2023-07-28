import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { cwd } from "process";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, cwd());
  const { VITE_HOST } = env;
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [ElementPlusResolver()],
        dts: "src/auto-import.d.ts", // 路径下自动生成文件夹存放全局指令
        eslintrc: { enabled: true },
      }),
      Components({ resolvers: [ElementPlusResolver()] }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    server: {
      open: true,
      port: 5188,
      proxy: {
        "/bdsaas": VITE_HOST,
        "/associate-web": {
          target: "https://demo.bdsaas.cn",
          changeOrigin: true,
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify({
        name: "badu-app",
        version: "1.0.0",
      }),
      "process.env": process.env,
    },
  };
});
