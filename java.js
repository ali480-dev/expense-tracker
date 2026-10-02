let count = 0;

const expenseInput = document.getElementById("expenseInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenselist");
const amount = document.getElementById("amount");
const total = document.getElementById("showtotalexpense");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// ================= ADD EXPENSE =================

addExpenseBtn.addEventListener("click", function () {

    const expenseValue = expenseInput.value.trim();

    if (expenseValue === "") {
        expenseList.textContent = "Please enter an expense";
        return;
    }

    if (amount.value.trim() === "") {
        expenseList.textContent = "Please enter an Amount";
        return;
    }

    const showamount = Number(amount.value.trim());
    let currentamount = showamount;

    if (showamount <= 0) {
        expenseList.textContent = "Amount must be greater than 0";
        return;
    }


    // Update total
    count = count + showamount;
    total.textContent = "Total Expense is: " + count;


    // Create list item
    const li = document.createElement("li");

    const expenseText = document.createElement("span");

    expenseText.textContent =
        "Expense is " + expenseValue +
        ", Amount is= " + currentamount;

    li.appendChild(expenseText);


    // Create Edit button
    const editbtn = document.createElement("button");

    editbtn.textContent = "Edit";

    li.appendChild(editbtn);


    // Create expense object
    let expense = {
        id: Date.now(),
        name: expenseValue,
        amount: showamount
    };


    // Add object to array
    expenses.push(expense);

    const expenseId = expense.id;


    // ================= EDIT =================

    editbtn.addEventListener("click", function () {

        const newExpense = prompt("Enter New Expense");
        const newamount = prompt("Enter Expense amount");

        if (newExpense === null || newamount === null) {
            return;
        }

        const newamount1 = Number(newamount);

        if (newExpense.trim() === "" || newamount1 <= 0) {
            return;
        }


        // Update total
        count -= currentamount;
        count += newamount1;

        currentamount = newamount1;


        // Find the correct expense object
        const selectedExpense = expenses.find(function (expense) {
            return expense.id === expenseId;
        });


        // Update object
        selectedExpense.name = newExpense;
        selectedExpense.amount = newamount1;


        // Save updated array
        localStorage.setItem("expenses", JSON.stringify(expenses));


        // Update screen
        expenseText.textContent =
            "Expense is " + newExpense +
            ", Amount is= " + newamount1;

        total.textContent = "Total Expense is: " + count;

    });


    // ================= DELETE =================

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    li.appendChild(deleteBtn);


    deleteBtn.addEventListener("click", function () {

        count = count - currentamount;


        // Find array index using ID
        const index = expenses.findIndex(function (expense) {
            return expense.id === expenseId;
        });


        // Remove from array
        expenses.splice(index, 1);


        // Save updated array
        localStorage.setItem("expenses", JSON.stringify(expenses));


        // Remove from screen
        li.remove();


        // Update total
        total.textContent = "Total Expense is: " + count;

    });


    // Clear inputs
    expenseInput.value = "";
    amount.value = "";


    // Show on screen
    expenseList.appendChild(li);


    // Save to localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

});


// ================= LOAD SAVED EXPENSES =================

expenses.forEach(function (expense) {

    const li = document.createElement("li");

    const expenseText = document.createElement("span");

    expenseText.textContent =
        "Expense name = " + expense.name +
        ", and amount = " + expense.amount;

    li.appendChild(expenseText);


    // Edit button
    const editbtn = document.createElement("button");

    editbtn.textContent = "Edit";

    li.appendChild(editbtn);


    // Delete button
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    li.appendChild(deleteBtn);


    const expenseId = expense.id;


    // ================= EDIT SAVED EXPENSE =================

    editbtn.addEventListener("click", function () {

        const newExpense = prompt("Enter New Expense", expense.name);
        const newamount = prompt("Enter Expense amount", expense.amount);

        if (newExpense === null || newamount === null) {
            return;
        }

        const newamount1 = Number(newamount);

        if (newExpense.trim() === "" || newamount1 <= 0) {
            return;
        }


        count -= expense.amount;
        count += newamount1;


        const selectedExpense = expenses.find(function (expense) {
            return expense.id === expenseId;
        });


        selectedExpense.name = newExpense;
        selectedExpense.amount = newamount1;


        expenseText.textContent =
            "Expense name = " + newExpense +
            ", and amount = " + newamount1;


        localStorage.setItem("expenses", JSON.stringify(expenses));

        total.textContent = "Total Expense is: " + count;

    });


    // ================= DELETE SAVED EXPENSE =================

    deleteBtn.addEventListener("click", function () {

        count = count - expense.amount;


        const index = expenses.findIndex(function (expense) {
            return expense.id === expenseId;
        });


        expenses.splice(index, 1);


        localStorage.setItem("expenses", JSON.stringify(expenses));


        li.remove();


        total.textContent = "Total Expense is: " + count;

    });


    expenseList.appendChild(li);


    // Add saved amount to total
    count = count + expense.amount;

});


total.textContent = "Total Expense is: " + count;

