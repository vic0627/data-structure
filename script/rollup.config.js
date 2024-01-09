const { defineConfig } = require("rollup");
const getPath = require("./utils/getPath.js");
const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");

/**
 * @type {import('@rollup/plugin-node-resolve').RollupNodeResolveOptions}
 */
const resolveOptions = {
  rootDir: getPath(),
};

/**
 * @type {import('@rollup/plugin-babel').RollupBabelInputPluginOptions}
 */
const babelOptions = {
  extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"],
  babelHelpers: "bundled",
};

module.exports = defineConfig({
  input: getPath("lib/index.ts"),
  output: [
    {
      file: getPath("dist/index.js"),
      format: "commonjs",
    },
  ],
  plugins: [
    babel(babelOptions),
    typescript(),
    resolve(resolveOptions),
  ],
});
