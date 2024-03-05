from AI.AI_Func import discribe
#from AI_question.AI_que_func import question
from Config import app
from DB.DB_Func import lib_in, lib_out, lib_del, lib_redact, lib_insert
from Img1x1.Img_1x1_Func import pic1x1
from flask import render_template, request
import json


@app.route("/")
def index():
    return render_template("sign_in.html")


@app.route("/editing")
def editing():
    func = request.args.get('func')
    lib_1 = lib_out("Живопись")
    lib_2 = lib_out("Графика")
    lib_3 = lib_out("Скульптура")
    lib_4 = lib_out("Архитектура")
    koll = [len(lib_1), len(lib_2), len(lib_3), len(lib_4)]
    if (func == "add"):
        return render_template("editing.html", func=func, pic_data=[], koll=koll)
    else:
        new_func = func.split("-")
        this_id = int(new_func[2]) - 1
        lib_cur = lib_out(new_func[1])
        return render_template("editing.html", func=new_func[0], pic_data=json.dumps([new_func[1], this_id, lib_cur[this_id].link, lib_cur[this_id].nazva, lib_cur[this_id].desc]), koll=koll)
#категория ид ссылка имя описание

@app.route('/library')
def library():
    root = request.args.get('root')
    lib_1 = lib_out("Живопись")
    lib_2 = lib_out("Графика")
    lib_3 = lib_out("Скульптура")
    lib_4 = lib_out("Архитектура")
    koll=[len(lib_1), len(lib_2), len(lib_3), len(lib_4)]
    first_pics = ["", "", "", ""]
    if koll[0] != 0:
        first_pics[0] = pic1x1(lib_1[0].link)
    if koll[1] != 0:
        first_pics[1] = pic1x1(lib_2[0].link)
    if koll[2] != 0:
        first_pics[2] = pic1x1(lib_3[0].link)
    if koll[3] != 0:
        first_pics[3] = pic1x1(lib_4[0].link)
    return render_template('library.html', root=root, koll=koll, first_pics=json.dumps(first_pics))


@app.route('/show')
def show():
    root = request.args.get('root')
    category = request.args.get('category')
    pics = lib_out(category)
    my_link = [pic.link for pic in pics]
    my_name = [pic.nazva for pic in pics]
    my_desc = [pic.desc for pic in pics]
    return render_template('show.html', root=root, category=category, my_link=json.dumps(my_link), my_name=json.dumps(my_name), my_desc=json.dumps(my_desc))


@app.route("/sending_text", methods=["POST"])
def sending_text():
    if request.method == "POST":
        data = request.get_json()
        return discribe(data.get("url"))


@app.route("/sending_image", methods=["POST"])
def sending_image():
    if request.method == "POST":
        data = request.get_json()
        this_name = data.get("name")
        this_url = data.get("url")
        this_desc = data.get("description")
        this_category = data.get("category")
        this_id = data.get("id")
        lib_insert(this_category, this_id, this_url, this_name, this_desc)
        return "0"

@app.route("/delete_image", methods=["POST"])
def delete_image():
    if request.method == "POST":
        data = request.get_json()
        this_category = data.get("category")
        this_index = data.get("index")
        lib_del(this_category, this_index)
        return "0"


@app.route("/redact_image", methods=["POST"])
def redact_image():
    if request.method == "POST":
        data = request.get_json()
        this_name = data.get("name")
        this_url = data.get("url")
        this_desc = data.get("description")
        old_category = data.get("old_category")
        new_category = data.get("new_category")
        new_id = data.get("new_id")
        old_id = data.get("old_id")
        lib_del(old_category, old_id)
        lib_insert(new_category, new_id, this_url, this_name, this_desc)
        return "0"

if __name__ == "__main__":
    app.run(debug=True)