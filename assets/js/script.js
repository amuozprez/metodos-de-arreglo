document.addEventListener("DOMContentLoaded", function() {
    const inputTareas = document.getElementById("input-tareas");
    const addBtnTareas = document.getElementById("addBtnTareas");
    const listaTareas = document.getElementById("lista-tareas");
    const totalTareas = document.getElementById("totalTareas");
    const tareasCompletas = document.getElementById("tareasCompletas");

    let tareas = [
        { id: 1, description: "Pasear al perro", completed: false },
        { id: 2, description: "Estudiar", completed: false },
        { id: 3, description: "Compras supermercado", completed: false }
    ];

    // Render inicial tareas
    renderTareas();

    // Evento agregar tareas
    addBtnTareas.addEventListener("click", function() {
        if (inputTareas.value.trim() !== "") {
            const nuevaTarea = {
                id: tareas.length + 1,
                description: inputTareas.value.trim(),
                completed: false
            };
            tareas.push(nuevaTarea);
            renderTareas();
            inputTareas.value = "";
        }
    });

    // Evento eliminar tareas
    listaTareas.addEventListener("click", function(e) {
        if (e.target.classList.contains("borrarBtn")) {
            const tareasId = parseInt(e.target.closest("tr").getAttribute("data-id"));
            tareas = tareas.filter(tarea => tarea.id !== tareasId);
            renderTareas();
        }
    });

    // Evento cambiar checkbox
    listaTareas.addEventListener("change", function(e) {
        if (e.target.type === "checkbox") {
            const tareasId = parseInt(e.target.closest("tr").getAttribute("data-id"));
            tareas.forEach(tarea => {
                if (tarea.id === tareasId) {
                    tarea.completed = e.target.checked;
                }
            });
            renderTareas();
        }
    });

    // Render tareas
    function renderTareas() {
        listaTareas.innerHTML = "";
        let recuentoCompletado = 0;
        tareas.forEach(tarea => {
            const tr = document.createElement("tr");
            tr.setAttribute("data-id", tarea.id);
            tr.innerHTML = `
                <td>${tarea.id}</td>
                <td>${tarea.description}</td>
                <td><input type="checkbox" ${tarea.completed ? "checked" : ""}></td>
                <td><button class="borrarBtn">Eliminar</button></td>
            `;
            listaTareas.appendChild(tr);
            if (tarea.completed) {
                recuentoCompletado++;
            }
        });
        totalTareas.textContent = tareas.length;
        tareasCompletas.textContent = recuentoCompletado;
    }
});