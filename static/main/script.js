let main = document.getElementById("main_div");
let alter = document.getElementById("alter_div");
let this_div = document.querySelector("body>div");
let spans = document.getElementsByClassName("punkt_menu");
let check = false;

for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', function() {
        switch (i) {
            case 0:
                window.location.href = "/library?root=student";
                break;
            case 2:
                window.location.href = "/library?root=teacher";
                break;
            case 1:case 4:
                transition();
                break;
            case 3:
                window.location.href = "/editing?func=add";
                break;
        }        
    });
}

function transition() {
    if (check==false) {
        alter.style.display = "flex";
        main.style.display = "none";
        check=true;
    } else if (check==true) {
        main.style.display = "flex";
        alter.style.display = "none";
        check=false;
    }
}