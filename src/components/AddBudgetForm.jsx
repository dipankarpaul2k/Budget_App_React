//
import { useEffect, useRef } from "react";

//
import { Form, useFetcher } from "react-router-dom";

// Icon
import { CurrencyRupeeIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function AddBudgetForm(params) {
  const fetcher = useFetcher();

  const formRef = useRef();
  const focusRef = useRef();
  
  const isSubmitting = fetcher.state === "submitting";
  
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>

      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <input type="hidden" name="_action" value="createBudget" />
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            id="newBudget"
            name="newBudget"
            placeholder="e.g. Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            id="newBudgetAmount"
            name="newBudgetAmount"
            placeholder="e.g. 300"
            inputMode="decimal"
            required
          />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span>Submitting...</span>
              <ArrowPathIcon width={20} />
            </>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyRupeeIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
