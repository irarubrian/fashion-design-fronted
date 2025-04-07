from flask import Flask, jsonify, request
from models import db, Episode, Appearance, Guest
from flask_migrate import Migrate


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///lateshow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

@app.route('/episodes', methods=['GET'])

def get_episode():
    episodes = Episode.query.all()
    return jsonify([episode.to_dict_basic() for episode in episodes])

@app.route('/episode/<int:id>', methods=["GET"])
def get_episode_by_id(id):
    episode = Episode.query.get(id)
    if not episode:
        return jsonify({"error":"episode not found"}), 404
    
    return  jsonify(episode.to_dict())

@app.route("/guests", methods=["GET"])
def get_guest():
    guests = Guest.query.all()
    return jsonify([guest.to_dict_basic() for guest in guests])


@app.route('/appearances', methods=['POST'])
def create_appearance():
    data = request.get_json()

    rating = data.get('rating')
    episode_id = data.get('episode_id')
    guest_id = data.get('guest_id')

    errors = []

    if rating is None or not isinstance(rating, int):
        errors.append("Rating is required and must be an integer.")
    if not episode_id or not isinstance(episode_id, int):
        errors.append("Valid episode_id is required.")
    if not guest_id or not isinstance(guest_id, int):
        errors.append("Valid guest_id is required.")

    # Check if related Episode and Guest exist
    episode = Episode.query.get(episode_id)
    if not episode:
        errors.append(f"Episode with id {episode_id} not found.")

    guest = Guest.query.get(guest_id)
    if not guest:
        errors.append(f"Guest with id {guest_id} not found.")

    if errors:
        return jsonify({"errors": errors}), 400

    # Create and add new Appearance
    new_appearance = Appearance(rating=rating, guest_id=guest_id, episode_id=episode_id)
    db.session.add(new_appearance)
    db.session.commit()

    response = {
        "id": new_appearance.id,
        "rating": new_appearance.rating,
        "guest_id": new_appearance.guest_id,
        "episode_id": new_appearance.episode_id,
        "episode": {
            "id": episode.id,
            "date": episode.date,
            "number": episode.number
        },
        "guest": {
            "id": guest.id,
            "name": guest.name,
            "occupation": guest.occupation
        }
    }

    return jsonify(response), 201

db.init_app(app)
migrate = Migrate(app, db)

if __name__=='__main__':
    app.run(debug=True)
