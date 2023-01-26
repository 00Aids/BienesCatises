import {check, validationResult} from 'express-validator'
import Usuario from "../models/Usuario.js"
import {generarId} from "../helpers/tokens.js"
import {emailRegistro} from "../helpers/email.js"

const formularioLogin = (req, res) =>{
    res.render('auth/login', {  //.render es una funcion que se va a encargar de mostrar una vista
        pagina: 'Iniciar Sesion'
    }) 
}

const formularioRegistro = (req, res) =>{
    res.render('auth/registro', {  //.render es una funcion que se va a encargar de mostrar una vista
        pagina: 'Crear cuenta'
    }) 
}

const registrar = async (req, res) =>{
    //validacion
        await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
        await check('email').isEmail().withMessage('El campo email debe que contener un email').run(req)
        await check('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe ser al menos de 6 caracteres').equals(req.body.repetir_contrasena).withMessage('Las contraseñas no son iguales').run(req)
        // await check('repetir_contrasena').run(req) //para nada o obselto o utilize mal la sintaxis

        let resultado = validationResult(req)

    //verificar que el resultado este vacio
        if(!resultado.isEmpty()) {
        // errores
            return res.render('auth/registro', {  //.render es una funcion que se va a encargar de mostrar una vista
                pagina: 'Crear cuenta',
                errores: resultado.array(),
                usuario: {
                    nombre: req.body.nombre, //mantener el nombre y email despues de que salgan los errores
                    email: req.body.email
                }
            }) 
        } 

        //extraer los datos
        const {nombre, email, contrasena} = req.body

        //verificar que el usuario no este duplicado
        const existe_usuario = await Usuario.findOne( { where:{ email} } )

        if (existe_usuario){
            return res.render('auth/registro', {  //.render es una funcion que se va a encargar de mostrar una vista
                pagina: 'Crear cuenta',
                errores: [{msg: 'Ese correo ya se encuentra registrado'}],
                usuario: {
                    nombre: req.body.nombre, //mantener el nombre y email despues de que salgan los errores
                    //email: req.body.email
                }
            }) 
        }

        //Almacenar usuario
        const usuario = await Usuario.create({
            nombre,
            email,
            contrasena,
            token: generarId()
        })

        //Envia email de confirmacion
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })


        //Mostar mensaje de confirmacion
        res.render('templates/mensaje',{
            pagina: 'Cuenta Creada Correctamente',
            mensaje: 'Hemos Enviado un Email de Confirmacion, presiona en el enlace'
        })
    
      
    //-------------------------------------------------------------------

    //console.log(req.body) /* siempre que se vaya a leer la informacion que se ingresa de un formulario en express, se va a utilizar el req.body */

    //const usuario = await Usuario.create(req.body) /* va a crear un nuevo usuario con la informacion que le estamos pasando */
    //res.json(usuario) /* retorna el usuarion con la informacion de la base de datos*/
}

const formularioRecuperarContrasena = (req, res) =>{
    res.render('auth/recuperar-contrasena', {  //.render es una funcion que se va a encargar de mostrar una vista
        pagina: 'Recuperar Contraseña'
    }) 
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioRecuperarContrasena
}