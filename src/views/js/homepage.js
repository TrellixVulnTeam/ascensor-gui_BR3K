const remoteWindow = require('electron').remote;
const path = require('path');
const url = require('url');
const swal = require('sweetalert2');
const fs = require('fs');

const iniciar = document.getElementById('iniciarBtn');
iniciar.addEventListener('click', function(event) {
    
    swal.fire(
        'Buen trabajo',
        'Se ha iniciado el programa',
        'success'
    )
})
const añadirBtn = document.getElementById('añadirBtn');
añadirBtn.addEventListener('click', function(event) {

    addNewFace = new remoteWindow.BrowserWindow({
        width: 450,
        height: 300,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    addNewFace.loadURL(url.format({
        pathname: path.join(__dirname, 'addNewFace.html'),
        protocol: 'file',
        slashes: true
    }));
    addNewFace.on('closed', () => {
        addNewFace = null;
    })
})
const borrarBtn = document.getElementById('borrarBtn');
borrarBtn.addEventListener('click', function(event) {
    
    var ruta = path.join(__dirname, '..', 'scripts', 'faces');
    try {
        if (fs.existsSync(ruta)) {
            swal.fire(
                'Exito!',
                'El directorio existe!',
                'success'
            );
        } else {
            swal.fire(
                'Lastima!',
                'El directorio no existe!',
                'error'
            );
        }
    } catch(err) {
        console.error(err)
    }
    //remoteWindow.shell.openItem(path.join(__dirname, '..', 'scripts', 'faces'));
    // swal.fire(
    //     'Buen trabajo',
    //     'Haz abierto el directorio',
    //     'success'
    // )
})

const salirBtn = document.getElementById('salirBtn');
salirBtn.addEventListener('click', function(event) {
    var window = remoteWindow.getCurrentWindow();
    window.close();
})