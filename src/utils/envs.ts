import 'dotenv/config'

interface Env {
    port: number
    postgresUri: string
    saltRounds: number
    jwtAccess: string
    accessExpire: string
}

export const envs: Env = {
    port: parseInt(<string>process.env.PORT),
    postgresUri: <string>process.env.POSTGRES_URI,
    saltRounds: parseInt(<string>process.env.SALT_ROUNDS),
    jwtAccess: <string>process.env.JWT_ACCESS,
    accessExpire: <string>process.env.ACCESS_EXPIRE
}
