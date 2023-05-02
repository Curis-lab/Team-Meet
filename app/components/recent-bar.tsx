import { User, Team } from "@prisma/client"
import { UserCircle } from "./user-circle";
import { emojiMap } from "~/utils/constants";


interface TeamWithRecipient extends Team {
    recipient: User
}

export function RecentBar({teams}:{teams: TeamWithRecipient[]}){

    return(
        <div className="w-1/5 border-l-4 border-l-yellow-300 flex flex-col items-center">
            <h2 className="text-xl text-yellow-300 font-semibold my-6">Recent Teams</h2>
            <div className="h-full flex flex-col gap-y-10 mt-10">
                {teams.map(t=>
                    <div className="h-24 w-24 relative" key={t.recipient.id}>
                        <UserCircle profile={t.recipient.profile} className="h-24 w-24 mx-auto flex-shrink-0"/>
                        <div className="h-8 w-8 text-xl bottom-2 right-4 rounded-full absolute flex justify-center items-center">
                            {emojiMap[t?.style?.emoji || 'THUMBSUP']}
                        </div>
                    </div>)}
            </div>
        </div>
    )
}