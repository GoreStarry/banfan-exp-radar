/* eslint-disable import/no-anonymous-default-export */
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import del from "rollup-plugin-delete";

const packageJson = require("./package.json");

export default {
  input: "src/lib.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    del({ targets: ["dist/*"] }),
    postcss({
      modules: true,
      extract: false,
    }),
    image(),
    json(),
    terser(),
  ],
};
