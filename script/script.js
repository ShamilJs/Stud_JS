'use strict';

let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
	start = function () {
		do {
			money = prompt('Ваш месячный доход?', '100000');
		} while (!isNumber(money));
	};
start();

let appData = {
	income: {}, //доп. доходы
	addIncome: [], //
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 1000000, //Копим
	period: 6,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function () {
		if (confirm('Есть ли у Вас дополнительый источник зароботка?')) {
			let itemIncome, cashIncome;
			do {
				itemIncome = prompt(
					'Какой у Вас дополнительный зароботок?',
					'Продаю беляши'
				);
			} while (
				itemIncome === null ||
				isNumber(itemIncome) ||
				itemIncome.trim() === ''
			);
			do {
				cashIncome = prompt(
					'Сколько Вы на этом зарабатываете?',
					'10000'
				);
			} while (!isNumber(cashIncome) || cashIncome === 0);
		}

		let addExpenses;
		do {
			addExpenses = prompt(
				'Перечислите возможные расходы, через запятую',
				'интернет, бензин, коммуналка, жена'
			);
		} while (
			addExpenses === null ||
			isNumber(addExpenses) ||
			addExpenses.trim() === ''
		);

		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');

		const formationOfExpenses = function () {
			let a, b;
			do {
				a = prompt('Введите обязательную статью расходов?', 'квартира');
			} while (a === null || isNumber(a) || a.trim() === '');
			do {
				b = +prompt('Во сколько это обойдется?', '24520');
			} while (!isNumber(b) || b === 0);
			appData.expenses[a] = b;
		};

		for (let i = 0; i < 2; i++) {
			formationOfExpenses();
		}
		while (Object.keys(appData.expenses).length === 1) {
			alert('Укажите расходы, отличные от предыдущих!');
			formationOfExpenses();
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
	getInfoDeposit: function () {
		if (appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой процент?', '10');
			} while (
				!isNumber(appData.percentDeposit) ||
				appData.percentDeposit === 0
			);
			do {
				appData.moneyDeposit = prompt(
					'Какая сумма заложена?',
					'100000'
				);
			} while (
				!isNumber(appData.moneyDeposit) ||
				appData.moneyDeposit === 0
			);
		}
	},
	calcSavedMoney: function () {
		return appData.budgetMonth * appData.period;
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

// ДЗ из урока №8
let arrayString = '';
for (let i = 0; i < appData.addExpenses.length; i++) {
	arrayString = appData.addExpenses[i];
	appData.addExpenses[i] =
		arrayString[0].toUpperCase() + arrayString.slice(1);
}
arrayString = appData.addExpenses.join(', ');
console.log('arrayString: ', arrayString);
