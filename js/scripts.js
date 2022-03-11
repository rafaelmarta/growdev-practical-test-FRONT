window.addEventListener('load', () => {
    showComment();
});

const scrollUp = document.getElementById('scroll-up');
scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
});

const url = "https://growdev-trainee-back.herokuapp.com"

function addNewComment() {
    const getName = document.getElementById("name").value;
    const getComment = document.getElementById("comment-area").value;
    const divAlert = document.getElementById("alert");
    let alert;

    if(getName.length === 0 || getComment.length === 0){
        alert = `<div class="alert alert-primary alert-dismissible fade show" role="alert" >
        Por favor, certifique de que os campos foram preenchidos.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      divAlert.innerHTML = alert;
    } else {
       axios.post(url + '/comment', {
           name: getName,
           comment: getComment
       }).then((response) => {
           showComment();
       }).catch((error) =>{
           console.error(error);
       })
    }
}

function showComment() {
    const listOfComments = document.getElementById("comments-list");
    let content = `<div class="comment-section">`;
    axios.get(url + '/comments').then((response) => {
        console.log(response.data);
        for (const value of response.data){
        content += `
        <span class="comment-name">${value.name}</span>
    <p class="comment-text mx-auto">${value.comment}</p>
        `
    }
    content += `</div>`
    listOfComments.innerHTML = content;
    }).catch((error) => {
        console.error(error);
    })
}

// MODAL
function sendContactInformation() {
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;
    const modalAlert = document.getElementById('alert-modal');
    let alert;

    if(!name || !phone || !email){
        alert = `<div class="alert alert-primary alert-dismissible fade show" role="alert" >
        Por favor, certifique de que os campos foram preenchidos.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalAlert.innerHTML = alert;
    } else if(name.trim().length < 3){
        alert = `<div class="alert alert-primary alert-dismissible fade show" role="alert" >
        Campo nome deve conter ao menos 3 caracteres.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalAlert.innerHTML = alert;
    } else if(phone.length != 11){
        alert = `<div class="alert alert-primary alert-dismissible fade show" role="alert" >
        Campo telefone deve conter 11 caracteres (ddd+numero)
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalAlert.innerHTML = alert;
    } else {
        alert = `<div class="alert alert-primary alert-dismissible fade show" role="alert" >
        Suas informações foram recebidas e logo entrarei em contato!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalAlert.innerHTML = alert;
    }
}