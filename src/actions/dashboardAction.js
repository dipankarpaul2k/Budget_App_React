// Toast library imports
import { toast } from "react-toastify";

// Helper imports
import { createBudget, createExpense, deleteItem, waait } from "../helpers";

export default async function dashboardAction({ request }) {
  await waait(500);

  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);
  // console.log("_action: ", _action);
  // console.log("formData: ", formData);

  // New user submission
  if (_action === "newUser") {
    const { userName } = formData;
    try {
      localStorage.setItem("userName", JSON.stringify(userName));
      return toast.success(`Welcome, ${userName}.`);
    } catch (error) {
      throw new Error(
        "There was an error creating your account. Please try again."
      );
    }
  }

  // Create new budget submission
  if (_action === "createBudget") {
    try {
      // Create new budget function
      createBudget({
        name: formData.newBudget,
        amount: formData.newBudgetAmount,
      });
      return toast.success("New budget created.");
    } catch (error) {
      throw new Error(
        "There was an error creating your budget. Please try again."
      );
    }
  }

  // Create new budget submission
  if (_action === "createExpense") {
    try {
      // Create new expense function
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

  // Delete expense item
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
