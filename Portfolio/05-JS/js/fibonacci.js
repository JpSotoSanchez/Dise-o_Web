var memo = {};

function fibonacci(n) {
  "use strict";
  var val = f(n);
  document.getElementById("fibonacciLbl").textContent = val;
  return val;
}

function f(n) {
  var value;
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    if (n === 0) {
      value = 0;
    } else if (n === 1) {
      value = 1;
    } else {
      value = f(n - 1) + f(n - 2);
    }
    memo[n] = value;
  }

  return value;
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn").addEventListener("click", function() {
    var num = parseInt(document.getElementById("num").value, 10);
    if (isNaN(num) || num < 0) {
      document.getElementById("fibonacciLbl").textContent = "Please enter a valid non-negative number.";
    } else {
      fibonacci(num); 
    }
  });
});
