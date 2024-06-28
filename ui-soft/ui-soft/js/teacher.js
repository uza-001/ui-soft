const open = document.querySelector(".open")
const tbody = document.querySelector(".tbody")
const course = document.querySelector(".course")
const add = document.querySelector('.add-teacher')
const name = document.querySelector('.name')
const img = document.querySelector('.img')
const phone = document.querySelector('.phone')
const close = document.querySelector(".btn-close");
let editId = null;
window.addEventListener("load", () => {
    getAllTeacher();
    getAllCourse()
})



function getAllTeacher() {
    fetch("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            innerTeacher(data)
        })
        .catch(error => console.log(error))
}

function innerTeacher(data) {
    tbody.innerHTML = ""
    data.forEach(element => {
        tbody.innerHTML += `
        <tr> 
        <td> <img src="${element.img}" width="30px" height="30px"> </td>
        <td>${element.name}</td>
        <td><img src="${element.course?.name ? element.course?.img : "..."}"  width="30px" height="30px"></td>
        <td>${element.phone}</td>
        <td>
        <div class="action-btns">
        <span class="remove-icon" onclick="removeTeacher(${element.id})"><i class="bi bi-trash3"></i></span>
        <span class="edit-icon" onclick="getId(${element.id})"><i class="bi bi-pen"></i></span>
        </div>
        </td> 
        </tr>`
    });
}


function removeTeacher(id) {
    fetch(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => {
            successMessage()
            getAllTeacher()
        })
        .catch(error => console.log(error))
}



const getAllCourse = () => {
    fetch("https://65af84f32f26c3f2139b0190.mockapi.io/courses", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            data.forEach((item) => {
                course.innerHTML += ` <option value='${JSON.stringify(item)}' >${item.name}</option `
            })
        })
        .catch(error => console.log(error))
}

add.addEventListener('submit', (e) => {
    e.preventDefault()
    let newTeacher = {
        "name": name.value,
        "course": JSON.parse(course.value),
        "img": img.value,
        "phone": phone.value,
    }

    if (!editId) {
        fetch("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher", {
            method: "POST",
            body: JSON.stringify(newTeacher),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            getAllTeacher();
            e.target.reset()
            close.click()
        })
        return;
    }
    
    fetch(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher/${editId}`, {
        method: "PUT",
        body: JSON.stringify(newTeacher),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => {
        getAllTeacher();
        e.target.reset()
        close.click();
        editId = null;
        
    })


})



function getId(id) {
    fetch(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            editId = data.id
            open.click()
            name.value = data.name;
            img.value = data.img;
            phone.value = data.phone;
            course.value = JSON.stringify(data.course)

        })
        .catch(error => console.log(error))
}