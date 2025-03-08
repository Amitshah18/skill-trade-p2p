from flask import Flask, render_template, request, redirect, url_for, session,jsonify
import sqlite3
# from model import predict_e_waste
import os
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.secret_key = 'binarybrain@Greenbits2025'

UPLOAD_FOLDER = os.path.join(app.root_path, "static", "images")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists

# Set the upload folder in app configuration
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def get_db_connection():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def home():
    logged_in = session.get('logged_in', False)  # Ensure `logged_in` is always defined
    username = session.get('user', 'Guest')  # Default username if not logged in
    return render_template('home.html', logged_in=logged_in, username=username)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        hashed_password = generate_password_hash(password)  # Hash password

        conn = get_db_connection()
        try:
            conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
            conn.commit()
            conn.close()
            return redirect(url_for('login'))
        except:
            return render_template('signup.html', error="Username already exists")

    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        conn.close()

        if user and check_password_hash(user['password'], password):
            session['user'] = username
            session['logged_in'] = True  # Store login state
            
            # Store login event
            conn = get_db_connection()
            conn.execute("INSERT INTO login_activity (username) VALUES (?)", (username,))
            conn.commit()
            conn.close()
            
            return render_template('profile.html', logged_in=True, username=username)
        else:
            return render_template('login.html', error="Invalid Credentials")

    return render_template('login.html')



# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']

#         conn = get_db_connection()
#         user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
#         conn.close()

#         if user and check_password_hash(user['password'], password):
#             session['user'] = username
            
#             # Store login event
#             conn = get_db_connection()
#             conn.execute("INSERT INTO login_activity (username) VALUES (?)", (username,))
#             conn.commit()
#             conn.close()
            
#             # return redirect(url_for('personhome'))
#             return render_template('home.html')
#         else:
#             return render_template('login.html', error="Invalid Credentials")

#     return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)