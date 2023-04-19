import { json } from "@remix-run/node"
import { prisma } from "./prisma.server"
import type { Registerform, loginForm } from "./types.server"
import { createUser } from "./users.server"
import bcrypt from 'bcryptjs';

export const register = async(form: Registerform)=>{
    const exist = await prisma.user.count({where:{email: form.email}})
    if(exist){
        return json(
            {error:'they alerady have an account'},
            {status:404}
        )
    }

    //create user
    const newUser = await createUser(form)
    if(!newUser){
        return json(
            {
            error:'something went worng trying to create a new user.',
            fields:{email: form.email, password: form.password}
            },
            {
                status: 400
            })
    }

    return null;
}

export const login = async (form: loginForm)=>{
    const user = await prisma.user.findUnique({
        where: {email: form.email},
    })
    if(!user || !(await bcrypt.compare( form.password, user.password))){
        return json({error: `Incorrect login`},{ status: 400})
    }
    return null
} 