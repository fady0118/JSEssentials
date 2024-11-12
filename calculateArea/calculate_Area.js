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
    if(isNaN(area)){
        result.innerHTML="Missing Input!";
        document.getElementById("length").classList.add("error");
        document.getElementById("width").classList.add("error");
    }
    else if(length<0 || width<0){
        result.innerHTML="Invalid Input!"
    }
    else{
        document.getElementById("length").classList.remove("error");
        document.getElementById("width").classList.remove("error");
        result.innerHTML=`The area of the rectangle is: ${area}`;
    }
}