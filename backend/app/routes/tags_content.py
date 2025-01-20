from flask import Blueprint, request, jsonify
from app.service.tags_service import TagsService

tags_content_bp = Blueprint("tags", __name__)

@tags_content_bp.route("/<tag_id>", methods=["GET"])
def tags_content(tag_id):
    if request.method == "GET":
        
        if not tag_id:
            return jsonify({"error": False, "message": "Please provide a tag_id in the request", 'data': None}), 400
        
        try:
            tag = TagsService.get_by_Id(id=tag_id)

            if not tag:
                return jsonify({"error": False, "message": "Tag not found", 'data': None}), 404

            tag_title = tag.title

            return jsonify({
                "error": False,
                "message": "Tag content route",
                "data": tag_title
                }), 200
        
        except Exception as e:
            print({"error": str(e)})
            return