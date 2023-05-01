import { TeamStyle } from "@prisma/client";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import React, { useState, useTransition } from "react";
import Modal from "~/components/modal";
import { Selectbox } from "~/components/select-box";
import Team_previews from "~/components/team";
import { UserCircle } from "~/components/user-circle";
import { getUser, requireUserId } from "~/utils/auth.server";
import { backgroundColorMap, colorMap, emojiMap } from "~/utils/constants";
import { createTeam } from "~/utils/teams.server";
import { getUserId } from "~/utils/users.server";


export const action:ActionFunction = async({request})=>{
    const form = await request.formData();
    const userId = await requireUserId(request);

    const message = form.get('message');
    const backgroundColor = form.get('backgroundColor');
    const textColor = form.get('textColor');
    const emoji = form.get('emoji');
    const recipientId = form.get('recipientId');

    if(
        typeof message !== 'string'
        || typeof recipientId !== 'string'
        || typeof backgroundColor !== 'string'
        || typeof textColor !== 'string'
        || typeof emoji !== 'string'
    ){
        return json({error: `Invalid Form Data`}, {status: 400})
    }
    if(!message.length){
        return json({error:`Please provide a message`},{status: 400});
    }
    if(!recipientId.length){
        return json({error:`No recipient found ....`},{status:400});
    } 
    
    await createTeam(message, userId, recipientId,{
        backgroundColor,
        textColor,
        emoji
    } as TeamStyle);

    return redirect('/home');
}

export const loader: LoaderFunction =async ({params, request}) => {
    const {userId} = params
    if(typeof userId !== 'string'){
        return redirect('/home')
    }
    const user = await getUser(request);
    const recipient = await getUserId(userId);
    return json({recipient, user});
}

export default function Team(){
    const actionData = useActionData();
    const [formError, setFormError] = useState('ooiwieow');
    const [formData, setFormData] = useState({
        message:'',
        style:{
            backgroundColor: 'RED',
            textColor: 'WHITE',
            emoji:'THUMBSUP'        
        } as TeamStyle
    });

    const {recipient, user} = useLoaderData();

    const handleChange =( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string)=>{
        setFormData(form =>({...form, [field]: e.target.value}))
    }

    const handleStyleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string)=>{
        setFormData(form=>({
            ...form, style:{
                ...form.style,
                [field]: e.target.value
            }
        }))
    }
    const getOptions = (data: any) =>Object.keys(data).reduce((acc: any[], curr)=>{
        acc.push({
            name: curr.charAt(0).toUpperCase()+ curr.slice(1).toLowerCase(),
            value: curr
        })
        return acc
    },[])

    const text_colors = getOptions(colorMap);
    const emojis = getOptions(emojiMap);
    const backgroundColor = getOptions(backgroundColorMap);

    return<Modal isOpen={true} className="w-2/3 p-10">
        <form method="post">
            <div className="text-red-500 text-xs flex justify-center items-center p-2">{formError}</div>
            <input type="hidden" value={recipient.id} name="recipientId"/>
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
                <div className="text-center flex flex-col items-center gap-y-2 pr-8">
                    <UserCircle profile={recipient.profile} className="h-24 w-24"/>
                    <p className="text-blue-300">
                        {recipient.profile.firstName} {recipient.profile.lastName}
                    </p>
                    <span className="px-2 py-1 bg-gray-300 rounded-xl text-blue-300 w-auto">set something</span>
                </div>
                <div className="flex-1 flex flex-col gay-y-4">
                    <textarea
                    name="message"
                    className="w-full rounded-xl h-40 p-4"
                    placeholder={`Say something nice about`}
                    value={formData.message}
                    onChange={e=>handleChange(e, "message")}
                    />
                    <div className="flex flex-col items-center md:flex-row md:justify-start gap-x-4">
                        <Selectbox
                        options={backgroundColor}
                        name="backgroundColor"
                        value={formData.style.backgroundColor}
                        label="Background Color"
                        containerClassName="w-36"
                        className="w-full rounded-xl px-3 py-2 text-gray-400"
                        onChange={e=>handleStyleChange(e,"backgroundColor")}
                        />
                        <Selectbox
                        options={text_colors}
                        name="textColor"
                        value={formData.style.textColor}
                        label="Text Color"
                        containerClassName="w-36"
                        className="w-full rounded-xl px-3 py-2 text-gray-400"
                        onChange={e=>handleStyleChange(e,"textColor")}
                        />
                        <Selectbox
                        options={emojis}
                        name="emoji"
                        value={formData.style.emoji}
                        label="Emoji"
                        containerClassName="w-36"
                        className="w-full rounded-xl px-3 py-2 text-gray-400"
                        onChange={e=>handleStyleChange(e,"emoji")}
                        />
                    </div>
                </div>
            </div>
            <br/>
            <p className="text-blue-600 font-semibold mb-2">Previews</p>
            <div className="flex flex-col items-center md:flex-row gap-x-24 gap-y-2 md:gap-y-8">
                <Team_previews profile={user.profile} team={formData}/>
                <div className="flex-1"/>
                <button
                type="submit"
                className="rounded-xl bg-yellow-300 font-semibold text-blud-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-2">
                    SEND
                </button>
            </div>
        </form>
      </Modal>;
  }