import  Sequelize from "sequelize";
import dotenv from 'dotenv' /*importamos dotenv */
dotenv.config({path : '.env'}) /*Le decimos done se encuentra ubicado, en esta caso le decimos qe en la raiz del proyecto y el archivo .env */

const db  = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASSWORD,{
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool:{
        max: 5,
        min: 0,              /*configura como va a ser el comportamiento para conexiones nuevas o exitentes , matiene o reutiukliza las conexiones que esten vivas*/ /*maximo 5 coonexiones va a tratar de mantener */
        acquire: 30000,     /*30 segundos, tiempo que va apasar tratando de lograr una conexion antes de marcar un error*/
        idel: 10000         /* 10 seg en lo que ve que no hay nada de movimiento ene lo que no hay nada esta dtodo tranquilo asi quie da 10 segundos para que la conexion se finalize*/
    },
    operatorAliases: false
});

export default db;