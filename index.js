let fieldSetsCount = 1;
let fieldSetElements = [document.getElementsByTagName("fieldset")[0]];
let div = document.getElementsByClassName("fieldsets")[0];

function createFieldSet() {
    let fieldSetElement = document.createElement("fieldset");
    fieldSetElement.setAttribute("class", "beverage");
    fieldSetElement.innerHTML = fieldSetElements[0].innerHTML;
    for (let input of fieldSetElement.getElementsByTagName("input")) {
        if (input.getAttribute("type") === "radio") {
            input.setAttribute("name", `milk${fieldSetsCount + 1}`);
        }
    }
    let id = fieldSetsCount++;
    fieldSetElement.getElementsByClassName("close-button")[0].addEventListener("click", () => deleteFieldSet(fieldSetElement));
    fieldSetElement.getElementsByTagName("h4")[0].innerText = `Напиток №${id + 1}`;
    fieldSetElements.push(fieldSetElement);
    div.appendChild(fieldSetElement);
}

function deleteFieldSet(element) {
    if (fieldSetsCount === 1) {
        return;
    }
    let index = Number(element.getElementsByTagName("h4")[0].innerText.split(' ')[1].slice(1)) - 1;
    div.removeChild(fieldSetElements[index]);
    fieldSetElements[index].remove();
    for (let i = index; i < fieldSetElements.length - 1; i++) {
        fieldSetElements[i] = fieldSetElements[i + 1];
    }
    for (let i = index; i < fieldSetElements.length - 1; i++) {
        fieldSetElements[i].getElementsByTagName("h4")[0].innerHTML = `Напиток №${i + 1}`;
    }
    fieldSetElements.pop();
    fieldSetsCount--;
}

document.getElementsByClassName("add-button")[0].addEventListener("click", () => createFieldSet());

function getPadezh(i) {
    let mod = i % 100;
    if (mod % 10 >= 5 || mod % 10 === 0 || [11, 12, 13, 14].includes(mod)) {
        return "напитков";
    }
    else if (mod % 10 > 1 && mod % 10 <= 4) {
        return "напитка";
    }
    return "напиток";
}

const showModalButton = document.getElementById('showModal');
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const modalParagraph = modal.querySelector("p");

showModalButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "block";
    const padezh = getPadezh(fieldSetsCount);
    modalParagraph.textContent = `Заказ принят! Вы заказали ${fieldSetsCount} ${padezh}.`;

    document.getElementsByClassName("modal")[0].style.setProperty("display", "flex");
    let tbody = document.getElementsByClassName("modal")[0].getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    const translateToRussian = {"usual": "обычное", "no-fat": "обезжиренное", "soy": "соевое", "coconut": "кокосовое"};
    for (let fieldset of fieldSetElements) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = fieldset.getElementsByTagName("select")[0].selectedOptions[0].textContent;
        let td2 = document.createElement("td");
        fieldset.querySelectorAll('input[type="radio"]').forEach((x) => {
            if (x.checked) {
                td2.innerText = translateToRussian[x.value];
            }
        });
        let td3 = document.createElement("td");
        fieldset.querySelectorAll('input[type="checkbox"]').forEach((x) => {
            if (x.checked) {
                if (td3.innerText.length !== 0) {
                    td3.innerText += ", ";
                }
                td3.innerText += x.parentElement.querySelector('span').textContent;
            }
        });

        let td4 = document.createElement("td");
        td4.innerText = fieldset.getElementsByClassName("comment")[0].textContent;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
    }
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
}); 

