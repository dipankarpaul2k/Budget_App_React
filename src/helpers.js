// Waait function
export const waait = (miliSec) => {
  return new Promise((res) => setTimeout(res, miliSec));
};

// Local storage functions
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setData = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

// Delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    // return localStorage.setItem(key, JSON.stringify(newData));
    return setData(key, newData);
  }
  return localStorage.removeItem(key);
};

// Colors
export const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Create a new budget item
export const createBudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  setData("expenses", []);
  return setData("budgets", [...existingBudgets, newBudget]);
};

// Create a new expense item
export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return setData("expenses", [...existingExpenses, newExpense]);
};

// Get all matching items
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category);
  return data.filter((item) => item[key] === value);
};

// FORMATTING

// Format currency
export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

/* Epoch time is milliseconds elapsed since the epoch, 
beginning of January 1, 1970, UTC. 
*/
export const formatEpochTime = (epochTime) =>
  new Date(epochTime).toLocaleDateString();

// Calculate amount spent from budget
export const calcSpentBudget = (budgetId) => {
  // Calculate amount spent
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};
