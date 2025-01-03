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
                'error': 'User ID is required',
                'message': 'Please provide a user_id in the request'
            }), 400
        
        try:
            content = ContentService.get_content_by_user_id(user_id=user_id)
            # resData = {
            #     "id": content["id"]["$oid"],
            #     "title": content["title"],
            #     "types": content["types"],
            #     "tags": content["tags"],
            #     "link": content["link"],
            #     "user_id": content["user_id"]["$oid"],
            #     "created_at": content["created_at"]["$date"],
            # }
            return jsonify({
                'message': 'Content retrieved successfully',
                'data': content
            }),200
        except Exception as e:
            return jsonify({'error': str(e)}), 400

    if request.method == 'POST':
        user_id = g.user_id

        if not user_id:
            return jsonify({
                'error': 'User ID is required',
                'message': 'Please provide a user_id in the request'
            }), 400

        title = request.json["title"]
        types = request.json["types"]
        tags = request.json["tags"]
        link = request.json["link"]

        if not title or not types or not tags or not link:
            return jsonify({
                'error': 'Missing required fields',
                'message': 'Please provide title, types and tags in the request'
            }), 400
        
        tag_ids = []
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
                types=types,
                tags=tag_ids,
                user_id=user_id,
                link=link
                )
            return jsonify({
                'message': 'Content created successfully',
            }), 203
        except Exception as e:
            return jsonify({'error': str(e)}), 400
        
    if request.method == 'DELETE':
        user_id = g.user_id

        if not user_id:
            return jsonify({
                'error': 'User ID is required',
                'message': 'Please provide a user_id in the request'
            }), 400
        
        content_id = request.json["content_id"]

        if not content_id:
            return jsonify({
                'error': 'Content ID is required',
                'message': 'Please provide a content_id in the request'
            }), 400
        
        try:
            content = ContentService.get_content_by_id_and_user_id(content_id, user_id)
            if not content:
                return jsonify({
                    'error': 'Content not found',
                    'message': 'The content_id provided does not exist'
                }), 404
            ContentService.delete_content(content_id)
            return jsonify({
                'message': 'Content deleted successfully'
            }),203
        except Exception as e:
            return jsonify({'error': str(e)}), 400
