function submit() {
  var input = document.getElementById('textID').value;
  var output = foo(input);
  document.getElementById('test').innerHTML = output;
}
