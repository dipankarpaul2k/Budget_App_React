// rrd imports
import { redirect } from "react-router-dom";

// helper functions imports
import { deleteItem, getAllMatchingItems } from "../helpers";
import { toast } from "react-toastify";

export default async function deleteBudgetAction({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully.");
  } catch (error) {
    throw new Error(
      "Threre is an error deleting your budget! Please try again."
    );
  }

  return redirect("/");
}
