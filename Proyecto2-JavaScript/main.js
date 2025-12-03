window.onload = function () {
    var tablero = document.getElementById('tablero');
    var mensaje = document.getElementById('mensaje');
    var estado = [];
    var tamano = 4;

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
                casilla.textContent = estado[i];
                // Añadir evento click solo a las casillas no vacías
                (function (index) {
                    casilla.onclick = function () {
                        intentarMover(index);
                    };
                })(i);
            }
            tablero.appendChild(casilla);
        }
    }

    // Función para mezclar haciendo movimientos válidos aleatorios
    // Esto garantiza que el puzzle siempre tenga solución
    function mezclar() {
        var movimientos = 1000; // Número de movimientos aleatorios
        var hueco = 15; // Posición inicial del hueco (última posición)

        for (var i = 0; i < movimientos; i++) {
            var vecinos = obtenerVecinos(hueco);
            var aleatorio = vecinos[Math.floor(Math.random() * vecinos.length)];
            intercambiar(hueco, aleatorio);
            hueco = aleatorio;
        }
        renderizar();
        mensaje.textContent = '';
    }

    // Obtener índices vecinos válidos (arriba, abajo, izquierda, derecha)
    function obtenerVecinos(index) {
        var vecinos = [];
        var fila = Math.floor(index / tamano);
        var col = index % tamano;

        if (fila > 0) vecinos.push(index - tamano); // Arriba
        if (fila < tamano - 1) vecinos.push(index + tamano); // Abajo
        if (col > 0) vecinos.push(index - 1); // Izquierda
        if (col < tamano - 1) vecinos.push(index + 1); // Derecha

        return vecinos;
    }

    // Intentar mover una casilla
    function intentarMover(index) {
        var hueco = estado.indexOf(0);
        if (esAdyacente(index, hueco)) {
            intercambiar(index, hueco);
            renderizar();
            verificarVictoria();
        }
    }

    // Verificar si dos índices son adyacentes
    function esAdyacente(i1, i2) {
        var f1 = Math.floor(i1 / tamano);
        var c1 = i1 % tamano;
        var f2 = Math.floor(i2 / tamano);
        var c2 = i2 % tamano;

        return (Math.abs(f1 - f2) + Math.abs(c1 - c2)) === 1;
    }

    // Intercambiar dos valores en el estado
    function intercambiar(i1, i2) {
        var temp = estado[i1];
        estado[i1] = estado[i2];
        estado[i2] = temp;
    }

    // Verificar si el juego está resuelto
    function verificarVictoria() {
        for (var i = 0; i < estado.length - 1; i++) {
            if (estado[i] !== i + 1) {
                return;
            }
        }
        mensaje.textContent = '¡Felicidades! Has resuelto el puzle.';
    }

    // Iniciar juego
    mezclar();
};
