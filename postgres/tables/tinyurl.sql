BEGIN TRANSACTION;

CREATE TABLE tinyurl (
    id serial PRIMARY KEY,
    original_url text NOT NULL,
    url_code VARCHAR(100),
    short_url text NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

COMMIT;