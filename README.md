# Smarter-Maker

<a name="readme-top"></a>

Check out a live version of Kartsy here:
[Smarter-Maker][render-url]

[render-url]: https://smarter-maker.onrender.com/

 Smarter-Maker is a clone of Brainscape. It allows you to create classes,decks, and cards for the purposes of studying and making yourself smarter!

### Technologies Used
* React
* Redux
* Javascript
* Python
* PostgreSQL
* Render
* Flask
* SqlAlchemy
* WtForms


### Features and Screenshots
* Smarter-Maker Splashpage - You will be able to test the features without signing up by clicking on the "Demo Sign In" button.
![image](https://user-images.githubusercontent.com/112198918/222297676-5cdc7524-2a68-4888-ba4c-821f5ab2456c.png)

* Dashboard: Class Page - You are able to select, create, edit, delete a class and view all of its decks
![image](https://user-images.githubusercontent.com/112198918/222297789-d73ea04c-4af3-4d2d-8df1-ae9989571e97.png)

* Dashboard: Browse Cards - You are able to study cards and record your progress
![image](https://user-images.githubusercontent.com/112198918/222298087-8f1a6f39-bd4a-4c9b-9dae-abf7e211bd75.png)




## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- ROADMAP -->
## Roadmap

- [ ] Search
  - [ ] Search Classes, Decks, Cards
  - [ ] Search Auto Complete  
- [ ] Dark Mode
- [ ] Study Other User's Decks

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ### Contact Information -->


<!-- MARKDOWN LINKS & IMAGES -->
