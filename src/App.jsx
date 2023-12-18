// Imports from "react-router-dom"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Toast library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import Main, { mainLoader } from "./layouts/Main";

// Pages
import DashBoard, { dashboardLoader } from "./pages/DashBoard";
import Expenses, { expensesLoader } from "./pages/Expenses";
import BudgetPage, { budgetLoader } from "./pages/BudgetPage";
import Error from "./pages/Error";

// Actions
import dashboardAction from "./actions/dashboardAction";
import expensesAction from "./actions/expensesAction";
import logoutAction from "./actions/logoutAction";
import budgetAction from "./actions/budgetAction";
import deleteBudgetAction from "./actions/deleteBudgetAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    loader: mainLoader,
    children: [
      {
        index: true,
        element: <DashBoard />,
        errorElement: <Error />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        errorElement: <Error />,
        loader: budgetLoader,
        action: budgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudgetAction,
          }
        ]
      },
      {
        path: "expenses",
        element: <Expenses />,
        errorElement: <Error />,
        loader: expensesLoader,
        action: expensesAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
