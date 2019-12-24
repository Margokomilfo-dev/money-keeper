let startbtn = document.querySelector(".start"),

    btnAdd1 = document.querySelector(".add1"),
    btnAdd2 = document.querySelector(".add2"),
    btn1 = document.getElementsByTagName("button")[1],
    btn2 = document.getElementsByTagName("button")[3],
    btn3 = document.getElementsByTagName("button")[4],

    savingsbtn = document.querySelector("#savings"),
//inputs
    expensesItem = document.getElementsByClassName("expenses-item"),
    expensesItemAdd =  document.getElementsByClassName('add1')[0],
    optionalexpensesItem = document.getElementsByClassName("optionalexpenses-item"),
    optionalexpensesItemAdd =  document.getElementsByClassName('addel2')[0],
    chooseIncome = document.getElementById("income"),
    chooseSum = document.getElementsByClassName("choose-sum")[0],
    chooseercent = document.getElementsByClassName("choose-percent")[0],

//result
    budgetValue = document.getElementsByClassName("budget-value")[0],
    daybudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalexpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthsavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0],
    yearValue = document.getElementsByClassName("year-value")[0],
    monthValue = document.getElementsByClassName("month-value")[0],
    dayValue = document.getElementsByClassName("day-value")[0];

let money, time;

startbtn.addEventListener("click", function() {
  //time = prompt("Введите дату в формате YYYY-MM-DD",""),
  money = +prompt("Введите ваш месячный доход","");
  
  while(isNaN(money) || money == '' || money == null) {
    money = +prompt("ВВедите ваш месячный доход","");
  }
  appData.curdata = time;
  appData.budget = money;
  budgetValue.textContent = money;

  // yearValue.value = new Date(Date.parse(time)).getFullYear();
  // monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  // dayValue.value = new Date(Date.parse(time)).getDate();
//currently date
  yearValue.value = new Date(Date.now()).getFullYear();
  monthValue.value = new Date(Date.now()).getMonth() + 1;
  dayValue.value = new Date(Date.now()).getDate();
});

btnAdd1.addEventListener("click", function() {
  let newDiv = document.createElement("div");
  let input = document.createElement('input');
  
  input.style.marginRight = 4 +"px";
  input.type = "text";
  input.placeholder = "Наименование";
  input.className = "expenses-item";
  newDiv.appendChild(input);

  input = document.createElement('input');
  input.type = "text";
  input.placeholder = "Цена";
  input.className = "expenses-item";
  newDiv.appendChild(input);

  document.querySelector("#addel1").appendChild(newDiv);
});

btnAdd2.addEventListener("click", function() {
  let newDiv = document.createElement("div");
  let input = document.createElement('input');
  
  input.style.marginRight = 4 +"px";
  input.type = "text";
  input.className = "optionalexpenses-item";
  newDiv.appendChild(input);

  input = document.createElement('input');
  input.style.marginRight = 4 +"px";
  input.type = "text";
  input.className = "optionalexpenses-item";
  newDiv.appendChild(input);

  input = document.createElement('input');
  input.type = "text";
  input.className = "optionalexpenses-item";
  newDiv.appendChild(input);

  document.getElementById("addel2").appendChild(newDiv);
});

btn1.addEventListener("click", function() {
  let summa = 0;
  for (let i = 0; i < expensesItem.length; i++){
    let a = expensesItem[i].value,
        b = expensesItem[++i].value;
 
    if ((typeof(a)) === 'string' && a != '' && (typeof(a)) != null && (typeof(b)) != null && b != '' && a.length < 50) {
      appData.expenses[a] = b;
      summa += +b;

    } else if ((typeof(a)) != 'string' ) {
      alert("Некорректно ввели название статьи расходов!");
      i--;
      continue;
    } else if ((typeof(b)) === 'string' && b != '') {
      alert("Некорректно ввели цену!");
      i--;
      continue;
    } else if (a == '' || b == '' ) {
      a = 0;
      b = 0;
    } else {
      alert("Какая-то фигня");
    }
  }
  expensesValue.textContent = summa;
});

btn2.addEventListener("click", function() {
  for (let i=0; i < optionalexpensesItem.length; i++){
    let que = optionalexpensesItem[i].value;
    appData.optionalExpenses[i] = que;
    optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
  }
});

btn3.addEventListener("click", function() {
  if (budgetValue.textContent != '') {
    appData.perDay = (appData.budget / 30).toFixed(2);
    daybudgetValue.textContent = appData.perDay;
  } else {
    daybudgetValue.textContent = "error";
  }

  if (appData.perDay < 100) {
    levelValue.textContent = "Minimum";
  } else if (appData.perDay > 100 && appData.perDay < 2000) {
    levelValue.textContent = "Medium";
  } else if (appData.perDay > 2000) {
    levelValue.textContent = "Maximum";
  } else {
    levelValue.textContent = "error";
  }
});

chooseSum.addEventListener("input", function() {
  if  (savingsbtn.checked && !isNaN(parseInt(chooseSum.value)) && !isNaN(parseInt(chooseercent.value))) {
    let save = chooseSum.value,
        percent = chooseercent.value;
        
    appData.monthIncome = save/100/12*percent;
    appData.yearIncome = save/100*percent;

    monthsavingsValue.textContent = (appData.monthIncome).toFixed(2);
    yearsavingsValue.textContent = appData.yearIncome;
  } else {
    monthsavingsValue.textContent = "error!";
    yearsavingsValue.textContent = "error!";
  }
});

chooseIncome.addEventListener("input", function() {
  let items = chooseIncome.value;
    appData.income = items.split(","); 
    incomeValue.textContent = appData.income; 
});


chooseercent.addEventListener("input", function() {
  if (savingsbtn.checked && !isNaN(parseInt(chooseSum.value)) && !isNaN(parseInt(chooseercent.value))) {
    let save = chooseSum.value,
        percent = chooseercent.value;
        
    appData.monthIncome = save/100/12*percent;
    appData.yearIncome = save/100*percent;

    monthsavingsValue.textContent = appData.monthIncome;
    yearsavingsValue.textContent = appData.yearIncome;
  } else {
    monthsavingsValue.textContent = 0;
    yearsavingsValue.textContent = 0;
  }
});

let appData = {
  budget: money,
  curdata: time,
  optionalExpenses: {},
  expenses: [],
  income: [],
  savings: true
};