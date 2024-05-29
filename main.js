#!usr/bin/env
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blueBright(" \n\t *********** Welcome to our OOP Bank! ***********"));
;
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.greenBright(`Withdrawal of $${amount} successful.  Remaining balance: $${this.balance}`));
        }
        else {
            console.log(chalk.redBright("Insufficient balance."));
        }
    }
    // cresit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.greenBright(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`));
    }
    // check balance
    checkBalance() {
        console.log(chalk.greenBright(`Current balance:$${this.balance}`));
    }
}
// customer class
class customer {
    firstName;
    lastName;
    gendar;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobilNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gendar = gender;
        this.age = age;
        this.mobileNumber = mobilNumber;
        this.account = account;
    }
}
// creat bank accounts
const accounts = [
    new BankAccount(1002, 500),
    new BankAccount(1003, 1000),
    new BankAccount(1004, 2000),
];
// create customars
const customers = [
    new customer("Maryam", "naz", "female", 20, 32199999999, accounts[0]),
    new customer("Areeba", "naz", "female", 20, 31000000000, accounts[1]),
    new customer("Hasnain", "Ahmed", "male", 15, 33777777777, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: (chalk.cyan("Enter your account number:"))
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.yellowBright(`\n\t Welcome, ${customer?.firstName} ${customer?.lastName}!\n`));
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: (chalk.cyan("Select an operation")),
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: (chalk.cyan("Enter the amount to deposit:"))
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: (chalk.cyan("Enter the amount to Withdraw:"))
                    });
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.yellow("Exiting bank program..."));
                    console.log(chalk.blueBright("\n\t ************* Thank you for using our bank services. *************** "));
                    return;
            }
        }
        else {
            console.log(chalk.redBright("\n\tInvalid account number. please try again."));
        }
    } while (true);
}
service();
