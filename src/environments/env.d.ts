/**
 * Environment variable type definitions for @ngx-env/builder.
 * Variables prefixed with NG_APP_ are automatically injected via the .env file.
 * Access via: import.meta.env.NG_APP_VARIABLE_NAME
 *
 * @see https://github.com/chihab/ngx-env
 */
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    /** Resend API Key for transactional email delivery (US2.3) */
    readonly NG_APP_EMAIL_SENDING_KEY: string;

    /** Verified sender email domain for Resend (e.g. onboarding@resend.dev) */
    readonly NG_APP_EMAIL_SENDING_DOMAIN: string;

    /** Calendly base URL for booking pre-fill integration */
    readonly NG_APP_CALENDLY_BASE_URL: string;

    /** Current deployment stage (development | production) */
    readonly NG_APP_STAGE: string;

    /** Allow additional environment variables without explicit declaration */
    [key: string]: string | undefined;
}
