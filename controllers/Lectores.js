const { request, response, json} = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")

const MostrarLectores = async (req=request, res=response) =>{
    let conn;

    try {
        conn = await pool.getConnection()

        const lectores = await conn.query("SELECT * FROM LECTORES", (error) => {throw new Error(error)})

        if(!lectores){
            res.status(404).json({msg: "No se encontraron registros en la biblioteca"})
            return
        }
        res.json({lectores})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally {
        if(conn){
            conn.end()
        }

    }
   
 }


 const MostrarLectoresID = async (req=request, res=response) =>{
    const {id}= req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [lectores] = await conn.query( `SELECT * FROM LECTORES WHERE ID_Lector = ${id}`, (error) => {throw new Error(error)})

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


const EliminarLectorID = async (req=request, res=response) =>{
    const {id}= req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query( `UPDATE LECTORES SET Activo ='N' WHERE ID_Lector = ${id}`, (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo eliminar al lector con el ID ${id}`})
            return
        } 

        res.json({msg:`El lector con el ID ${id} se elimno correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


const AgregarLector = async (req=request, res=response) =>{

    const {
        Activo,
        Nombre,
        Apellidos,
        Edad,
        Domicilio,
        Cod_Postal,
        Telefono,
        Email,
        Contrasena,
    }= req.body

    if(
        !Activo||
        !Nombre|| 
        !Apellidos|| 
        !Edad||
        !Domicilio||
        !Cod_Postal||
        !Telefono||
        !Email|| 
        !Contrasena
     ) {
        res.status(400).json({msg:"Falta informacion sobre el lector"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [lector] = await conn.query(`SELECT Email FROM LECTORES WHERE Email = '${Email}'`)
        if (lector){
            res.status(403).json({msg:`El lector ${Email} ya se encuentra agregado`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena,salt)
        
        const {affectedRows} = await conn.query( `
        INSERT INTO LECTORES(
            Activo,
            Nombre,
            Apellidos,
            Edad,
            Domicilio,
            Cod_Postal,
            Telefono,
            Email,
            Contrasena
        ) VALUES (
            '${Activo}'
            '${Nombre}',
            '${Apellidos}',
             ${Edad},
             ${Domicilio},
             ${Cod_Postal},
             ${Telefono},
             ${Email},
            '${contrasenaCifrada}'
        )`
        , (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se pudo agregar el registro del lector ${Email}`})
            return
        } 
        res.json({msg:`El lector ${Email} se agrego correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


const ActualizarLector = async (req=request, res=response) =>{
    const {
        Nombre,
        Apellidos,
        Edad,
        Domicilio,
        Cod_Postal,
        Telefono,
        Email,
        Contrasena
    }= req.body
    if(
        !Nombre|| 
        !Apellidos|| 
        !Edad||
        !Domicilio|| 
        !Cod_Postal||
        !Telefono||
        !Email||
        !Contrasena
     ) {
        res.status(400).json({msg:"Falta informacion del lector"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()
        const [lector] = await conn.query(`SELECT Nombre, Apellidos, Edad, Domicilio, Cod_Postal, Telefono, Email
        FROM LECTORES
        WHERE Email = '${Email}'`)
        if (!lector){
            res.status(403).json({msg:`El correo electronico ${Email} no se encuentra registrado`})
            return
        }
        const {affectedRows} = await conn.query( `
        UPDATE LECTORES SET
            Nombre = '${Nombre || user.Nombre}',
            Apellidos = '${Apellidos || user.Apellidos}',
            Edad = ${Edad || user.Edad},
            Domicilio = ${Domicilio || user.Domicilio},
            Cod_Postal = ${Cod_Postal || user.Cod_Postal},
            Telefono = '${Telefono}'
        WHERE Email ='${Email}'`
        , (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se pudo actualizar el registro del lector${Email}`})
            return
        } 
        res.json({msg:`El correo electronico del lector ${Email} se actualizo correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    } finally{
        if (conn){
            conn.end()
        }
    }
}


const AccederLector = async (req=request, res=response) =>{
    const {
        Email,
        Contrasena
    }= req.body

    if(
        !Email|| 
        !Contrasena
     ) {
        res.status(400).json({msg:"Falta informacion del lector"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [lector] = await conn.query(`SELECT Email, Contrasena, Activo FROM LECTORES WHERE Email = '${Email}'`)
        if (!lector || user.Activo === 'N' ){
            let code = !lector ? 1 :2;
            res.status(403).json({msg:`El Email o la Contraseña son incorrectos`,errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, user.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El Email o la Contraseña son incorrectos`, errorCode:3})
            return
        }

        res.json({msg:`El lector con el email ${Email} ha iniciado sesión satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}


const NContraseñaLector = async (req=request, res=response) =>{
    const {
        Email,
        AnteriorContrasena,
        NuevaContrasena
    }= req.body

    if(
        !Email|| 
        !AnteriorContrasena||
        !NuevaContrasena
     ) {
        res.status(400).json({msg:"Faltan datos"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [lector] = await conn.query(`SELECT Email, Contrasena, Activo FROM LECTORES WHERE Email = '${Email}'`)
        if (!lector || user.Activo === 'N' ){
            let code = !user ? 1 :2;
            res.status(403).json({msg:`El Email o la Contraseña son incorrectos`,errorCode:code})
            return
        }

        const datosValidos = bcryptjs.compareSync(AnteriorContrasena, user.Contrasena)

        if(!datosValidos){
            res.status(403).json({msg:`El Email o la Contraseña son incorrectos`, errorCode:3})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(NuevaContrasena,salt)

        const {affectedRows} = await conn.query( `
        UPDATE LECTORES SET
            Contrasena='${contrasenaCifrada}'
        WHERE Email ='${Email}'`
        , (error) => {throw new Error(error)})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo actualizar la contraseña de ${Email}`})
            return
        } 

        res.json({msg:`La contraseña de ${Email} se actualizo correctamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}



module.exports={MostrarLectores, MostrarLectoresID, EliminarLectorID, AgregarLector, ActualizarLector, AccederLector, NContraseñaLector}