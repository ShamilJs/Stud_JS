// 1
let money = 150000; //Доход за месяц
let income = 'Фриланс, битмейкинг'; //Дополнительный доход
let addExpenses = 'Интернет, бензин, коммуналка, жена'; //Расходы
let deposit = true; //булевое значение
let mission = 1000000; //Копим
let period = 6; //Период

// 2
console.log('typeof money: ', typeof money); //вывод типа данных переменной money
console.log('typeof income: ', typeof income); //вывод типа данных переменной income
console.log('typeof deposit: ', typeof deposit); //вывод типа данных переменной deposit
console.log('addExpenses.length: ', addExpenses.length); //вывод длины строки addExpenses
console.log(`Период равен ${period} месяцев`); //вывод строки с переменной
console.log(`Цель: заработать ${mission} долларов`); //вывод строки с переменной
console.log(addExpenses.toLowerCase().split(', ')); //приводим строку к нижнему регистру и возвращаем массив

let budgetDay = money / 30; // дневной бюджет
console.log('budgetDay: ', budgetDay);