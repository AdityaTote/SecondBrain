from flask import Blueprint, request, jsonify
from app.service.tags_service import TagsService

tags_content_bp = Blueprint("tags", __name__)

@tags_content_bp.route("/", methods=["POST"])
def tags_content():
    if request.method == "POST":
        
        tag_id = request.json["tag_id"]
        
        if not tag_id:
            return jsonify({"error": "Tag ID is required", "message": "Please provide a tag_id in the request"}), 400
        
        try:
            tag = TagsService.get_by_Id(id=tag_id)

            if not tag:
                return jsonify({"error": "Tag not found", "message": "Tag not found"}), 404

            tag_title = tag.title

            return jsonify({
                "message": "Tag content route",
                "data": tag_title
                }), 200
        
        except Exception as e:
            return jsonify({"error": str(e)}), 400