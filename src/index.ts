import { URL } from 'url';
import { parse, resolve } from '@import-maps/resolve';

import type { ImportMap } from '@import-maps/resolve';
import type { PluginImpl } from 'rollup';

interface ImportMapResolveOptions {
  baseUrl: string;
  importMap: ImportMap;
}

const defaultOptions: ImportMapResolveOptions = {
  baseUrl: '',
  importMap: {}
};

const importMapResolve: PluginImpl<ImportMapResolveOptions> = (userOptions) => {
  const options = { ...defaultOptions, ...userOptions };

  if (!options.baseUrl) {
    throw new Error('Base URL must be given');
  }

  const baseUrl = new URL(options.baseUrl);
  const importMap = parse(options.importMap, baseUrl);

  return {
    name: 'import-map-resolve',

    async resolveId(source, importer) {
      console.log(source, importer);
      return null;
    }
  };
};

export default importMapResolve;
