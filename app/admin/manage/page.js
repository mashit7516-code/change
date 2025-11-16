import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPanel from "./manage";

export default async function Adminpage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) redirect("/admin/login");

  try {
    jwt.verify(token.value, process.env.JWT_SECRET);
  } catch {
    redirect("/admin/login");
  }

  // ✅ If we reach here, token is valid
  return <AdminPanel />;
}
