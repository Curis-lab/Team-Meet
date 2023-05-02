import { sortOptions } from "~/utils/constants";
import { Selectbox } from "./select-box";
import { UserCircle } from "./user-circle";
import { useNavigate } from "@remix-run/react";
import { Profile } from "@prisma/client";

interface props{
    profile: Profile
}

export function SearchBar({profile}: props){
    const navigate = useNavigate();
    return(
        <form className="w-full px-6 flex items-center gap-x-4 border-b-4 border-b-blue-900 border-opacity-30 h-20">
            <div className="flex items-center w-2/5">
                <input type="text" name="filter" className="w-full rounded-xl px-3 py-2" placeholder="Search a message or name"/>
            </div>
            <Selectbox
                containerClassName="w-40"
                className="w-full rounded-xl px-3 py-2 text-gray-400"
                name="sort"
                options={sortOptions}
            />
            <button type="submit" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                Search
            </button>
            <div className="flex-1"></div>
            <UserCircle
            className="h-14 w-14 transition duration-300 ease-in-out hover:scale-110 hover:border-2 hover:border-yellow-300"
            profile={profile}
            onClick={()=> navigate('profile')}
            />
        </form>
    )
}