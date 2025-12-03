import { get } from './funciones.js'

//cards(array) toda la estructura de las tarjetas que creas individualmente abajo
//card(objeto) solo una tarjeta que recibe un objeto me devuelve un DOM
// 'https://futuramaapi.com/api/characters?orderBy=id&orderByDirection=asc&page=1&size=50'

function estiloPadre(padre) {
    padre.style.display = "flex";
    padre.style.flexWrap = "wrap";
    padre.style.gap = "20px";
    padre.style.padding = "20px";
    padre.style.width = '1300px';
    padre.style.margin = '0px auto';

    padre.innerHTML = '';
}

function estilos(div, parrafo, imagen) {
    div.style.border = "1px solid black";
    div.style.borderRadius = "10px";
    div.style.width = "200px";
    div.style.padding = "15px";
    div.style.backgroundColor = "#f9f9f9";


    parrafo.style.whiteSpace = "pre-line";
    parrafo.style.fontSize = "1.1em";

    imagen.style.width = '200px';
    imagen.style.height = 'auto';

}

function estiloContenedorDetalles(contenedor) {
    contenedor.style.position = 'fixed';
    contenedor.style.right = '0';
    contenedor.style.top = '0';
    contenedor.style.width = '400px';
    contenedor.style.height = '100%';
    contenedor.style.zIndex = '1000';
    contenedor.style.backgroundColor = '#f4f4f4';
    contenedor.style.borderLeft = '1px solid #ccc';
    contenedor.style.boxShadow = '-4px 0 8px rgba(0, 0, 0, 0.1)';
    contenedor.style.overflowY = 'auto';
    contenedor.style.display = 'block';

    contenedor.innerHTML = '';
}

function FormateaCerrar(cerrar) {
    cerrar.textContent = 'X';
    cerrar.style.float = 'right';
    cerrar.style.cursor = 'pointer';
    cerrar.style.border = 'none';
    cerrar.style.backgroundColor = 'transparent';
}


// ----------------------------------------------------------


function datos(url) {
    get(url).then(datos => cards(datos))
}


function cards(array) {
    let personajes = new Array;
    personajes = array.items;
    const padre = document.getElementById('container');
    estiloPadre(padre);
    for (let i = 0; i < personajes.length; i++) {
        let div = card(personajes[i]);
        padre.appendChild(div);
    }

}

function card(objeto) {
    let div = document.createElement('div');
    let parrafo = document.createElement('p');


    parrafo.textContent = `Id: ${objeto.id}\nNombre: ${objeto.name}\nGénero: ${objeto.gender}`;

    let imagen = document.createElement('img');
    if (objeto.image) {
        imagen.src = objeto.image;
    } else {
        imagen.alt = 'No hay imagen';
    }


    estilos(div, parrafo, imagen);
    div.addEventListener('click', () => {
        mostrarDetallePersonaje(objeto);
    });

    div.appendChild(imagen);
    div.appendChild(parrafo);
    return div
}



function mostrarDetallePersonaje(objeto) {
    const contenedor = document.getElementById("detallePersonajes");
    estiloContenedorDetalles(contenedor);

    const personajes = document.getElementById("container");
    personajes.style.width = '1000px';
    personajes.style.margin = '0px';

    const div = document.createElement('div');
    div.style.padding = "20px";

    // const botonCerrar = document.createElement('button');
    // FormateaCerrar(botonCerrar);


    // botonCerrar.addEventListener('click', cerrarDetalle);

    div.innerHTML = `
        <h2>${objeto.name}</h2>
        <img src="${objeto.image}" alt="No tiene imagen" style="max-width: 350px; max-height: 400px; display: block; margin-bottom: 10px;">
        <p><strong>ID:</strong> ${objeto.id}</p>
        <p><strong>Género:</strong> ${objeto.gender}</p>
        <p><strong>Estado:</strong> ${objeto.status}</p>
        <p><strong>Espacie:</strong> ${objeto.species}</p>
    `;

    // div.insertBefore(botonCerrar, div.firstChild);

    contenedor.appendChild(div);
}




function main() {
    console.log('Ejercicio clase 02/12/2025')
    datos('https://futuramaapi.com/api/characters?orderBy=id&orderByDirection=asc&page=1&size=50');
}


document.addEventListener('DOMContentLoaded', main)