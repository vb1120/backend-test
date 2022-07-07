import { Request, Response } from 'express'
import { User, UserCreateDto } from '../models'
import { comparePasswords } from '../utils'
import { IJwtPayload, JwtUtils } from '../utils/JwtUtils'
import { bodyValidator, controller, post } from './decorators'

@controller('/user')
class AuthController {
    @post('/register')
    @bodyValidator(UserCreateDto)
    async register(req: Request, res: Response) {
        const { email } = req.body

        const user = await User.findOne({ where: { email } })
        if (user)
            return res
                .status(400)
                .send({ msg: `User with email '${email}' already exists` })

        const newUser = await User.create(req.body)

        const { accessToken } = newUser.assignTokenToUserAndReturnIt()

        return res.status(201).send({ accessToken })
    }

    @post('/login')
    @bodyValidator(UserCreateDto)
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })
        if (!user || !comparePasswords(password, user.password))
            return res.status(401).send({ msg: `Invalid Credentials` })

        const jwtPayload: IJwtPayload = { uuid: user.uuid, email }
        const accessToken = JwtUtils.generateAccessToken(jwtPayload)

        return res.status(200).send({ accessToken })
    }
}
