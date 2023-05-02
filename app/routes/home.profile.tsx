import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Formfield } from "~/components/form-field";
import Modal from "~/components/modal"
import { Selectbox } from "~/components/select-box";
import { getUser } from "~/utils/auth.server"
import { departments } from "~/utils/constants";

export const loader: LoaderFunction=async({request})=>{
    const user = await getUser(request);
    return json({user});
}

export default function ProfileModal(){
    const {user} = useLoaderData();

    const [formData, setFormData] = useState({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        department: user.profile.department
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string)=>{
        setFormData(form=>({ ...form, [field]: event.target.value}));
    };

    return <Modal isOpen={true} className="w-1/3">
        <div className="p-3">
            <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
            <div className="flex">
                <div className="m-1/3"><h1>photo</h1></div>
                <div className="flex-1">
                    <form>
                        <Formfield
                        htmlFor="firstName"
                        label="First Name"
                        type="text"
                        error=""
                        value={formData.firstName}
                        onChange={(e)=>handleInputChange(e, 'firstName')}
                        />
                        <Formfield
                        htmlFor="lastName"
                        label="Last Name"
                        type="text"
                        error=""
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
                            <button name="_action" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 hover:-translate-y-2">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Modal>
}