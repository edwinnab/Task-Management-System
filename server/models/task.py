from database import db 
from sqlalchemy_serializer import SerializerMixin

class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"
    
    #define the serialization rules to avoid recursion
    # return task without the user 
    
    serialize_rules = ("-user",)
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    priority = db.Column(db.String)
    due_date = db.Column(db.Date)
    status = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    #relation ship to the user
    user = db.relationship('User', back_populates='tasks')
    
    def __repr__(self):
        return f"{self.id}, {self.title}, {self.description}, {self.priority}, {self.due_date}, {self.status}"