let sign_in = document.getElementById("sign_in");
let username = document.getElementById("username");
let password = document.getElementById("password");
let warnings = document.querySelectorAll(".warning");
let radio_change = document.querySelectorAll('#header>input[type=radio]');
let reg_div = document.getElementById('reg');
let choise_div = document.getElementById('choise');
let back_button = document.getElementById('back');
let places = document.querySelectorAll('.place_for_category');

sign_in.addEventListener('click', () => {
    clear();
    if (username.value === "") {
        warnings[0].style.color = "brown";
    } 
    if (password.value === "") {
        warnings[1].style.color = "brown"
    }
    if (password.value !== "" && username.value !== ""){
        user_checker();
    }
});

username.addEventListener("click", () => {
    clear();
});

password.addEventListener("click", () => {
    clear();
});

radio_change.forEach((rad) => {
    rad.addEventListener('change', () => {
        clear();
    });
});

back_button.addEventListener('click', () => {
    choise_div.style.display = "none";
    reg_div.style.display = "flex";
});

const clear = () => {
    warnings.forEach(el => {
        el.style.color = "#C7C7C7";
    });
}

const user_checker = () => {
    if (radio_change[1].checked && username.value === "teacher" && password.value === "1") { 
        username.value = "";
        password.value = "";
        reg_div.style.display = "none";
        choise_div.style.display = "flex";
    }
    else if (radio_change[0].checked && username.value === "student" && password.value === "1"){
        window.location.href = "/library?root=student";
    }
    else {
        warnings[2].style.color = "brown";
    }
}

places.forEach((place, index) => {
    place.addEventListener('click', () => {
        switch (index) {
            case 0:
                window.location.href = "/editing?func=add";
                break;
            case 1:
                window.location.href = "/library?root=teacher";
                break;
        }     
    });
});