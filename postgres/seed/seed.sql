-- Seed data with a fake user for testing

insert into users (name, email, entries, joined) values ('a', 'a@a.com', 5, '2018-01-01');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@a.com');
insert into tinyurl (original_url, url_code, short_url, created_at, updated_at) values ('https://cnodejs.org/topic/52fc7be93e37f7546a308b3d', 'xK6GkAKwx', 'http://localhost/xK6GkAKwx', '2020-09-24T06:39:14.888Z', '2020-09-24T06:39:14.888Z');
