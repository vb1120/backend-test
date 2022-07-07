import { Request, Response } from 'express'
import { authHandler } from '../middlewares'
import { User, UserUpdateDto } from '../models'
import { renameImagePath, upload } from '../utils'
import { bodyValidator, controller, get, put, use } from './decorators'

@controller('/profile')
class UserController {
    @get('/:uuid')
    @use(authHandler())
    async getUserByUuid(req: Request, res: Response) {
        const { uuid } = req.params
        if (!uuid)
            return res
                .status(400)
                .send({ msg: 'uuid property in req.params has to be defined' })

        const user = await User.findByPk(uuid)
        if (!user)
            return res
                .status(400)
                .send({ msg: `User with uuid ${uuid} not found` })

        res.status(200).json({ user })
    }

    @put('/:uuid')
    @use(authHandler())
    @use(upload.single('avatar'))
    @bodyValidator(UserUpdateDto)
    async updateUserByUuid(req: Request, res: Response) {
        const { uuid } = req.params
        if (!uuid)
            return res
                .status(400)
                .send({ msg: 'uuid property in req.params has to be defined' })

        let user = await User.findByPk(uuid)
        if (!user)
            return res
                .status(400)
                .send({ msg: `User with uuid ${uuid} not found` })

        if (req.file) {
            const newPath = `${req.file.destination}/${req.file.originalname}`
            renameImagePath(req.file.path, newPath)
            req.body.imageUrl = newPath
        }

        user = await user.update(req.body)

        res.status(204).end()
    }
}
