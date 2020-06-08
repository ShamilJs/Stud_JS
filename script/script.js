'use strict'; //Включаем строгий режим
// lesson02
let money = 150000; //Доход за месяц
let income = 'Фриланс, битмейкинг'; //Дополнительный доход
let addExpenses = 'Интернет, бензин, коммуналка, жена'; //Расходы
let deposit = true; //булевое значение
let mission = 1000000; //Копим
let period = 6; //Период

console.log('typeof money: ', typeof money); //вывод типа данных переменной money
console.log('typeof income: ', typeof income); //вывод типа данных переменной income
console.log('typeof deposit: ', typeof deposit); //вывод типа данных переменной deposit
console.log('addExpenses.length: ', addExpenses.length); //вывод длины строки addExpenses
console.log(`Период равен ${period} месяцев`); //вывод строки с переменной
console.log(`Цель: заработать ${mission} рублей`); //вывод строки с переменной
console.log(addExpenses.toLowerCase().split(', ')); //приводим строку к нижнему регистру и возвращаем массив

let budgetDay = money / 30; // дневной бюджет
console.log('budgetDay: ', budgetDay);

// lesson03
// 2
//Спрашиваем у пользователя и результат сохраняем в переменную money (typeof string)
money = prompt('Ваш месячный доход?', '');
// 3
//Спрашиваем у пользователя и результат сохраняем в переменную addExpenses 
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
// 4
//Спрашиваем у пользователя и результат сохраняем в переменную deposit (bool)
deposit = confirm('Есть ли у вас депозит в банке?');
// 5
//Спрашиваем у пользователя и результат сохраняем в переменную expenses1
let expenses1 = prompt('Введите обязательную статью расходов?', '');
//Спрашиваем у пользователя и результат сохраняем в переменную expenses2
let expenses2 = prompt('Введите обязательную статью расходов?', '');
//Спрашиваем у пользователя и результат сохраняем в переменную amount1 (string)
let amount1 = prompt('Во сколько это обойдется?', '');
//Спрашиваем у пользователя и результат сохраняем в переменную amount2 (string)
let amount2 = prompt('Во сколько это обойдется?', '');
// 6
//Бюджет на месяц, вывод в консоль, результат typeof number (т.к. "-")
let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth + ' рублей');
//7
//период достижения цели, округление в большую сторону
console.log('Цель будет достигнута за: ', Math.ceil(mission / budgetMonth) + ' дней');
// 8
// Пересчитаем дневной бюджет
budgetDay = budgetMonth / 30; // 
console.log('дневной бюджет: ', Math.floor(budgetDay) + ' рублей');
// 9

if (budgetDay >= 0) {
    if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода!');
    } else if (budgetDay < 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('У вас средний уровень дохода');
    }
} else if (budgetDay < 0) {
    console.log('Что-то пошло не так...');
}