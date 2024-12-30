from flask import request, jsonify, g
from functools import wraps
from typing import Callable
from app.service.user_service import UserService

def check_user_exists(user_id: str) -> bool:
    try:
        UserService.get_user(user_id)
        return True
    except Exception as e:
        return False

def auth(f: Callable) -> Callable:
    @wraps(f)
    def dec_fn(*args, **kwargs):
        
        user_id = request.json['userId']

        if not user_id:
            return jsonify({
                'error': 'User ID is required',
                'message': 'Please provide a user_id in the request'
            }), 400
        
        if not check_user_exists(user_id):
            return jsonify({
                'error': 'User not found',
                'message': 'The user_id provided does not exist'
            }), 404
        
        g.user_id = user_id

        return f(*args, **kwargs)
    
    return dec_fn