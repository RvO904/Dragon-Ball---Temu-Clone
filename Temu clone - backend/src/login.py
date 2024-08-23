from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import find_dotenv, load_dotenv
import bcrypt
import os

app = Flask(__name__)
CORS(app)

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


@app.route("/")
def home():
    return 'Home!'


@app.route('/login', methods=['POST'])
def login_register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    client = MongoClient(f'mongodb+srv://rvelez:{os.getenv('DATABASE_PASSWORD')}@universidad.wm6tn.mongodb.net/?retryWrites=true&w=majority&appName=Universidad')
    db = client['temu']
    collection = db['usuarios']

    result = collection.find_one({'correo': email})
    if not result:
        nombre = email.split('@')[0] # Name by default on TEMU is the the email without the domain
        hashed_password = bcrypt.hashpw(bytes(password, 'utf-8'), bcrypt.gensalt()).decode('utf-8')
        new_user = {'nombre':nombre, 'correo':email, 'telefono':'', 'clave':hashed_password, 'metodosPago':[], 'compras':[]}
        collection.insert_one(new_user)
        print('Usuario registrado')
        return jsonify({"message": "Registration successful"}), 200
    
    check = bcrypt.checkpw(bytes(password, 'utf-8'), bytes(result['clave'], 'utf-8'))

    if check:
        print('Inicio de sesion exitoso')
        return jsonify({"message": "Login successful"}), 200
    
    print('Inicio de sesion no exitoso')
    return jsonify({"message": "Login unsuccessful"}), 200

if __name__ == '__main__':
    app.run(debug=True)



