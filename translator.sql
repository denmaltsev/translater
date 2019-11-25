create table languages
(
    id   INTEGER     not null
        constraint languages_pk
            primary key autoincrement,
    code VARCHAR(10) not null,
    text VARCHAR(50) not null
);

create unique index languages_code_uindex
    on languages (code);

insert into languages (code, text) values ('ru', 'Русский');
insert into languages (code, text) values ('en', 'Английский');
insert into languages (code, text) values ('sl', 'Словенский');