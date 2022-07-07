import bodyParser from 'body-parser'
import express from 'express'
import { AppRouter, envs } from './utils'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middlewares'

const { port } = envs

export const startApp = () => {
    const app = express()

    app.use(cors())
    app.use(morgan('combined'))
    app.use(bodyParser.json())

    app.use(AppRouter.getInstance())

    app.use(errorHandler)

    app.listen(port, '0.0.0.0', () => {
        console.info(`Server is listening on port ${port}`)
    })
}
