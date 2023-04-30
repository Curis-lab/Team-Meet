import { Profile, Team as ITeam } from "@prisma/client"
import { UserCircle } from "./user-circle";
import { backgroundColorMap, colorMap, emojiMap } from "~/utils/constants";

interface props{
    profile: Profile;
    team: Partial<ITeam>
}

export default function Team_previews({profile, team}: props){
    //previews function
    return(
        <div className={`flex ${ backgroundColorMap['RED'] } p-4 rounded-xl w-full gap-x-2 relative`}>
            <div>
                <UserCircle profile={profile} className="h-16 w-16"/>
            </div>
            <div className="flex flex-col">
                <p className={` ${colorMap['WHITE']} font-bold text-lg whitespace-pre-wrap break-all`}>
                    {profile.firstName} {profile.lastName}
                </p>
                <p>
                    {team.message}
                </p>
            </div>
            <div>
                    {emojiMap[team.style?.emoji || 'THUMBSUP']}
            </div>
        </div>
    )
}