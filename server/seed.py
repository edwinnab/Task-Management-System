from app import app
from database import db 
from models import Task, User


with app.app_context():
    print("Deleting all records from the tasks table...")
    db.session.query(Task).delete()
    print("Deleting all records from the users table...")
    db.session.query(User).delete()
    print("Committing changes...")
    db.session.commit()
    print("Deletion complete!!")