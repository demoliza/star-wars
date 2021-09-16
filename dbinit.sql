CREATE TABLE comments (
    id UUID NOT NULL PRIMARY KEY,
    episode_id INT NOT NULL,
    comment TEXT NOT NULL
);