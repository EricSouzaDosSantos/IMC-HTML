const CalcValues = (event) =>{

    event.preventDefault()

    let dataUser = GetValues() 

    let BMI = CalculatorBMI(dataUser.height, dataUser.weight)

    let classification = ClassificationBMI(BMI)

    let dataUsersComplet = OrganizeData(dataUser, BMI, classification)

    RegisterUser(dataUsersComplet)
    
    window.location.reload();
}

const GetValues = () => {

    const name = document.getElementById('name').value
    const height = Number(document.getElementById('height').value)
    const weight = Number(document.getElementById('weight').value)
    const age = Number(document.getElementById('age').value)
    const id = Math.floor(Math.random()*100)
    const dataUser = {
        name: name,
        height: height,
        weight: weight,
        age: age,
        id: id
    }

    return dataUser;

}

const CalculatorBMI = (height, weight) => {

    const BMI = parseFloat(weight / (height ** 2))


    return BMI

}

const ClassificationBMI = (BMI) => {

    if (BMI < 18.5) {

        return "you are underweight";

    } else if (BMI >= 18.5 && BMI <= 24.9) {

        return "your weight is normal";

    } else if (BMI >= 25.0 && BMI <= 29.9) {

        return "you are overweight";

    } else if (BMI >= 30.0 && BMI <= 34.9) {

        return "you have grade 1 obesity";

    } else if (BMI >= 35.0 && BMI <= 39.9) {

        return "you have grade 2 obesity";

    } else if (BMI >= 40.0) {

        return "you have grade 3 obesity";

    } else {

        return "erro ao calcular resposta";

    }
    
}

const OrganizeData = (dataUser, CalculatorBMI, ClassificationBMI) => {

    const currentDateTime = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());
    const dataUsersComplet = {

        ...dataUser,
        bmi: parseFloat(CalculatorBMI.toFixed(2)),
        classificationBMIUsers: ClassificationBMI,
        Date: currentDateTime
    }



    return dataUsersComplet

}

const RegisterUser = (users) => {

    let listUsers = []

    if (localStorage.getItem("UsersRegistered")) {
        listUsers = JSON.parse(localStorage.getItem("UsersRegistered"))
    }

    listUsers.push(users)

    localStorage.setItem("UsersRegistered", JSON.stringify(listUsers))

}

const LoadUser = () => {

    let listUsers = []

    if (localStorage.getItem("UsersRegistered")) {
        listUsers = JSON.parse(localStorage.getItem("UsersRegistered"))
    }

    if (listUsers.length == 0) {
        let table = document.getElementById('table-body');
        table.innerHTML = `<tr>
        <td colspan="7" class="row-message"> no registered users </td>
        </tr>`
    } else {
        BuildTable(listUsers)
    }

}


window.addEventListener('DOMContentLoaded', () => LoadUser())

const BuildTable = (listUsers) => {

    let table = document.getElementById('table-body');

    let template = "";

    listUsers.forEach(people => {

        template += `
        
        <tr>
            
            <td data-cell="name">
                ${people.name}
            </td>

            <td data-cell="height">
                ${people.height}
            </td>

            <td datae-cell="weight">
                ${people.weight}
            </td>

            <td data-cell="age">
                ${people.age}
            </td>

            <td data-cell="BMI">
                ${people.bmi}
            </td>

            <td data-cell="classification">
                ${people.classificationBMIUsers}
            </td>
        
            <td data-cell="registered-date">
                ${people.Date}
            </td>

            <td data-cell="button">
               <button class="button-table" onclick="DeleteUser(${people.Date})">Delete</button>
            </td>

            </tr>

        `

    });

    table.innerHTML = template

}

const DeleteUser = (id) => {
    let listUsers = JSON.parse(localStorage.getItem("userRegistration"))
    listUsers = listUsers.filter(user => user.id !== id)
    localStorage.setItem("userRegistration", JSON.stringify(listUsers))
    LoadUser()
}

const deleteRecord = () => {

    // localStorage.setItem("UsersRegistered")

    localStorage.clear()

    window.location.reload();

}
