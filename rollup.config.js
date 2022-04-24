import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json"
import alias from '@rollup/plugin-alias';
// import dev from 'rollup-plugin-dev'
const path =require("path")
// import livereload from "rollup-plugin-livereload";
export default {
  input: "./node-core/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    entryFileNames: "[name].js",
  },
  plugins: [
    resolve(),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname,'./node-core')}
      ]
    }),
    commonjs(),
    typescript(),
    json()
  ],
};
