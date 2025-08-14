from flask import Flask, request
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from app.routes.content_route import content_bp
from app.routes.share_link_route import share_link_bp
from app.routes.tags_content import tags_content_bp

db = MongoEngine()

def create_app():
    app = Flask(__name__)

    CORS(app,
     resources={r"/api/*": {
         "origins": ["http://localhost:3000"],
         "supports_credentials": True,
         "allow_headers": ["Content-Type", "Authorization"],
         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
     }})

    app.config.from_object('config.config.Config')
    db.init_app(app)

    @app.before_request
    def handle_options():
        if request.method == 'OPTIONS':
            return '', 200

    blueprint(app)

    return app

def blueprint(app):
    # Register all blueprints
    app.register_blueprint(content_bp, url_prefix='/api/content')
    app.register_blueprint(share_link_bp, url_prefix='/api/share')
    app.register_blueprint(tags_content_bp, url_prefix='/api/tag')

    return app