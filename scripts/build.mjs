import {rmSync, copyFileSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {basename, dirname, join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {transformFileSync} from '@babel/core';

const require = createRequire(import.meta.url);
const rootDirectory = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = join(rootDirectory, 'src');
const outputDirectory = join(rootDirectory, 'dist');

rmSync(outputDirectory, {recursive: true, force: true});
execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), '-p', 'tsconfig.build.json'], {
    cwd: rootDirectory,
    stdio: 'inherit',
});

for (const file of readdirSync(sourceDirectory, {recursive: true}).sort()) {
    if (!/\.tsx?$/.test(file) || file.endsWith('.d.ts')) continue;

    const sourcePath = join(sourceDirectory, file);
    const outputPath = join(outputDirectory, file.replace(/\.tsx?$/, '.js'));
    const result = transformFileSync(sourcePath, {
        cwd: rootDirectory,
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        sourceFileName: relative(dirname(outputPath), sourcePath).split(sep).join('/'),
        plugins: [['babel-plugin-react-compiler', {target: '19'}]],
        presets: [
            ['@babel/preset-react', {runtime: 'automatic', development: false}],
            '@babel/preset-typescript',
        ],
    });

    if (result?.code == null || !result.map) {
        throw new Error(`Failed to build ${file}`);
    }

    mkdirSync(dirname(outputPath), {recursive: true});
    writeFileSync(outputPath, `${result.code}\n//# sourceMappingURL=${basename(outputPath)}.map\n`);
    writeFileSync(`${outputPath}.map`, JSON.stringify({...result.map, file: basename(outputPath)}));
}

for (const file of ['styles.css', 'theme.css']) {
    copyFileSync(new URL(`../src/${file}`, import.meta.url), new URL(`../dist/${file}`, import.meta.url));
}
