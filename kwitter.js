var username="";

function add_user()
{
    username=document.getElementById("username_input").value;
    localStorage.setItem("username",username);
    window.location="kwitter_room.html"
}