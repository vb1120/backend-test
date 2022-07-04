import 'dotenv/config'

interface Env {
    port: number
    postgresUri: string
}

export const envs: Env = {
    port: parseInt(<string>process.env.PORT),
    postgresUri: <string>process.env.POSTGRES_URI
}
