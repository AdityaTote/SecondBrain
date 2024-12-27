from flask import Flask
from flask_mongoengine import MongoEngine
from app.routes.content_route import content_bp
from app.routes.share_link_route import share_link_bp

db = MongoEngine()

def create_app():

    app = Flask(__name__)
    
    app.config.from_object('config.config.Config')
    db.init_app(app)
    blueprint(app)

    return app

def blueprint(app):

    app.register_blueprint(content_bp, url_prefix='/content')
    app.register_blueprint(share_link_bp, url_prefix='/share')

    return app