from flask import Blueprint, request, jsonify, g
from app.middlewares.auth_middleware import auth
from app.service.share_link_service import ShareLinkService
from app.service.content_service import ContentService
from app.utils.random_gen import random_gen

share_link_bp = Blueprint('share_link', __name__)

@share_link_bp.route('/', methods=['POST'])
@auth
def share_link():
    user_id = g.user_id

    if not user_id:
        return jsonify({
            'error': 'User ID is required',
            'message': 'Please provide a user_id in the request'
        }), 400
    
    share: bool = request.json['share']

    if share == True:
        hashs = random_gen(10)
        ShareLinkService.create_share_link(hashs, user_id)
        return jsonify({
            'message': 'Share link created successfully',
            'hashs': hashs
        }), 201
    elif share == False:
        ShareLinkService.delete_share_link_by_user_id(user_id)
        return jsonify({
            'message': 'Share link deleted successfully'
        }), 200
    else:
        return jsonify({
            'error': 'Invalid value for share',
            'message': 'Please provide a valid value for share'
        }), 400

@share_link_bp.route("/<share_link>", methods=['GET'])
def get_share_link(share_link):
    share_link = ShareLinkService.get_share_link_by_hashs(share_link)

    if not share_link:
        return jsonify({
            'error': 'Share link not found',
            'message': 'The share link provided does not exist'
        }), 404

    content = ContentService.get_content_by_user_id(share_link.user_id)

    return jsonify({
        'message': 'Share link retrieved successfully',
        'data': content
    }), 200