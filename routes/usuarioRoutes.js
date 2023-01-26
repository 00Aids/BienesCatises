import express, { Router } from "express";
import { formularioLogin, formularioRegistro,registrar, formularioRecuperarContrasena} from "../controllers/usuarioController.js";

const router = express.Router();
//routing

router.get('/login', formularioLogin) 

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

router.get('/recuperar-contrasena', formularioRecuperarContrasena)



//router.get('/login', formularioLogin) //(req, res) => {
//     res.render('auth/login', {  //.render es una funcion que se va a encargar de mostrar una vista
//         autenticado: true
//     }) 
// });

router.get('/', (req, res) => { 
    res.send('mei')
});

router.post('/', (req, res) => { //se va definiendo el rating, los diferentes empoints
    res.json({xbox: 'mei3235'})
});

//se puede hacer de las dos maneras

// router.router('/')
//     .get(function(req, res){
//         res.json({msg: 'Mei aids'})
//     })

//     .post(function(req, res){
//         res.json({msg: 'Hola Mei'})
//     })

export default router