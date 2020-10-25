
$(document).ready(function () {
    $('select').material_select();
});


document.querySelector('#submit').addEventListener("click", (e) => {
    e.preventDefault();
    toastr.remove()
    const persoana = {
       
        nume: document.querySelector('#nume').value,
        prenume: document.querySelector('#prenume').value,
        telefon: document.querySelector('#telefon').value,
        email: document.querySelector('#email').value,
        facultate: document.querySelector('#facultate').value,
        an: document.querySelector('#an').value,
        facebook: document.querySelector('#facebook').value,
        specializare: document.querySelector('#specializare').value,
    //    cv: document.querySelector('#cv').value,
        more: document.querySelector('#more').value,
        regulament: document.querySelector('#regulament').checked,
        gdpr: document.querySelector('#GDPR').checked
    }

        axios.post('Inscriere', persoana)
                .then((response) => {
                    let form = document.getElementById("form");
                    let congrat = document.getElementById("congrats");
                    form.style.display = "none";
                    congrats.style.display = "inherit";
                })
                .catch((error) => {
                    const values = Object.values(error.response.data)
                    values.map(item => {
                        toastr.error(item)
                    })
                })
        

}, false)