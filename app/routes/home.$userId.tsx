import { TeamStyle } from "@prisma/client";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Modal from "~/components/modal";
import { Selectbox } from "~/components/select-box";
import Team_previews from "~/components/team";
import { UserCircle } from "~/components/user-circle";
import { getUser } from "~/utils/auth.server";
import { backgroundColorMap, colorMap, emojiMap } from "~/utils/constants";
import { getUserId } from "~/utils/users.server";

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
    const [formData, setFormData] = useState({
        message:'',
        style:{
            backgroundColor: 'RED',
            textColor: 'WHITE',
            emoji:'THUMBSUP'        
        } as TeamStyle
    })
    const {recipient, user} = useLoaderData();

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
        <form>
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
                    name="massage"
                    className="w-full rounded-xl h-40 p-4"
                    placeholder={`Say something nice about`}
                    />
                    <div className="flex flex-col items-center md:flex-row md:justify-start gap-x-4">
                        <Selectbox
                        options={backgroundColor}
                        name="backgroundColor"
                        value={formData.style.textColor}
                        label="Background Color"
                        containerClassName="w-36"
                        className="w-full rounded-xl px-3 py-2 text-gray-400"
                        onChange={e=>{}}
                        />
                        <Selectbox
                        options={text_colors}
                        name="textColor"
                        value={formData.style.textColor}
                        label="Text Color"
                        containerClassName="w-36"
                        className="w-full rounded-xl px-3 py-2 text-gray-400"
                        onChange={e=>{}}
                        />
                        <Selectbox
                        options={emojis}
                        name="emoji"
                        value={formData.style.textColor}
                        label="Emoji"
                        containerClassName="w-36"
                        className="w-full rounded-xl px-3 py-2 text-gray-400"
                        onChange={e=>{}}
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
                className="rounded-xl bg-yellow-300 font-semibold text-blud-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-2">
                    SEND
                </button>
            </div>
        </form>
      </Modal>;
  }