import {sequelize} from '../ORM/ORM.js'
import { DataTypes } from 'sequelize';

export const UserModel = sequelize.define('users', {
    id_user:{
      allowNull:false,
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    nombre_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_user: {
        type: DataTypes.STRING,
        allowNull: false
      },
    username_user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_user: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    rol_user: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:'0'
    },
    try_user: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:'0'
    },
    estado_user: {
      type: DataTypes.INTEGER,
      allowNull:true,
      defaultValue:'1'
    },
    last_try_login_user: {
      type: DataTypes.DATE,
      allowNull:true,
    },
    last_login_user: {
      type: DataTypes.DATE,
      allowNull:true,
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    freezeTableName:true,
    timestamps:false
    // Other model options go here
  });