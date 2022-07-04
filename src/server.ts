import { sequelize } from './db'
import { startApp } from './startApp'
;(async () => {
    try {
        await sequelize.authenticate()
        console.log('Successfully connected to the database')

        await sequelize.sync({ alter: true })
        console.log('Models synchronized successfully')

        startApp()
    } catch (error: any) {
        console.error(error.stack)
    }
})()
