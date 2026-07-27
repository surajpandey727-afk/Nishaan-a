import { optionalEnv } from './env'

/**
 * Sentry. Install @sentry/nextjs and run its wizard when you enable this;
 * the flag below lets components branch without importing the SDK.
 */
export const sentryEnabled = () => Boolean(optionalEnv('NEXT_PUBLIC_SENTRY_DSN'))
