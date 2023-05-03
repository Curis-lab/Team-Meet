import { Team as ITeam, Profile} from "@prisma/client";
import { LoaderFunction, json} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout";
import { RecentBar } from "~/components/recent-bar";
import { SearchBar } from "~/components/search-bar";
import Team_previews from "~/components/team";
import { UserPanel } from "~/components/user-panel";
import { getUser, requireUserId } from "~/utils/auth.server";
import { getFilterdTeams, getRecentTeams } from "~/utils/teams.server";
import { getOtherUser } from "~/utils/users.server";

interface TeamWithAuthor extends ITeam{
    author:[
        profile: Profile
    ]
}

export const loader: LoaderFunction = async({request})=>{
    //get only one id
    const users = await getOtherUser();
    const userId = await requireUserId(request);

    const user = await getUser(request);
    const teams = await getFilterdTeams(userId, {}, {});
    const recentTeams = await getRecentTeams();
    return json({users, teams, recentTeams, user});
}

export default function Home(){
    const {users, user, teams, recentTeams} = useLoaderData();
    return<Layout>
        <Outlet/>
        <div className="h-full flex">
            <UserPanel users={users}/>
            <div className="flex-1 flex flex-col">
                <SearchBar profile={user.profile}/>
                <div className="flex-1 flex">
                    <div className="w-full p-10 flex flex-col gap-y-4">
                        {
                            teams.map(team=><Team_previews key={team.id} team={team} profile={team.author.profile}/>)                            
                        }
                    </div>
                    <RecentBar teams = {recentTeams}/>
                </div>
            </div>
        </div>
    </Layout>
}