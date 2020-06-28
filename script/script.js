'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
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
	cancel = document.getElementById('cancel'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent');

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
		this.getExpInc();
		this.getAddExpInc();
		this.getInfoDeposit();
		this.getBudget();
		this.showResult();
		
		let inputTypeText = document.querySelectorAll('[type=text]');
		inputTypeText = [...inputTypeText].slice(-7);

		localStorage.isLoad = true;
		localStorage.result_0 = inputTypeText[0].value;
		localStorage.result_1 = inputTypeText[1].value;
		localStorage.result_2 = inputTypeText[2].value;
		localStorage.result_3 = inputTypeText[3].value;
		localStorage.result_4 = inputTypeText[4].value;
		localStorage.result_5 = inputTypeText[5].value;
		localStorage.result_6 = inputTypeText[6].value;

		this.setCookie('isLoad', 'true', 2021, 7, 7);
		this.setCookie('result_0', inputTypeText[0].value, 2021, 7, 7);
		this.setCookie('result_1', inputTypeText[1].value, 2021, 7, 7);
		this.setCookie('result_2', inputTypeText[2].value, 2021, 7, 7);
		this.setCookie('result_3', inputTypeText[3].value, 2021, 7, 7);
		this.setCookie('result_4', inputTypeText[4].value, 2021, 7, 7);
		this.setCookie('result_5', inputTypeText[5].value, 2021, 7, 7);
		this.setCookie('result_6', inputTypeText[6].value, 2021, 7, 7);

		this.isLoadLS(); 
	 }

	setCookie(key, value, year, month, day) {
		let cookieStr = key + '=' + value;
		if(year) {
			const expires = new Date(year, month, day);
			cookieStr += '; expires=' + expires.toGMTString();
		}
		document.cookie = cookieStr;
	}

	isLoadLS() {
		this.showResult();
		let inputType = document.querySelectorAll('[type=text]');
		inputType = [...inputType].slice(-7);
		
		if (localStorage.isLoad === 'true') {

		 	inputType[0].value = localStorage.result_0;
			inputType[1].value = localStorage.result_1;
			inputType[2].value = localStorage.result_2;
			inputType[3].value = localStorage.result_3;
			inputType[4].value = localStorage.result_4;
			inputType[5].value = localStorage.result_5;
			inputType[6].value = localStorage.result_6;

			start.style.display = 'none';
			cancel.style.display = 'block';
			cancel.style.marginLeft = '200px';
			const inputTypeText = document.querySelectorAll('[type=text]');
			inputTypeText.forEach((item, index) => {
				if (index < inputTypeText.length) {
					item.disabled = true;
				}
			});
			this.checkCookie();
		}
		if (localStorage.isLoad === 'false') {
			localStorage.removeItem('isLoad');
			localStorage.removeItem('result_0');
			localStorage.removeItem('result_1');
			localStorage.removeItem('result_2');
			localStorage.removeItem('result_3');
			localStorage.removeItem('result_4');
			localStorage.removeItem('result_5');
			localStorage.removeItem('result_6');
		}
	}

	checkCookie() {
		let count = 0;
	 	let cookie = document.cookie;
	 	if (cookie !== '') {
			cookie = cookie.split(';');
			cookie.forEach((item, index) => {
				item = item.trim();
				item = item.split('');
				item.forEach((item1, index) => {
					if(item1 === '='){
						item.splice(index);
					}
				});
				item = item.join('');
				cookie.splice(index, 1, item);
			});

			step: for(let key in localStorage) {
				for(let index of cookie) {
					if(key === index) {
						count ++;
						continue step;
					} 
				}
			}

			if (count !== Object.keys(localStorage).length || count !== cookie.length) {
				count =0;
				cookie.forEach(item => {
					this.setCookie(`${item}`, '', 2018, 7, 7);
				});
			this.reset();
			} 
		}
 	}
		
	reset () {
		localStorage.isLoad = false;
		this.isLoadLS(); 

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
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			depositPercent.value = '';
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
	}

	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses;
		additionalIncomeValue.value = this.addIncome;
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
	
		periodSelect.addEventListener('change', () => {
			if (!localStorage.result_0) {
				localStorage.result_5 = 0;
				incomePeriodValue.value = 0;
			} else {
				localStorage.result_5 = localStorage.result_0 * periodSelect.value;
				incomePeriodValue.value = localStorage.result_5;
			}
		});
	}

	addExpInc(arg, plusName) {
		const newElem = arg[0].cloneNode(true);
		const newElem1 = newElem.children;
		for (let i = 0; i < newElem1.length; i++) {
			newElem1[i].value = '';
		}
		arg[0].parentNode.insertBefore(newElem, plusName);
		let startStr = arg[0].className.split('-')[0];
		if (arg === incomeItem) {
			incomeItem = document.querySelectorAll(`.${startStr}-items`);
		} else if (arg === expensesItems) {
			expensesItems = document.querySelectorAll(`.${startStr}-items`);
		}
		if (arg.length === 3) {
			plusName.style.display = 'none';
		}
	}

	getExpInc() {
		const count = (item) => {
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = +itemAmount;
			}
		};
		incomeItem.forEach(count);
		expensesItems.forEach(count);
	}

	getAddExpInc() {
		this.addIncome = [];
		this.addExpenses = [];
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
		this.addExpenses.join(', ');
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
		this.addIncome.join(', ');
	}

	getExpIncMonth(arg) {
		let sum = 0;
		for (let key in arg) {
			sum += +arg[key];
		}
		if (arg === this.expenses) {
			this.expensesMonth = sum;
		}
		return sum;
	}

	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.getExpIncMonth(this.income) -
			this.getExpIncMonth(this.expenses) + monthDeposit;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
		return this.budgetMonth;
	}

	getTargetMonth() {
		let result;
		if (this.getBudget() === 0) {
			result = 0;
		} else {
			result = Math.ceil(targetAmount.value / this.getBudget());
		}
		return result;
	}

	getPeriod() {
		periodAmount.value = periodSelect.value;
		periodAmount.textContent = periodSelect.value;
	}

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value;
	}

	getInfoDeposit() {
		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	}

	changePercent() {
		const valueSelect = this.value;
		if (valueSelect === 'other') {
			depositPercent.value = '';
			depositPercent.style.display = 'inline-block';
		} else {
			depositPercent.style.display = 'none';
			depositPercent.value = valueSelect;
		}
	}

	eventListener() {
		start.addEventListener('click', () => {
			this.start();
		});
		cancel.addEventListener('click', () => {
			this.reset();
		});
		plusExpensesAdd.addEventListener('click', () => {
			this.addExpInc(expensesItems, plusExpensesAdd);
		});
		plusIncomeAdd.addEventListener('click', () => {
			this.addExpInc(incomeItem, plusIncomeAdd);
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

		depositCheck.addEventListener('change', () => {
			if (depositCheck.checked) {
				depositBank.style.display = 'inline-block';
				depositAmount.style.display = 'inline-block';
				
				this.deposit = true;
				depositBank.addEventListener('change', this.changePercent);
			} else {
				depositBank.style.display = 'none';
				depositAmount.style.display = 'none';
				depositPercent.style.display = 'none';
				depositBank.value = '';
				depositAmount.value = '';
				depositPercent.value = '';
				this.deposit = false;
				depositBank.removeEventListener('change', this.changePercent);
			}
		});

		depositPercent.addEventListener('change', () => {
				if (!isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100) {
				start.disabled = true;
				alert('Ведите корректные данные по процентам!');
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
appData.isLoadLS();
appData.eventListener();





