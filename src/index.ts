import path from 'path';
import { pathToFileURL, URL } from 'url';
import { parse, resolve } from '@import-maps/resolve';

import type { ImportMap } from '@import-maps/resolve';
import type { PluginImpl } from 'rollup';

interface ImportMapResolveOptions {
  /**
   * Base URL used when resolving any relative-URL-like address in the import map. The "address" is
   * the right-hand side of a mapping given in an import map. If a string is given, then it will
   * first be parsed to see if it is a valid URL. If it is, then it is used as is. Otherwise, it is
   * assumed to be either an absolute file system path a path relative to the current working
   * directory. If not given, defaults to the current working directory.
   */
  baseUrl?: string | URL;

  importMap: ImportMap;
}

function normalizeBaseUrl(baseUrl: string | URL) {
  if (baseUrl instanceof URL) {
    return baseUrl;
  }

  // Need to first do file system path-based checks instead of simply seeing if the given base URL
  // can be parsed as a URL first. If the given base URL is an absolute Windows path, then
  // new URL(baseUrl) succeeds with a URL that has a protocol equal to the Windows drive letter,
  // which is not what we want.
  if (path.isAbsolute(baseUrl)) {
    return pathToFileURL(baseUrl);
  }

  // Next see if the given base URL is a valid URL. If so, use it as is.
  try {
    return new URL(baseUrl);
  }
  catch {
    // Do nothing. Assume it's some sort of relative file system path.
    return pathToFileURL(path.posix.join(process.cwd(), baseUrl));
  }
}

const importMapResolve: PluginImpl<ImportMapResolveOptions> = (options) => {
  const baseUrl = normalizeBaseUrl(options?.baseUrl || process.cwd());
  const importMap = parse(options?.importMap || {}, baseUrl);

  return {
    name: 'import-map-resolve',

    async resolveId(source, importer) {
      console.log(source, importer);
      return null;
    }
  };
};

export default importMapResolve;
