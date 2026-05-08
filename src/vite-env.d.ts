/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional: comma-separated URL prefixes (no trailing slash needed) that host
   * unpackaged Stellarium sky data (same layout as upstream `test-skydata/`).
   */
  readonly VITE_STELLARIUM_SKYDATA_BASE_URLS?: string;
  /** Set to `"1"` in dev to log star/planet picks on canvas click (experimental). */
  readonly VITE_STELLARIUM_DEBUG_PICK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
