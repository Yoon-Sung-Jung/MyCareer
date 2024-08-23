show tables;

select *
from Test;

select *
from Question;

select *
from MYCAREER_USER;

show columns from Test;
show columns from MYCAREER_USER;
show columns from Question;

ALTER TABLE Test
    CHANGE id q int;

drop table Question;
drop table Test;
drop table MYCAREER_USER;

insert into Test (test_type, q)
VALUES ('직업흥미검사(K) – 중학생', 30),
       ('직업흥미검사(K) – 고등학생', 31),
       ('진로개발준비도검사', 8),
       ('이공계전공적합도검사', 9),
       ('주요능력효능감검사', 10),
       ('진로흥미탐색', 19),
       ('직업적성검사 - 중학생', 20),
       ('직업적성검사 - 고등학생', 21),
       ('진로성숙도검사 - 중학생', 22),
       ('진로성숙도검사 - 고등학생', 23),
       ('직업가치관검사 - 중학생', 24),
       ('직업가치관검사 - 고등학생', 25),
       ('직업가치관검사 - 일반,대학생', 6),
       ('진로개발역량검사 - 중학생', 26),
       ('진로개발역량검사 - 고등학생', 27)
;

select *
from Question
where q=31;

delete from MYCAREER_USER where id=2;