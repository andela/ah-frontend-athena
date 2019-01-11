# Author's Haven

[![Build Status](https://travis-ci.org/andela/ah-frontend-athena.svg?branch=ch-travis-162163222)](https://travis-ci.org/andela/ah-frontend-athena)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d7a486573553270606f1/test_coverage)](https://codeclimate.com/github/andela/ah-frontend-athena/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d7a486573553270606f1/maintainability)](https://codeclimate.com/github/andela/ah-frontend-athena/maintainability)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-7af442.svg)](https://houndci.com)

# Description.
This repository contains code for a product called Author's Haven, which is a platform where users can read and publish articles.
 The code in this repository is written in ReactJs. It is the frontend code consuming API endpoints from ah-backend-athena.

 # Documentation.
 Below is a list of endpoints consumed by this frontend;

| Endpoints              | Action                                  |
|  -------------------  | --------------------------------------- |
| POST /api/users/login | This endpoint is used to login users in |
| POST /api/users      | This endpoint is used to register users in order use the product |
| GET /api/user      | Returns the current user |
| PUT /api/user      | Updates a user's info  |
| GET /api/profiles/:username | Returns a user's profile  |
| POST /api/profiles/:username/follow  | This endpoint is used for logged in user to follow another user  |
| DELETE /api/profiles/:username/follow  | This endpoint is used for logged in user to unfollow another user |
| GET /api/articles  | Returns a list of all articles in the database |
| GET /api/articles/feed | This endpoint will return multiple articles created by followed users, ordered by most recent first|
| GET /api/articles/:slug | This endpoint returns a single article  |
| POST /api/articles | This endpoint is used to create new articles  |
| PUT /api/articles/:slug  |  This endpoint is used to update an article  |
| DELETE /api/articles/:slug | This endpoint is used to delete an article  |
| POST /api/articles/:slug/comments | This endpoint is used to add a comment to an article |
| GET /api/articles/:slug/comments | Returns all the comments on an article  |
| DELETE /api/articles/:slug/comments/:id | Deletes a specific comment on an article  |
| POST /api/articles/:slug/favorite | This endpoint is used by a logged in user to favorite an article |
| DELETE /api/articles/:slug/favorite | This endpoint is used by a logged in user to unfavorite an article |
| GET /api/tags | This endpoint returns all tags |

 # Setup

 ## Dependencies

 * Install NodeJs(Download node.js from the official website)

 ## Getting Started

 * Clone the repository locally

    `git clone https://github.com/andela/ah-frontend-athena.git`

* Enter the repo directory

    `cd ah-athena-frontend`

* Install the dependencies.

    `npm install`

* Run the application.

    `npm start`

## Testing

* Run tests.

    `npm test`
