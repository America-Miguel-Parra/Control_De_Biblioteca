const { request, response, json} = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")

const MostrarPrestamos = async (req=request, res=response) =>{
    let conn;

    try {
        conn = await pool.getConnection()

        const prestamo = await conn.query("SELECT * FROM PRESTAMOS", (error) => {throw new Error(error)})

        if(!prestamo){
            res.status(404).json({msg: "No se encontraron los prestamos realizados en la biblioteca"})
            return
        }
        res.json({prestamo})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }

    }
   
 }


 const MostrarPrestamosID = async (req=request, res=response) =>{
    const {id}= req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [prestamos] = await conn.query( `SELECT * FROM PRESTAMOS WHERE Num_Prestamo = ${id}`, (error) => {throw new Error(error)})

        if (!prestamos){
            res.status(404).json ({msg: `No se encontraron prestamos con el Numero ${id}`})
            return
        } 

        res.json({prestamos})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


const EliminarPestamoID = async (req=request, res=response) =>{
    const {id}= req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query( `UPDATE PRESTAMOS SET ID_Libro ='N' WHERE Num_Prestamo = ${id}`, (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo eliminar el prestamo con el Numero ${id}`})
            return
        } 

        res.json({msg:`El prestamo con el numero ${id} se elimno correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


const AgregarPrestamo = async (req=request, res=response) =>{
    const {
        ID_Libro,
        ID_Lector,
        Fecha_Salida,
        Fecha_Entrega
    }= req.body

    if(
        !ID_Libro|| 
        !ID_Lector|| 
        !Fecha_Salida|| 
        !Fecha_Entrega 
     ) {
        res.status(400).json({msg:"Falta informacion sobre el prestamo"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query( `
        INSERT INTO PRESTAMOS(
            ID_Libro,
            ID_Lector,
            Fecha_Salida,
            Fecha_Entrega
        ) VALUES (
            '${ID_Libro}',
            '${ID_Lector}',
            '${Fecha_Salida}',
            '${Fecha_Entrega}'
        )`
        , (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo agregar el registro del prestamo ${ID_Libro}`})
            return
        } 
        res.json({msg:`El prestamo ${ID_Libro} se agrego correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


module.exports={MostrarPrestamos, MostrarPrestamosID, EliminarPestamoID, AgregarPrestamo}