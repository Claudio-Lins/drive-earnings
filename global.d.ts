declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_API_KEY: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      AUTH_SECRET: string
    }
  }
}

export {}
