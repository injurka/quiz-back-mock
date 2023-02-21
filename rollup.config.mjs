import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import externals from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';
import analyze from 'rollup-plugin-analyzer';
import fs from 'fs';
import path from 'path';

const lib = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));
const year = new Date().getFullYear();
const banner = `// NordClan v${lib.version} Copyright (c) ${year} ${lib.author} and contributors`;

const config = defineConfig([
  //* CJS config
  {
    input: ['./src/index.ts'],
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
      banner
    },
    plugins: [
      json(),
      commonjs(),
      externals({ peerDeps: true }),
      typescript({
        declarationDir: 'dist/types',
        sourceMap: false,
        tsconfig: 'tsconfig.build.json'
      }),
      analyze()
    ]
  },
  //* ESM config
  {
    input: ['./src/index.ts'],
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false
    },
    plugins: [
      json(),
      commonjs(),
      externals({ peerDeps: true }),
      typescript({ outDir: 'dist/esm', declaration: false, sourceMap: false }),
      analyze()
    ]
  },
  //* UMD  config
  {
    input: ['./src/index.ts'],
    output: {
      dir: 'dist/umd',
      format: 'iife',
      inlineDynamicImports: true,
      sourcemap: false,
      globals: {
        dotenv: 'dotenv',
        path: 'path',
        '@hapi/hapi': 'Hapi',
        '@hapi/boom': 'Boom',
        '@faker-js/faker': 'faker',
        nock: 'nock',
        envalid: 'envalid'
      }
    },
    external: ['dotenv', 'path', 'Hapi', 'Boom', 'faker', 'nock', 'envalid'],
    plugins: [
      json(),
      commonjs(),
      externals({ peerDeps: true }),
      typescript({ outDir: 'dist/umd', declaration: false, sourceMap: false }),
      analyze()
    ]
  }
]);

export default config;
