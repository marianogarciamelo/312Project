// Storage for incomes, expenses, savings goals, and stocks
const incomeList = [];
const expenseList = [];
const savingsGoals = [];
const stocks = [];

/**
 * Adds a new income entry to the incomeList array.
 */
function addIncome() {
  const source = document.getElementById("incomeSource").value.trim();
  const amount = parseFloat(document.getElementById("incomeAmount").value);

  if (source && !isNaN(amount) && amount > 0) {
    incomeList.push({ source, amount });
    alert("Income added successfully!");
    resetInputFields(["incomeSource", "incomeAmount"]);
  } else {
    alert("Please enter a valid income source and amount.");
  }
}

/**
 * Adds a new expense entry to the expenseList array.
 */
function addExpense() {
  const category = document.getElementById("expenseCategory").value.trim();
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if (category && !isNaN(amount) && amount > 0) {
    expenseList.push({ category, amount });
    alert("Expense added successfully!");
    resetInputFields(["expenseCategory", "expenseAmount"]);
  } else {
    alert("Please enter a valid expense category and amount.");
  }
}

/**
 * Adds a new savings goal entry to the savingsGoals array.
 */
function addSavingsGoal() {
  const goalName = document.getElementById("goalName").value.trim();
  const targetAmount = parseFloat(
    document.getElementById("targetAmount").value
  );

  if (goalName && !isNaN(targetAmount) && targetAmount > 0) {
    savingsGoals.push({ goalName, targetAmount });
    alert("Savings goal added successfully!");
    resetInputFields(["goalName", "targetAmount"]);
  } else {
    alert("Please enter a valid goal name and target amount.");
  }
}

/**
 * Calculates and displays a summary of income, expenses, and savings goals.
 */
function viewSummary() {
  const totalIncome = incomeList.reduce(
    (sum, income) => sum + income.amount,
    0
  );
  const totalExpenses = expenseList.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  let summaryText = `Total Income: $${totalIncome.toFixed(
    2
  )}\nTotal Expenses: $${totalExpenses.toFixed(2)}\n`;

  summaryText += "\nSavings Goals:\n";
  savingsGoals.forEach((goal) => {
    summaryText += `- ${goal.goalName}: Target $${goal.targetAmount.toFixed(
      2
    )}\n`;
  });

  document.getElementById("summary").textContent = summaryText;
}

/**
 * Resets the values of input fields with the specified IDs.
 * @param {Array} fieldIds - Array of field IDs to reset
 */
function resetInputFields(fieldIds) {
  fieldIds.forEach((id) => (document.getElementById(id).value = ""));
}

/**
 * Adds a stock to the tracking list and fetches its price in real time.
 */
async function addStock() {
  const ticker = document.getElementById("stockTicker").value.trim().toUpperCase();
  const shares = parseFloat(document.getElementById("stockShares").value);

  if (ticker && !isNaN(shares) && shares > 0) {
    const price = await fetchStockPrice(ticker);
    if (price !== null) {
      stocks.push({ ticker, shares, price });
      displayStocks();
      resetInputFields(["stockTicker", "stockShares"]);
    } else {
      alert("Invalid stock ticker. Please try again.");
    }
  } else {
    alert("Please enter a valid ticker and number of shares.");
  }
}

/**
 * Fetches the stock price for a given ticker.
 * Replace the API endpoint with a real one when available.
 */
async function fetchStockPrice(ticker) {
  const apiKey = "YOUR_FINNHUB_API_KEY"; // Replace with your API key
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
    );
    const data = await response.json();
    return data.c || null; // `c` is the current price
  } catch (error) {
    console.error("Error fetching stock price:", error);
    return null;
  }
}

/**
 * Displays the tracked stocks with their calculated values.
 */
function displayStocks() {
  const stockList = document.getElementById("stockList");
  stockList.innerHTML = ""; // Clear the list

  stocks.forEach((stock, index) => {
    const value = (stock.shares * stock.price).toFixed(2);
    const stockItem = document.createElement("div");
    stockItem.classList.add("stock-item");
    stockItem.innerHTML = `
      <span>${stock.ticker}: ${stock.shares} shares @ $${stock.price} = $${value}</span>
      <button onclick="removeStock(${index})">Remove</button>
    `;
    stockList.appendChild(stockItem);
  });
}

/**
 * Removes a stock from the tracking list.
 * @param {number} index - Index of the stock to remove
 */
function removeStock(index) {
  stocks.splice(index, 1);
  displayStocks();
}
