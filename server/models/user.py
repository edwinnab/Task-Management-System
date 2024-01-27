from database import db 
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    #define the serialization rules to avoid recursion errors 
    #return thr users and the tasks 
    serialize_rules = ("-tasks.user")
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    
    #define the realtionship
    # user can have many tasks
    tasks = db.relationship('Task', back_populates='user')
    
    def __repr__(self) -> str:
        return f"{self.id}, {self.full_name}, {self.email}, {self.password}"
    