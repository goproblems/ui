import {rmSync, copyFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
rmSync(new URL('../dist', import.meta.url), {recursive: true, force: true});
execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), '-p', 'tsconfig.build.json'], {stdio: 'inherit'});
for (const file of ['styles.css', 'theme.css']) {
    copyFileSync(new URL(`../src/${file}`, import.meta.url), new URL(`../dist/${file}`, import.meta.url));
}
