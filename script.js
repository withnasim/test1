
var totalIncomeValue = parseFloat(localStorage.getItem("totalIncomeValue")) || 0;
var totalExpenseValue = parseFloat(localStorage.getItem("totalExpenseValue")) || 0;

var totalIncomeLabel = document.getElementById("income-amount");
var totalExpenseLabel = document.getElementById("expense-amount");
var balanceLabel = document.getElementById("balance-amount");

var incomeTitle = document.getElementById("input-income-title");
var incomeInput = document.getElementById("input-income-amount");

var expenseTitle = document.getElementById("input-expense-title");
var expenseInput = document.getElementById("input-expense-amount");

var addIncomeBtn = document.querySelector(".add-income-btn");
var addExpenseBtn = document.querySelector(".add-expense-btn"); 
var clearAllBtn = document.querySelector(".clear-all-btn");

var errorMessage = document.querySelector(".error-message");
var successMessage = document.querySelector(".success-message");
var clearMessage = document.querySelector(".clear-message");


// function to update the balance
function calculatedBalance() {
    
    totalIncomeLabel.innerHTML = 'BDT ' + totalIncomeValue.toFixed(2);
    totalExpenseLabel.innerHTML = 'BDT ' + totalExpenseValue.toFixed(2);
    balanceLabel.innerHTML = 'BDT ' + (totalIncomeValue - totalExpenseValue).toFixed(2);

    //update local storage value
    localStorage.setItem("totalIncomeValue", totalIncomeValue);
    localStorage.setItem("totalExpenseValue", totalExpenseValue);
}
// Show values from local storage on page load
calculatedBalance();


// Hide error or success messages after 5 seconds
function hideMessage() {

    setTimeout(function () {
        errorMessage.style.display = "none";
        successMessage.style.display = "none";
        clearMessage.style.display = "none";
    }, 2000);
}


// function to clear all data
function clearAllData() {

    // Clear all data from local storage
    localStorage.removeItem("totalIncomeValue");
    localStorage.removeItem("totalExpenseValue");

    // Reset the default value
    totalIncomeValue =  0;
    totalExpenseValue = 0;

    // Update the income, expense, and balance labels
    calculatedBalance();

    // Showing success message afte clearing data
    clearMessage.style.display = "block";
    clearMessage.innerHTML = "All data has been cleared successfully!";

    // Hide the message after 5 seconds
    hideMessage();
}



// clear all data by clicking the clear all button
if(clearAllBtn) {
    clearAllBtn.addEventListener("click", function(){
        clearAllData();
    });
}



// Income calculation
if (addIncomeBtn) {

    addIncomeBtn.addEventListener ('click', function () {

        var income = parseFloat(incomeInput.value);
    
        if(income > 0 ){
            totalIncomeValue += income; // totalIncomeValue + income;
            incomeInput.value = "";
            calculatedBalance();
    
            successMessage.style.display = "block";
            successMessage.innerHTML = "Income added successfully!";  
        } else {
    
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "Income cannot be empty, zero, or negative. Please enter a valid income amount!";  
        }
    
        // Hide the message after 5 seconds
        hideMessage();
    });

}


// Expense calculation

if (addExpenseBtn) {

    addExpenseBtn.addEventListener('click', function () {

        var expense = parseFloat(expenseInput.value);
        var currentBalance = totalIncomeValue - totalExpenseValue; 
    
        if (expense > currentBalance) {
    
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "You cannot spend more than your current balance. Please earn more to spend more!";   
    
        } else if (expense === currentBalance || expense > 0) {
            totalExpenseValue += expense; 
            expenseInput.value = "";
            calculatedBalance();
    
            successMessage.style.display = "block";
            successMessage.innerHTML = "Expense added successfully!"; 
        } else {
    
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "Expense cannot be empty, zero, or negative. Please enter a valid expense amount!";  
        }
    
        // Hide the message after 5 seconds
        hideMessage();
    });

}