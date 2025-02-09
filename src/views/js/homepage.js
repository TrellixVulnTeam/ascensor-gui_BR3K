const remoteWindow = require('electron').remote;
const path = require('path');
const url = require('url');
const swal = require('sweetalert2');
const fs = require('fs');
const ps = require('python-shell');
const dirname = path.join(__dirname, '../', 'scripts/', 'faces/');
const estado = document.getElementById('estado');

const iniciar = document.getElementById('iniciarBtn');
iniciar.addEventListener('click', function (event) {
	console.log(__dirname);
	var options = {
		scriptPath : path.join(__dirname, '../', 'scripts'),
		pythonPath : path.join(__dirname, '../', '../', 'python/', 'bin/', 'python')
	};

	ps.PythonShell.run('app.py', options, function (err, results) {
		if (err) throw err;
		// Cuando se cierre la app, que pase esto
		estado.innerHTML = 'Offline';
	});

	// Cuando se abre la app, que pase esto
	estado.innerHTML = 'Online';
});
const añadirBtn = document.getElementById('añadirBtn');
añadirBtn.addEventListener('click', function (event) {
	addNewFace = new remoteWindow.BrowserWindow({
		width          : 450,
		height         : 300,
		frame          : false,
		webPreferences : {
			nodeIntegration : true
		}
	});
	addNewFace.loadURL(
		url.format({
			pathname : path.join(__dirname, 'addNewFace.html'),
			protocol : 'file',
			slashes  : true
		})
	);
	addNewFace.on('closed', () => {
		addNewFace = null;
	});
});
const borrarBtn = document.getElementById('borrarBtn');
borrarBtn.addEventListener('click', function (event) {
	var ruta = path.join(__dirname, '..', 'scripts', 'faces');
	try {
		if (!fs.existsSync(ruta)) {
			fs.mkdirSync(ruta);
		}
	} catch (err) {
		console.error(err);
	}
	swal.fire(
		'Instrucciones',
		'Se abrirá el directorio, lo unico que debe hacer para eliminar a una persona es borrar su foto.',
		'question'
	);
	setTimeout(openDir, 3000);
});

const salirBtn = document.getElementById('salirBtn');
salirBtn.addEventListener('click', function (event) {
	var window = remoteWindow.getCurrentWindow();
	window.close();
});

function openDir () {
	remoteWindow.shell.openItem(path.join(__dirname, '..', 'scripts', 'faces'));
}
