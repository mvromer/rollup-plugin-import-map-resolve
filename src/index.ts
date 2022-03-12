import { URL } from 'url';
import { parse, resolve } from '@import-maps/resolve';

import type { ImportMap } from '@import-maps/resolve';
import type { PluginImpl } from 'rollup';

interface ResolveImportMapOptions {
  baseUrl: string;
  importMap: ImportMap;
}

const defaultOptions: ResolveImportMapOptions = {
  baseUrl: '',
  importMap: {}
};

const resolveImportMap: PluginImpl<ResolveImportMapOptions> = (options = defaultOptions) => {
  if (!options.baseUrl) {
    throw new Error('Base URL must be given');
  }

  const baseUrl = new URL(options.baseUrl);
  const importMap = parse(options.importMap, baseUrl);

  return {
    name: 'resolve-import-map',

    async resolveId(source, importer) {
      console.log(source, importer);
      return null;
    }
  };
};

export default resolveImportMap;
