/*
    Sieve of Eratosthenes - This implementation finds all the prime numbers below a given number.
*/
var sieve = function (n) {
  "use strict";

  var array = new Array(n).fill(true); 
  var primes = [];
  array[0] = array[1] = false; 

  for (var i = 2; i < Math.sqrt(n); i++) {
    if (array[i]) {
      for (var j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }

  for (var i = 2; i < n; i++) {
    if (array[i]) {
      primes.push(i);
    }
  }

  return primes;
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", function () {
    var num = parseInt(document.getElementById("num").value, 10);
    var primes = sieve(num); 

    // Display primes in the HTML
    document.getElementById("primes").textContent = primes.join(", ");
  });
});

