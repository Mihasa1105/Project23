from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lib1.db'
app.config['SQLALCHEMY_BINDS'] = {'first_db': 'sqlite:///lib1.db',
                                  'second_db': 'sqlite:///lib2.db',
                                  'third_db': 'sqlite:///lib3.db',
                                  'fourth_db': 'sqlite:///lib4.db'}
lib = SQLAlchemy(app)
app.app_context().push()