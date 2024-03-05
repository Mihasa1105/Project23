//ввод
let input_picture = document.querySelector("#label>input");
let search = document.getElementById("search");
let changes = document.querySelectorAll("#form_for_change input");
let drop_down_menu_content = document.getElementById("drop_down_menu_content");
let text_of_description = document.getElementById("text_of_description");
text_of_description.readOnly = true;
let indexing = document.getElementById("indexing");
let first_span = document.querySelector("#first_punkt>span");

//формы
let label = document.getElementById("label");
let text_label = document.getElementById("text");
let back_div = document.getElementById("back_div");
let label_div = document.getElementById("label_div");
let search_div = document.getElementById("search_div");
let settings = document.getElementById("settings");
let form = document.querySelector("#background_for_gif>div:nth-of-type(2)");
let my_name = document.getElementById("name");
let all = document.querySelectorAll("#background_for_gif>*");
let body = document.querySelector("body");
let background_for_gif = document.getElementById('background_for_gif');

//кнопки
let search_button = document.getElementById("search_button");
let back_button = document.getElementById("back_button");
let drop_down_button = document.getElementById("drop_down_button");
let spans = document.querySelectorAll("#drop_down_menu_content>span");
let sending_button = document.getElementById('sending_button');

//буфер
let my_link;
let load_check=false;//загруден ли файл
let xhr = null;//запрос
let audio_buffer;//текст озвучки
let category_mass = JSON.parse(drop_down_menu_content.getAttribute("data-length"));
let this_func =  body.getAttribute("data-func");
let data_pic = JSON.parse(body.getAttribute('data-pic'));
let prime_data_number = 0;

if (this_func == "redaction"){
    sending_button.classList.add("redact");
    spans.forEach(function(my_span,index){
        if (my_span.textContent == data_pic[0]){
            first_span.textContent = my_span.textContent;
            prime_data_number = index;
            first_span.setAttribute("data-number", index);
            if (category_mass[index]>1){
                indexing.placeholder = "Введите номер от 1 до "+ (category_mass[index]);
            }
            else {
                indexing.placeholder = "Доступен только номер 1";
            }
        }
     });
    indexing.value=data_pic[1]+1;
    my_link=data_pic[2];
    my_name.value=data_pic[3];
    audio_buffer=data_pic[4];
    text_of_description.value = audio_buffer;
    changes[0].checked = true;
    let img = new Image();
    img.src = my_link;
    img.onload = function() {
       new_label(img.src);
    };
}

else {
    sending_button.classList.add("set");
}

//проверка на наличие файлов
function check_files(){
    let this_files = input_picture.files;
    if(this_files.length > 0) {
        return true;
    }
    else return false;
}

//добавление файла в лейбл
function add(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        search.value=reader.result;
        my_link = search.value;
        new_label(reader.result);
    };
}

//поиск картинки по ссылке и добавление картинки в лейбл
function find_image(){
    if (search.value !== "" && load_check==false) {
        let img = new Image();
        img.src = search.value;
        img.onload = function() {
           my_link = img.src;
           new_label(img.src);
        };
        img.onerror = function() {
            search.value="Изображение не найдено";
        };
    }
}

//лейбл без картинки
function old_label(){
    my_link="";
    audio_buffer="";
    text_of_description.value="";
    my_name.value="";
    indexing.value="";
    changes[0].checked = true;
    first_span.textContent=spans[0].textContent;
    drop_down_menu_content.style.display="none";
    back_div.style.display="none";
    label_div.style.backgroundImage="none";
    label_div.style.justifyContent="center";
    label.style.display="flex";
    search.value="";
    input_picture.value = "";
    load_check=false;
    sending_button.style.display = "none";
    form.style.height=575+"px";
    settings.style.display="none";
    search_div.style.display="flex";
}

//загрузка
function half_label(stage){
    let my_visible;
    if (stage=="start"){
        my_visible = 'hidden';
        background_for_gif.classList.add("add");
    }
    else{
        background_for_gif.classList.remove("add");
        my_visible = 'visible';
    }
    for (let i=0; i<all.length;i++){
        all[i].style.visibility = my_visible;
    }
}

//лейбл c картинкой
function new_label(url){
    if (this_func == "add"){
        text_sound(search.value);
    }
    sending_button.style.display = "block";
    form.style.height=800+"px";
    settings.style.display="flex";
    search_div.style.display="none";
    label.style.display="none";
    label_div.style.backgroundImage="url('" + url + "')";
    label_div.style.backgroundSize="contain";
    label_div.style.backgroundSize="70%";
    label_div.style.backgroundRepeat="no-repeat";
    label_div.style.backgroundPosition="center";
    label_div.style.justifyContent="flex-start";
    back_div.style.display="flex";
    load_check=true;
}

