import { ArrowPathIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export default function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();

  const formRef = useRef();
  const focusRef = useRef();

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      // focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <>
      <div className="form-wrapper">
        <h2 className="h3">
          Add new{" "}
          <span className="accent">
            {budgets.length === 1 && `${budgets.map((b) => b.name)}`}
          </span>{" "}
          Expense
        </h2>

        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
          <input type="hidden" name="_action" value="createExpense" />
          <div className="expense-inputs">
            <div className="grid-xs">
              <label htmlFor="newExpense">Expense Name</label>
              <input
                type="text"
                id="newExpense"
                name="newExpense"
                placeholder="e.g., Coffee"
                ref={focusRef}
                required
              />
            </div>
            <div className="grid-xs">
              <label htmlFor="newExpenseAmount">Amount</label>
              <input
                type="number"
                id="newExpenseAmount"
                name="newExpenseAmount"
                placeholder="e.g., 50"
                inputMode="decimal"
                required
              />
            </div>
          </div>

          <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Choose Budget</label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
              {budgets
                .toSorted((a, b) => a.createdAt - b.createdAt)
                .map((b) => {
                  return (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>Submitting...</span>
                <ArrowPathIcon width={20} />
              </>
            ) : (
              <>
                <span>Add Expense</span>
                <PlayCircleIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
    </>
  );
}
