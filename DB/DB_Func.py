from flask_sqlalchemy import SQLAlchemy
from DB.Models import Lib1, Lib2, Lib3, Lib4
from Config import lib


def what_libr(libr):
    if (libr == "Живопись"):
        cur_lib = Lib1
    elif (libr == "Графика"):
        cur_lib = Lib2
    elif (libr == "Скульптура"):
        cur_lib = Lib3
    elif (libr == "Архитектура"):
        cur_lib = Lib4
    return cur_lib


def lib_in(libr, link, nazva, desc):
    cur_lib = what_libr(libr)
    lib.session.add(cur_lib(link=link, nazva=nazva, desc=desc))
    lib.session.commit()


def lib_out(libr):
    cur_lib = what_libr(libr)
    pics = cur_lib.query.order_by(cur_lib.id).all()
    return pics


def lib_del(libr, id):
    cur_lib = what_libr(libr)
    cur_lib.query.filter_by(id=id).delete()
    lib.session.commit()

    el_s = cur_lib.query.order_by(cur_lib.id).all()
    for index, obj in enumerate(el_s):
        obj.id = index + 1
    lib.session.commit()


def lib_redact(libr, id, link, nazva, desc):
    cur_lib = what_libr(libr)
    el_s = cur_lib.query.filter_by(id=id)
    for index, obj in enumerate(el_s):
        obj.link = link
        obj.nazva = nazva
        obj.desc = desc
    lib.session.commit()

def lib_insert(libr, id, link, nazva, desc):
    cur_lib = what_libr(libr)
    el_s = cur_lib.query.filter(cur_lib.id >= id).all()
    for obj in reversed(el_s):
        obj.id += 1
        lib.session.commit()
    lib.session.add(cur_lib(id=id, link=link, nazva=nazva, desc=desc))
    lib.session.commit()