insert into users (password, nickname, email, email_receive_allow)
values ('$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'adminN', 'admin@example.com', true);
-- insert into users (nickname, email, email_receive_allow, activated)
-- values ('adminN', 'admin@example.com', true, 1);
insert into users (password, nickname, email)
values ('$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'userN', 'user@example.com');

insert into authority (authority_name) values ('ROLE_USER');
insert into authority (authority_name) values ('ROLE_ADMIN');

insert into user_authority (user_uid, authority_name) values (1, 'ROLE_USER');
insert into user_authority (user_uid, authority_name) values (1, 'ROLE_ADMIN');
insert into user_authority (user_uid, authority_name) values (2, 'ROLE_USER');