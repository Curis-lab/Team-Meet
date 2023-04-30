import {db} from './prisma.server';
import { Registerform } from './types.server';
import bcrypt from 'bcryptjs';

export const createUser = async(user: Registerform)=>{
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = await db.user.create({
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

export const getOtherUser = async()=>{
    return await db.user.findMany({
        where:{
            id:{not: '643ed2573b82a06c1196cdb1'}
        },
        orderBy:{
            profile:{
                firstName:"desc",
            }
        }
    })
}

export const getUserId = async(userId: string)=>{
    return await db.user.findUnique({
        where:{id: userId},
    });
}
