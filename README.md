# Hello future leaper !
---
### FRONT END DEVELOPER TEST
***
We prepared a Simple react & webpack project for our recruitment process and added as much love as we do in our daily projects.

Clone this clean repository into your workspace, do your magic and create pull request.

Hope you will have fun !

---
**STACK:**
---
+ yarn
+ flow
+ webpack
+ react
+ redux
+ redux-thunk
+ scss (bem methodology)
+ es6

**TODO:**
---
**JS/HTML Part:**
+ create signup form (we prefer using redux-form module) with API integration (/users)
    * first name (required)
    * last name (required)
    * email (required)
+ add a login page - using API endpoint (/users/login)
+ create application list page - using API endpoint
+ display application page - using API endpoint (/applications)
+ display current active navigation breadcrumb

---
**CSS Part:**
+ stick page header to the top - independent on scroll position
+ write a (scss) mixin that will calc & return font-size based on rem with px fallback for older browsers
+ highlight current active navigation item in breadcrumb

---
MOCKED API ROUTES
===
https://demo-front.probatix.de/api/docs

User
---

+ ***Register user***

  [POST] https://demo-front.probatix.de/api/register
  
  ```
  {
  "username":"fred",
  "password":"fred"
  }
  ```
+ ***Login***

  [POST] https://demo-front.probatix.de/api/login

  ```
  {
  "username":"fred",
  "password":"fred"
  }
  ```
  => you get a token back :
  ```
  {
  "user": "string",
  "token": "3d84bf59f0a9ed10abb735227c6702fe"
  }
  ```
  You can add this token to `X-AUTH-TOKEN` header and access protected endpoint:


+ ***User info***

  [GET] https://demo-front.probatix.de/api/users (need security token)

Application
---

+ ***Add application*** 

  [POST] https://demo-front.probatix.de/api/applications (need security token)
  ```
  {
  "id": "1",
  "name": "App1",
  "secret": "secretsecretsecretsecret",
  "lang":"php",
  "version": 1
  }
  ```
+ ***List application***

  [GET] https://demo-front.probatix.de/api/applications (need security token)
  
  Param:
  + lang : ```?lang=php```
  + version: ```?version=1```


+ ***Update application***
    
  [PUT] https://demo-front.probatix.de/api/applications (need security token)
    ```
    {
    "username":"admin"
    }
    ```

+ ***Delete application***

  [DELETE] https://demo-front.probatix.de/api/applications (need security token)


Please pay attention to flow types and eslint warnings / errors.

You can of course use typescript (preferred).
