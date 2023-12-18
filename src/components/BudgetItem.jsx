//
import { Form, Link } from "react-router-dom";

//
import { calcSpentBudget, formatCurrency, formatPercentage } from "../helpers";

//
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function BudgetItem({ budget, showDelete = false }) {
  const { id, name, amount, color } = budget;

  const spent = calcSpentBudget(id);
  const remaining = amount - spent;
  const percentage = formatPercentage(spent / amount);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {percentage}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} Spent</small>
        {remaining > 0 ? (
          <small>{formatCurrency(remaining)} Remaining</small>
        ) : (
          <small>Budget exceeded by {formatCurrency(Math.abs(remaining))}</small>
        )}
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(e) => {
              if (
                !confirm(
                  "Are you sure you want to delete this budget? Your data will be deleted permanently."
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
}
