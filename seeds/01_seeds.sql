INSERT INTO users ( name, email, password ) VALUES 
  ('Valerie Bullwinkle', 'Chargemycard99@fiddlemydiddle.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
  ('Gloop Badoop','','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Bob Loblaw','Bobloblaw@bobslawblog.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES 
  (1, 'title', 'description', 'url1', 'url2', 500, 1, 1, 1, 'country', 'street', 'city', 'province', 'postcode', TRUE),
  (3, 'title', 'description', 'url1', 'url2', 500, 1, 1, 1, 'country', 'street', 'city', 'province', 'postcode', FALSE),
  (1, 'title', 'description', 'url1', 'url2', 500, 1, 1, 1, 'country', 'street', 'city', 'province', 'postcode', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES 
  ('1998-05-01', '1998-05-02', 1, 2),('1998-05-01', '1998-05-02', 1, 2),('1998-05-01', '1998-05-02', 1, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES
  (3, 1, 1, 4, 'message'),
  (3, 1, 2, 2, 'message'),
  (3, 3, 3, 3, 'message');