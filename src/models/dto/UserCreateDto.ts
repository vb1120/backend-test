import { Expose } from 'class-transformer'
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator'
import { InferAttributes } from 'sequelize'
import { User } from '../User'

// Dto class for validation when the user created
export class UserCreateDto {
    @IsDefined()
    @IsEmail()
    @Expose()
    email: InferAttributes<User>['email']

    @IsDefined()
    @IsString()
    @MinLength(6)
    @Expose()
    password: InferAttributes<User>['password']

    @IsDefined()
    @IsString()
    @Expose()
    name: InferAttributes<User>['name']
}
