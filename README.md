# FOOT_FOOT_GO #

Your football team search engine - to keep up-to-date with all the best teams around the world!

### Contributors ###

* Majeed Thaika 5680571
* Prich Virojvatanakul 5680062

### Summary ###

We created a search page which you can search your team from an automatic dropdown (from a remote football API), sorted by 'competition' category. Your search result is a highly customized team page, which will automatically (if available) get a team background from google images (using our API). It will also display team name, logo, value, fixtures, and players. We even included a Map with markers of all players' nationality.

### Framework and Libraries ###

* jQuery > For client-side scripting

* Bootstrap and Semantic UI > For CSS styling

* Font Awesome > For Awesome title

* Node.js > Our Server-side environment

### APIs ###

* Football Data (api.football-data.org) > Five different APIs from this. Data about:

* 1) All available football competitions
* 2) Each competition
* 3) Each team
* 4) Players in each team
* 5) Fixtures and results of team


* Google Maps API > To put player nationalities marker (plus clustering close markers).

* Google Custom Search API > To search 1st image of football club background for each club automatically.

### Known Bugs ###

* Since we don't use a database and render most things on the client side, our API calls are really slow (in the future, we will cache API results, create server database and keep client side rendering to a minimum).

* We get some APIs using synchronized ajax calls which will be very detrimental to user's experience.

* If customized team background is not available, we show default background, however even some available ones don't show up because of slow internet/redirected URL.

* Translating from player nationality to LatLong requires Google's Geocoding, which has a limit in free version (so our solution was to timeout and recursively call the function until we get a valid response back) - this is pretty slow and expensive.

* Our Google Custom Search API is free version, so it will expire for 1 day after a hundred or so requests.