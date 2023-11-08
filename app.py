from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/<path:path>')
def catch_all(path='index.html'):
    return render_template(path)