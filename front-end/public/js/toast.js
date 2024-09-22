function toast({ titleToast = '', message = '', type = 'success', duration = 3000 }) {
   const main = document.getElementById('toast');
   if (main) {
      const toast = document.createElement('div');

      // Auto remove
      const autoRemoveId = setTimeout(function() {
         main.removeChild(toast);
      }, duration + 1000);

      // Remove when click
      toast.onclick = function(e) {
         if (e.target.closest('.toast__close')) {
            main.removeChild(toast);
            clearTimeout(autoRemoveId);
         }
      }

      const icons = {
         success: 'bi bi-check-circle-fill',
         error: 'bi bi-exclamation-circle-fill',
         welcome: 'bi bi-info-circle-fill'
      };
      const icon = icons[type];
      const delay = (duration/1000).toFixed(2);

      toast.classList.add('toast', `toast--${type}`);
      toast.style.animation = `slideInLeft ease .9s,
                              fadeOut linear 1s ${delay}s forwards`;
      toast.innerHTML = `
         <div class="toast__icon">
            <i class="${icon}"></i>
         </div>
         <div class="toast__body">
            <h3 class="toast__title">${titleToast}</h3>
            <p class="toast__msg">${message}</p>
         </div>
         <div class="toast__close">
            <i class="bi bi-x"></i>
         </div>
      `;
      main.appendChild(toast);
   }
}

let titleToast = document.getElementById('titleToast').value;
let messageToast = document.getElementById('messageToast').value;
let typeToast = document.getElementById('typeToast').value;
let durationToast = parseInt(document.getElementById('durationToast').value);

toast({
   titleToast: titleToast,
   message: messageToast,
   type: typeToast,
   duration: durationToast
});