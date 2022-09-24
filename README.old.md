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

User
---

+ ***Register user***

  [POST] https://frontend-test.getsandbox.com/users
  
  ```
  {
  "username":"fred",
  "password":"fred"
  }
  ```
+ ***Login***

  [POST] https://frontend-test.getsandbox.com/users/login

  ```
  {
  "username":"fred",
  "password":"fred"
  }
  ```
  => Session ID stored in a cookie : sessionId=[uuid]


+ ***User info*** 

  [GET] https://frontend-test.getsandbox.com/users (need Auth Cookies)

Application
---

+ ***Add application*** 

  [POST] https://frontend-test.getsandbox.com/applications (need Auth Cookies)
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

  [GET] https://frontend-test.getsandbox.com/applications (need Auth Cookies)
  
  Param:
  + lang : ```?lang=php```
  + version: ```?lang=version```


+ ***Update application***
    
  [PUT] https://frontend-test.getsandbox.com/applications/[id] (need Auth Cookies)
    ```
    {
    "username":"admin"
    }
    ```

+ ***Delete application***

  [DELETE] https://frontend-test.getsandbox.com/applications/[id]  (need Auth Cookies)

Sandbox
---
+ ***Reset sandbox***

  [DELETE] https://frontend-test.getsandbox.com/sandbox 
---

Please pay attention to flow types and eslint warnings / errors.

You can of course use typescript.
