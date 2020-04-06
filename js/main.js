/*
2) Задание по проекту

·        Получить кнопку "Начать расчет" через id

·        Получить все блоки в правой части программы через классы (которые имеют класс название-value, начиная с <div class="budget-value"></div> и заканчивая <div class="yearsavings-value"></div>)

·        Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)

·        Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной. 

·        Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll

·        Получить оставшиеся поля через querySelector (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
*/

let startBtn = document.getElementById('start'),
    budget = document.querySelector('.budget-value'),
    dayBudget = document.querySelector('.daybudget-value'),
    level = document.querySelector('.level-value'),
    expenses = document.querySelector('.expenses-value'),
    optionalExpenses = document.querySelector('.optionalexpenses-value'),
    income = document.querySelector('.income-value'),
    monthSavings = document.querySelector('.monthsavings-value'),
    yearSavings = document.querySelector('.yearsavings-value'),
    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    countBudgetBtn = document.getElementsByTagName('button')[2],
    incomeInput = document.querySelector('#income'),
    savingsCheckbox = document.querySelector('#savings'),
    savingsSum = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value'); //25min

let money, time;

// function start () {
//   time = prompt ("Введите дату в формате YYYY-MM-DD", '');
//   money = +prompt ("Ваш бюджет на месяц?", '');

//   if ( isNaN(money) || money == '' || money == null) {
//     money = +prompt ("Ваш бюджет на месяц?");
//   };
// };
// start ();

startBtn.addEventListener('click', function() {
  time = prompt ("Введите дату в формате YYYY-MM-DD", '');
  money = +prompt ("Ваш бюджет на месяц?", '');

  if ( isNaN(money) || money == '' || money == null) {
    money = +prompt ("Ваш бюджет на месяц?", '');
  };
  appData.budget = money;
  appData.timeData = time;
  budget.textContent = money.toFixed();
  year.value = new Date(Date.parse(time)).getFullYear();
  month.value = new Date(Date.parse(time)).getMonth()+1;
  day.value = new Date(Date.parse(time)).getDate();

  expensesItemBtn.removeAttribute('disabled');
  optionalExpensesBtn.removeAttribute('disabled');
  countBudgetBtn.removeAttribute('disabled');
});


expensesItemBtn.addEventListener('click', function(){
  let sum = 0;
  for ( let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value,
        b = expensesItem[++i].value;
  
    if( typeof a === 'string' && typeof a != null && typeof b != null && a!= '' && b!= '' && a.length < 50){
      appData.expenses[a] = b;
      sum += +b;
    } else {
      i--;
    };
  };
  expenses.textContent = sum;
  // console.log(expenses.innerHTML);
});

optionalExpensesBtn.addEventListener('click', function(){
  let optional ;
  for (let i = 0; i < optionalexpensesItem.length; i++) {
    optional = optionalexpensesItem[i].value;
    // if( typeof optional != 'string' || typeof optional == null || optional == '' || optional.length > 50){
    //   optional = prompt('Укажите статью необязательных расходов' + i);
    // };
    appData.optionalExpenses[i] = optional;
    if(i==optionalexpensesItem.length-1){
      optionalExpenses.textContent += appData.optionalExpenses[i];
      break;
    }
    
    optionalExpenses.textContent += appData.optionalExpenses[i] + ', ';
  };
});

countBudgetBtn.addEventListener('click', function(){
  if( appData.budget != undefined) {
    appData.moneyPerDay = + ((appData.budget-expenses.innerHTML) / 30).toFixed(); 
    dayBudget.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
      level.textContent = 'Минимальный';
    } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 1000) {
      level.textContent = 'Средний';
    } else if (appData.moneyPerDay >= 1000){
      level.textContent = 'Выше среднего';
    } else {
      level.textContent = 'Что-то пошло не так ...';
    };
  } else {
    dayBudget.textContent = 'Произошла ошибка! Начните расчет!';
  };
});

