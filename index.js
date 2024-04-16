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
