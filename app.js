const input = document.querySelector("#input");
const btnAdd = document.querySelector(".btnAdd");
const todoList = document.querySelector(".todoList");
const checkBox = document.querySelector(".check");

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
        // Створюємо об'єкт
        const obj = {
            value,
            isChecked: false,
        };

        arrOfTasks.push(obj);

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
        return `<li class = '${el.isChecked ? "active" : ""} '
                    data-id="${i}"
                >
                    <span class="check"></span>
                    ${el.value}
                    <button data-id = '${i}' class = 'btnDelete'>
                        <i class="fa-solid fa-xmark"></i>
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
        const id = target.parentElement.getAttribute("data-id");

        // Видаляє з масиву цей елемент за допомого id
        arrOfTasks.splice(id, 1);

        // Оновлює дані в localStorage після видалення
        saveInStorage(arrOfTasks, "arrOfTasks");

        // Заново рендерить таски
        renderTasks();
    } else if (target.className === "check") {
        // Отримуємо li в якому було натиснуто на check
        const parent = target.parentElement;

        // Отримуємо id цього li
        const id = parent.getAttribute("data-id");

        // Змінюємо значення isCheck на протилежне і збрерігаємо його у localStorage
        arrOfTasks[id].isChecked = !arrOfTasks[id].isChecked;
        saveInStorage(arrOfTasks, "arrOfTasks");

        // Додаємо toggle класу
        parent.classList.toggle("active");
    }
});
