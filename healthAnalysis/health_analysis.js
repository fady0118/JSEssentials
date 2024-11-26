// Defining variables
const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];
// add event listener to buttons
document.getElementById('addPatient').addEventListener('click', addPatient)
// function that adds the patient details
function addPatient() {
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById('age').value;
    const condition = document.getElementById('condition').value;
    if (name && gender && age && condition) {
        patients.push({ name, gender: gender.value, age, condition });
        resetForm();
        generateReport();
    }
}
// function to reset form values
function resetForm() {
    document.getElementById('name').value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById('age').value = "";
    document.getElementById("condition").value = "";
}
// function that generates the report
function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
    };
    for (const patient of patients) {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    }
    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
        report.innerHTML += `${condition}:${conditionsCount[condition]}<br>`;
    }
    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
        report.innerHTML += `${gender}<br>`
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `${condition}:${genderConditionsCount[gender][condition]}<br>`
        }
    }
}
function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('health_analysis.json')
        .then(response => response.json())
        .then(data => {
            const condition = data.conditions.find(item => item.name.toLowerCase() === input);

            if (condition) {
                const symptoms = condition.symptoms.join(', ');
                const prevention = condition.prevention.join(', ');
                const treatment = condition.treatment;

                resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;
                resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
                resultDiv.innerHTML = 'Condition not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
btnSearch.addEventListener('click', searchCondition);
document.getElementById('conditionInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchCondition();
    }
})
// Symptoms Search
const symptomsSearchbtn = document.getElementById('symptomsSearch');
symptomsSearchbtn.addEventListener('click', searchSymptoms);
document.addEventListener('DOMContentLoaded', () => {
    fetch('health_analysis.json')
        .then(response => response.json())
        .then(data => {
            //create an array of symptoms
            var symptomsArray = [];
            data.conditions.forEach((condition, index) => {

                const list1 = document.getElementById('symptom1');
                for (let i = 0; i < condition.symptoms.length; i++) {
                    symptomsArray.push(condition.symptoms[i]);
                    if (!checkDuplicates(symptomsArray, symptomsArray[symptomsArray.length - 1])) {
                        const item = document.createElement('option');
                        item.value = condition.symptoms[i];
                        item.name = condition.symptoms[i];
                        item.innerHTML = `${condition.symptoms[i]}`;
                        list1.appendChild(item);
                    }
                }
            })
        })
})
function checkDuplicates(arr, lastElement) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === lastElement) {
            console.log(`${lastElement} already exists`);
            return true;
        }
    }
    return false;
}

// load second list
// the logic is to only load symptoms from the same condition as the first symptom
document.getElementById('symptom1').addEventListener('change', () => {
    const list2 = document.getElementById('symptom2');
    list2.innerHTML = `<option value="" disabled hidden selected>Select symptom</option>`;
    const symptom_1 = document.getElementById('symptom1').value;
    fetch('health_analysis.json')
        .then(response => response.json())
        .then(data => {
            // array of possible conditions
            const PossibleConditions = data.conditions.filter(item => item.symptoms.includes(symptom_1));
            //create  list2 array
            var list2Arr = [];
            PossibleConditions.forEach(condition => {
                for (let i = 0; i < condition.symptoms.length; i++) {
                    list2Arr.push(condition.symptoms[i]);
                    if (!checkDuplicates(list2Arr, list2Arr[list2Arr.length - 1]) && list2Arr[list2Arr.length - 1] !== symptom_1) {
                        const item = document.createElement('option');
                        item.value = condition.symptoms[i];
                        item.name = condition.symptoms[i];
                        item.innerHTML = condition.symptoms[i];
                        list2.appendChild(item);
                    }
                }
            })
        })
})
document.getElementById('symptom2').addEventListener('change', () => {
    const list3 = document.getElementById('symptom3');
    list3.innerHTML = `<option value="" disabled hidden selected>Select symptom</option>`;
    const symptom_1 = document.getElementById('symptom1').value;
    const symptom_2 = document.getElementById('symptom2').value;
    fetch('health_analysis.json')
        .then(response => response.json())
        .then(data => {
            const PossibleConditions = data.conditions.filter(item => item.symptoms.includes(symptom_1) && item.symptoms.includes(symptom_2));
            PossibleConditions.forEach(condition => {
                for (let i = 0; i < condition.symptoms.length - 1; i++)
                    if (condition.symptoms[i] !== symptom_1 && condition.symptoms[i] !== symptom_2) {
                        const item = document.createElement('option');
                        item.value = condition.symptoms[i];
                        item.name = condition.symptoms[i];
                        item.innerHTML = condition.symptoms[i];
                        list3.appendChild(item);
                    }
            })
        })
})
document.getElementById('symptomsSearch').addEventListener('click', searchSymptoms);
function searchSymptoms() {
    const symptom_1 = document.getElementById('symptom1').value;
    const symptom_2 = document.getElementById('symptom2').value;
    const symptom_3 = document.getElementById('symptom3').value;
    if (symptom_1 && symptom_2 && symptom_3) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        fetch('health_analysis.json')
            .then(response => response.json())
            .then(data => {
                const condition = data.conditions.find(item => item.symptoms.includes(symptom_1) && item.symptoms.includes(symptom_2) && item.symptoms.includes(symptom_3));
                console.log(condition);
                if (condition) {
                    const symptoms = condition.symptoms.join(', ');
                    const prevention = condition.prevention.join(', ');
                    const treatment = condition.treatment;

                    resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                    resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

                    resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                    resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                    resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
                } else {
                    resultDiv.innerHTML = 'Condition not found.';
                }
            })
    }
}