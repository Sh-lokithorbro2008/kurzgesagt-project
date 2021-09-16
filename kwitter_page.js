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
//YOUR FIREBASE LINKS
var user_name=localStorage.getItem("username");
var room_name=localStorage.getItem("room_name");

function send()
{
      var message=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
           name:user_name,
           message:message,
           like:0
      })
      document.getElementById("msg").value=""
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
console.log(message_data);

name=message_data["name"];
like=message_data["like"];
message=message_data["message"];

name_with_tag="<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
message_with_tag="<h4 class='message_h4'>" + message + "</h4>";

like_button="<button class='btn btn-success' id=" + firebase_message_id + " value=" + like + " onclick='update_like(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> like : " + like + " </span> </button> <hr>";

row=name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML +=row;
      } });  }); }
getData();

function update_like(message_id)
{
      console.log("clicked on like button -" + message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes) + 1;

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      })
}
function logout()
{
      localStorage.removeItem("room_name");
      localStorage.removeItem("username");
      window.location="index.html";
}