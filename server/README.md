# Dev Duel - Server

## Overview

The server is written using [NodeJS](https://nodejs.org/api/documentation.html) alongside several libraries. The goal of this API is to take username requests and defer to GitHub's API. We will then transform/map the response to data our client application can use.

A working API is provided which implements a robust configuration of an express server with included error handling, logging, routes, input validation, and live-reloading.

### Technologies Used
- [NodeJS](https://nodejs.org/api/documentation.html)
- [Express](https://expressjs.com/en/4x/api.html) - Fast, unopinionated, minimalist web framework for Node.js
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [Joi and express-validation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Request and data validation
- Various other packages that can be found in the `package.json`

### Profile

Profiles are displayed on both the **inspect** page and the **duel** page. Both pages display profiles the same way. They are composed of the same fields and there should be no differences between a `profile` displayed on either page.

All `profile`s displayed on the website will be composed of the following fields
- User's full name, location, bio, and avatar URL.
- Titles
    - **Forker** - 50% or more repositories are forked
    - **One-Trick Pony** - 100% of repositories use the same language
    - **Jack of all Trades** - Uses more than 10 languages across all repositories
    - **Stalker** - The number of people this user is `following` is at least double the number of `followers`
    - **Mr. Popular** - The number of `followers` this user has is at least double the number of `following`
- Favorite language (based on most used language used for public repositories)
- Total number of public repositories
- Total number of stars across all repositories
- Highest single repository star count
- Total number of 'perfect projects' (projects that have zero open issues)
- Total number of followers
- Total number of following

### API Endpoints
Below are the present endpoints. The examples will assume the API is running on `localhost:3000` for convenience.

---

#### `GET localhost:3000/api/user/:username`
Returns a profile for a given user

##### Example request:
`http://localhost:3000/api/user/gaearon`

##### Example response:
(The numbers in this example are mostly made up - it is meant to serve an example of the structure)
```json
{
    "username": "gaearon",
    "name": "Dan Abramov",
    "location": "London, UK",
    "bio": "Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.",
    "avatar-url": "https://avatars0.githubusercontent.com/u/810438?v=4",
    "titles": [
        "Jack of all Trades",
        "Mr. Popular"
    ],
    "favorite-language": "JavaScript",
    "public-repos": 227,
    "total-stars": 120580,
    "highest-starred": 45820,
    "perfect-repos": 2,
    "followers": 33015,
    "following": 171
}
```
---
#### `GET localhost:3000/api/users?`
Returns an array of profiles for the queried usernames

##### Example request:
`http://localhost:3000/api/users?username=gaearon&username=qbolt`

##### Example response:
(The numbers in this example are mostly made up - it is meant to serve an example of the structure)
```json
[{
    "username": "gaearon",
    "name": "Dan Abramov",
    "location": "London, UK",
    "bio": "Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.",
    "avatar-url": "https://avatars0.githubusercontent.com/u/810438?v=4",
    "titles": [
        "Jack of all Trades",
        "Mr. Popular"
    ],
    "favorite-language": "JavaScript",
    "public-repos": 227,
    "total-stars": 120580,
    "highest-starred": 45820,
    "perfect-repos": 2,
    "followers": 33015,
    "following": 171
}, {
    "username": "qbolt",
    "name": "Quinton Bolt",
    "location": "Memphis, TN",
    "bio": "Designer/Developer",
    "avatar-url": "https://avatars0.githubusercontent.com/u/17500092?v=4",
    "titles": [
        "Forker",
        "Mr. Popular"
    ],
    "favorite-language": "JavaScript",
    "public-repos": 42,
    "total-stars": 5,
    "highest-starred": 3,
    "perfect-repos": 2,
    "followers": 4,
    "following": 0
}]
```


### Profile

**This will expand on some specifics of various derived fields displayed for a profile.** An overview of the entire profile is provided on the [README.md](../README.md) shown in the root of this repository. 

- The titles are made up for the purposes of this assessment and **are not** part of GitHub or their API. They will be derived and provided by the API. 
- Favorite language is referring to the language field given to all repositories that indicate what language is used the most throughout a repository. This stat will be which appears most throughout all repositories.
- Highest single repository star count is referring to the number of stars on the repository that has the most stars. It is not referring to the name of the repository with the most stars.
- Total number of 'perfect repositories' is a made-up arbitrary stat referring to the number of repositories that have zero `open_issues`

---
### Error Message Returns
When an error has occurred with either our API or Github, it is important to return some understandable information to the user via an error object or message.
##### Examples objects from this API:
- Users or Specific User does not exist in Github
```json
{   
    "error": "err.message", 
    "tips": "The user {username here}/{usernames here} was not found..." 
}
```
