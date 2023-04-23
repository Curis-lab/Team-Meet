import { useState } from "react";
import { Formfield } from "~/components/form-field";
import {Layout} from "~/components/layout";
import { ActionFunction, json } from "@remix-run/node";
import { register } from "~/utils/auth.server";

export const action: ActionFunction = async({request})=>{
    
    const form = await request.formData()

    const action = form.get("_action");
    const email = form.get("email");
    const password = form.get("password");
    let firstName = form.get("firstName");
    let lastName = form.get("lastName");

    switch(action){
        case 'signup':
            console.log(action);
            console.log(typeof email);
            register({email, password, firstName, lastName});
            return null;
        default:
            return json({error:`Invalid value`},{status: 400});
    }
}
export default function Login() {
    const [action, setAction] = useState('signup');
    const [formData, setFormData] = useState({
        email:'',
        password:'',
        firstName:'',
        secondName:''
    })

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, field:string)=>{
        //only take one object
        
        setFormData(form=>({
            ...form,
            [field]: e.target.value
        }))
    }
    return (
        <Layout>
            <div className="h-full flex justify-center items-center flex-col gap-y-4">
                <button onClick={e=>setAction(action==='login'? 'signup':'login')} className="absolute top-0 right-0 bg-yellow-300 font-semibold text-blue-600 px-3 py-2 hover:bg-yellow-500 hover:translate-y-1">Sign Up</button>
                <h2 className="text-5xl font-extrabold">Welcome to Teams</h2>
                <p className="font-semibold text-slate-300">{action==='login'?'Log In to Give Some Paraise!':'Sing up to give some paraise'}</p>
                <form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
                    <Formfield
                        htmlFor = 'email'
                        label = 'email'
                        type="text"
                        value={formData.email}
                        error=""
                        onChange={e=>handleInputChange(e, 'email')}
                    />
                    <Formfield
                        htmlFor = 'password'
                        label = 'password'
                        type="password"
                        value={formData.password}
                        error=""
                        onChange={e=>handleInputChange(e,'password')}
                    />
                    {
                        action ==='signup'?
                        <>
                            <Formfield
                            htmlFor = 'first name'
                            label = 'First Name'
                            type="text"
                            value={formData.firstName}
                            error=""
                            onChange={e=>handleInputChange(e,'firstName')}/>  
                            <Formfield
                            htmlFor = 'second name'
                            label = 'Second Name'
                            type="text"
                            value={formData.secondName}
                            error=""
                            onChange={e=>handleInputChange(e,'secondName')}/>  
                        </>: null
                    }
                    <div className="w-full text-center">
                        <button
                        type="submit"
                        name="_action"
                        className="rounded-xl bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-150"
                        value={action}
                        >{action === 'login'? "Sign In":"Sign Up"}</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
  }
  