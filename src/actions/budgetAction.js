// Toast library
import { toast } from "react-toastify";
import { createExpense, deleteItem, waait } from "../helpers";

export default async function budgetAction({ request }) {
  await waait(200);

  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);

  // Create new budget submission
  if (_action === "createExpense") {
    try {
      createExpense({
        name: formData.newExpense,
        amount: formData.newExpenseAmount,
        budgetId: formData.newExpenseBudget,
      });

      return toast.success(`Expense ${formData.newExpense} added.`);
    } catch (error) {
      throw new Error(
        "There was an error creating your expense. Please try again."
      );
    }
  }

  // Delete item from expenses list
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
