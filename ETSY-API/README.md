ETSY-API-Project
=================

###Used the ETSY REST API in order build a third party Web App:


We used in this project the following tools and frameworks:
>- Node Server.js
>- Routing
>- MVC (Model View Controller)
>- Heroku App Server
>- Lodash
>- Temp DB

###Git instructions for Heroku Live Server via Terminal


>1. `git remote remove heroku` \\ If the domain/url/app name changes
>2. `git remote add heroku (url)` \\ Add automatically generated URL domain name
>3. `git remote -v` \\Get a list view with heroku
>4. `heroku create` \\ Create a random Heroku server 
>5. `git remote -v` \\ This will register a remote git endpoint which should now show Github (origin) and Heroku
>6. `heroku ps:scale web=1` \\ To spin-up some resources for your app
>7. `git push heroku master` \\ Finally push your code repo up to Heroku (yes it can be pushed to Github OR Heroku!) 
>8.  Anytime you want to push to the same heroku server, you only need to repeat **step 6**.
