from flask import Flask, make_response, jsonify, request, session
from database import db
from flask_migrate import Migrate
from models import Task, User
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from datetime import datetime
import os

#create the app instance
app = Flask(__name__)


#app secret key
secret_key = os.environ.get('SECRET_KEY') or os.urandom(24)
app.secret_key = secret_key

#config the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI')
#create the migrations 
migrate = Migrate(app, db)
#create the API instance
api = Api(app)
bcrypt = Bcrypt(app)

#connect the db
db.init_app(app)


#user management
class RegisterUser(Resource):
    def post(self):
        data = request.get_json()
        
        full_name = data['full_name']
        email = data['email']
        password = data['password']
        
        user_exists = User.query.filter(User.email == email).first()
        
        if user_exists is not None:
            response = make_response(
                jsonify({"Error": "Email already exists."}),
                409
            )
            return response
        
        password_hash = bcrypt.generate_password_hash(password)
        new_user = User(
            full_name = full_name,
            email = email,
            password = password_hash
        )
        db.session.add(new_user)
        db.session.commit()
        
        session['user-id'] = new_user.id
        
        response = make_response(
            jsonify({"message": "Registered successfully!"}),
            201
        )
        response.headers['Content-Type'] = 'application/json'
        return response
api.add_resource(RegisterUser, '/auth/register')

class LoginUser(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']  #request.get_json()
        password = data['password']
        
        user = User.query.filter(User.email == email).first()
        
        if user is None:
            response = make_response(
                jsonify({"Error": "Unauthorized Access"}),
                401
            )
            return response
        if not bcrypt.check_password_hash(user.password, password):
            response = make_response(
                jsonify({"Error": "Incorrect Password"}),
                401
            )
            return response
        
        session['user_id'] = user.id
        response = make_response(
            jsonify({"Message": "Login Successful!"}),
            201
        )
        response.headers['Content-Type'] = 'application/json'
        return response
api.add_resource(LoginUser, '/auth/login')

class LogoutUser(Resource):
    def delete(self):
        session.pop('user_id', None)
        response = make_response(
            jsonify({"Message": "No Content Found"}),
            204
        )
        return response
api.add_resource(LogoutUser, '/auth/logout')

#task management
class FetchTasks(Resource):
    #/tasks
    def get(self):
        #access the user_id 
        user_id = session.get('user_id')
        
        #verify is the user is logged in 
        if user_id is None:
            response = make_response(
                jsonify({"Error": "Unauthorized Access"}),
                401
            )
            return response
        
        # fetch tasks based on the user
        user = User.query.get(user_id)
        print(user)
        if user is None:
            response = make_response(
                jsonify({"Error": "User not found"}),
                404
            )
            return response

        tasks = [task.to_dict() for task in user.tasks]
        
        if len(tasks) == 0:
            response = make_response(
                jsonify({"Message": "You do not have any tasks created!"}),
                200
            )
            return response
        
        response = make_response(
            jsonify(tasks),
            200
        )
        return response
    
    #/tasks payload({title,description, priority, due_date, status, user_id})
    def post(self):
        data = request.get_json()
        
        #access the user_id 
        user_id = session.get('user_id')
        
        #verify is teh user is logged in 
        if user_id is None:
            response = make_response(
                jsonify({"Error": "Unauthorized Access"}),
                401
            )
            return response
        
        # Convert the due_date string to a Python date object
        due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
        
        new_task = Task(
            title = data['title'],
            description = data['description'],
            priority = data['priority'],
            due_date = due_date,
            status = data['status'],
            user_id = user_id
        )
        db.session.add(new_task)
        db.session.commit()
        
        response = make_response(
            jsonify(new_task.to_dict()),
            201
        )
        response.headers['Content-Type'] = 'application/json'
        return response
api.add_resource(FetchTasks, '/tasks')

class TaskById(Resource):
    def put(self, id):
        data = request.get_json()
        
        #check if the user is authenticated/logged in 
        #access the user_id 
        user_id = session.get('user_id')
        if user_id is None:
            response = make_response(
                jsonify({"Error": "Unauthorized Access"}),
                401
            )
            return response
        task = Task.query.filter(Task.id == id).first()
        if not task:
            response = make_response(
                jsonify({"Error": "Task Not Found"}),
                404
            )
            return response
        # Check if the user owns the task
        if task.user_id != user_id:
            response = make_response(
                jsonify({"Error": "You are not authorized to edit this task"}),
                403
            )
            return response
        
        # Convert the due_date string to a Python date object
        if 'due_date' in data:
            data['due_date'] = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
            
        for attr in data:
            setattr(task, attr, data[attr])
        db.session.add(task)
        db.session.commit()
        
        response = make_response(
            jsonify(task.to_dict()),
            200
        )
        return response
    def delete(self, id):        
        #check if the user is logged in 
        user_id = session.get('user_id')
        if user_id is None:
            response = make_response(
                jsonify({"Error": "Unauthorized Access"}),
                401
            )
            return response
        task = Task.query.filter(Task.id == id).first()
        
        if not task:
            response = make_response(
                jsonify({"Error": "Task Not Found"}),
                404
            )
            return response
        
        #check if the task belongs to the user 
        if task.user_id != user_id:
            response = make_response(
                jsonify({"Error": "You are not authorized to delete this task"}),
                403
            )
            return response
        db.session.delete(task)
        db.session.commit()
        
        response = make_response(
            jsonify({"Message": "Task Deleted Successfully!"}),
            200
        )
        return response
api.add_resource(TaskById, '/tasks/<int:id>')
        
            


if __name__ == "__main__":
    app.run(port=5555, debug=True)