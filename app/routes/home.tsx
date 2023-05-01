import { LoaderFunction, json} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout";
import Team_previews from "~/components/team";
import { UserPanel } from "~/components/user-panel";
import { requireUserId } from "~/utils/auth.server";
import { getFilterdTeams } from "~/utils/teams.server";
import { getOtherUser } from "~/utils/users.server";


export const loader: LoaderFunction = async({request})=>{
    //get only one id
    const users = await getOtherUser();
    const userId = await requireUserId(request);

    const teams = await getFilterdTeams('644186929d5fe25f854d9a38', {}, {});
    return json({users, teams});
}
export default function Home(){
    const {users , teams} = useLoaderData();

    return<Layout>
        <Outlet/>
        <div className="h-full flex">
            <UserPanel users={users}/>
            <div className="flex-1 flex flex-col">
                {/*Search Bar*/}
                <div className="flex-1 flex">
                    <div className="w-full p-10 flex flex-col gap-y-4">
                        {
                            teams.map(team=><Team_previews key={team.id} team={team} profile={team.author.profile}/>)                            
                        }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}