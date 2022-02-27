# Challenge Venture Leap

## Disclaimer

Because I had a lot of bugs with the API over the weekend, I decided to code my own backend.

## Install the app

Download the repo, open it in a terminal and run `yarn install`. Then, create a `.env` file at the root folder and paste there the credentials sent by email.

## Run the app

Open the root folder in a terminal and run `yarn dev`. Thanks to [Concurrently](https://yarnpkg.com/package/concurrently) we can run the server and the front end at the same time without having to open two terminal windows.

## Tech stack

### Front end

-   React
-   Axios
-   SCSS
-   Craco: to import selected SCSS files globally

### Back end

-   Express
-   MongoDb
-   JWT
-   Bcrypt js
