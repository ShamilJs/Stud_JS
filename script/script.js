'use strict';

const start = document.getElementById('start'), 
	plusIncomeAdd = document.getElementsByTagName('button')[0],
	plusExpensesAdd = document.getElementsByTagName('button')[1],
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	additionalIncome = document.querySelectorAll('.additional_income'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-title'),
	expensesTitle = document.querySelector('.expenses-title'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodAmount = document.querySelector('.period-amount'),
	periodSelect = document.querySelector('.period-select'),
	naming = document.querySelectorAll('[placeholder="Наименование"]'),
	number = document.querySelectorAll('[placeholder="Сумма"]'),
	cancel = document.getElementById('cancel');

let incomeItem = document.querySelectorAll('.income-items'),
	expensesItems = document.querySelectorAll('.expenses-items');



start.disabled = true;

class AppData {
	constructor() {
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
	}
	
	start () {
		this.budget = +salaryAmount.value;
		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.showResult();
		
		start.style.display = 'none';
		cancel.style.display = 'block';
		cancel.style.marginLeft = '200px';
		const inputTypeText = document.querySelectorAll('[type=text]');
		inputTypeText.forEach((item, index) => {
			if (index < inputTypeText.length) {
				item.disabled = true;
			}
		});
	};

	reset () {
		const inputTypeText = document.querySelectorAll('[type=text]');
		inputTypeText.forEach((item) => {
			item.value = '';
			item.disabled = false;
		});
		start.style.display = '';
		cancel.style.display = '';
		start.disabled = true;
		periodSelect.value = 1;
		periodAmount.textContent = 1;
		if (depositCheck.checked) {
			depositCheck.checked = !depositCheck.checked;
		}

		incomeItem.forEach((item, index) => {
			if(index > 0) {
				item.remove();
			}
		});
		plusIncomeAdd.style.display = 'block';
		
		expensesItems.forEach((item, index) => {
			if(index > 0) {
				item.remove();
			}
		});
		plusExpensesAdd.style.display = 'block';

		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
	};

	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
		periodSelect.addEventListener('change', () => {
			incomePeriodValue.value = this.budgetMonth * periodSelect.value;
		});
	};

	addExpensesBlock() {
		const newElem = expensesItems[0].cloneNode(true);
		const newElem1 = newElem.children;
		for (let i = 0; i < newElem1.length; i++) {
			newElem1[i].value = '';
		}
		expensesItems[0].parentNode.insertBefore(newElem, plusExpensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			plusExpensesAdd.style.display = 'none';
		}
	};

	addIncomeBlock() {
		const newElem = incomeItem[0].cloneNode(true);
		const newElem1 = newElem.children;
		for (let i = 0; i < newElem1.length; i++) {
			newElem1[i].value = '';
		}
		incomeItem[0].parentNode.insertBefore(newElem, plusIncomeAdd);
		incomeItem = document.querySelectorAll('.income-items');
		if (incomeItem.length === 3) {
			plusIncomeAdd.style.display = 'none';
		}
	};

	getExpenses() {
		expensesItems.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = +cashExpenses;
			}
		});
	};

	getIncome() {
		incomeItem.forEach((item) => {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = +cashIncome;
			}
		});
	};

	getAddExpenses() {
		this.addExpenses = [];
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	};

	getAddIncome() {
		this.addIncome = [];
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	};

	getExpensesMonth() {
		let sum = 0;
		for (let key in this.expenses) {
			sum += +this.expenses[key];
		}
		this.expensesMonth = sum;
		return sum;
	};

	getIncomeMonth() {
		let sum = 0;
		for (let key in this.income) {
			sum += +this.income[key];
		}
		return sum;
	};

	getBudget() {
		this.budgetMonth = this.budget + this.getIncomeMonth() -
			this.getExpensesMonth();
		this.budgetDay = Math.floor(this.budgetMonth / 30);
		return this.budgetMonth;
	};

	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.getBudget());
	};

	getPeriod() {
		periodAmount.value = periodSelect.value;
		periodAmount.textContent = periodSelect.value;
	};

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value;
	};

	eventListener() {
		start.addEventListener('click', () => {
			this.start();
		});
		cancel.addEventListener('click', () => {
			this.reset();
		});
		plusExpensesAdd.addEventListener('click', () => {
			this.addExpensesBlock();
		});
		plusIncomeAdd.addEventListener('click', () => {
			this.addIncomeBlock();
		});
		periodSelect.addEventListener('input', () => {
			this.getPeriod();
		});
		salaryAmount.addEventListener('input', () => {
			if (salaryAmount.value === '') {
				start.disabled = true;
				alert('Поле "Месячный доход" должно быть заполнено!');
				return;
			} else {
				start.disabled = false;
			}
		});
		naming.forEach((item) => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/[^а-я .,!?'":;]/, '');
			});
		});

		number.forEach((item) => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/[^0-9]/, '');
			});
		});
	};
};

const appData = new AppData();

appData.eventListener()




