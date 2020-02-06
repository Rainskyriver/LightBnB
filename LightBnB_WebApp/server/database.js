const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect();

module.exports = {
  getUserWithEmail: function(email) {
    return pool.query(`
    SELECT * FROM users
    WHERE email = $1`, [email])
    .then(res => res.rows[0]);
  },
  
  getUserWithId: function(id) {
    return pool.query(`
    SELECT * FROM users
    WHERE id = $1`, [id])
    .then(res => res.rows[0]);
  },

  addUser : function(user) {
    return pool.query(`
    INSERT INTO users (name, email, password) VALUES
    ($1, $2, $3)
    `, [user.name, user.email, user.password])
    .then(res => res.rows);
  },

  getAllReservations: function(guest_id, limit = 10) {
  
    return pool.query(`
    SELECT properties.*, reservations.*, AVG(rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1
    AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`, [guest_id, limit])
    .then(res => res.rows);
  },

  getAllProperties: function(options, limit = 10) {
    const queryParams = [];
    let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    `;
  
    // Conditionals
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    if (options.owner_id) {
      queryParams.push(Number(options.owner_id));
      if (queryParams.length > 1) {
      queryString += `WHERE owner_id = $${queryParams.length}`;
      } else {
        queryString += `AND owner_id = $${queryParams.length}`;
      }
    }
    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`)
      if (queryParams.length > 1) {
        queryString += `WHERE cost_per_night >= $${queryParams.length}`;
      } else {
        queryString += `AND cost_per_night >= $${queryParams.length}`;
      }
    }
    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night}`)
      if (queryParams.length > 1) {
        queryString += `WHERE cost_per_night <= $${queryParams.length}`;
      } else {
        queryString += `AND cost_per_night <= $${queryParams.length}`;
      }
    }
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`)
      if (queryParams.length > 1) {
        queryString += `WHERE property_reviews.rating >= $${queryParams.length}`;
      } else {
        queryString += `AND property_reviews.rating >= $${queryParams.length}`;
      }
    }
  
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
    return pool.query(queryString, queryParams)
    .then(res => res.rows);
  },

  addProperty: function(property) {
    const p = property;
    return pool.query(`
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [p.owner_id, p.title, p.description, p.thumbnail_photo_url, p.cover_photo_url, p.cost_per_night, p.street, p.city, p.province, p.post_code, p.country, p.parking_spaces, p.number_of_bathrooms, p.number_of_bedrooms])
    // const propertyId = Object.keys(properties).length + 1;
    // property.id = propertyId;
    // properties[propertyId] = property;
    // return Promise.resolve(property);
  }
}
