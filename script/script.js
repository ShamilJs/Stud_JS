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
	number = document.querySelectorAll('[placeholder="Сумма"]'),
	cancel = document.getElementById('cancel');


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
		let inputTypeText = document.querySelectorAll('[type=text]');
		inputTypeText.forEach(function(item, index){
			if (index < inputTypeText.length) {
				item.disabled = true;
			}
		});
	},

	reset: function(){
		let inputTypeText = document.querySelectorAll('[type=text]');
		inputTypeText.forEach(function(item){
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
		incomeItem.forEach(function(item, index){
				if(index > 0) {
					item.remove();
				}
			});
		plusIncomeAdd.style.display = 'block';
		expensesItems.forEach(function(item, index){
				if(index > 0) {
					item.remove();
				}
			});
		plusExpensesAdd.style.display = 'block';
	},

	showResult: function () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
		
		const foo = function () {
			incomePeriodValue.value = this.budgetMonth * periodSelect.value;
		};
		periodSelect.addEventListener('change', foo.bind(appData));
	},

	addExpensesBlock: function () {
		let newElem = expensesItems[0].cloneNode(true);
		let newElem1 = newElem.children;
		for (let i = 0; i < newElem1.length; i++) {
			newElem1[i].value = '';
		}
		expensesItems[0].parentNode.insertBefore(newElem, plusExpensesAdd);
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
				this.expenses[itemExpenses] = +cashExpenses;
			}
		}, appData);
	},

	getIncome: function () {
		incomeItem.forEach(function (item) {
			let a = {};
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = +cashIncome;
			}
		}, appData);
	},

	getAddExpenses: function () {
		this.addExpenses = [];
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		}, appData);
	},

	getAddIncome: function () {
		this.addIncome = [];
		additionalIncomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		}, appData);
	},

	getExpensesMonth: function () {
		let sum = 0;
		for (let key in this.expenses) {
			sum += +this.expenses[key];
		}
		this.expensesMonth = sum;
		return sum;
	},

	getIncomeMonth: function () {
		let sum = 0;
		for (let key in this.income) {
			sum += +this.income[key];
		}
		return sum;
	},

	getBudget: function () {
		this.budgetMonth =
			this.budget +
			this.getIncomeMonth() -
			this.getExpensesMonth();
		this.budgetDay = Math.floor(this.budgetMonth / 30);
		return this.budgetMonth;
	},

	getTargetMonth: function () {
		return Math.ceil(targetAmount.value / this.getBudget());
	},

	getPeriod: function () {
		periodAmount.value = periodSelect.value;
		periodAmount.textContent = periodSelect.value;
	},

	calcSavedMoney: function () {
		return this.budgetMonth * periodSelect.value;
	},
};


const startFoo = function() {
	this.start();
 };

start.addEventListener('click', startFoo.bind(appData));

cancel.addEventListener('click', appData.reset);

plusExpensesAdd.addEventListener('click', appData.addExpensesBlock);

plusIncomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getPeriod);

salaryAmount.addEventListener('input', function () {
	if (salaryAmount.value === '') {
		start.disabled = true;
		alert('Поле "Месячный доход" должно быть заполнено!');
		return;
	} else {
		start.disabled = false;
	}
});

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

