from app import app
from models import db, Episode, Guest, Appearance

def seed_database():
    with app.app_context():
        print("Deleting all records...")
        # Clear existing data (order matters due to foreign key constraints)
        Appearance.query.delete()
        Episode.query.delete()
        Guest.query.delete()

        print("Creating episodes...")
        episodes = [
            Episode(date="January 1, 2023", number=101),
            Episode(date="January 8, 2023", number=102),
            Episode(date="January 15, 2023", number=103),
            Episode(date="January 22, 2023", number=104),
            Episode(date="January 29, 2023", number=105),
        ]
        db.session.add_all(episodes)
        db.session.commit()

        print("Creating guests...")
        guests = [
            Guest(name="james okitu", occupation="Comedian"),
            Guest(name="kenneth keya", occupation="Actor"),
            Guest(name="Benedic keya", occupation="Musician"),
            Guest(name="mike williams", occupation="Writer"),
            Guest(name="Charles wafula", occupation="Director"),
        ]
        db.session.add_all(guests)
        db.session.commit()

        print("Creating appearances...")
        appearances = [
            Appearance(rating=4, episode_id=1, guest_id=1),
            Appearance(rating=5, episode_id=1, guest_id=2),
            Appearance(rating=3, episode_id=2, guest_id=3),
            Appearance(rating=4, episode_id=2, guest_id=4),
            Appearance(rating=5, episode_id=3, guest_id=5),
            Appearance(rating=2, episode_id=3, guest_id=1),
            Appearance(rating=4, episode_id=4, guest_id=2),
            Appearance(rating=3, episode_id=4, guest_id=3),
            Appearance(rating=5, episode_id=5, guest_id=4),
            Appearance(rating=4, episode_id=5, guest_id=5),
        ]
        db.session.add_all(appearances)
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()