import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Modal from "~/components/modal";
import { UserCircle } from "~/components/user-circle";
import { getUserId } from "~/utils/users.server";

export const loader: LoaderFunction =async ({params}) => {
    const {userId} = params
    if(typeof userId !== 'string'){
        return redirect('/home')
    }
    const recipient = await getUserId(userId);
    return json({recipient});
}

export default function Team(){
    const {recipient} = useLoaderData();
    return<Modal isOpen={true} className="w-2/3 p-10">
        <form>
            <input type="hidden" value={recipient.id} name="recipientId"/>
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
                <UserCircle profile={recipient.profile} className="h-24 w-24"/>
                <p className="text-blue-300">
                    {recipient.profile.firstName} {recipient.profile.lastName}
                </p>
            </div>
        </form>
      </Modal>;
  }