var firebaseConfig = {
      apiKey: "AIzaSyC32D5yEQrjWCUyOsUkA4d8wP1ocDEqmEk",
      authDomain: "kurzgesagt-chat-website.firebaseapp.com",
      databaseURL: "https://kurzgesagt-chat-website-default-rtdb.firebaseio.com",
      projectId: "kurzgesagt-chat-website",
      storageBucket: "kurzgesagt-chat-website.appspot.com",
      messagingSenderId: "209873344047",
      appId: "1:209873344047:web:1ab9d04c8caf1b828158da"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

user_name=localStorage.getItem("username");
document.getElementById("user_name").innerHTML="welcome " + user_name;

function add_room()
{
      room_name=document.getElementById("add_room").value;

      firebase.database().ref("/").child(room_name).update({
            purpose : "add room"
      });

      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log(Room_names)

      row="<div class='room_name' id=" + Room_names + " onclick='redirect_To_roomname(this.id)'>#" + Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML +=row;
      //End code
      });});}

getData();

function redirect_To_roomname(name)
{
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("room_name");
      localStorage.removeItem("username");
      window.location="index.html";
}