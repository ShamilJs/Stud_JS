'use strict';

let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
	start = function () {
		do {
			money = prompt('Ваш месячный доход?', '');
		} while (!isNumber(money));
	};
start();

let appData = {
	income: {}, //доп. доходы
	addIncome: [], //
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 1000000, //Копим
	period: 6,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function () {
		let addExpenses;
		do {
			addExpenses = prompt(
				'Перечислите возможные расходы, через запятую',
				'Интернет, бензин, коммуналка, жена'
			);
		} while (addExpenses === null);

		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');

		let a, b;
		for (let i = 0; i < 2; i++) {
			if (i === 1) {
				alert('Следующие данные укажите отличные от предыдущих!');
			}
			do {
				a = prompt('Введите обязательную статью расходов?');
			} while (a === null);
			b = +prompt('Во сколько это обойдется?', '24520');
			while (!isNumber(b) || b === 0) {
				b = +prompt('Во сколько это обойдется?', '24520');
			}
			appData.expenses[a] = b;
		}
	},
	getExpensesMonth: function () {
		let sum = 0;

		for (let key in appData.expenses) {
			sum += appData.expenses[key];
		}
		return sum;
	},

	getBudget: function () {
		appData.budgetMonth = appData.budget - appData.getExpensesMonth();
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		return appData.budgetMonth;
	},

	getTargetMonth: function () {
		let splitNumber = Math.ceil(appData.mission / appData.getBudget());
		if (splitNumber < 0) {
			return `Цель не будет достигнута! Расходы превышают доходы!`;
		} else {
			return `Cрок достижения цели, в месяцах: ${splitNumber}`;
		}
	},
	getStatusIncome: function () {
		if (appData.budgetDay >= 0) {
			if (appData.budgetDay > 1200) {
				return 'У вас высокий уровень дохода!';
			} else if (appData.budgetDay < 600) {
				return 'К сожалению у вас уровень дохода ниже среднего';
			} else {
				return 'У вас средний уровень дохода';
			}
		} else if (appData.budgetDay < 0) {
			return 'Что-то пошло не так...';
		}
	},
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Сумма расходов за месяц: ', appData.getExpensesMonth());
console.log(appData.getTargetMonth());
console.log('Статус Вашего дохода: ', appData.getStatusIncome());

let wwww = function () {
	for (let key in appData) {
		console.log(
			'Наша программа включает в себя данные:',
			key,
			appData[key]
		);
	}
};
wwww();
