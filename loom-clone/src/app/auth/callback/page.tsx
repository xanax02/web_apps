import { onAuthenticateUser } from "@/server-actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  
  if (auth.status === 200 || auth.status === 201) {
    // Check if workspace array exists and has at least one element
    if (auth.user?.workspace && auth.user.workspace.length > 0 && auth.user.workspace[0].id) {
      return redirect(`/dashboard/${auth.user.workspace[0].id}`);
    } else {
      console.log("No workspace found for user", auth.user);
      // Redirect to a fallback route when no workspace is available
      return redirect("/dashboard");
    }
  }

  if (auth.status === 403 || auth.status === 400 || auth.status === 500) {
    console.log("status", auth.status)
    return redirect("/");
  }
  
  // Fallback for any other unexpected scenarios
  return redirect("/");
};

export default AuthCallbackPage;