//получение озвучки
function text_sound(url) {
    half_label("start");
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/sending_text", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
        if (xhr.status === 200) {
            half_label("end");
            audio_buffer = xhr.responseText;
            text_of_description.value = audio_buffer;
        }
    };
    const data = JSON.stringify({ url: url });
    xhr.send(data);
}

//обработчик перетаскивания файла
label.addEventListener('dragover', (e) => {
    e.preventDefault();
    label.classList.add('dragging');
});

label.addEventListener('dragleave', () => {
    label.classList.remove('dragging');
});

label.addEventListener('drop', (e) => {
    e.preventDefault();
    label.classList.remove('dragging');
    add(e.dataTransfer.files[0]);
});

//обработчик добавления файла по нажатию
label.addEventListener('change', ()=>{
    if (check_files()) add(input_picture.files[0]);
});

//обработчик поиска по ссылке
search_button.addEventListener('click', ()=>{
    find_image();
});

//обработчик выпадающего меню
drop_down_button.addEventListener('click',function(){
    if (drop_down_menu_content.style.display=="flex"){
        drop_down_menu_content.style.display="none";
    }
    else drop_down_menu_content.style.display="flex";
});

spans.forEach(function(my_span, index) {
    my_span.addEventListener('click', function() {
        if (this_func == "redaction" && my_span.textContent == data_pic[0]){
            if (category_mass[index]>1){
                indexing.placeholder = "Введите номер от 1 до "+ (category_mass[index]);   
            }
            else indexing.placeholder = "Доступен только номер 1";
        }
        if ((this_func == "redaction" && my_span.textContent != data_pic[0]) || this_func == "add"){
            if (category_mass[index]>0){
                indexing.placeholder = "Введите номер от 1 до "+ (category_mass[index]+1);   
            }
            else indexing.placeholder = "Доступен только номер 1"; 
        }
        first_span.textContent = my_span.textContent;
        first_span.setAttribute("data-number", index);
        indexing.value="";
        drop_down_button.click();
    });
});

//обработчик выбоора озвучки
changes.forEach(function(my_change) {
    my_change.addEventListener('change', function() {
        if(my_change.value=="1"){
            text_of_description.value=audio_buffer;
            text_of_description.readOnly= true;
        }
        else{
            text_of_description.readOnly= false;
        }
    });
});

//обработчик отмены
back_button.addEventListener("click", ()=>{
    if (this_func=="add"){
        old_label();
    }
    else{
        window.location.href = document.referrer;
    }
});

sending_button.addEventListener('click', ()=>{
    if (my_name.value!="" && text_of_description.value!="" && isInteger(indexing.value)) {
        half_label("start");
        xhr = new XMLHttpRequest();
        if (this_func == "add") {
            console.log("да");
            xhr.open("POST", "/sending_image", true);
        }
        else {
            console.log("нет");
            xhr.open("POST", "/redact_image", true);
        }
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function() {
            if (xhr.status === 200) {
                half_label("end");
                if (this_func == "add") window.location.reload();
                else if (first_span.textContent != data_pic[0] && category_mass[prime_data_number] == 1) window.location.href = "/library";
                else window.location.href = document.referrer;                
            }
        };
        let data;
        if (this_func == "add") {
            data = JSON.stringify({ name: my_name.value, description: text_of_description.value, url: my_link , category: first_span.textContent, id: parseInt(indexing.value, 10)});
        }
        else {
            data = JSON.stringify({ name: my_name.value, description: text_of_description.value, url: my_link , old_category: data_pic[0], new_category: first_span.textContent, new_id: parseInt(indexing.value, 10), old_id:data_pic[1]+1});
        }
         xhr.send(data);         
    }
    else {
        alert("Заполните все пункты!");
    }
});

function isInteger(value){
    let intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue.toString() === value){
        if (this_func == "redaction" && first_span.textContent == data_pic[0]){
            if ((category_mass[JSON.parse(first_span.getAttribute("data-number"))]==0 && intValue==1) || (category_mass[JSON.parse(first_span.getAttribute("data-number"))]>0 && intValue>0 && intValue<=category_mass[JSON.parse(first_span.getAttribute("data-number"))])){
                return true;
            }
        }
        else if ((category_mass[JSON.parse(first_span.getAttribute("data-number"))]==0 && intValue==1) || (category_mass[JSON.parse(first_span.getAttribute("data-number"))]>0 && intValue>0 && intValue<=category_mass[JSON.parse(first_span.getAttribute("data-number"))]+1)){
            return true;
        }
    }
    return false;
}