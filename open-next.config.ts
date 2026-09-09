import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Every page is statically generated at build time, so no incremental cache
// (R2/KV) is needed.
export default defineCloudflareConfig({});
