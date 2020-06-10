'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Фриланс, битмейкинг',
    addExpenses = prompt(
        'Перечислите возможные расходы, через запятую',
        'Интернет, бензин, коммуналка, жена'
    ),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000, //Копим
    period = 6; //Период

// let expenses1 = prompt('Введите обязательную статью расходов?', 'Интернет'),
//     amount1 = +prompt('Во сколько это обойдется?', '32000'),
//     expenses2 = prompt('Введите обязательную статью расходов?', 'Бензин'),
//     amount2 = +prompt('Во сколько это обойдется?', '24520'),
let amounts = [];

let start = function () {
    do {
        money = prompt('Ваш месячный доход?', '');
    }
    while (!isNumber(money));
};
start();

const showTypeOf = function (data) {
    return typeof data;
};

const getExpensesMonth = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {

        amounts[i] = prompt('Введите обязательную статью расходов?', '');
        let checkPrompt = prompt('Во сколько это обойдется?', '24520');

        while (!isNumber(checkPrompt)) {
            checkPrompt = prompt('Во сколько это обойдется?', '24520');
        }
        sum += +checkPrompt;
    }
    return sum;
};

let expensesAmout = getExpensesMonth();

const getAccumulatedMonth = function (a, b) {
    return a - b;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmout);

// Функция расчета срока достижения цели
const getTargetMonth = function (a, b) {
    let splitNumber = Math.ceil(a / b);
    if (splitNumber < 0) {
        return `Цель не будет достигнута! Расходы превышают доходы!`;
    } else {
        return `Cрок достижения цели, в месяцах: ${splitNumber}`;
    }
};

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

console.log(money, showTypeOf(money));
console.log(income, showTypeOf(income));
console.log(deposit, showTypeOf(deposit));
console.log('Сумма всех обязательных расходов за месяц: ', expensesAmout);
console.log(
    'возможные расходы за месяц: ',
    addExpenses.toLowerCase().split(', ')
);
console.log(getTargetMonth(mission, accumulatedMonth));
console.log('Бюджет на день, в рублях: ', budgetDay);
console.log('Статус Вашего дохода: ', getStatusIncome(budgetDay));