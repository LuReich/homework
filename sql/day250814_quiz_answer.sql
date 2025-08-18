/*
select
    car_id,
    case
        when max(case when '2022-10-16' between start_date and end_date then 1 else 0 end) = 1
        then '대여중'
        else '대여 가능'
    end as availability
from
    car_rental_company_rental_history
group by
    car_id
order by
    car_id desc;
*/    
/*
select  distinct car_id, 
    case when car_id =(
        select car_id from car_rental_company_rental_history b
        where '2022-10-16' between start_date and end_date
        and b.car_id=a.car_id
    ) then '대여 중'
    else '대여 가능' end as availability
from car_rental_company_rental_history a
order by car_id desc;
*/

with m as(
    select distinct car_id
    from car_rental_company_rental_history
)
select m.car_id, 
    case when car_id=(
        select car_id
        from car_rental_company_rental_history b
        where '2022-10-16' between start_date and end_date
        and b.car_id=m.car_id
    ) then '대여중' 
    else '대여 가능' end as availability
from m
order by m.car_id desc;
