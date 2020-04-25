# movie-app

Provides a dashboard of movies stored on a local server. 

Dependencies:  
  1. MongoDB client  
  2. TMDB API key  
  3. Directory containing movies in .mp4 format   
  4. .env file with the following defined 
  
   ```
TMDB_KEY=<TMDB_KEY>
MOVIE_DIRECTORY=<MOVIE_DIRECTORY>

MONGODB_URI=<MONGODB URI>     #Default - mongodb://localhost:27017/dashboard
DATABASE_NAME=<DATABASE_NAME> #Default - movies
PORT=<PORT>                   #Default - 5000
```

To run app:
```
npm install
cd /client
npm install
cd ..

npm run dev
```
