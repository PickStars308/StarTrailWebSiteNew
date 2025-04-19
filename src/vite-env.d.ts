/// <reference types="vite/client" />
interface ViteTypeOptions {
    // By adding this line, you can make the type of ImportMetaEnv strict
    // to disallow unknown keys.
    // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_PICKSTARS_VERSION: string

    readonly VITE_SITE_NAME: string
    readonly VITE_SITE_KEYWORDS: string
    readonly VITE_SITE_DES: string
    readonly VITE_SITE_AUTHOR: string

    readonly VITE_SITE_ICP: string
    readonly VITE_SITE_ICP_URL: string

    readonly VITE_AVATAR_SIZE: string
    readonly VITE_SITE_AVATAR: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}