from flask import Blueprint, request, jsonify, g
from app.middlewares.auth_middleware import auth
from app.service.content_service import ContentService
from app.service.tags_service import TagsService
from app.models.user_model import User

content_bp= Blueprint('content', __name__)

@content_bp.route('/', methods=['GET', 'POST', 'DELETE'])
@auth
def content():
    if request.method == 'GET':
        user_id = g.user_id

        if not user_id:
            return jsonify({
                'error': True,
                'message': 'User Is unauthorized',
                'data': None
            }), 400
        
        try:
            content = ContentService.get_content_by_user_id(user_id=user_id)

            return jsonify({
                'error': False,
                'message': 'Content retrieved successfully',
                'data': content
            }),200
        except Exception as e:
            return jsonify({
                'error': True,
                'message': 'An error occurred while retrieving content',
                'data': None
                }), 400

    if request.method == 'POST':
        user_id = g.user_id

        if not user_id:
            return jsonify({
                'error': True,
                'message': 'Please provide a user_id in the request',
                'data': None
            }), 400

        title: str = request.json["title"]
        description: str = request.json["description"]
        types = request.json["types"]
        tags: str = request.json["tags"]
        link: str = request.json["link"]

        if not title or not types or not tags or not link or not description:
            return jsonify({
                'error': True,
                'message': 'Please provide title, types and tags in the request',
                'data': None
            }), 400
        
        tag_ids = []
        if tags.find(',') == -1:
            present_tag_id = TagsService.get_tag_by_title(tags)
            if present_tag_id:
                tag_ids.append(present_tag_id.id)
            else:
                tags_id = TagsService.create_tag(tags)
                tag_ids.append(tags_id.id)
        else:
            tag_id = tags.split(",")

            for tag in tag_id:
                t = tag.strip()
                present_tag_id = TagsService.get_tag_by_title(t)
                if present_tag_id:
                    tag_ids.append(present_tag_id.id)
                else:
                    tags_id= TagsService.create_tag(t)
                    tag_ids.append(tags_id.id)
        
        try:
            content = ContentService.create_content(
                title=title,
                description=description,
                types=types,
                tags=tag_ids,
                user_id=user_id,
                link=link
                )
            return jsonify({
                'error': False,
                'message': 'Content created successfully',
                'data': None
            }), 203
        except Exception as e:
            return jsonify({'error': str(e)}), 400
        
    if request.method == 'DELETE':
        user_id = g.user_id

        if not user_id:
            return jsonify({
                'error': False,
                'message': 'Please provide a user_id in the request',
                'data': None
            }), 400
        
        content_id = request.json["content_id"]

        if not content_id:
            return jsonify({
                'error': False,
                'message': 'Please provide a content_id in the request',
                'data': None
            }), 400
        
        try:
            content = ContentService.get_content_by_id_and_user_id(content_id, user_id)
            if not content:
                return jsonify({
                    'error': True,
                    'message': 'The content_id provided does not exist',
                    'data': None
                }), 404
            ContentService.delete_content(content_id)
            return jsonify({
                'error': False,
                'message': 'Content deleted successfully',
                'data': None
            }),203
        except Exception as e:
            print({'error': str(e)})
            return

@content_bp.route('/<int:content_id>', methods=['GET', 'PUT'])
@auth
def content_by_id(content_id):
    if request.method == 'GET':
        user_id = g.user_id

        if not user_id:
            return jsonify({
                'error': True,
                'message': 'User Is unauthorized',
                'data': None
            }), 400
        
        try:
            content = ContentService.get_content_by_id_and_user_id(content_id, user_id)
            if not content:
                return jsonify({
                    'error': True,
                    'message': 'The content_id provided does not exist',
                    'data': None
                }), 404
            return jsonify({
                'error': False,
                'message': 'Content retrieved successfully',
                'data': content
            }), 200
        except Exception as e:
            print({'error': str(e)})
            return jsonify({
                'error': True,
                'message': 'An error occurred while retrieving content',
                'data': None
            }), 400