incomeInput.addEventListener('input', function(){
  let items = incomeInput.value;
  if(typeof(items) != 'string' || items == '' || typeof(items) == null){
    items.textContent = 'Перечислите, что принесет дополнительный доход? (через запятую)';
  } else {
    appData.income = items.split(', ');
    income.textContent = appData.income;
  };
});

savingsCheckbox.addEventListener('click', function(){
  if( appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

savingsSum.addEventListener('input', function(){
  if(appData.savings == true){
    let sum = +savingsSum.value,
        percent = +percentValue.value;
    appData.monthIncome  = sum/100/12*percent.toFixed(1) ; 
    appData.yearIncome  = sum/100*percent.toFixed(1) ; 
    
    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1);
  };
});

percentValue.addEventListener('input', function(){
  if(appData.savings == true){
    let sum = +savingsSum.value,
        percent = +percentValue.value;
    appData.monthIncome  = sum/100/12*percent.toFixed(1) ; 
    appData.yearIncome  = sum/100*percent.toFixed(1) ; 
    
    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1);
  };
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income : [],
  savings: false,
  // chooseExpenses : function (){
  //   // for ( let i = 0; i < 2; i++) {
  //   //   let a = prompt ('Введите обязательную статью расходов в этом месяце'),
  //   //       b = +prompt ('Во сколько обойдется?');
    
  //   //   if( typeof a === 'string' && typeof a != null && typeof b != null && a!= '' && b!= '' && a.length < 50){
  //   //     appData.expenses[a] = b;
  //   //   } else {
  //   //     i--;
  //   //   };
    
  //   // };
  // },
  // detectDayBudget : function(){
  //   // appData.moneyPerDay = + (appData.budget / 30).toFixed(); //метод вернет строку, а не число
  //   // alert ('Ваш ежедневный бюджет: ' + appData.moneyPerDay);
  // },
  // detectLevel : function(){
  //   // if (appData.moneyPerDay < 100) {
  //   //   console.log('Доход минимальный');
  //   // } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 1000) {
  //   //   console.log('Уровень дохода средний');
  //   // } else if (appData.moneyPerDay >= 1000){
  //   //   console.log('Уровень дохода выше среднего');
  //   // } else {
  //   //   alert('Что-то пошло не так ...')
  //   // };
  // },
  // chooseOptExpenses : function(){
  //   // let optional ;
  //   // for (let i = 1; i<4; i++) {
  //   //   optional = prompt('Укажите статью необязательных расходов');
  //   //   if( typeof optional != 'string' || typeof optional == null || optional == '' || optional.length > 50){
  //   //     optional = prompt('Укажите статью необязательных расходов' + i);
  //   //   };
  //   //   appData.optionalExpenses[i] = optional;
  //   // };
  // },
  // checkSavings : function(){
  //   // if(appData.savings == true){
  //   //   let save = +prompt('Какова сумма Ваших накоплений?'),
  //   //       percent = +prompt('Под какой процент у Вас депозит?');
  
  //   //   appData.monthIncome  = + (save/100/12*percent).toFixed(2) ; 
  //   //   alert('Ваш ежемесячный доход от депозита: ' + appData.monthIncome);
  //   // };
  // },
  // chooseIncome : function(){
  //   // let items = prompt('Что принесет дополнительный доход? (перечислите через запятую)');
  //   // if(typeof(items) != 'string' || items == '' || typeof(items) == null){
  //   //   items = prompt('Что принесет дополнительный доход? (перечислите через запятую)');
  //   // } else {
  //   //   appData.income = items.split(', ');
  //   //   appData.income.push(prompt('Может что-то еще?'));
  //   //   appData.income.sort();
  //   // };

  //   // appData.income.forEach( function(item, index){
  //   //   alert('"Способы доп. заработка: " + (index+1) + " - " + item');
  //   // });
    
  // }
};



