const express = require ('express')
const lectoresRouter = require ('./Routes/Lectores')
const librosRouter = require ('./Routes/Libros')
const prestamosRouter = require ('./Routes/Prestamos')
const cors = require ('cors')

class Server{
    constructor(){
        this.app = express()
        this.paths = {
            lectores:"/api/v1/Lectores",
            libros:"/api/v1/Libros",
            prestamos:"/api/v1/Prestamos"
        }
        this.middelwares()
        this.routes()
    }

    routes(){      
        this.app.use(this.paths.lectores, lectoresRouter)
        this.app.use(this.paths.libros, librosRouter)
        this.app.use(this.paths.prestamos, prestamosRouter)
    }

    middelwares (){
        this.app.use(cors()) //Permite solicitudes de origen cruzado
        this.app.use(express.json()) // Habilita la lectura de contenido en formato json
    }
    listen() {
        this.app.listen(process.env.PORT,()=>{
        console.log("Backend en ejecución en el puerto", process.env.PORT)
        })
    }
}
module.exports = Server