document.addEventListener("DOMContentLoaded", () => {
  const incomeForm = document.getElementById("incomeForm");
  const categoryForm = document.getElementById("categoryForm");
  const expenseForm = document.getElementById("expenseForm");
  const incomeInput = document.getElementById("income");
  const categoryNameInput = document.getElementById("categoryName");
  const categoryBudgetInput = document.getElementById("categoryBudget");
  const expenseCategorySelect = document.getElementById("expenseCategory");
  const expenseAmountInput = document.getElementById("expenseAmount");
  const remainingIncomeDisplay = document.getElementById("remainingIncome");
  const budgetList = document.getElementById("budgetList");
  const warningMessage = document.getElementById("warning");
  const expenseChartCanvas = document.getElementById("expenseChart");
  let totalIncome = 0;
  let remainingIncome = 0;
  const categories = {};

  // Initialize the Pie Chart
  const expenseChart = new Chart(expenseChartCanvas, {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
            "#ff9f40",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    totalIncome = parseFloat(incomeInput.value) || 0;
    remainingIncome = totalIncome;
    updateRemainingIncome();
    incomeInput.disabled = true;
  });

  categoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const categoryName = categoryNameInput.value.trim();
    const categoryBudget = parseFloat(categoryBudgetInput.value) || 0;

    if (categoryName && categoryBudget > 0) {
      categories[categoryName] = { budget: categoryBudget, expenses: 0 };
      updateCategoryOptions();
      updateBudgetList();
    }

    categoryNameInput.value = "";
    categoryBudgetInput.value = "";
  });

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = expenseCategorySelect.value;
    const expense = parseFloat(expenseAmountInput.value) || 0;

    if (category && expense > 0 && remainingIncome >= expense) {
      categories[category].expenses += expense;
      remainingIncome -= expense;

      updateRemainingIncome();
      updateBudgetList();
      updateChart();
    } else if (remainingIncome < expense) {
      warningMessage.style.display = "block";
    }

    expenseAmountInput.value = "";
  });

  function updateRemainingIncome() {
    remainingIncomeDisplay.textContent = `Remaining Monthly Income: $${remainingIncome}`;
  }

  function updateCategoryOptions() {
    expenseCategorySelect.innerHTML =
      '<option value="" disabled selected>Select a category</option>';
    for (const categoryName in categories) {
      const option = document.createElement("option");
      option.value = categoryName;
      option.textContent = categoryName;
      expenseCategorySelect.appendChild(option);
    }
  }

  function updateBudgetList() {
    budgetList.innerHTML = "";
    for (const [categoryName, data] of Object.entries(categories)) {
      const listItem = document.createElement("li");
      listItem.textContent = `${categoryName}: Budget $${data.budget}, Spent $${
        data.expenses
      }, Remaining $${data.budget - data.expenses}`;
      budgetList.appendChild(listItem);
    }
  }

  function updateChart() {
    const labels = Object.keys(categories);
    const data = labels.map(
      (categoryName) => categories[categoryName].expenses
    );

    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = data;
    expenseChart.update();
  }
});
/* ---------------- GOALS FUNCTIONALITY ---------------- */
const goalForm = document.getElementById("goalForm");
const goalsContainer = document.getElementById("goalsContainer");
function getMonthsToTargetDate(targetMonth) {
  // Parse the target month
  const [year, month] = targetMonth.split("-").map(Number);

  // Create a date object for the target month
  const targetDate = new Date(year, month - 1); // month is 0-based in JavaScript

  // Get today's date
  const today = new Date();

  // Calculate the difference in years and months
  const yearsDiff = targetDate.getFullYear() - today.getFullYear();
  const monthsDiff = targetDate.getMonth() - today.getMonth();

  // Total difference in months
  const totalMonths = yearsDiff * 12 + monthsDiff;

  return totalMonths;
}
const goals = [];

// Add a new goal
goalForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const goalName = document.getElementById("goalName").value.trim();
  const goalTarget =
    parseFloat(document.getElementById("goalTarget").value) || 0;
  const goalDeadline = document.getElementById("goalDeadline").value;

  if (goalName && goalTarget > 0 && goalDeadline) {
    const newGoal = {
      name: goalName,
      target: goalTarget,
      saved: 0,
      deadline: goalDeadline,
    };

    goals.push(newGoal);
    updateGoalList();
  }

  goalForm.reset();
});

// Update the goal list display
function updateGoalList() {
  goalsContainer.innerHTML = "";

  goals.forEach((goal, index) => {
    const listItem = document.createElement("li");
    months = getMonthsToTargetDate(goal.deadline);
    listItem.innerHTML = `
            <h3>${goal.name}</h3>
            <p>Target: $${goal.target}</p>
            <p>Saved: $${goal.saved}</p>
            <p>Deadline: ${goal.deadline}</p>
            <p>Monthly Goal: $${Math.round(
              (goal.target - goal.saved) / months
            )}</p>           
            <div class="goal-progress-bar">
                <div class="progress" style="width: ${
                  (goal.saved / goal.target) * 100
                }%"></div>
            </div>
            <button class="btn btn-success" onclick="addToGoal(${index})">Add Funds</button>
            <button class="btn btn-danger" onclick="removeGoal(${index})">Remove Goal</button>
        `;

    goalsContainer.appendChild(listItem);
  });
}

// Add funds to a goal
window.addToGoal = (index) => {
  const amount = parseFloat(prompt("Enter amount to add:")) || 0;

  if (amount > 0) {
    goals[index].saved += amount;
    updateGoalList();
  }
};

// Remove a goal
window.removeGoal = (index) => {
  goals.splice(index, 1);
  updateGoalList();
};
/* ---------------- INVESTMENT FUNCTIONALITY ---------------- */
const investmentForm = document.getElementById("investmentForm");
const investmentsContainer = document.getElementById("investmentsContainer");

const investments = []; // Array to store investments

// Add a new investment
investmentForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (document.getElementById("investedDate").value != "") {
    const name = document.getElementById("investmentName").value.trim();
    const initialValue =
      parseFloat(document.getElementById("investmentValue").value) || 0;
    const investedDate = document.getElementById("investedDate").value;
    if (name && initialValue > 0) {
      const newInvestment = {
        name,
        values: [{ value: initialValue, timestamp: investedDate }],
      };

      investments.push(newInvestment);
      renderInvestments();
    }

    investmentForm.reset();
  } else {
    alert("Please complete form");
  }
});

// Render Investments
function renderInvestments() {
  investmentsContainer.innerHTML = "";

  investments.forEach((investment, index) => {
    investment.values.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <h3>${investment.name}</h3>
            <p>Latest Value: $${
              investment.values[investment.values.length - 1].value
            }</p>
            <canvas id="investmentChart-${index}" width="400" height="200"></canvas>
            <button onclick="updateInvestment(${index})" class="btn btn-primary">Add Data Point</button>
        `;

    investmentsContainer.appendChild(listItem);
    // Render chart for each investment
    const ctx = document
      .getElementById(`investmentChart-${index}`)
      .getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: investment.values.map((value) => value.timestamp),
        datasets: [
          {
            label: `${investment.name} Growth`,
            data: investment.values.map((value) => value.value),
            borderColor: "#007bff",
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  });
}

// Update an existing investment
window.updateInvestment = (index) => {
  const newValue =
    parseFloat(prompt("Enter the value for this data point ($):")) || 0;
  if (newValue > 0) {
    const date = prompt("Enter the date of this data point (YYYY-MM-DD)");

    investments[index].values.push({ value: newValue, timestamp: date });

    renderInvestments();
  }
};
