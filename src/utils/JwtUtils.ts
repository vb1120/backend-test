import jwt from 'jsonwebtoken'
import { envs } from './envs'

export interface IJwtPayload {
    uuid: string
    email: string
}

export class JwtUtils {
    private static accessSecret = envs.jwtAccess
    private static accessOption = envs.accessExpire

    static generateAccessToken(payload: IJwtPayload): string {
        return jwt.sign(payload, this.accessSecret, {
            expiresIn: this.accessOption
        })
    }

    static verifyAccessToken(accessToken: string) {
        return jwt.verify(accessToken, this.accessSecret) as IJwtPayload
    }
}
