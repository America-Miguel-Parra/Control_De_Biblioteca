const { request, response, json} = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")

const MostrarLibros = async (req=request, res=response) =>{
    let conn;

    try {
        conn = await pool.getConnection()

        const libros = await conn.query("SELECT * FROM LIBROS", (error) => {throw new Error(error)})

        if(!libros){
            res.status(404).json({msg: "No se encontraron Libros en la biblioteca"})
            return
        }
        res.json({libros})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }

    }
   
 }


 const MostrarLibrosID = async (req=request, res=response) =>{
    const {id}= req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [libro] = await conn.query( `SELECT * FROM LIBROS WHERE ID_Libro = ${id}`, (error) => {throw new Error(error)})

        if (!lectores){
            res.status(404).json ({msg: `No se encontraron lectores con el ID ${id}`})
            return
        } 

        res.json({lectores})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


const DarDeBajaLibroID = async (req=request, res=response) =>{
    const {id}= req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query( `UPDATE LIBROS SET Existente ='N' WHERE ID_Libro = ${id}`, (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo eliminar el libro con el ID ${id}`})
            return
        } 

        res.json({msg:`El libro con el ID ${id} se elimno correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


const DarDeAltaLibro = async (req=request, res=response) =>{
    const {
        Titulo,
        Autor,
        Fecha_Publicacion,
        Editorial,
        Clasificacion,
        Num_Paginas,
        Existente
    }= req.body

    if(
        !Titulo|| 
        !Autor|| 
        !Fecha_Publicacion|| 
        !Editorial|| 
        !Clasificacion|| 
        !Num_Paginas|| 
        !Existente 
     ) {
        res.status(400).json({msg:"Falta informacion sobre del libro"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query( `
        INSERT INTO LIBROS(
            Titulo,
            Autor,
            Fecha_Publicacion,
            Editorial,
            Clasificacion,
            Num_Paginas,
            Existente
        ) VALUES (
            '${Titulo}',
            '${Autor}',
            '${Fecha_Publicacion}',
             ${Editorial},
            '${Clasificacion}',
            '${Num_Paginas}',
            '${Existente}'
        )`
        , (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo agregar el registro del libro ${Titulo}`})
            return
        } 
        res.json({msg:`El libro ${Titulo} se agrego satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const ActualizarLibro = async (req=request, res=response) =>{
    const {
        Titulo,
        Autor,
        Fecha_Publicacion,
        Editorial,
        Clasificacion,
        Num_Paginas,
        Existente
    }= req.body
    if(
        !Titulo|| 
        !Autor|| 
        !Fecha_Publicacion||
        !Editorial|| 
        !Clasificacion||
        !Num_Paginas||
        !Existente
     ) {
        res.status(400).json({msg:"Falta informacion sobre el libro"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()
        const [lector] = await conn.query(`SELECT Titulo, Autor, Fecha_Publicacion, Editorial, Clasificacion, Num_Paginas, Existente
        FROM LIBROS
        WHERE Titulo = '${Titulo}'`)
        if (!lector){
            res.status(403).json({msg:`El libro ${Titulo} no se encuentra registrado`})
            return
        }
        const {affectedRows} = await conn.query( `
        UPDATE LIBROS SET
            Autor = '${Autor || user.Autor}',
            Fecha_Publicacion = ${Fecha_Publicacion || user.Fecha_Publicacion},
            Editorial = ${Editorial || user.Editorial},
            Clasificacion = ${Cod_Postal || user.Cod_Postal},
            Num_Paginas = ${Num_Paginas || user.Num_Paginas},
            Existente = '${Existente}'
        WHERE Titulo ='${Titulo}'`
        , (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se pudo actualizar el registro del libro${Titulo}`})
            return
        } 
        res.json({msg:`El libro${Titulo} se actualizo correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    } finally{
        if (conn){
            conn.end()
        }
    }
}


module.exports={MostrarLibros, MostrarLibrosID, DarDeBajaLibroID, DarDeAltaLibro, ActualizarLibro}