let button = document.querySelectorAll('.js-component__button');
console.log(button);

button[0].addEventListener('click', function(event) {
  event.preventDefault();
  console.log('Amir');
})