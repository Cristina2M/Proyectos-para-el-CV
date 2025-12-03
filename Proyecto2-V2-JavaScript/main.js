window.onload = function () {
    var tablero = document.getElementById('tablero');
    var mensaje = document.getElementById('mensaje');
    var estado = [];
    var tamano = 4;
    var tamanoCasilla = 100; // px

    // Inicializar estado resuelto
    for (var i = 1; i < 16; i++) {
        estado.push(i);
    }
    estado.push(0); // 0 representa el hueco

    // Función para renderizar el tablero
    function renderizar() {
        tablero.innerHTML = '';
        for (var i = 0; i < estado.length; i++) {
            var casilla = document.createElement('div');
            casilla.className = 'casilla';

            if (estado[i] === 0) {
                casilla.className += ' vacia';
            } else {
                // Calcular posición del background basada en el VALOR de la casilla (su posición original)
                // El valor va de 1 a 15. Restamos 1 para tener índice 0-14.
                var valorIndex = estado[i] - 1;
                var posX = (valorIndex % tamano) * tamanoCasilla;
                var posY = Math.floor(valorIndex / tamano) * tamanoCasilla;

                // background-position es negativo para mover la imagen
                casilla.style.backgroundPosition = '-' + posX + 'px -' + posY + 'px';

                // Añadir evento click
                (function (index) {
                    casilla.onclick = function () {
                        intentarMover(index);
                    };
                })(i);
            }
            tablero.appendChild(casilla);
        }
    }

    // Función para mezclar
    function mezclar() {
        var movimientos = 1000;
        var hueco = 15;

        for (var i = 0; i < movimientos; i++) {
            var vecinos = obtenerVecinos(hueco);
            var aleatorio = vecinos[Math.floor(Math.random() * vecinos.length)];
            intercambiar(hueco, aleatorio);
            hueco = aleatorio;
        }
        renderizar();
        mensaje.textContent = '';
    }

    function obtenerVecinos(index) {
        var vecinos = [];
        var fila = Math.floor(index / tamano);
        var col = index % tamano;

        if (fila > 0) vecinos.push(index - tamano);
        if (fila < tamano - 1) vecinos.push(index + tamano);
        if (col > 0) vecinos.push(index - 1);
        if (col < tamano - 1) vecinos.push(index + 1);

        return vecinos;
    }

    function intentarMover(index) {
        var hueco = estado.indexOf(0);
        if (esAdyacente(index, hueco)) {
            intercambiar(index, hueco);
            renderizar();
            verificarVictoria();
        }
    }

    function esAdyacente(i1, i2) {
        var f1 = Math.floor(i1 / tamano);
        var c1 = i1 % tamano;
        var f2 = Math.floor(i2 / tamano);
        var c2 = i2 % tamano;

        return (Math.abs(f1 - f2) + Math.abs(c1 - c2)) === 1;
    }

    function intercambiar(i1, i2) {
        var temp = estado[i1];
        estado[i1] = estado[i2];
        estado[i2] = temp;
    }

    function verificarVictoria() {
        for (var i = 0; i < estado.length - 1; i++) {
            if (estado[i] !== i + 1) {
                return;
            }
        }
        mensaje.textContent = '¡Felicidades! Has completado la imagen.';
    }

    // Iniciar juego
    mezclar();
};
