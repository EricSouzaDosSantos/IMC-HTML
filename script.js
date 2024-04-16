
const GetValues = (event) => {
    event.preventDefault()

    const name = document.getElementById('name').value
    const height = document.getElementById('height').value
    const weight = document.getElementById('weight').value
    const age = document.getElementById('age').value
    const dataUser = {
        name: name,
        height: height,
        weight: weight,
        age: age
    }

    return dataUser;

}

const CalculatorBMI = (event) => {

    const BMI = weight / (height ** 2)


    return BMI

}

const ClassificationBMI = (BMI) => {

    switch (BMI) {
        case BMI < 18.5:

            return " you are underweight"

            break;

        case BMI >= 18.5 && BMI <= 24.9:

            return " your weight is normal"

            break;

        case BMI >= 25.0 && BMI <= 29.9:

            return " you are overweight"

            break;

        case BMI >= 30.0 && BMI <= 34.9:

            return " you have grade 1 obesity"

            break;


        case BMI >= 35.0 && BMI <= 39.9:

            return " you have grade 2 obesity"

            break;

        case BMI >= 40.0:

            return " you have grade 3 obesity"

            break;

        default:

            return "erro ao calcular resposta"

            break;

    }

}

const OrganizeData = (dataUser, CalculatorBMI, ClassificationBMI) => {

    const currentDateTime = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());
    const dataUsersComplet = {

        ...dataUser,
        imc: CalculatorBMI.toFixed(2),
        classificationBMIUsers: ClassificationBMI,
        Date: currentDateTime
    }



    return dataUsersComplet

}

const RegisterUser = (users) => {

    let listUsers = []

    if (localStorage.getItem("UsersRegisted")) {
        listUsers = JSON.parse(localStorage.getItem("UsersRegisted"))
    }

    listUsers.push(users)

    localStorage.setItem("UsersRegisted", JSON.stringify(listUsers))

}

const LoadUser = () => {

    let listUsers = []

    if (localStorage.getItem("UsersRegisted")) {
        listUsers = JSON.push(localStorage.getItem("UsersRegisted"))
    }

    if (listUsers.length == 0) {
        let table = document.getElementById('table-body');
        table.innerHTML = `<tr>
        <td colspan="7" class="row-message"> no registered users </td>
        </tr>`
    }else{
        BuildTable(listUsers)
    }

}

window.addEventListener('DOMContentLoaded', () => LoadUser())