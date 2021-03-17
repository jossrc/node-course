import { Sequelize } from 'sequelize';

const db = new Sequelize('bd_node','root' ,'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
});

export default db;
