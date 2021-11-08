let nomb = document.querySelector('#nombre');
let apelli = document.querySelector('#apellido');
let tel = document.querySelector('#numero');
let fech = document.querySelector('#fecha');
let hour = document.querySelector('#hora');
let texto = document.querySelector('#notas');
const btn = document.querySelector('#btn');

const formm = document.querySelector('#formulario');
let arr;
let busqueda = [];
let citas = [];
let valores = {
    nombre: '',
    apellido: '',
    telefono: 0,
    fecha: '',
    hora: '',
    nota: '',
}



listeners()
function listeners(){
    
formm.addEventListener('submit', cita);


}
 

function cita(e){
e.preventDefault();

if (nomb.value === '' || apelli.value === '' || tel.value === '' || texto.value === ''  || hour.value === '' || texto.value === '' ) {

limpiarError();
    const error = document.querySelector('#error');
    const ee = document.createElement('p');
    ee.innerHTML = 'Error!!! Ingresa los datos requeridos';
    error.appendChild(ee);
    error.classList.add('form-control', 'is-invalid', 'text-center', 'text-light','fs-5');
    console.log('error todos los campos son obligatorios')
}else{
    limpiarError();
    error.classList.remove('form-control', 'is-invalid', 'text-center', 'text-light','fs-5')
    console.log('submit');
    citas.shift();
    const idBorrar = Math.floor(Math.random() * 10000);
    const idEdit = Math.floor(Math.random() * 10000);
    const local = Math.floor(Math.random() * 10000);
    valores = {
    nombre: nomb.value,
    apellido: apelli.value,
    telefono: tel.value,
    fecha: fech.value,
    hora: hour.value,
    nota: texto.value,
    idBorrar,
    idEdit,
    local
    }
   
    citas.push(valores);
    agenda(citas);
    borrarContenido();
    
}

}


function agenda(arreglo){
    const [{nombre, apellido, telefono, nota, fecha, hora, idBorrar, idEdit, local}] = arreglo;

    let html;
    arreglo.forEach( datos => {
        const resultado = document.querySelector('#resultado-agenda');
     
        
        localStorage.setItem(`a${local}b`,  JSON.stringify(datos));
        
        
        
        html = document.createElement('div');
        html.innerHTML = `
    
        <button type="button" class="btn btn-danger btn-sm" id="a${idBorrar}"">X</button>
        <button type="button" class="btn btn-info btn-sm" id="${idEdit}">Edit</button>
                <ul>
                    <h5><u>${nombre} ${apellido}</u></h5>
                    <hr>
                    <li>Fecha: <h6>${fecha}</h6></li>
                    <hr>
                    <li>Hora: <h6>${hora}</h6></li>
                    <hr>
                    <li>Telefono: <h6>${telefono}</h6></li>
                    <hr>
                    Nota:<h6>${nota}</h6> 
                </ul>
        
        `;
   
        resultado.appendChild(html );
        html.classList.add('col', 'col-md-2', 'border',  'border-info', 'mb-3');
        
    });


    let editarCita = document.getElementById(`${idEdit}`);
    editarCita.addEventListener('click', () => {
        
            nomb.value = `${nombre}`;
            apelli.value = `${apellido}`;
            tel.value = `${parseInt(telefono)}` ;
            texto.value = `${nota}` ;
            fech.value = `${fecha}`;
            hour.value = `${hora}`
        
            html.remove();
            localStorage.removeItem(`a${local}b`);
    });
    
    let borrarCita = document.getElementById(`a${idBorrar}`);
    borrarCita.addEventListener('click', () => {
        html.remove();
        localStorage.removeItem(`a${local}b`);
    });
//     debugger
//     busqueda = [...arreglo]
    
//     const result = busqueda.find(elemento => elemento.nombre === 'juan');
// console.log(result)
    
}


function borrarContenido(){
    nomb.value = '';
    apelli.value = '';
    tel.value = '' ;
    texto.value = '' ;
    hour.value = '' ;
    fech.value = '';
}

function limpiarError(){
    while (error.firstChild) {
        error.removeChild(error.firstChild);
    }
}
