let body = document.querySelector("body");

//запрос на переменные
let urlParams = new URLSearchParams(window.location.search);
let category = urlParams.get('category');
let root = urlParams.get('root');
let my_link = JSON.parse(body.getAttribute('data-link'));
let my_name = JSON.parse(body.getAttribute('data-name'));
let my_desc = JSON.parse(body.getAttribute('data-desc'));
body.removeAttribute('data-link');
body.removeAttribute('data-name');
body.removeAttribute('data-desc');

//формы
let header = document.querySelector(".header_of_body>span");
let place_for_picture = document.getElementById("place_for_picture");
let this_name = document.querySelector("#name>span:nth-child(2)");
let my_description = document.getElementById("description");
let form= document.getElementById("form");
let setting = document.getElementById("s2");
let sett_inside = document.querySelector("#setting_button>div");
let menu = document.getElementById("menu");
let main = Array.from(document.querySelectorAll('#main > *:not(#setting_button):not(#setting_button>div):not(.header_of_body:nth-of-type(1))'));
main.push(document.getElementById('s1')); 
main.push(document.querySelector('.header_of_body:nth-of-type(1)>span'));

//кнопки
let left = document.getElementById("left_button");
let right = document.getElementById("right_button");
let audio_button = document.getElementById("audio_button");
let pause_button = document.getElementById("pause_button");
let delete_button = document.getElementById("delete_button");
let editing_button_button = document.getElementById("editing_button");
let setting_button = document.getElementById("setting_button");
let voice_select = document.getElementById("voice_select");
let contrast_range = document.getElementById("contrast_range");
let library_button = document.getElementById("library_button");
let changes = document.querySelectorAll("#form_for_change input");

//озвучка
let utterance = new SpeechSynthesisUtterance();
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        voices.forEach(voice => {
            const optionElement = document.createElement('option');
            optionElement.value = voice.name;
            optionElement.text = voice.name;
            voice_select.appendChild(optionElement);
        });
        utterance.voice = voices[0];
    };
    window.speechSynthesis.onvoiceschanged();
}

//чекеры и буферы
let checker = 0;
let isSpeaking = false; 
let pause = false;

//фильтры
var protanopiaFilter = document.getElementById('protanomaly');
var deuteranopiaFilter = document.getElementById('deuteranomaly');
var tritanopiaFilter = document.getElementById('tritanomaly');

if (root!="teacher"){
    setting.style.display = "none";
}

function update() {
    
    if (my_name.length == 1 || my_name.length == 0) {
        left.style.visibility = "hidden";
        right.style.visibility = "hidden";
    }
    if (my_name.length == 2) {
        if (checker == 0) {
            left.style.visibility = "hidden";
            right.style.visibility = "visible";
        }
        else if (checker == my_name.length-1) {
            left.style.visibility = "visible";
            right.style.visibility = "hidden";
        }
    }
    if (my_name.length > 2) {
        if (checker == 0) {
            left.style.visibility = "hidden";
        }
        else if (checker == my_name.length-1) {
            right.style.visibility = "hidden";
        }
        else {
            left.style.visibility = "visible";
            right.style.visibility = "visible";
        }
    }
    header.textContent = category + ": " + (checker + 1) + " из " + my_name.length;
    this_name.textContent = my_name[checker];
    my_description.textContent = my_desc[checker];
    let img = new Image();
    img.src= my_link[checker];
    img.onload = function() {
        place_for_picture.style.backgroundImage = "url('" + img.src + "')";
    };
}

update();

library_button.addEventListener('click', ()=>{
    window.location.href = "/library?root=" + root;
});

right.addEventListener('click', () => {
    if (checker<my_name.length-1){
        checker++;
        form.style.transform = 'translateX(-100%)';
        form.addEventListener('transitionend', () => {
            form.classList.remove('animation');
            form.style.transform = 'translateX(100%)';
            form.offsetHeight; 
            form.classList.add('animation');
            update();
            form.style.transform = 'translateX(0)';
        }, { once: true });
        right.disabled = false;
        left.disabled = false;
    }
});

left.addEventListener('click', () => {
    if (checker>0){
        checker--;
        right.disabled = true;
        left.disabled = true;
        form.style.transform = 'translateX(100%)';
        form.addEventListener('transitionend', () => {
            form.classList.remove('animation');
            form.style.transform = 'translateX(-100%)';
            form.offsetHeight; 
            form.classList.add('animation');
            update();
            form.style.transform = 'translateX(0)';
        }, { once: true });
    right.disabled = false;
    left.disabled = false;
    }
});

