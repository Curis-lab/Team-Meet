import { LoaderFunction, redirect } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader: LoaderFunction = async({request})=>{
  // await requireUserId(request);
  return redirect("/home");
}

// export default function Index() {
//   return redirect('/home');
// }
