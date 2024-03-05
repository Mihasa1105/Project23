from Config import lib


class Lib1(lib.Model):
    id = lib.Column(lib.Integer, primary_key=True)
    link = lib.Column(lib.String)
    nazva = lib.Column(lib.String)
    desc = lib.Column(lib.String)


class Lib2(lib.Model):
    __bind_key__ = 'second_db'
    id = lib.Column(lib.Integer, primary_key=True)
    link = lib.Column(lib.String)
    nazva = lib.Column(lib.String)
    desc = lib.Column(lib.String)


class Lib3(lib.Model):
    __bind_key__ = 'third_db'
    id = lib.Column(lib.Integer, primary_key=True)
    link = lib.Column(lib.String)
    nazva = lib.Column(lib.String)
    desc = lib.Column(lib.String)


class Lib4(lib.Model):
    __bind_key__ = 'fourth_db'
    id = lib.Column(lib.Integer, primary_key=True)
    link = lib.Column(lib.String)
    nazva = lib.Column(lib.String)
    desc = lib.Column(lib.String)



lib.create_all()