audio_button.addEventListener('click', () => {
    if (!isSpeaking) {
        pause_button.style.display="block";
        isSpeaking = true;
        right.disabled = true;
        left.disabled = true;
        if (checker != 0) {
            checker = 0;
            form.style.transform = 'translateX(100%)';
            form.addEventListener('transitionend', () => {
                form.classList.remove('animation');
                form.style.transform = 'translateX(-100%)';
                form.offsetHeight; 
                form.classList.add('animation');
                update();
                form.style.transform = 'translateX(0)';
                form.addEventListener('transitionend', () => {
                    speak();
                }, { once: true });
            }, { once: true });
        }
        else {
            speak();
        }
    }
    else {
        isSpeaking = false;
        speechSynthesis.cancel();
        pause_button.style.display="none";
        right.disabled = false;
        left.disabled = false;
    }
    audio_button.classList.toggle('aud');
    audio_button.classList.toggle('no_aud');
});

pause_button.addEventListener('click', ()=>{
    if (!pause){
        speechSynthesis.pause();
        pause=true;
    }
    else {
        speechSynthesis.resume();
        pause=false;
    }
    pause_button.classList.toggle('pause');
    pause_button.classList.toggle('resume');
});

function speak() {
    if (checker < my_name.length) {
        utterance.text = header.textContent + ". Название:" + this_name.textContent + ". Описание:" + my_description.textContent + ".";
        speechSynthesis.speak(utterance);
        utterance.onend = function () {
            if (checker<my_name.length-1){
                checker++;
                form.style.transform = 'translateX(-100%)';
                form.addEventListener('transitionend', () => {
                    form.classList.remove('animation');
                    form.style.transform = 'translateX(100%)';
                    form.offsetHeight; 
                    form.classList.add('animation');
                    update();
                    form.style.transform = 'translateX(0)';
                    form.addEventListener('transitionend', () => {
                        speak();
                    }, { once: true });
                }, { once: true });
            } 
            else {
                isSpeaking = false;
                right.disabled = false;
                left.disabled = false;
                pause_button.style.display="none";
                audio_button.classList.toggle('aud');
                audio_button.classList.toggle('no_aud');
            }
        };
    }
}

//кнопка удаления
delete_button.addEventListener('click', ()=>{
    if (confirm('Вы действительно хотите удалить изображение '+(checker+1))) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/delete_image", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function() {
            if (xhr.status === 200) {
                if (my_name.length <= 1) {
                    window.location.href = "/library?root=" + root;
                }
                else window.location.reload(); 
            }
        };
        const data = JSON.stringify({ index: checker+1, category: category });
        xhr.send(data);
    }
});

editing_button.addEventListener('click', ()=>{
    window.location.href = "/editing?func=redaction-"+category+"-"+(checker+1);
});

document.addEventListener('visibilitychange', () => {
    speechSynthesis.cancel()
});

setting_button.addEventListener("click", (event) => {
    sett_inside.classList.toggle("rotation");
    menu.classList.toggle("show-menu");
    if (!menu.classList.contains("show-menu")){
        menu.addEventListener("transitionend", handleTransitionEnd);
    }
    else {
        main.forEach(function (element) {
            element.classList.toggle("no-active");
        });
    }
    event.stopPropagation();
});

function handleTransitionEnd() {
    main.forEach(function (element) {
        element.classList.remove("no-active");
    });
    menu.removeEventListener('transitionend', handleTransitionEnd);
}

body.addEventListener("click", (event) => {
    if (menu.classList.contains("show-menu") && !menu.contains(event.target)) {
        sett_inside.classList.remove("rotation");
        menu.classList.remove("show-menu");
        menu.addEventListener("transitionend", handleTransitionEnd);
    }
});

voice_select.addEventListener('change', () => {
    const voices = window.speechSynthesis.getVoices();
    voices.forEach((this_voice, index) => {
        if (voice_select.value == this_voice.name) {
            if (isSpeaking) {
                audio_button.click();
            }
            utterance.voice = voices[index];
        }
    });
});

contrast_range.addEventListener('input', ()=>{
    color_reload();
});

changes.forEach(function(my_change) {
    my_change.addEventListener('change', function() {
        color_reload();
    });
});

function color_reload(){
    place_for_picture.style.filter = "";
    changes.forEach(function(my_change, index) {
        if (my_change.checked){
            switch (index+1) {
                case 1:
                    place_for_picture.style.filter = 'saturate('+ contrast_range.value +')';
                    break;
                case 2:
                    place_for_picture.style.filter = 'saturate('+ contrast_range.value +') url(#' + protanopiaFilter.id + ')';
                    break; 
                case 3:
                    place_for_picture.style.filter = 'saturate('+ contrast_range.value +') url(#' + deuteranopiaFilter.id + ')';
                    break;
                case 4:
                    place_for_picture.style.filter = 'saturate('+ contrast_range.value +') url(#' + tritanopiaFilter.id + ')';
                    break;    
                default: 
                    break;
            }
        }
    });
}

window.onkeydown = ({ key }) => {
    switch (key.toLowerCase()) {
        case 's': case 'ы':
            audio_button.click();
            break;
        case 'p': case 'з':
            pause_button.click();
            break; 
        case 'arrowleft':
            left.click();
            break;
        case 'arrowright':
            right.click();
            break; 
        case 'delete':
            delete_button.click();
            break;     
        default: 
            break;
    }
}