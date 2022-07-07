import { Request, Response, NextFunction } from 'express'
import { IJwtPayload, JwtUtils } from '../utils/JwtUtils'

export const authHandler = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]

            try {
                let jwtPayload: IJwtPayload

                jwtPayload = JwtUtils.verifyAccessToken(token)

                req.payload = jwtPayload

                next()
            } catch (error) {
                return res.status(401).send({ msg: 'Invalid token' })
            }
        } else {
            return res
                .status(401)
                .send({ msg: 'Authorization header not found' })
        }
    }
}
