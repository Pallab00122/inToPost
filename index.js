//precedence function
let precedence = (m, n) => {
  const operatorA = ["*%/", "+-"]
  let a;
  let b;
  for (let i = 0; i < 2; i++) {
    if (operatorA[i].includes(m)) { a = i; }
    if (operatorA[i].includes(n)) { b = i; }
  }
  if (a == b) {
    return 0;
  }
  else if (a < b) { return 1 }
  else { return 0 }
}
//end

document.getElementsByClassName("main")[0].addEventListener('click', function() {
  document.querySelector('.dd').style.visibility = 'visible';
  let opStack = new Array();
  let opArray = "";
  let s = document.getElementsByClassName('input')[0].value;
  for (let i = 0; i < s.length; i++) {
    if ((s[i] >= 0 && s[i] <= 9)) {
      opArray += " " + s[i];
    }
    else if (opStack.length == 0) { opStack.push(s[i]) }
    else if (s[i] == '(') {
      opStack.push(s[i]);

    }
    else if (s[i] == ')') {
      while (opStack[opStack.length - 1] != '(') {
        opArray += " " + (opStack.pop());
      }
      opStack.pop()
    }
    else if (opStack[opStack.length - 1] == '(') {
      opStack.push(s[i]);
    }
    else if (precedence(s[i], opStack[opStack.length - 1]) == 1) {
      opStack.push(s[i]);
    }
    else if (precedence(s[i], opStack[opStack.length - 1]) == 0) {
      let n = opStack.length;
      while (n > 0 && precedence(s[i], opStack[n - 1]) == 0) {
        opArray += " " + (opStack.pop())
        n--
      }
      opStack.push(s[i])
    }
  }
  {
    let n = opStack.length;
    while (n > 0) {
      opArray += " " + (opStack.pop())
      n--
    }
  }


  document.getElementsByClassName('output')[0].innerHTML = opArray;

  // console.log(opStack)
  // opArray.push('*')
  // console.log(opArray.pop())
  var delayInMilliseconds = 500; //.15 second

  setTimeout(function() {
    document.querySelector('.dd').style.visibility = 'hidden';
  }, delayInMilliseconds);

})
