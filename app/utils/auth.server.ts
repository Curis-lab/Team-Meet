
import { json, createCookieSessionStorage, redirect} from "@remix-run/node"
import { db } from "./prisma.server"
import type { Registerform, loginForm } from "./types.server"
import { createUser } from "./users.server"
import bcrypt from 'bcryptjs';
import { Prisma } from "@prisma/client";

const secrets = process.env.SESSION_SECRET;

if(!secrets){
    throw new Error("SESSION_SECRET is not set");
}
//cooking settings
const storage = createCookieSessionStorage({
    cookie:{
        name:"team-session",
        secure: process.env.NODE_ENV === "production",
        secrets:[secrets],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    }
})

export const register = async(form: Registerform)=>{
    const exist = await db.user.count({where:{email: form.email}})
    if(exist){
        return json(
            {error:'they alerady have an account'},
            {status:404}
        )
    }

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
    return createUserSession(newUser.id, '/');
}

export const login = async (form: loginForm)=>{
    
    const user = await db.user.findUnique({
        where:{
            email: form.email
        }
    })

   
    if(!user){
        return json({error: `Incorrect login`},{ status: 400})
    }

    return createUserSession(user.id, '/');
    
} 

export const createUserSession = async(
    userId: string,
    redirectTo: string
)=>{
    const session = await storage.getSession();
    session.set('userId', userId);
    return redirect( redirectTo,{
        headers:{
            "Set-Cookies": await storage.commitSession(session),
        }
    })
}

