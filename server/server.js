const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

const app = express();

conectarDB();

const corsOptions = {
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: true
  }
app.use(cors(corsOptions));

app.use( express.json({ extended: true }));

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('API is running!!!');
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/tareas', require('./routes/tareas'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/acciones', require('./routes/acciones'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
