let amountElement = document.getElementById('amount');
let amount = amountElement.value;

const render = (amount) => {
   amountElement.value = amount;
}

const handleInc = () => {
   amount++;
   render(amount);
}

const handleDec = () => {
   if (amount > 1) {
      amount--;
   }
   render(amount);
}

amountElement.addEventListener('input', () => {
   amount = amountElement.value;
   amount = parseInt(amount);
   amount = (isNaN(amount) || amount == 0) ? 1 : amount;
   render(amount);
});
 