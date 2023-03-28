const input = document.querySelector("#input");
const btnAdd = document.querySelector(".btnAdd");
const todoList = document.querySelector(".todoList");
const arrOfTasks = [];

btnAdd.addEventListener("click", renderTasks);
document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        renderTasks();
    }
});

function renderTasks() {
    const value = input.value;
    if (/^.+$/.test(value)) {
        arrOfTasks.push(value);
        input.value = "";

        const result = arrOfTasks.map((el, i) => {
            return `<li data-id="${i + 1}.">${el}</li>`;
        });

        todoList.innerHTML = result.join("");
    }
}
