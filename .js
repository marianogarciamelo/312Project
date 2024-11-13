// Storage for incomes, expenses, and savings goals
const incomeList = [];
const expenseList = [];
const savingsGoals = [];

/**
 * Adds a new income entry to the incomeList array.
 */
function addIncome() {
    const source = document.getElementById('incomeSource').value.trim();
    const amount = parseFloat(document.getElementById('incomeAmount').value);

    if (source && !isNaN(amount) && amount > 0) {
        incomeList.push({ source, amount });
        alert("Income added successfully!");
        resetInputFields(['incomeSource', 'incomeAmount']);
    } else {
        alert("Please enter a valid income source and amount.");
    }
}

/**
 * Adds a new expense entry to the expenseList array.
 */
function addExpense() {
    const category = document.getElementById('expenseCategory').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (category && !isNaN(amount) && amount > 0) {
        expenseList.push({ category, amount });
        alert("Expense added successfully!");
        resetInputFields(['expenseCategory', 'expenseAmount']);
    } else {
        alert("Please enter a valid expense category and amount.");
    }
}

/**
 * Adds a new savings goal entry to the savingsGoals array.
 */
function addSavingsGoal() {
    const goalName = document.getElementById('goalName').value.trim();
    const targetAmount = parseFloat(document.getElementById('targetAmount').value);

    if (goalName && !isNaN(targetAmount) && targetAmount > 0) {
        savingsGoals.push({ goalName, targetAmount });
        alert("Savings goal added successfully!");
        resetInputFields(['goalName', 'targetAmount']);
    } else {
        alert("Please enter a valid goal name and target amount.");
    }
}

/**
 * Calculates and displays a summary of income, expenses, and savings goals.
 */
function viewSummary() {
    const totalIncome = incomeList.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenseList.reduce((sum, expense) => sum + expense.amount, 0);
    let summaryText = `Total Income: $${totalIncome.toFixed(2)}\nTotal Expenses: $${totalExpenses.toFixed(2)}\n`;

    summaryText += "\nSavings Goals:\n";
    savingsGoals.forEach(goal => {
        summaryText += `- ${goal.goalName}: Target $${goal.targetAmount.toFixed(2)}\n`;
    });

    document.getElementById('summary').textContent = summaryText;
}

/**
 * Resets the values of input fields with the specified IDs.
 * @param {Array} fieldIds - Array of field IDs to reset
 */
function resetInputFields(fieldIds) {
    fieldIds.forEach(id => document.getElementById(id).value = '');
}
