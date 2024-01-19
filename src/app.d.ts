// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace Lucia {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    type Auth = import("@/server/auth/index").Auth;
    type DatabaseUserAttributes = {
      email: string;
      first_name: string;
      last_name: string;
    };
    type DatabaseSessionAttributes = object;
  }
}

export {};
