const close = document.querySelector(".btn-close");
const row = document.querySelector(".course-row");
const add = document.querySelector(".add-course");
const img = document.querySelector(".img");
const name = document.querySelector(".name");
const price = document.querySelector(".price");
const duration = document.querySelector(".duration");
const description = document.querySelector(".description");
let editDataId = null

window.addEventListener("load", () => {
    getAllCourse();
    controlModalBtn()

})

const getAllCourse = () => {
    fetch("https://65af84f32f26c3f2139b0190.mockapi.io/courses", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => innerCourseFunction(data))
        .catch(error => console.log(error))
}


function innerCourseFunction(data) {
    row.innerHTML = ""
    if (data.length > 0) {

        data.forEach(element => {
            row.innerHTML += `<div class="main-card">
        <div class="main-card-img">
          <img src="${element.img}" alt="" />
          <button class="card-btn">
            <i
              class="bi bi-three-dots-vertical"
              class="main-card-img"
            ></i>
            <div class="card-btn-hover-buttons">
              <i class="bi bi-pencil-fill" style="color: blue"  data-bs-toggle="modal"
              data-bs-target="#exampleModal" onclick="getCourseId(${element.id})"></i>
              <i onclick="removeCourse(${element.id})" class="bi bi-trash3-fill" style="color: red"></i>
            </div>
          </button>
        </div>
        <h2 class="main-card-title">${element.name}</h2>
        <p>Duration:<span class="tekis-color"> ${element.duration} Month</span></p>
        <p class="main-card-title-tekis">
          Price:<span class="tekis-coolr2"> ${element.price}UZS/Month</span>
        </p>
        <hr class="line" />
        <p>${element.description}</p>
      </div>`
        });
    }
    else {
        row.innerHTML = "<h1 style='text-align:center ;width:100%'>No Data</h1>"
    }
}


const getCourseId = (id) => {
    fetch(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            editDataId = data.id
            controlModalBtn()
            name.value = data.name;
            img.value = data.img;
            price.value = data.price;
            description.value = data.description;
            duration.value = data.duration
        })
        .catch(error => console.log(error))
}

function removeCourse(id) {
    fetch(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            successMessage()
            getAllCourse()
        })
        .catch(error => console.log(error))
}


add.addEventListener("submit", (e) => {
    e.preventDefault()
    let newCourse = {
        "name": name.value,
        "duration": duration.value,
        "description": description.value,
        "img": img.value,
        "price": price.value,
    }

    if (!editDataId) {
        fetch("https://65af84f32f26c3f2139b0190.mockapi.io/courses", {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json()
                .then(res => {
                    getAllCourse();
                    close.click();
                }
                )
            )
    }

    else {
        fetch(`https://65af84f32f26c3f2139b0190.mockapi.io/courses/${editDataId}`, {
            method: "PUT",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json()
                .then(res => {
                    getAllCourse();
                    editDataId = null;
                    successMessage("Course edited");
                    close.click();
                    controlModalBtn()
                })
            )
    }
    e.target.reset()

})


function controlModalBtn() {
    btn = document.querySelector(".add-course button")
    if (editDataId) {
        btn.innerHTML = "Update"
    }
    else {
        btn.innerHTML = "Save"
    }
}