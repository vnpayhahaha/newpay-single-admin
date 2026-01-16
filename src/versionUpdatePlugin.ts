// versionUpdatePlugin.ts
import { writeFile, existsSync, mkdir } from 'fs';
import { join } from 'path';
import type { Plugin, ResolvedConfig } from 'vite';

interface VersionUpdateOptions {
  version: string;
}

interface VersionInfo {
  version: string;
  buildTime?: string;
}

const writeVersion = (versionFile: string, content: string): void => {
  writeFile(versionFile, content, (err) => {
    if (err) throw err;
    console.log(`Version file created at: ${versionFile}`);
  });
};

export default (options: VersionUpdateOptions): Plugin => {
  let config: ResolvedConfig;

  return {
    name: 'version-update',

    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },

    buildStart() {
      const file = join(config.publicDir, 'version.json');
      const versionInfo: VersionInfo = {
        version: options.version,
        buildTime: new Date().toISOString()
      };

      const content = JSON.stringify(versionInfo, null, 2);

      if (existsSync(config.publicDir)) {
        writeVersion(file, content);
      } else {
        mkdir(config.publicDir, { recursive: true }, (err) => {
          if (err) throw err;
          writeVersion(file, content);
        });
      }
    }
  };
};
