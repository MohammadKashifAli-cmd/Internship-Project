function addNewWEField() {
    //  console.log("Adding New Field");
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    let weOb = document.getElementById('we');
    let weAddButtonOb = document.getElementById("weAddButton");

    weOb.insertBefore(newNode, weAddButtonOb);
}

function addNewAQField() {
    //console.log("adding new field");
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("aqField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    let aqOb = document.getElementById('aq');
    let aqAddButtonOb = document.getElementById("aqAddButton");

    aqOb.insertBefore(newNode, aqAddButtonOb);
}



function validateForm() {
    // Get all form field values
    const name = document.getElementById("nameField").value.trim();
    const email = document.getElementById("emailField").value.trim();
    const contact = document.getElementById("contactField").value.trim();
    const skills = document.getElementById("skillsField").value.trim();

    // Name validation
    const field = document.getElementById("nameField");
    if (!name) {
        field.classList.add("error");
        alert("Name is required.");
        return false;
    }
    else {
        field.classList.remove("error");
    }


    // Email validation
    if (!email) {
        alert("Email is required.");
        return false;
    } else if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Contact validation
    if (!contact) {
        alert("Contact number is required.");
        return false;
    } else if (!validateContact(contact)) {
        alert("Please enter a valid 10-digit contact number.");
        return false;
    }

    // Skills validation
    if (!skills) {
        alert("Skills are required.");
        return false;
    }

    // If all validations pass
    return true;
}

// Helper function to validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailPattern.test(email);
}

// Helper function to validate contact number
function validateContact(contact) {
    const contactPattern = /^\d{10}$/; // Matches exactly 10 digits
    return contactPattern.test(contact);
}


function generateCV() {

    if (!validateForm()) {
        return; // Stop form submission if validation fails
    }
    //console.log("cv generate");
    //name
    let nameField = document.getElementById("nameField").value;
    let nameT1 = document.getElementById("nameT1");
    nameT1.innerHTML = nameField;
    //Direct
    document.getElementById("nameT2").innerHTML = nameField;

    //contact
    //this is not work document.getElementById("contactT").innerHTML=contactField;
    document.getElementById("contactT").innerHTML = document.getElementById("contactField").value;

    //email
    document.getElementById("emailT").innerHTML = document.getElementById("emailField").value

    //address
    document.getElementById("addressT").innerHTML = document.getElementById("addressField").value

    //linkdin
    document.getElementById("linkdT").innerHTML = document.getElementById("linkdinField").value

    //hobby
    document.getElementById("hobbyT").innerHTML = document.getElementById("hobbiesField").value

    //objective
    document.getElementById("objectiveT").innerHTML = document.getElementById("objectiveField").value

    //work experience
    let wes = document.getElementsByClassName("weField");
    let str = '';
    for (let e of wes) {
        str = str + `<li>${e.value}</li>`;
    }
    document.getElementById("weT").innerHTML = str;

    //academic qualification
    let aqs = document.getElementsByClassName("aqField");
    let str1 = '';
    for (let e of aqs) {
        str1 = str1 + `<li>${e.value}</li>`;
    }
    document.getElementById("aqT").innerHTML = str1;

    //skills
    document.getElementById("skillsT").innerHTML = document.getElementById("skillsField").value

    //profile image
    let file = document.getElementById("imgField").files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.result);

    //set file into template
    reader.onloadend = function () {
        document.getElementById("imgT").src = reader.result;
    };
    //document.setAttribute("src", reader.result);


    document.getElementById("cv-form").style.display = 'none'
    document.getElementById("cv-template").style.display = 'block'
}


function exportToPDF() {
    const element = document.getElementById("resume-output"); // The element to export
    const options = {
        margin: 1,
        filename: 'Resume.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
}



//document.getElementById("cv-form").style.display = 'none'
//document.getElementById("cv-template").style.display = 'block'
function printCV() {
    const template = document.getElementById('cv-template'); // Select the template
    const originalContent = document.body.innerHTML; // Save the original content of the page

    document.body.innerHTML = template.outerHTML; // Replace body with template content only
    window.print(); // Print the template content
    document.body.innerHTML = originalContent; // Restore the original content
}

