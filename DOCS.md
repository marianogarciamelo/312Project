# Budget Management

## Key Functions

- `updateRemainingIncome()`: Updates the displayed remaining income based on user expenses.
- `updateCategoryOptions()`: Refreshes the dropdown for expense categories after a new category is added.
- `updateBudgetList()`: Displays the budget breakdown for each category, showing allocated, spent, and remaining amounts.
- `updateChart()`: Updates the pie chart with expense data for all categories.

## Event Handlers

- `incomeForm.addEventListener("submit")`: Captures and locks the user's monthly income.
- `categoryForm.addEventListener("submit")`: Allows users to create budget categories.
- `expenseForm.addEventListener("submit")`: Records expenses and updates the remaining income, budget list, and pie chart.

---

# Goal Tracking

## Key Functions

- `updateGoalList()`: Displays the list of user-defined financial goals, including progress bars and monthly saving suggestions.
- `addToGoal(index)`: Allows users to add funds to a specific goal.
- `removeGoal(index)`: Deletes a goal and updates the goal list.
- `getMonthsToTargetDate(targetMonth)`: Calculates the number of months between today and the goal's deadline for monthly saving suggestions.

## Event Handlers

- `goalForm.addEventListener("submit")`: Captures goal details (name, target, deadline) and adds them to the goal list.

## Dynamic UI

- Goals are displayed with progress bars calculated based on saved amounts relative to the target.
- Monthly saving suggestions are computed using the `getMonthsToTargetDate` function.

---

# Investment Tracking

## Key Functions

- `renderInvestments()`: Displays all logged investments, sorts their data points by date, and renders individual line charts.
- `updateInvestment(index)`: Allows users to add new data points (value and timestamp) to an existing investment.

## Event Handlers

- `investmentForm.addEventListener("submit")`: Captures investment details (name, value, date) and logs them into the `investments` array.

## Dynamic UI

- Each investment is represented with a line chart showing value trends over time. Data points are dynamically updated as users add new information.
