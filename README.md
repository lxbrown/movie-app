# movie-app

Provides a dashboard of movies stored on a local server. 

Dependencies: 
  - [node](https://nodejs.org/)  
  - [npm](https://www.npmjs.com/)  
  - [local MongoDB client](https://www.mongodb.com/download-center/community)  
  - [TMDB API key](https://developers.themoviedb.org/3/getting-started/introduction)  
  - Directory containing movies in .mp4 format   
  - .env file in root directory with the following defined 
  
   ```
TMDB_KEY=<TMDB_KEY>               #eg. abc12d345ef678ghij901j2k345l6789
MOVIE_DIRECTORY=<MOVIE_DIRECTORY> #eg. C:\Users\<username>\Videos\

MONGODB_URI=<MONGODB URI>         #Default - mongodb://localhost:27017/dashboard
PORT=<PORT>                       #Default - 5000
```

To run app:
```
npm install
cd /client
npm install
cd ..

npm run dev
```
