import json
import mysql.connector

# Connect to the MySQL database
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cyprus"
)

cursor = conn.cursor()

# Read the JSON file
with open('apartaments_lt.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Iterate over each object
for obj in data:
    # Insert the object into the main table
    cursor.execute("INSERT INTO post_lt(id, title, price, priceperm2, m2, bedrooms, bathrooms, description, location, locationdescription, features) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                   (obj['id'], obj['title'], obj['price'], obj['pricepm2'], obj['m2'], obj['bedrooms'], obj['bathrooms'], obj['text'], obj['location'], obj['locationdesc'], obj['features']))
    
    # Get the last inserted ID
    # object_id = obj['id']
    
    # # Insert the image into the image table
    # for url in obj['images']:
    #     cursor.execute("INSERT INTO post_images (post_id, url) VALUES (%s, %s)", (object_id, url))

# Commit the changes and close the connection
conn.commit()
conn.close()
import json
import mysql.connector

# Connect to the MySQL database
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cyprus"
)

cursor = conn.cursor()
