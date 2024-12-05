const form = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemUl = document.getElementById("itemUl");
const itemList = document.querySelectorAll('li');
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");
const filterField = document.getElementById('filter');
const itemQuantity = document.getElementById('itemQuantity');

// function to check the <li> length and print quantity to H1
function checkLiQty() {

  let liElements = itemUl.getElementsByTagName('li');

  let liCount = liElements.length;

  itemQuantity.innerText = liCount;
}

// add item to the <ul></ul>
function addItem(e) {
  e.preventDefault();

  // get the item entered
  const item = itemInput.value;

  const li = document.createElement("li");
  li.innerText = item;

  if (validateInput(item)) {
    // create the icon
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";

    const button = document.createElement("button");
    button.appendChild(icon);
    button.className = "remove-item btn-link text-red";

    li.appendChild(button);

    itemUl.appendChild(li);
    tweakUI();

    document.getElementById("item-input").value = "";
  } else {
    alert("Input field is empty");
  }

  checkLiQty();

}

function deleteAllLi() {
  const allLi = document.querySelectorAll("li");

  allLi.forEach((li) => {
    li.remove();
  });

  tweakUI();
  checkLiQty();
}

// function to validate if the input is emtpy or not
function validateInput(text) {
  if (text != "") {
    return true;
  } else {
    return false;
  }
}


checkLiQty();


// function to delete individual <li></li>
function deleteLi(e) {
  if (e.target.classList.contains("fa-xmark")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  tweakUI();
  checkLiQty();
}

function tweakUI() {
  const allLiItems = document.querySelectorAll("li");
  if (allLiItems.length == 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
}

tweakUI();

// add click removal but through delegation, targeting the <ul></ul>
itemUl.addEventListener("click", deleteLi);

// add click to the clear all btn
clearBtn.addEventListener("click", deleteAllLi);

// add submit event listener to the form
form.addEventListener("submit", addItem);
