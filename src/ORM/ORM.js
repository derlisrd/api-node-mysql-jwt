import { Sequelize } from 'sequelize'
import { ENV } from '../App/config.js';

export const sequelize = new Sequelize(ENV.DATABASE, ENV.USER, ENV.PASS, {
    host: ENV.HOST,
    dialect: 'mysql'
});
