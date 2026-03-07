interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly NG_APP_VAR1: string;
    [key: string]: any;
}