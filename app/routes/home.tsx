import { LoaderFunction, json} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout";
import { UserPanel } from "~/components/user-panel";
import { getOtherUser } from "~/utils/users.server";

export const loader: LoaderFunction = async({request})=>{
    //get only one id
    const users = await getOtherUser();
    return json({users});
}
export default function Home(){
    const {users} = useLoaderData();

    return<Layout>
        <Outlet/>
        <div className="h-full flex">
            <UserPanel users={users}/>
            <div className="flex-1 flex flex-col">
                {/*Search Bar*/}
                <div className="w-full p-10 flex flex-col gap-y-4">
                    <div></div>
                </div>
            </div>
        </div>
    </Layout>
}