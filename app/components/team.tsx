import { UserCircle } from "./user-circle";
import { Profile } from "@prisma/client";

interface props {
    profile: Profile,
}

export function Team_template({profile}: props){
    return(
        <div>
            <h1>hello</h1>
            <div>
                <UserCircle profile={profile} className="h-16 w-16"/>
            </div>
            <div className="flex flex-col">
                <p>
                    {profile.firstName} {profile.lastName}
                </p>
            </div>
        </div>
    )
}