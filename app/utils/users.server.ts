import {db} from './prisma.server';
import { Registerform } from './types.server';
import bcrypt from 'bcryptjs';

export const createUser = async(user: Registerform)=>{
    const passwordHash = await bcrypt.hash(user.password, 10);

    //prisma will sent to mongodb pattern
    const newUser = await db.user.create({
        //this is new data pattern
        data:{
            email:user.email,
            password: passwordHash,
            profile:{
                firstName: user.firstName,
                lastName: user.lastName
            }
        }
    });
    return {id: newUser.id, email: user.email}
};

export const getOtherUsers = async( userId: string)=>{
    return await db.user.findMany({
        where:{
            id:{not:userId},
        },
        orderBy:{
            profile:{
                firstName: "asc"
            }
        }
    })
}