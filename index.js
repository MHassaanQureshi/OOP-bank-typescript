#! /usr/bin/env node
import inquirer from 'inquirer';
class BankAccount {
    balance;
    constructor(initialBalance = 0) {
        this.balance = initialBalance;
    }
    getBalance() {
        return this.balance;
    }
    credit(amount) {
        if (amount <= 0) {
            console.log('Amount to be credited should be more than zero.');
            return;
        }
        this.balance += amount;
        console.log(`Credited: $${amount}. New Balance: $${this.getBalance()}`);
    }
    debit(amount) {
        if (amount <= 0) {
            console.log('Amount to be debited should be more than zero.');
            return;
        }
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Debited: $${amount}. New Balance: $${this.getBalance()}`);
        }
        else {
            console.log('Insufficient balance.');
        }
    }
}
class BankApp {
    account;
    constructor(initialBalance = 1000) {
        this.account = new BankAccount(initialBalance);
    }
    async start() {
        while (true) {
            const answer = await inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Check Balance', 'Credit Account', 'Debit Account', 'Exit']
            });
            switch (answer.action) {
                case 'Check Balance':
                    console.log(`Current Balance: $${this.account.getBalance()}`);
                    break;
                case 'Credit Account':
                    await this.creditAccount();
                    break;
                case 'Debit Account':
                    await this.debitAccount();
                    break;
                case 'Exit':
                    console.log('Thank you for using the bank transaction app.');
                    return;
            }
        }
    }
    async creditAccount() {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: 'Enter amount to credit:',
            validate: (input) => {
                const value = parseFloat(input);
                return !isNaN(value) && value > 0 || 'Please enter a valid amount';
            }
        });
        this.account.credit(parseFloat(answer.amount));
    }
    async debitAccount() {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: 'Enter amount to debit:',
            validate: (input) => {
                const value = parseFloat(input);
                return !isNaN(value) && value > 0 || 'Please enter a valid amount';
            }
        });
        this.account.debit(parseFloat(answer.amount));
    }
}
const app = new BankApp();
app.start();
