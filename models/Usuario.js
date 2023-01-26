import { DataTypes } from 'sequelize'
/*al importar DataTypes debe ser en plural */
import bcrypt from 'bcrypt'
import db from '../config/db.js'


const Usuario = db.define('usuarios',{
    nombre: {   /*cuando la columna tiene varias caracteristicas se abre corchetes */
        type: DataTypes.STRING,
        allowNULL: false    /*Para decir que la columna no pude ir vacia */
    },
    email: {
        type: DataTypes.STRING,
        allowNULL: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNULL: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
},{
    hooks:{ /* hashar contraseña */
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)
            usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
        }
    }
})

export default Usuario


