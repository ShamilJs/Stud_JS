'use strict';

let start = document.getElementById('start'), 
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
	incomeItem = document.querySelectorAll('.income-items'),
	expensesTitle = document.querySelector('.expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodAmount = document.querySelector('.period-amount'),
	periodSelect = document.querySelector('.period-select'),
	naming = document.querySelectorAll('[placeholder="Наименование"]'),
	number = document.querySelectorAll('[placeholder="Сумма"]'),
	cancel = document.getElementById('cancel');


start.disabled = true;

const AppData = function(){
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

 AppData.prototype.start = function () {
 	console.log(this);
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
};

AppData.prototype.reset  = function(){

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

AppData.prototype.showResult =  function () {
	const _this = this;
	budgetMonthValue.value = this.budgetMonth;
	budgetDayValue.value = this.budgetDay;
	expensesMonthValue.value = this.expensesMonth;
	additionalExpensesValue.value = this.addExpenses.join(', ');
	additionalIncomeValue.value = this.addIncome.join(', ');
	targetMonthValue.value = this.getTargetMonth();
	incomePeriodValue.value = this.calcSavedMoney();
	periodSelect.addEventListener('change', function () {
		incomePeriodValue.value = _this.budgetMonth * periodSelect.value;
	});
};

AppData.prototype.addExpensesBlock = function () {
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
};

AppData.prototype.addIncomeBlock = function () {
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
};

AppData.prototype.getExpenses = function () {
	const _this = this;
	expensesItems.forEach(function (item) {
		let itemExpenses = item.querySelector('.expenses-title').value;
		let cashExpenses = item.querySelector('.expenses-amount').value;
		if (itemExpenses !== '' && cashExpenses !== '') {
			_this.expenses[itemExpenses] = +cashExpenses;
		}
	});
};

AppData.prototype.getIncome = function () {
	const _this = this;
	incomeItem.forEach(function (item) {
		let itemIncome = item.querySelector('.income-title').value;
		let cashIncome = item.querySelector('.income-amount').value;
		if (itemIncome !== '' && cashIncome !== '') {
			_this.income[itemIncome] = +cashIncome;
		}
	});
};

AppData.prototype.getAddExpenses = function () {
	const _this = this;
	this.addExpenses = [];
	let addExpenses = additionalExpensesItem.value.split(',');
	addExpenses.forEach(function (item) {
		item = item.trim();
		if (item !== '') {
			_this.addExpenses.push(item);
		}
	});
};

AppData.prototype.getAddIncome = function () {
	const _this = this;
	this.addIncome = [];
	additionalIncomeItem.forEach(function (item) {
		let itemValue = item.value.trim();
		if (itemValue !== '') {
			_this.addIncome.push(itemValue);
		}
	});
};

AppData.prototype.getExpensesMonth = function () {
	let sum = 0;
	for (let key in this.expenses) {
		sum += +this.expenses[key];
	}
	this.expensesMonth = sum;
	return sum;
};

AppData.prototype.getIncomeMonth = function () {
	let sum = 0;
	for (let key in this.income) {
		sum += +this.income[key];
	}
	return sum;
};

AppData.prototype.getBudget = function () {
	this.budgetMonth = this.budget + this.getIncomeMonth() -
		this.getExpensesMonth();
	this.budgetDay = Math.floor(this.budgetMonth / 30);
	return this.budgetMonth;
};

AppData.prototype.getTargetMonth = function () {
	return Math.ceil(targetAmount.value / this.getBudget());
};

AppData.prototype.getPeriod = function () {
	periodAmount.value = periodSelect.value;
	periodAmount.textContent = periodSelect.value;
};

AppData.prototype.calcSavedMoney = function () {
	return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventListener = function() {
	const startFoo = function() {
		this.start();
	};
	const resetFoo = function() {
		this.reset();
	};
	const addExpensesBlockFoo = function() {
		this.addExpensesBlock();
	};
	const addIncomeBlockFoo = function() {
		this.addIncomeBlock();
	};
	const getPeriodFoo = function() {
		this.getPeriod();
	};
	
	start.addEventListener('click', startFoo.bind(this));
	cancel.addEventListener('click', resetFoo.bind(this));
	plusExpensesAdd.addEventListener('click', addExpensesBlockFoo.bind(this));
	plusIncomeAdd.addEventListener('click', addIncomeBlockFoo.bind(this));
	periodSelect.addEventListener('input', getPeriodFoo.bind(this));
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
};

const appData = new AppData();

const listener = function() {
		this.eventListener();
	};

listener.apply(appData)



