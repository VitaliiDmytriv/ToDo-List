const input = document.querySelector("#input");
const btnAdd = document.querySelector(".btnAdd");
const todoList = document.querySelector(".todoList");

const data = JSON.parse(window.localStorage.getItem("arrOfTasks"));
// Перевіряє чи було щось в localStorage, якщо було, то записує у масив, якщо ні то створює масив
const arrOfTasks = data === null ? [] : data;

// Рендерить таски якщо були в localStorage
renderTasks();

// Зберігає масив в LocalStorage
function saveInStorage(arr, name) {
    window.localStorage.setItem(name, JSON.stringify(arr));
}

// Отримує значення з input
function getValueFromInput() {
    const value = input.value;

    // Якщо поле в інпуті не пусте то =>
    if (/^.+$/.test(value)) {
        arrOfTasks.push(value);

        // Оновлюємо localStorage
        saveInStorage(arrOfTasks, "arrOfTasks");

        // очищає інпут від попереднього тексту
        input.value = "";

        renderTasks();
    }
}

function renderTasks() {
    // Проходить методом map по масиві тасків і записує їх у тегах li
    const result = arrOfTasks.map((el, i) => {
        return `<li 
                    data-id="${i + 1}."
                >
                    <span class="check"></span>
                    ${el}
                    <button class = 'btnDelete'>
                        <i class="fa-solid fa-x"></i>
                    </button>
                </li>`;
    });

    // ul лист встановлює html розмітку дочірніх елементів
    todoList.innerHTML = result.join("");
}

// Додає таск
btnAdd.addEventListener("click", getValueFromInput);

// Додає таск нажиманням на enter
document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        getValueFromInput();
    }
});

// Видаляє таск
todoList.addEventListener("click", (event) => {
    const { target } = event;

    if (target.tagName === "BUTTON" || target.tagName === "I") {
        // Отримує id  li елементу яке клікнули
        const id = parseInt(target.parentElement.getAttribute("data-id"));
        // Видаляє з масиву цей елемент за допомого id
        arrOfTasks.splice(id - 1, 1);

        // Оновлює дані в localStorage після видалення
        saveInStorage(arrOfTasks, "arrOfTasks");
        // Заново рендерить таски
        renderTasks();
    }
});
