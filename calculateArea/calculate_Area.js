function toggle_mode(){
    document.body.classList.toggle("mode");
    const buttons = document.querySelectorAll("button");
    buttons.forEach(element => {
        element.classList.toggle("buttons");
    });
}

function calculateArea(){
    let length = parseFloat(document.getElementById("length").value);
    let width = parseFloat(document.getElementById("width").value);
    let area = length * width;
    let result = document.getElementById("result");
    if(length<0 || width<0){
        result.innerHTML="Invalid Input!"
    }
    else{
        result.innerHTML=`The area of the rectangle is: ${area}`;
    }
}