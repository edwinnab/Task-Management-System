from app import app
from database import db 
from faker import Faker
from models import Task
import random
from datetime import datetime, timedelta

with app.app_context():
    fake = Faker()
    
    Task.query.delete()
    
    print("seeding the tasks table")
    
    priorities = ['High', 'Low', 'Medium']
    statuses = ['In Progress', 'Open', 'Completed']
    today = datetime.now().date()
    next_thursday = today + timedelta(days=(3 - today.weekday() + 7) % 7)
    
    
    tasks = []
    for n in range(5):
        task = Task(
            title = fake.word(),
            description = fake.sentence(),
            priority = random.choice(priorities),
            due_date = fake.date_between_dates(today, next_thursday),
            status = random.choice(statuses)
        )
        tasks.append(task)
    db.session.add_all(tasks)
    db.session.commit()
    
    print("seeding complete!!")