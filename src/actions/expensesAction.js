// Toast library
import { toast } from "react-toastify";
import { deleteItem, waait } from "../helpers";

export default async function expensesAction({ request }) {
  await waait(200);

  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: formData.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (error) {
      throw new Error(
        "There was an error deleting your expense. Please try again."
      );
    }
  }
}
