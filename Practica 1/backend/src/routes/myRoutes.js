const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const Medicion = require('../models/Mediciones')
const Asignacion = require('../models/Asignacion');
const Dates = require('../models/Dates')

router.get('/', (req, res) => {

    
    res.json({'resultado': "Arqui2 - Practica 1 :D"});
	
});


router.get('/users', async (req, res) => {

    const users = await User.find();
    res.json({users});
	
});

//peticion para eliminar TODOS los usuarios registrados en la base de datos
router.get('/delete_all', async (req, res) => {
    
	await User.deleteMany({})
    
	res.json({'Resultado': 'Usuarios borrados con exito! :D'});

});

router.post("/create_user", async (req, res) => {
    
	try {

        const data = req.body;            
        
		await User.create({
        
		Nombre: data.Nombre,
			Apellido: data.Apellido,
			Edad: data.Edad,
			Genero: data.Genero, 
			Peso: data.Peso, 
			Estatura: data.Estatura,
			Username: data.Username,
			Password: data.Password,
			Rol: data.Rol
        
		});   
		
        res.json({message : 'Usuario creado'});

    } catch (error) {
		
        res.send({ message : error });
    
	}

});

router.get('/one_user/:Us/:Pass', async (req, res) => {
    
	const users = await User.find().where('Username').equals(req.params.Us).where('Password').equals(req.params.Pass);
    
	res.send(users);

});

router.post("/create_medicion", async (req, res) => {
    
	try {

        const data = req.body;            
        
		await Medicion.create({
        
			Fecha: data.Fecha,
			PulsoOxigeno: Number(data.PulsoOxigeno), 
			RitmoCardiaco: Number(data.RitmoCardiaco),
			Temperatura: Number(data.Temperatura),
			Username: data.Username
        
		});   
		
        res.json({message : 'Medicion creada'});

    } catch (error) {
		
        res.send({ message : error });
    
	}

});

router.get('/getHistoria/:Us', async (req, res) => {
    
	const Mediciones = await Medicion.find().where('Username').equals(req.params.Us).select('Fecha').distinct('Fecha');
    
	res.send(Mediciones);

});

router.get('/get/Mediciones/:Us/:Da', async (req, res) => {
    
	const Mediciones = await Medicion.find().where('Username').equals(req.params.Us).where('Fecha').equals(req.params.Da);
    
	res.send(Mediciones);

});

router.post("/create/asignacion", async (req, res) => {
    
	try {

        const data = req.body;            
        
		await Asignacion.create({
        
			UsernameCoach: data.UsernameCoach,
			UsernameAtleta: data.UsernameAtleta
        
		});   
		
        res.json({message : 'Asignacion creada'});

    } catch (error) {
		
        res.send({ message : error });
    
	}

});

router.get('/Get/All/Atletas', async (req, res) => {
    
	const Asignaciones = await Asignacion.find();
    
	res.send(Asignaciones);

});

router.get('/Get/All/Atletas/Users', async (req, res) => {
    
	const UsersAtletas = await User.find().where('Rol').equals('A');
    
	res.send(UsersAtletas);

});

router.get('/Ordenar/Fecha/Inicio/Sesion', async (req, res) => {
    
	const Fechas = await Dates.find();
    
	let Aux;
	
	if(Fechas.length > 0) {
		
		Aux = Fechas[Fechas.length - 1] 
		
	} else {
		
		Aux = null;
		
	}
	
	res.send(Aux);

});

router.post("/Add/Fecha/New/Sesion", async (req, res) => {
    
	try {

        const data = req.body;            
        
		await Dates.create({
        
			Fecha: data.Fecha, 
			Username: data.Username
        
		});   
		
        res.json({message : 'Fecha creada'});

    } catch (error) {
		
        res.send({ message : error });
    
	}

});

module.exports = router; 