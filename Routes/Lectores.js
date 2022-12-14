const {Router} = require("express");
const {MostrarLectores, MostrarLectoresID, EliminarLectorID, AgregarLector, ActualizarLector, AccederLector, NContraseñaLector} = require ("../controllers/Lectores")
const router = Router()

///GET///
router.get("/", MostrarLectores)
router.get("/id/:id/", MostrarLectoresID) //http://localhost:4000/api/v1/usuarios/id/11


///DELETE///
router.delete("/",EliminarLectorID) // http://localhost:4000/api/v1/usuarios/?id=1


////POST////
router.post("/",AgregarLector)
router.post("/AccederLector",AccederLector)
router.post("/NContraseñaLector",NContraseñaLector)


///PUT//
router.put("/",ActualizarLector)


module.exports=router