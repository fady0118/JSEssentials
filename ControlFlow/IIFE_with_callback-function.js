//--------------Callback function----------------- 
// is a function that is passed as an argument to another function 
// and is executed after some event or an operation in that function 

// a function that will act as the callback function
function fun1(){
    console.log("text");
}
// Immediately invoked function expression
// The function callingfun is defined and immediately invoked.
// It takes a callback parameter and calls it four times within a for loop.
// fun1 is passed as the callback argument to the IIFE.
(function callingfun(callback){
    for(let i=1;i<5;i++){
        callback();
    }
})(fun1)
// Execution Flow
    // The IIFE is executed immediately.
    // fun1 is passed as the callback to callingfun.
    // Inside callingfun, the for loop runs from 1 to 4, calling callback() (which is fun1) each time.
    // This results in “text” being logged to the console four times.