Things you may want to cover:

* Ruby version

* System dependencies

Redis server is used for PubSub functionality to power ActionCable subscriptions.

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

To stream live portfolio updates:
```
redis-server
thor price_feed:price_feed
```

* ...
