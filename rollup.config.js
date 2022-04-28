import resolve from "@rollup/plugin-node-resolve";
import typescript from 'rollup-plugin-typescript2';
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json"
import alias from '@rollup/plugin-alias';
import sourcemaps from 'rollup-plugin-sourcemaps';
// import dev from 'rollup-plugin-dev'
const path =require("path")
// import livereload from "rollup-plugin-livereload";
export default {
  input: "./node-core/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    entryFileNames: "[name].js",
    sourcemap: "true",
  },
  plugins: [
    typescript({sourcemap: true}), 
    resolve(), 
    // sourcemaps(),
    alias({
      entries: [ 
        { find: '@', replacement: path.resolve(__dirname,'./node-core')}
      ]
    }),
    commonjs(),
    json()
  ],
};
