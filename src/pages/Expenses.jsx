// rrd imports
import { useLoaderData } from "react-router-dom";

// helper function imports
import { fetchData } from "../helpers";

// Component imports
import Table from "../components/Table";

// Loader
export const expensesLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
};

export default function Expenses() {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses}/>
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
}
