const {Router} = require("express");
const {MostrarLibros, DarDeBajaLibroID, MostrarLibrosID, DarDeAltaLibro, ActualizarLibro} = require ("../controllers/Libros")
const router = Router()

///GET///
router.get("/", MostrarLibros)
router.get("/id/:id/", MostrarLibrosID) //http://localhost:4000/api/v1/usuarios/id/11


///DELETE///
router.delete("/",DarDeBajaLibroID) // http://localhost:4000/api/v1/usuarios/?id=1


////POST////
router.post("/",DarDeAltaLibro)


///PUT//
router.put("/",ActualizarLibro)


module.exports=router