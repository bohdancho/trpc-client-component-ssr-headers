import "server-only";

import { headers } from "next/headers";

globalThis.$headers = headers; // NOTE: this provides globalThis.$headers for client components to use.
// NOTE: Uncommenting this ^ results in a hydration error when logged in (also make sure to restart the dev server).

// NOTE: this file is imported in layout.tsx
