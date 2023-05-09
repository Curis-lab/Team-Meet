import { ActionFunction, LoaderFunction, json } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Formfield } from "~/components/form-field";
import { IamgeUploader } from "~/components/image-uploader";
import Modal from "~/components/modal"
import { Selectbox } from "~/components/select-box";
import { getUser } from "~/utils/auth.server"
import { departments } from "~/utils/constants";
import { updateUser } from "~/utils/users.server";
import { validateName } from "~/utils/validator.server";

//userloader for use processing data
export const loader: LoaderFunction=async({request})=>{
    const user = await getUser(request);
    return json({user});
}


//action from form data
export const action: ActionFunction = async({request})=>{
    const userId = await getUser(request);
    const form = await request.formData();
    let firstname = form.get('firstName');
    let lastname = form.get('lastName');
    let department = form.get('department');
    const action = form.get('_action');


    if( typeof firstname === 'string' || typeof lastname === 'string' || typeof department === 'string'){
        console.log('It is come from action',firstname, lastname, department);
    }

    switch(action){
        case 'save':{
            if(
                typeof firstname !== 'string' 
                || typeof lastname !== 'string' 
                || typeof department !== 'string'
            ){
                return json({error:`Invalid Form Data`},{status: 400});
            }
            const errors = {
                firstName: validateName(firstname),
                lastName: validateName(lastname),
                department: validateName(department)
            }

            if(Object.values(errors).some(Boolean)){
                return json({errors})
            }
            await updateUser(userId,{
                firstName,
                lastName,
                department: department as Department  
            });
        }
        default:
            return json({field:'default'});
    }
}

export default function ProfileModal(){
    const {user} = useLoaderData();

    const [formData, setFormData] = useState({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        department: user.profile.department
    });

    const actionData = useActionData();

    const [error, setError] = useState(actionData?.error || '')
    const [errors, setErrors] = useState(actionData?.errors || '');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string)=>{
        setFormData(form=>({ ...form, [field]: event.target.value}));
    };

    console.log(user);
    return <Modal isOpen={true} className="w-1/3">
        <div className="p-3">
            <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
            <div className="flex">
                <div className="w-1/3">
                    <IamgeUploader/>
                </div>
                <div className="flex-1">
                    {error}
                    <form method="post">
                        <Formfield
                        htmlFor="firstName"
                        label="First Name"
                        type="text"
                        error={errors.firstName}
                        value={formData.firstName}
                        onChange={(e)=>handleInputChange(e, 'firstName')}
                        />
                        <Formfield
                        htmlFor="lastName"
                        label="Last Name"
                        type="text"
                        error={errors.lastName}
                        value={formData.lastName}
                        onChange={(e)=>handleInputChange(e, 'lastName')}
                        />
                        <Selectbox
                        className="w-full rounded-xl px-3 py-2 text-gray-400"
                        id="department"
                        label="Department"
                        name="department"
                        options={departments}
                        value={formData.department}
                        onChange={e=> handleInputChange(e,'department')}
                        />
                        <div className="w-full text-right mt-7">
                            <button name="_action" type="submit" value="save" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 hover:-translate-y-2">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Modal>
}