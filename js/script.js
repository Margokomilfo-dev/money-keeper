let startbtn = document.getElementById("start"),
    budgetVal = document.getElementsByClassName("budget-value")[0],
    daybudget = document.getElementsByClassName("daybudget-value")[0],
    level = document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalexpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeV = document.getElementsByClassName("income-value")[0],
    monthsavingsvalue = document.querySelector(".monthsavings-value"),
    yearsavingsvalue = document.querySelector(".yearsavings-value"),
    expensesItem = document.getElementsByClassName("expenses-item"),
    expensesItemBtn = document.getElementsByTagName("button")[0],
    optionalExpensesBtn = document.getElementsByTagName("button")[1],
    countBudgetBtn = document.getElementsByTagName("button")[2];
    optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),

    chooseIncome = document.querySelector(".choose-income"),
    checkSavings = document.querySelector("#savings"),
    chooseSum = document.querySelector(".choose-sum"),
    choosePercent = document.querySelector(".choose-percent"),
    yearValue = document.querySelector(".year-value"),
    monthValue = document.querySelector(".month-value"),
    dayValue = document.querySelector(".day-value");

let money, time;


startbtn.addEventListener("click", function() {
  time = prompt("Введите дату в формате YYYY-MM-DD","");
  money = +prompt("ВВедите ваш месячный доход","");
  
  while(isNaN(money) || money == '' || money == null) {
    money = +prompt("ВВедите ваш месячный доход","");
  }
  appData.budget = money;
  appData.curdata = time;
  budgetVal.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener("click", function() {
  let sum = 0;
   //first FOR
   for (let i = 0; i < expensesItem.length; i++){
    let a = expensesItem[i].value,
        b = expensesItem[++i].value;
  
    if ((typeof(a)) === 'string' && a != '' && (typeof(a)) != null && (typeof(b)) != null && b != '' && a.length < 50) {
    appData.expenses[a] = b;
    sum += +b;
    console.log("done");
    } else if ((typeof(a)) != 'string' || a == '') {
      alert("Некорректно ввели название статьи расходов!");
      i--;
      continue;
    } else if ((typeof(b)) === 'string' || b == '') {
      alert("Некорректно ввели цену!");
      i--;
      continue;
    } else {
      alert("Какая-то фигня");
    }
  }
  expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener("click", function(){
  for (let i=0; i<optionalExpensesItem.length; i++){
    let que = optionalExpensesItem[i].value;
    appData.optionalExpenses[i] = que;
    optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' '; 
  }
});

countBudgetBtn.addEventListener("click", function() {
  if (appData.budget != undefined) {
    appData.perDay = (appData.budget / 30).toFixed(2);
    daybudget.textContent = appData.perDay;
    if (appData.perDay < 100) {
      level.textContent = "Минимальный уровень дохода";
    } else if (appData.perDay > 100 && appData.perDay < 2000) {
      level.textContent = "Средний уровень дохода";
    } else if (appData.perDay > 2000) {
      level.textContent = "Максимальный уровень дохода";
    } else {
      level.textContent = "Ошибка";
    }
  } else {
    daybudget.textContent = "Произошла ошибка!";
  }
});

chooseIncome.addEventListener("input", function() {
  let items = chooseIncome.value;

  appData.income = items.split(", ");
  incomeV.textContent = appData.income;
});

checkSavings.addEventListener("click", function() {
  if (appData.savings == true){
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});


chooseSum.addEventListener("input", function() {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
        percent = +choosePercent.value;

    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;

    monthsavingsvalue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsvalue.textContent = appData.yearIncome.toFixed(1);
  }
});

choosePercent.addEventListener("input", function() {
  if (appData.savings == true) {
    let sum = +chooseSum.value,
        percent = +choosePercent.value;

    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent;

    monthsavingsvalue.textContent = appData.monthIncome.toFixed(1);
    yearsavingsvalue.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
		budget: money,
		curdata: time,
		optionalExpenses: {},
		expenses: [],
		income: [],
    savings: false
  };


// document.querySelector(".choose-expenses").style.fontSize = "36px";
