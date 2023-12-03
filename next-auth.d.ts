import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's name. */
      name: string
      /** The user's email. */
      email: string
      /** The user's image. */
      image: string
      /** The user's id. */
      id: string // adicione esta linha
      /** The user's role. */
      role: string // adicione esta linha
    }
  }
}
