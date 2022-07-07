import { Request, Response } from 'express'
import { authHandler } from '../middlewares'
import { User } from '../models'
import { controller, get, use } from './decorators'

@controller('/')
class UserController {
    @get('profiles')
    @use(authHandler())
    async getUsers(req: Request, res: Response) {
        const { page, size } = req.query
        if (!page || !size)
            return res.status(400).send({
                msg: `${
                    page ? "'page'" : "'size'"
                } has to be defined in req.query`
            })

        const users = await User.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit: parseInt(<string>size),
            offset: parseInt(<string>page) * parseInt(<string>size)
        })

        res.status(200).json({ users })
    }
}
