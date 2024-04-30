SELECT User.id AS User_id
, User.username AS User_username
, User.password AS User_password
, User__authorities.id AS User__authorities_id
, User__authorities.user_id AS User__authorities_user_id
, User__authorities.authority_name AS User__authorities_authority_name
 FROM user User 
 LEFT JOIN user_authority User__authorities 
 ON User__authorities.user_id=User.id 
 WHERE ( ((User.username = 'test02')) ) 
 AND ( User.id IN ('041ced24-9b36-4f71-9bc4-360bbb5480ed') )
