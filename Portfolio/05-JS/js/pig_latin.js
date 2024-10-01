/*
Pig Latin
*/

function igpayAtinlay(str) {
  var returnArray = [];
  var wordArray = str.split(" "); // Split the input string into words

  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = "";
    var restOfWord = "";
    var vowelFound = false;

    if (/[aeiouAEIOU]/.test(word.charAt(0))) {
      returnArray.push(word + "way");
    } else {
      for (var ii = 0; ii < word.length; ii++) {
        if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
          vowelFound = true;
          restOfWord = word.slice(ii);
          break;
        } else {
          beginning += word.charAt(ii);
        }
      }
      if (vowelFound) {
        returnArray.push(restOfWord + beginning + "ay");
      } else {
        returnArray.push(word + "ay");
      }
    }
  }
  document.getElementById("pigLatLbl").textContent=(returnArray.join(" "));
  return returnArray.join(" ");
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn").addEventListener("click", function() {
    var text = document.getElementById("txtVal").value;
    igpayAtinlay(text); 
  });
});

// Test examples
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
