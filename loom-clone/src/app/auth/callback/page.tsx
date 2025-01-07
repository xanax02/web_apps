import { onAuthenticateUser } from "@/server-actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  console.log("auth", auth);
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);

  if (auth.status === 403 || auth.status === 400 || auth.status === 500) {
    console.log(auth);
    return redirect("/");
  }
};

export default AuthCallbackPage;
