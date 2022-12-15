const {Router} = require("express");
const { MostrarPrestamos, MostrarPrestamosID, EliminarPestamoID, AgregarPrestamo } = require ("../controllers/Prestamos")
const router = Router()

///GET///
router.get("/", MostrarPrestamos)
router.get("/id/:id/", MostrarPrestamosID) //http://localhost:4000/api/v1/usuarios/id/11


///DELETE///
router.delete("/",EliminarPestamoID) // http://localhost:4000/api/v1/usuarios/?id=1


////POST////
router.post("/",AgregarPrestamo)

module.exports=router