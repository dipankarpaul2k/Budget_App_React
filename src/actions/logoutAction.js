// rrd import
import { redirect } from "react-router-dom";

// Helper function import
import { deleteItem } from "../helpers";

// Toast library import
import { toast } from "react-toastify";

export default async function logoutAction() {
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("You've deleted your account.");
  // redirect user
  return redirect("/");
}
