const express = require("express")
const colors = require("colors")
const createConnection = require("../db/db_connection")

const users = express.Router()

users.get("/users/get-all", async (req, res) =>{

  try{

    const connection = await createConnection

    const [rows, fields] = await connection.query(
      `SELECT * FROM usuarios`
    );

    console.log(rows)
    res.json({ status: 200, users: rows})

  }catch(err){
    console.log(err .red);
    res.json(err)
  }

})

users.post("/users/add-usuario", async (req, res) =>{
  const newUser = req.body

  try{

    const connection = await createConnection

    const [rows, fields] = await connection.query(
      `SELECT * FROM usuarios`
    );

    for (const user of rows) {
      if (user.nombre === newUser.nombre) {
        console.log("\nEl usuario ya existe en la Base de datos" .red);
        return res.json({
          status: 409,
          message: "El usuario ya existe en la base de datos"
        });
      }
    }   

    const [status] = await connection.query(
      `INSERT INTO usuarios ( nombre, area, email, image ) VALUES(?, ?, ?, ?)`,
      [newUser.nombre, newUser.area, newUser.email, newUser.image]
    );

    console.log(rows)
    res.json({ status: 200, message:"Usuario creado con exito"})

  }catch(err){
    console.log(err .red);
    res.json(err)
  }

})

users.post("/users/delete-usuario", async (req, res) =>{
  const user = req.body

  try{

    const connection = await createConnection  

    const [status] = await connection.query(
      `DELETE FROM usuarios WHERE nombre = ?`,
      [user.nombre]
    );

    console.log(status)
    res.json({ status: 200, message:"Usuario eliminado exitosamente"})

  }catch(err){
    console.log(err .red);
    res.json(err)
  }

})

users.put("/users/update-usuario", async (req, res) =>{
  const user = req.body
  console.log(user)

  try{

    const connection = await createConnection

    const [rows, fields] = await connection.query(
      `SELECT * FROM usuarios`
    );

    for (const users of rows) {
      if (users.id === user.id) {
        const [status] = await connection.execute(
          `UPDATE usuarios SET nombre = ?, area = ?, email = ?, image = ?  WHERE id = ?`,
          [user.nombre, user.area, user.email, user.image, user.id]
        );

        console.log(status);
        console.log("\nEl susuario fue modificado con exito" .green);
        res.json({
          status: 200,
          message: "El susuario fue modificado con exito"
        });
        return
      }
    }   

    console.log("\nEl susuario existe en la Base de Datos" .red); 
    res.json("El susuario existe en la Base de Datos")

  }catch(err){
    console.log(err .red);
    res.json(err)
  }

})

module.exports = users