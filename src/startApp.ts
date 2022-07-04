import bodyParser from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'
import { envs } from './utils'

const { port } = envs

export const startApp = () => {
    const app = express()

    app.use(bodyParser.json())

    app.listen(port, '0.0.0.0', () => {
        console.info(`Server is listening on port ${port}`)
    })
}
