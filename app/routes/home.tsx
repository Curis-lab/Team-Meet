import { LoaderFunction } from "@remix-run/node"
import { Layout } from "~/components/layout"
import { UserPanel } from "~/components/user-panel"
import { requireUserId } from "~/utils/auth.server"

export default function Home(){
    return(<Layout>
        <div className="h-full flex">
            <UserPanel/>
        </div>
    </Layout>
    )
}