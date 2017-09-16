Run after migrating:

```
-- set legacy current competitions to active
UPDATE competitions SET state = 1;
-- initialise user in portfolios
UPDATE portfolios SET user_id = (SELECT user_id FROM competitions WHERE competitions.id = portfolios.competition_id);
```

competition_histories will be dropped by migration.
