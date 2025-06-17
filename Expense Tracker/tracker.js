// DOM Elements
const formEle = document.querySelector("#myForm");
const listContainer = document.querySelector(".list-container");
const deleteAllBtn = document.querySelector("#deleteall");
const totalExpP = document.querySelector("#total-expense-amount");
const totalIncP = document.querySelector("#total-income-amount");
const submitBtn = document.querySelector("#submitbtn"); // Make sure your form has this button

let transactions = [];
let editingId = null; // Tracks which transaction is being updated

// Get data from localStorage
const getFromLS = () => {
  const data = JSON.parse(localStorage.getItem("transactions"));
  if (data) {
    transactions = data;
    displayTransactions();
  } else {
    alert("Not Available");
  }
};

// Save data to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  displayTransactions();
};

// Display all transactions
const displayTransactions = () => {
  listContainer.innerHTML = "";
  displayTotalAmounts();

  transactions.forEach((transaction) => {
    const tDiv = document.createElement("div");
    tDiv.classList.add("transaction");
    tDiv.dataset.id = transaction.id;
    tDiv.style.backgroundColor =
      transaction.type === "Expense" ? "#fdecea" : "#e7f9ed";

    tDiv.innerHTML = `
      <h4 class="amnt">${transaction.amount}</h4>
      <p class="description">${transaction.description}</p>
      <button id="deletebtn" type="button">❌</button>
      <button id="updatebtn" type="button">✏️</button>
    `;

    tDiv.addEventListener("click", handleTransaction);
    listContainer.appendChild(tDiv);
  });
};

// Display total expense and income
const displayTotalAmounts = () => {
  const allExpense = transactions.filter((t) => t.type === "Expense");
  const allIncome = transactions.filter((t) => t.type === "Income");

  const totalExp = allExpense.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalIncome = allIncome.reduce((acc, curr) => acc + Number(curr.amount), 0);

  totalExpP.textContent = totalExp;
  totalIncP.textContent = totalIncome;
};

// Delete all transactions
const deletAllTransactions = () => {
  const userConfirmed = confirm("Are you sure you want to delete all items?");
  if (userConfirmed) {
    transactions = [];
    saveToLocalStorage();
  }
};

// Handle Delete and Update button clicks
const handleTransaction = (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const id = e.target.parentElement.dataset.id;

  if (e.target.id === "deletebtn") {
    const userConfirmed = confirm("Are you sure you want to delete this item?");
    if (userConfirmed) {
      transactions = transactions.filter((t) => t.id != id);
      saveToLocalStorage();
    }
  }

  if (e.target.id === "updatebtn") {
    const t = transactions.find((t) => t.id == id);

    // Fill form with transaction data
    formEle.amount.value = t.amount;
    formEle.type.value = t.type;
    formEle.desc.value = t.description;
    formEle.category.value = t.category;

    editingId = t.id;
    submitBtn.textContent = "Update Transaction";
  }
};

// Handle form submit (add or update)
formEle.addEventListener("submit", function (e) {
  e.preventDefault();

  const fd = new FormData(this);
  const amount = fd.get("amount");
  const type = fd.get("type");
  const desc = fd.get("desc");
  const category = fd.get("category");

  if (editingId) {
    // Update existing transaction
    transactions = transactions.map((t) =>
      t.id === editingId
        ? { ...t, amount, type, description: desc, category }
        : t
    );

    editingId = null;
    submitBtn.textContent = "Add Transaction"; // Reset button text
  } else {
    // Add new transaction
    const newTransaction = {
      id: transactions.length ? transactions.length + 1 : 1,
      amount,
      type,
      description: desc,
      category,
    };

    transactions.push(newTransaction);
  }

  formEle.reset(); // Clear form fields
  saveToLocalStorage();
});

// Event listeners
deleteAllBtn.addEventListener("click", deletAllTransactions);

// Init
getFromLS();
