let string = "";
let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML == '=') {
      return;
    }
    if (e.target.innerHTML == 'C') {
      string = ""
      document.querySelector('input').value = string;
      document.getElementsByClassName('output')[0].innerHTML = string;

    }
    else {
      console.log(e.target)
      string = string + e.target.innerHTML;
      document.querySelector('input').value = string;
    }
  })
})
document.getElementsByClassName('main')[0].addEventListener('click', function() {
  string = eval(document.getElementsByClassName('input')[0].value);
  document.getElementsByClassName('input')[0].value = string;
})


document.getElementsByClassName('input')[0].addEventListener('keypress', function(e) {

  if (e.key === 'Enter') {
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
    //------------
    string = eval(document.getElementsByClassName('input')[0].value);
    document.getElementsByClassName('input')[0].value = string;


    var delayInMilliseconds = 500; //.15 second

    setTimeout(function() {
      document.querySelector('.dd').style.visibility = 'hidden';
    }, delayInMilliseconds);

  }
})

// let elem = document.getElementByClassName("input")[0];

// elem.addEventListener("keypress", (event) => {
//   console.log("hi")
//   if (event.keyCode === 13) {
//     // key code of the keybord key
//     console.log("hello")
//     event.preventDefault();
//     string = eval(document.getElementsByClassName('input')[0].value);
//     document.getElementsByClassName('input')[0].value = string;
//     // your code to Run
//   }
// });