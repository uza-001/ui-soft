const tbody = document.querySelector("tbody")
const teacher = document.querySelector(".teacher-select");
const course = document.querySelector(".course");
const add = document.querySelector(".add-group");
const name = document.querySelector('.name')
const date = document.querySelector('.date')
const close  =document.querySelector(".btn-close")


window.addEventListener("load", () => {
    getAllGroup();
    getAllTeacher()
})

function getAllGroup() {
    fetch("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            innerGroup(data)
        })
        .catch(error => console.log(error))
}

function innerGroup(data) {
    tbody.innerHTML = ""

    if (data.length > 0) {
        data.forEach(element => {
            tbody.innerHTML += `
            <tr>
            <td>${element.name}</td>
            <td><img src="${element.course.img}" width="30px" /></td>
            <td>${element.teacher.name}</td>
            <td>${element.course.duration}</td>
            <td>
              <div class="action-btns">
              <span class="show-more-icon" ><i class="bi bi-info-circle-fill"></i> </span>
              <span class="remove-icon" onclick="removeGroup(${element.id})"><i class="bi bi-trash3"></i></span>
              <span class="edit-icon"><i class="bi bi-pen"></i></span></div>
            </td>
          </tr>
            `
        });
    }
    else {
        tbody.innerHTML += "<tr><td colspan='5'>No data</td></tr>"
    }
}


function removeGroup(id) {
    fetch(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => getAllGroup())
        .catch(error => console.log(error))
}



function getAllTeacher() {
    fetch("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(item =>
                teacher.innerHTML += `<option value='${JSON.stringify(item)}' >${item.name}</option>`
            )
        })
        .catch(error => console.log(error))
}

teacher.addEventListener("change", (e) => {
    console.log(e.target)
    let d = JSON.parse(e.target.value)
    console.log(d)
    course.value = d.course.name
})

add.addEventListener("submit", (e) => {
    e.preventDefault()
    let model = {
        "name": name.value,
        "teacher": JSON.parse(teacher.value),
        "start_date": date.value,
        "students": [],
        "course": JSON.parse(teacher.value).course,
    }

    fetch('https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group', {
        method: "POST",
        body: JSON.stringify(model),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(() => {
            getAllGroup()
            close.click()
        })
        .catch(error => console.log(error))
}
)