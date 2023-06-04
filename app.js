var monthlyBudget = 0;
var expenses = [];

function addBudget() {
    monthlyBudget = parseFloat(document.getElementById("budgetInput").value) || 0;
    document.getElementById("budgetInput").value = "";
    updateBudget();
}

function addExpense() {
    var category = document.getElementById("categoryInput").value;
    var description = document.getElementById("descriptionInput").value;
    var amount = parseFloat(document.getElementById("amountInput").value) || 0;
    var date = document.getElementById("dateInput").value;

    if (!category || !description || amount === 0 || !date) {
        alert("Please fill in all fields before adding an expense.");
        return;
    }

    expenses.push({ category, description, amount, date });

    document.getElementById("categoryInput").value = "";
    document.getElementById("descriptionInput").value = "";
    document.getElementById("amountInput").value = "";
    document.getElementById("dateInput").value = "";

    updateExpenses();
    updateBudget();
}

function updateExpenses() {
    var expensesList = document.getElementById("expensesList");
    expensesList.innerHTML = "";

    expenses.forEach((expense, index) => {
        var row = expensesList.insertRow();
        var categoryCell = row.insertCell();
        var descriptionCell = row.insertCell();
        var amountCell = row.insertCell();
        var dateCell = row.insertCell();
        var actionsCell = row.insertCell();

        var categoryName = getCategoryName(expense.category);

        categoryCell.innerHTML = "<b>" + categoryName + "</b>";
        descriptionCell.textContent = expense.description;
        amountCell.textContent = `$${expense.amount.toFixed(2)}`;
        dateCell.textContent = expense.date;

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.setAttribute("onclick", "deleteExpense(" + index + ")");
        actionsCell.appendChild(deleteButton);
    });
}

function updateBudget() {
    var totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    var remainingBudget = monthlyBudget - totalExpenses;

    document.getElementById("budgetDisplay").textContent = `$${monthlyBudget.toFixed(2)}`;
    document.getElementById("remainingBudgetDisplay").textContent = `$${remainingBudget.toFixed(2)}`;
}

function getCategoryName(categoryId) {
    switch (categoryId) {
        case "1":
            return "Groceries";
        case "2":
            return "Medicines";
        case "3":
            return "Fashion";
        case "4":
            return "Electronics";
        case "5":
            return "Sports and Outdoor";
        default:
            return "";
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenses();
    updateBudget();
}