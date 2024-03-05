let divs = document.querySelectorAll(".place_for_category");
let pics = document.querySelectorAll(".place_for_picture");
let main_button = document.getElementById("main_button");
let preview = JSON.parse(document.querySelector("body").getAttribute("data-preview"));
let urlParams = new URLSearchParams(window.location.search);
let root = urlParams.get('root');

pics.forEach(function(pic, index) {
    let img = new Image();
    img.src = preview[index];
    img.onload = function() {
        pic.style.backgroundImage="url('" + preview[index] + "')";
    };
    img.onerror = function() {
        pic.classList.add("none");
    };
});

document.querySelector("body").removeAttribute("data-preview");

divs.forEach(function(my_div) {
    my_div.addEventListener('click', function() {
        if (my_div.querySelector('.small_text').textContent.match(/\d+/)[0]>0){
            window.location.href = "/show?category=" + encodeURIComponent(my_div.getAttribute('data-description')) + "&root=" + root;
        }
        else{
            alert("В данной категории нет изображений!!!");
        }
     });
});

main_button.addEventListener('click', ()=>{
    window.location.href = "/";
});