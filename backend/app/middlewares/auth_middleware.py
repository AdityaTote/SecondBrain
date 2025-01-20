import jwt
import os
from flask import request, jsonify, g
from functools import wraps
from typing import Callable
from app.service.user_service import UserService

def decode_token(token: str):
    secret_key = os.getenv("NEXTAUTH_SECRET", "secret")
    data = jwt.decode(token, secret_key, algorithms=["HS256"])

    if not data:
        return {
            "error": "Invalid token",
            "message": "The token provided is invalid"
        }

    return data

def check_user_exists(user_id: str) -> bool:
    try:
        UserService.get_user(user_id)
        return True
    except Exception as e:
        return False

def auth(f: Callable) -> Callable:
    @wraps(f)
    def dec_fn(*args, **kwargs):
        
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                'error': True,
                'message': 'Token not provided or invalid format',
                'data': None
            }), 401
        
        token = auth_header[7:]

        data = decode_token(token)

        if not data:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Invalid token'
            }), 401
        
        if not check_user_exists(data["id"]):
            return jsonify({
                'error': 'User not found',
                'message': 'The user_id provided does not exist'
            }), 404
        
        g.user_id = data["id"]

        return f(*args, **kwargs)
    
    return dec_fn