/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string; // eg. 1.0.0
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
