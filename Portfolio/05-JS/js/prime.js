var getPrimeFactors = function () {
  "use strict";
  var numerochecar= parseInt(document.getElementById("num").value,10);
  
  function isPrime(oper) {
    if ( oper < 2){
      return false;
    } 
    for (var i = 2; i <= Math.sqrt(oper); i++) {
      if (oper % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i = 2; 
  var sequence = []; 
  while (numerochecar > 1) {
    if (numerochecar % i === 0) {
      if (isPrime(i)) {
        sequence.push(i); 
      }
      numerochecar = numerochecar / i; 
    } 
    else {
      i++; 
    }
  }
  var parrafo=document.getElementById("pf");
  parrafo.textContent = "The sequence of prime numbers is: " + sequence;
  return sequence;
};
