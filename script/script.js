'use strict';

let start = document.getElementById('start'), //Кнопка "РАСЧИТАТЬ"
	plusIncomeAdd = document.getElementsByTagName('button')[0],
	plusExpensesAdd = document.getElementsByTagName('button')[1],
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	additionalIncome = document.querySelectorAll('.additional_income'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	expensesMonthValue = document.getElementsByClassName(
		'expenses_month-value'
	)[0],
	accumulatedMonthValue = document.getElementsByClassName(
		'accumulated_month-value'
	)[0],
	additionalIncomeValue = document.getElementsByClassName(
		'additional_income-value'
	)[0],
	additionalExpensesValue = document.getElementsByClassName(
		'additional_expenses-value'
	)[0],
	incomePeriodValue = document.getElementsByClassName(
		'income_period-value'
	)[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-title'),
	incomeItem = document.querySelectorAll('.income-items'),
	expensesTitle = document.querySelector('.expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpensesItem = document.querySelector(
		'.additional_expenses-item'
	),
	targetAmount = document.querySelector('.target-amount'),
	periodAmount = document.querySelector('.period-amount'),
	periodSelect = document.querySelector('.period-select'),
	naming = document.querySelectorAll('[placeholder="Наименование"]'),
	number = document.querySelectorAll('[placeholder="Сумма"]');


start.disabled = true;
let appData = {
	income: {},
	incomeMonth: 0,
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	start: function () {
		appData.budget = +salaryAmount.value;
		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();

		appData.getBudget();
		appData.showResult();
	},
	getChecksalaryAmount: function () {
		if (salaryAmount.value === '') {
			start.disabled = true;

			alert('Поле "Месячный доход" должно быть заполнено!');
			return;
		} else {
			start.disabled = false;
		}
	},
	showResult: function () {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = appData.getTargetMonth();
		incomePeriodValue.value = appData.calcSavedMoney();

		periodSelect.addEventListener('change', function () {
			incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
		});
	},
	addExpensesBlock: function () {
		let newElem = expensesItems[0].cloneNode(true);
		let newElem1 = newElem.children;
		for (let i = 0; i < newElem1.length; i++) {
			newElem1[i].value = '';
		}
		expensesItems[0].parentNode.insertBefore(newElem, plusExpensesAdd);
		console.log('expensesItems[0]: ', expensesItems[0]);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			plusExpensesAdd.style.display = 'none';
		}
	},
	addIncomeBlock: function () {
		let newElem = incomeItem[0].cloneNode(true);
		let newElem1 = newElem.children;
		for (let i = 0; i < newElem1.length; i++) {
			newElem1[i].value = '';
		}
		incomeItem[0].parentNode.insertBefore(newElem, plusIncomeAdd);
		incomeItem = document.querySelectorAll('.income-items');
		if (incomeItem.length === 3) {
			plusIncomeAdd.style.display = 'none';
		}
	},
	getExpenses: function () {
		expensesItems.forEach(function (item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = +cashExpenses;
			}
		});
	},
	getIncome: function () {
		incomeItem.forEach(function (item) {
			let a = {};
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = +cashIncome;
			}
		});
	},
	getAddExpenses: function () {
		appData.addExpenses = [];
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			console.log(item);
			if (item !== '') {
				appData.addExpenses.push(item);
			}
		});
	},
	getAddIncome: function () {
		appData.addIncome = [];
		additionalIncomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			console.log(itemValue);
			if (itemValue !== '') {
				appData.addIncome.push(itemValue);

			}
		});
	},
	getExpensesMonth: function () {
		let sum = 0;
		for (let key in appData.expenses) {
			sum += +appData.expenses[key];
		}
		appData.expensesMonth = sum;
		return sum;
	},
	getIncomeMonth: function () {
		let sum = 0;
		for (let key in appData.income) {
			sum += +appData.income[key];
		}
		return sum;
	},

	getBudget: function () {
		appData.budgetMonth =
			appData.budget +
			appData.getIncomeMonth() -
			appData.getExpensesMonth();
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		return appData.budgetMonth;
	},

	getTargetMonth: function () {
		return Math.ceil(targetAmount.value / appData.getBudget());
	},

	getPeriod: function () {
		periodAmount.value = periodSelect.value;
		periodAmount.textContent = periodSelect.value;
	},

	calcSavedMoney: function () {
		return appData.budgetMonth * periodSelect.value;
	},
};
start.addEventListener('click', appData.start);
plusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
plusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
salaryAmount.addEventListener('input', appData.getChecksalaryAmount);
naming.forEach(function (item) {
	item.addEventListener('input', function () {
		item.value = item.value.replace(/[^а-я .,!?'":;]/, '');
	});
});
number.forEach(function (item) {
	item.addEventListener('input', function () {
		item.value = item.value.replace(/[^0-9]/, '');
	});
});
