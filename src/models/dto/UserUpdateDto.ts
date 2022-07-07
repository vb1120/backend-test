import { Expose } from 'class-transformer'
import { IsEmail, IsEnum, IsString } from 'class-validator'
import { InferAttributes } from 'sequelize'
import { Gender, User } from '../User'

// Dto class for validation when the user created
export class UserUpdateDto {
    @IsEmail()
    @Expose()
    email: InferAttributes<User>['email']

    @IsString()
    @Expose()
    name: InferAttributes<User>['name']

    @IsString()
    @Expose()
    surname: InferAttributes<User>['surname']

    @IsEnum(Gender)
    @Expose()
    gender: InferAttributes<User>['gender']

    @IsString()
    @Expose()
    imageUrl: InferAttributes<User>['imageUrl']
}
