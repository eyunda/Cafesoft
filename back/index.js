const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const figlet = require('figlet')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))

const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cafesoft'
}

app.get('/', (req, res) => {
    res.send('Soy el servidor!')
})

//construccion de las api

//login 

app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    const values = [username, password]
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT * FROM login l, rol r WHERE username = ? AND password = ? AND l.id_rol=r.id AND l.id_rol='1'", values, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send({
                    "id": result[0].id,
                    "username": result[0].username,
                    "rol": result[0].rol,
                    "nombre": result[0].nombre,
                    "apellido": result[0].apellido,
                    "user": result[0].user,
                    "imagen": result[0].imagen,
                    "isAuth": true
                })
            } else {
                res.status(400).send('Usuario no existe')
            }
        }
    })
    connection.end()
})

//usuarios o empleados

app.get('/api/usuarios', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query('SELECT * FROM usuarios', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM usuarios WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/guardar', (req, res) => {
    const { avatar, nombre, apellido, edad, documento, telefono, correo, username, password } = req.body
    const params = [
        [avatar, nombre, apellido, edad, documento, telefono, correo, username, password]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO usuarios ( avatar, nombre, apellido, edad, documento, telefono, correo, username, password) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario creado" })
        }
    })
    connection.end()
})

app.post('/api/editar', (req, res) => {
    const { id, avatar, nombre, apellido, edad, documento, telefono, correo, username, password } = req.body
    const params = [avatar, nombre, apellido, edad, documento, telefono, correo, username, password, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE usuarios set avatar = ?, nombre = ?, apellido = ?, edad = ?, documento = ?, telefono = ?, correo = ?, username = ?, password = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "USuario editado" })
        }
    })
    connection.end()
})

//cargos al empleado

app.get('/api/cargos', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT u.*, c.cargo FROM usuarios u, cargo c WHERE u.id_cargo = c.id", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/cargos/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM usuarios WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/cargos/guardar', (req, res) => {
    const { id_cargo, dias } = req.body
    const params = [
        [avatar, nombre, apellido, edad, documento, telefono, correo, username, password]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO usuarios ( avatar, nombre, apellido, edad, documento, telefono, correo, username, password) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Usuario creado" })
        }
    })
    connection.end()
})

app.post('/api/cargos/editar', (req, res) => {
    const { id, nombre, apellido, id_cargo, dia } = req.body
    const params = [nombre, apellido, id_cargo, dia, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE usuarios set nombre = ?, apellido = ?, id_cargo = ?, dia = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Cargo editado" })
        }
    })
    connection.end()
})

//cargo

app.get('/api/cargo', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT * FROM cargo", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/cargo/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM cargo WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Cargos Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/cargo/guardar', (req, res) => {
    const { cargo } = req.body
    const params = [
        [cargo]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO cargo ( cargo ) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Cargo creado" })
        }
    })
    connection.end()
})

app.post('/api/cargo/editar', (req, res) => {
    const { id, cargo } = req.body
    const params = [cargo, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE cargo set cargo = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Cargo editado" })
        }
    })
    connection.end()
})

//peso de cafe que se despacha

app.get('/api/peso', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT * FROM peso", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/peso/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM peso WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Peso Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/peso/guardar', (req, res) => {
    const { id, peso, dia, estado } = req.body
    const params = [
        [id, peso, dia, estado]
    ]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO peso ( cargo ) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Peso creado" })
        }
    })
    connection.end()
})

app.post('/api/peso/editar', (req, res) => {
    const { id, peso, dia, estado } = req.body
    const params = [peso, dia, estado, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE peso set estado = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Peso editado" })
        }
    })
    connection.end()
})

//nomina

app.get('/api/nomina', (req, res) => {
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT u.*, n.*, e.estado FROM nomina n, usuarios u, estado e WHERE n.id_usuario = u.id AND n.id_estado = e.id", (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
})

app.post('/api/nomina/eliminar', (req, res) => {
    const { id } = req.body
    var connection = mysql.createConnection(credentials)
    connection.query('DELETE FROM nomina WHERE id = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Nomina Eliminado" })
        }
    })
    connection.end()
})

app.post('/api/nomina/guardar', (req, res) => {
    const { id, nomina, id_usuario, fecha, id_estado } = req.body
    const params = [nomina, id_usuario, fecha, id_estado, id]
    var connection = mysql.createConnection(credentials)
    connection.query('INSERT INTO nomina ( nomina, id_usuario, fecha, id_estado ) VALUES ?', [params], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Nomina creado" })
        }
    })
    connection.end()
})

app.post('/api/nomina/editar', (req, res) => {
    const { id, nomina, id_usuario, fecha, id_estado } = req.body
    const params = [nomina, id_usuario, fecha, id_estado, id]
    var connection = mysql.createConnection(credentials)
    connection.query('UPDATE nomina set nomina = ?, id_usuario = ?, fecha = ?, id_estado = ? WHERE id = ?', params, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send({ "status": "success", "message": "Nomina editado" })
        }
    })
    connection.end()
})

//react-native ------------------------------------------------------------------

app.post('/api/trabajadores', (req, res) => {
    const { email, password } = req.body
    const values = [email, password]
    var connection = mysql.createConnection(credentials)
    connection.query("SELECT * FROM usuarios u, rol r, cargo c, nomina n, estado e, dia d WHERE email = ? AND PASSWORD = ? AND u.id_rol=r.id AND u.id_rol='2' AND u.id_cargo = c.id AND n.id_usuario = u.id AND n.id_estado = e.id AND c.id_dia = d.id ", values, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send({
                    "id": result[0].id,
                    "email": result[0].email,
                    "nombre": result[0].nombre,
                    "apellido": result[0].apellido,
                    "rol": result[0].rol,
                    "imagen": result[0].imagen,
                    "cargo": result[0].cargo,
                    "nomina": result[0].nomina,
                    "fecha": result[0].fecha,
                    "estado": result[0].estado,
                    "dia": result[0].dia

                })
                if (!result.length) return next();
            } else {
                res.status(400).send('Usuario no existe')
            }
        }
    })
    connection.end()
})

app.listen(4000, async() => {
    console.log(figlet.textSync('Cafesoft'))
})