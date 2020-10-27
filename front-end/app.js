let header = document.querySelector(".header");

window.addEventListener("scroll", function () {  
    let windowPosition = window.scrollY > 0;
    header.classList.toggle("active", windowPosition);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
  });





