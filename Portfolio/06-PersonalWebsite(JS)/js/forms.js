// Objeto plantilla "formulario" con propiedades iniciales vacías
var formulario = {
    date: "",
    start: "",
    end: "",
    description: "",
    place: "",
    type: "",
    notes: "",
    disponibilidad: ""
};

// Arreglo vacío para almacenar los horarios que se agregarán
var horarios = [];

// Ejecutar el código solo cuando el documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    
    // Obtener referencia al botón de agregar horario
    const subir = document.getElementById("subirHorario");
    
    // Obtener referencia a la tabla donde se mostrarán los horarios
    const tablaHorario = document.getElementById("horario");

    // Escuchar el evento de clic en el botón "subirHorario"
    subir.addEventListener("click", function () {
        // Capturar los valores de cada campo del formulario
        const fecha = document.getElementById("date").value;
        const inicio = document.getElementById("time-start").value;
        const final = document.getElementById("time-end").value;
        const descripcion = document.getElementById("activity").value;
        const lugar = document.getElementById("type").value;
        const tipo = document.getElementById("notes").value;
        const notas = document.getElementById("flag").value;
        const dispo = document.getElementById("free-busy").value;

        // Crear una copia del objeto "formulario" para no modificar la plantilla
        var horario = { ...formulario };

        // Asignar los valores capturados del formulario a las propiedades del nuevo horario
        horario.date = fecha;
        horario.start = inicio;
        horario.end = final;
        horario.description = descripcion;
        horario.place = lugar;
        horario.type = tipo;
        horario.notes = notas;
        horario.disponibilidad = dispo;

        // Agregar el nuevo horario al arreglo "horarios"
        horarios.push(horario);

        // Llamar a la función para agregar la nueva fila del horario a la tabla en la interfaz
        agregarFilaATabla(horario);

        // Limpiar el formulario después de agregar el horario (opcional)
        document.getElementById("formato").reset();
    });

    // Función que agrega una nueva fila a la tabla con los datos del horario
    function agregarFilaATabla(horario) {
        const nuevaFila = document.createElement("tr");
        // Crear variables para la imagen y el texto alternativo del estado
        var imagenEstado = "";
        var altTexto = "";
        // Usar un if para verificar el estado de disponibilidad
        if (horario.disponibilidad === "free") {
            imagenEstado = "./img/free.png";
            altTexto = "Free icon";
        } else {
            imagenEstado = "./img/busy.png";
            altTexto = "Busy icon";
        }
        // Crear las celdas de la nueva fila
        nuevaFila.innerHTML = `
            <td>${horario.date}</td>
            <td>${horario.start}</td>
            <td>${horario.end}</td>
            <td>${horario.description}</td>
            <td>${horario.place}</td>
            <td>${horario.type}</td>
            <td>${horario.notes}</td>
            <td><img src="${imagenEstado}" alt="${altTexto}"></td>
        `;
        tablaHorario.appendChild(nuevaFila);
    }    
});
