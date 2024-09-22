// Cố định Header ở trên màn hình bằng Jquery
$(document).ready(function () {
   $(window).scroll(function () {
      if ($(this).scrollTop()) {
         $('.main-header').addClass('sticky');
      } else {
         $('.main-header').removeClass('sticky');
      }
   });
});

// Thiết kế Slidebar Menu Website
$(document).ready(function () {
   // Jquery for toggle sub menus
   $('.sub-btn').click(function () {
      $(this).next('.sub-menu').slideToggle();
      $(this).find('.dropdown').toggleClass('rotate');
   });

   // Jquery for expand and collapse the slidebar
   $('.icon-menu-hidden').click(function () {
      $('.side-bar').addClass('active');
      $('.icon-menu-hidden').css("visibility", "hidden");
   });

   $('.close-menu').click(function () {
      $('.side-bar').removeClass('active');
      $('.icon-menu-hidden').css("visibility", "visible");
   });
});

// Thiết kế chuyển động trang Login & Register
// const container = document.getElementById('container');
// const registerBtn = document.getElementById('register');
// const loginBtn = document.getElementById('login');
// registerBtn.addEventListener('click', () => {
//    container.classList.add('active');
// });
// loginBtn.addEventListener('click', () => {
//    container.classList.remove('active');
// });

// Thiết kế input:file cho trang Register
let inputFile = document.querySelector('.inputFile');
let fileName = document.getElementById('fileName');
inputFile.addEventListener('change', function(e) {
   let uploadedFileName = e.target.files[0].name;
   fileName.textContent = uploadedFileName;
});