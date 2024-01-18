const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

//addButton function
function addTask() {
    if (inputBox.value === '') {
        alert("Please type in your list")
    } else{

        let li = document.createElement("li")   //create a new html element
        li.innerHTML = inputBox.value
        listContainer.appendChild(li)       //Add items typed in the inputBox to the list

        let span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)
        saveData()
    }

    inputBox.value = ''  //empty the inputBox after the item is added
}

//an eventListener to make the Enter key click the search button
inputBox.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        addTask()
    }
})

//EventListener to activate the class "Checked"
//and to remove list item when "x" is clicked

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
        saveData()
    } 
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
        saveData()
    }
}, false)


//function to save updates on the page
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}


//function to retrive last saved data when the browser is opened
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data")
}

showTask()
