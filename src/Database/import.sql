DROP TABLE if exists users;
CREATE TABLE `users` (
  `id_user` bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombre_user` text NOT NULL,
  `username_user` varchar(100)  NOT NULL,
  `password_user` text NOT NULL,
  `email_user` varchar(190) DEFAULT NULL,
  `rol_user` int(1) DEFAULT 2 COMMENT '1 2 3 4 5',
  `estado_user` int(1) DEFAULT 1 COMMENT '0 inactivo, 1 activo',
  `last_try_login` timestamp NULL DEFAULT current_timestamp(),
  `last_try_login_user` datetime DEFAULT current_timestamp(),
  `try_user` int(1) NOT NULL DEFAULT 0,
  `last_login_user` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
);
DROP TABLE if exists images;
CREATE TABLE `images` (
  id_image bigint(20) not null primary key AUTO_INCREMENT,
  name_image text not null,
  url_image text not null,
  static_image text not null,
  `updated_at` datetime DEFAULT current_timestamp()
);
