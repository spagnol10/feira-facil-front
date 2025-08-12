declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_BASE_URL: string;
        NEXT_PUBLIC_PRE_REGISTER_TOKEN: string;
        NEXT_PUBLIC_DECRYPT_KEY: string;
        NEXT_PUBLIC_CNPJ_API: string;
        NEXT_PUBLIC_IBGE_LOC_API: string;
        NEXT_PUBLIC_CEP_API: string;
        NEXT_PUBLIC_DEVELOPING_VERSION: boolean;
    }
}