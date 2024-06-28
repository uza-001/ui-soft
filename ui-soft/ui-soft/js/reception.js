const tbody = document.querySelector(".tbody");
const courseSelect = document.querySelector(".course-select")
const add = document.querySelector(".reception-form-content")
const name = document.querySelector(".name")
const surname = document.querySelector(".surname")
const phone = document.querySelector(".phone")





window.addEventListener("load", () => {
    getAllReception();
    getAllCourse()

})


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
                courseSelect.innerHTML += ` <option value='${JSON.stringify(item)}' >${item.name}</option `
            })
        })
        .catch(error => console.log(error))
}

const getAllReception = () => {
    fetch("https://65af84f32f26c3f2139b0190.mockapi.io/reception", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => innerReceptionFunction(data))
        .catch(error => console.log(error))
}


function innerReceptionFunction(data) {
    tbody.innerHTML = ""
    if (data.length > 0) {

        data.forEach(element => {
            tbody.innerHTML += ` <tr>
            <td>${element.student_name}</td>
            <td>${element.student_surname}</td>
            <td>${element.student_phone}</td>
            <td
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
              "
            >
              <img
              src="${element.course.img}"
                alt=""
                width="40"
                height="40"
                style="object-fit: fill"
              />Python
            </td>
            <td>
              <div class="action-btns">
                <span class="remove-icon" onclick="removeCourse(${element.id})"
                  ><i class="bi bi-trash3"></i></span
                ><span class="edit-icon"
                  ><i class="bi bi-pen"></i
                ></span>
              </div>
            </td>
          </tr>`
        });
    }
    else {
        tbody.innerHTML = "<tr><td colspan='5'><h1 style='text-align:center ;width:100%'>No Data</h1></td></tr>"
    }
}



function removeCourse(id) {
    fetch(`https://65af84f32f26c3f2139b0190.mockapi.io/reception/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            successMessage()
            getAllReception()
        })
        .catch(error => console.log(error))
}



add.addEventListener("submit", (e) => {
    e.preventDefault()
    let newReception = {
        "student_surname": surname.value,
        "student_phone": phone.value,
        "student_name": name.value,
        "course": JSON.parse(courseSelect.value)

    }
    console.log(newReception);
})