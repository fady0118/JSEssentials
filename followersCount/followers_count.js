let count = 0;
function display_count(){
    let follower_count_element = document.getElementById("countDisplay");
    follower_count_element.innerHTML = count;
}
function increaseCount(){
    count++;
    display_count();
    checkCountValue();
}
function checkCountValue() {
    if (count === 10) {
      alert("Your Instagram post gained 10 followers! Congratulations!");
    } else if (count === 20) {
      alert("Your Instagram post gained 20 followers! Keep it up!");
    }
}
function reset(){
    count = 0;
    display_count();
}