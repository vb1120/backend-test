import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes
} from 'sequelize'
import { sequelize } from '../db'
import { IJwtPayload, JwtUtils } from '../utils/JwtUtils'
import { hashPassword } from '../utils/passwordUtils'
import fs from 'fs'

export enum Gender {
    male = 'male',
    female = 'female'
}
// order of InferAttributes & InferCreationAttributes is important.
export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare uuid: CreationOptional<string>
    declare email: string
    declare password: string
    declare name: string
    declare surname: string
    declare imageUrl: string
    declare gender: Gender

    // custom instance method
    assignTokenToUserAndReturnIt(): { accessToken: string } {
        const jwtPayload: IJwtPayload = {
            uuid: this.uuid,
            email: this.email
        }

        const accessToken = JwtUtils.generateAccessToken(jwtPayload)

        return { accessToken }
    }
}

// Model initialization
User.init(
    {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[Gender.male, Gender.female]]
            }
        },
        imageUrl: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: true,
        tableName: 'users'
    }
)

// Hash passsword before create
User.beforeCreate(async (user, options) => {
    user.password = await hashPassword(user.password)
})
