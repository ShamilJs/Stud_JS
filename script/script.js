'use strict';

let money = +prompt('Ваш месячный доход?', '100000'),
	income = 'Фриланс, битмейкинг',
	addExpenses = prompt(
		'Перечислите возможные расходы, через запятую',
		'Интернет, бензин, коммуналка, жена'
	),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 1000000, //Копим
	period = 6; //Период

let expenses1 = prompt('Введите обязательную статью расходов?', 'Интернет'),
	amount1 = +prompt('Во сколько это обойдется?', '32000'),
	expenses2 = prompt('Введите обязательную статью расходов?', 'Бензин'),
	amount2 = +prompt('Во сколько это обойдется?', '24520');

// Функция вывода типа данных
const showTypeOf = function (data) {
	return typeof data;
};

// Функция суммы всех обязательных расходов за месяц
const getExpensesMonth = function (a, b) {
	return a + b;
};

// Функция накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function (a, b) {
	return a - b;
};

// переменной accumulatedMonth присвом результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth(
	money,
	getExpensesMonth(amount1, amount2)
);

// Функция расчета срока достижения цели
const getTargetMonth = function (a, b) {
	return Math.ceil(a / b);
};

//  Бюджет на день
let budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = function (a) {
	if (a >= 0) {
		if (a > 1200) {
			return 'У вас высокий уровень дохода!';
		} else if (a < 600) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		} else {
			return 'У вас средний уровень дохода';
		}
	} else if (a < 0) {
		return 'Что-то пошло не так...';
	}
};

// вызовы функции showTypeOf
console.log(money, showTypeOf(money));
console.log(income, showTypeOf(income));
console.log(deposit, showTypeOf(deposit));

// Расходы за месяц вызов getExpensesMonth
console.log(
	'Сумма всех обязательных расходов за месяц: ',
	getExpensesMonth(amount1, amount2)
);

// Вывод возможных расходов за месяц в виде массива в нижнем регистре (прошлые уроки)
console.log(
	'возможные расходы за месяц: ',
	addExpenses.toLowerCase().split(', ')
);

// Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
console.log(
	'Cрок достижения цели, в месяцах: ',
	getTargetMonth(mission, accumulatedMonth)
);

// Бюджет на день (budgetDay)
console.log('Бюджет на день, в рублях: ', budgetDay);

// вызов функции getStatusIncome
console.log('Статус Вашего дохода: ', getStatusIncome(budgetDay));
