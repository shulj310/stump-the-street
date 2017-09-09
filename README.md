* Ruby version

* System dependencies

Redis server is used for PubSub functionality to power ActionCable subscriptions.

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

To stream live portfolio updates:
```
redis-server
thor price_feed:price_feed
```

* Deployment instructions

May have to `npm install object-assign`!

`npm start` to fire-up client-side server
