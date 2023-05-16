# Smarter-Maker

<a name="readme-top"></a>

Check out a live version of Smarter-Maker here:
[Smarter-Maker][render-url]

[render-url]: https://smarter-maker.onrender.com/

 Smarter-Maker is a clone of Brainscape. It allows you to create classes,decks, and cards for the purposes of studying and making yourself smarter!

### Technologies Used
#### Languages:
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
#### Backend:
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/en/2.2.x/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-CA4245?style=for-the-badge)](https://www.sqlalchemy.org/)
[![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
#### Frontend:
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/en/main)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)



### Features and Screenshots
* Smarter-Maker Splashpage - You will be able to test the features without signing up by clicking on the "Demo Sign In" button
![image](https://user-images.githubusercontent.com/112198918/222297676-5cdc7524-2a68-4888-ba4c-821f5ab2456c.png)

* Dashboard: Class Page - You are able to select, create, edit, delete a class and view all of its decks
![image](https://user-images.githubusercontent.com/112198918/222297789-d73ea04c-4af3-4d2d-8df1-ae9989571e97.png)

* Dashboard: Browse Cards - You are able to study cards and record your progress
![image](https://user-images.githubusercontent.com/112198918/222298087-8f1a6f39-bd4a-4c9b-9dae-abf7e211bd75.png)

* Persistent Dark Mode - Toggle between light and dark modes
![image](https://user-images.githubusercontent.com/112198918/227680350-67715328-8144-4904-acad-0856dcdbea3e.png)


### Code Sample
The following code sample handles the logic to properly render a class depending on if there are classes created or not. It also redirects to a different class when the one you are viewing is deleted. 

```js
  useEffect(() => { //redirects to first class if there is one when sent to /dashboard
    if (isLoaded && !redirectClass && url === '/dashboard' && allClassesObj && user) {
      const userClasses = Object.values(allClassesObj);
      if (userClasses.length > 0) {
        history.push(`/dashboard/${userClasses[0].id}/decks`);
        setRedirectClass(true);
      }
    } else if (url !== '/dashboard') { //allows redirects to work when class is deleted from navigation
      setRedirectClass(false);
    }
  }, [url, allClassesObj, history, redirectClass])
```



## Getting started
1. Clone this repository (only this branch)

2. Install python dependencies - navigate to /app and run:

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.flaskenv** file based on the example with proper settings for your
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
   
7. In a new terminal, navigate to the /react-app directory


8. Install NPM packages
   ```sh
   npm install
   ```
   
9. Start the frontend server
   ```sh
   npm start
   ```
   
8. Navigate to http://localhost:3000/ to begin using the application.

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
