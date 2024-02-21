let button = document.getElementsByTagName("button");
let main = document.getElementsByTagName("main")[0];
let user_entries = document.getElementsByClassName("user-entries")[0];
let msg_div = document.getElementsByClassName("messages")[0];
let wrn_div = document.getElementsByClassName("warning")[0];
let close_wrn_img = document.getElementsByClassName("close-wrn")[0];
let close_wrn_btn = document.getElementsByClassName("close-wrn")[1];
let username = document.getElementsByTagName("input")[0];
let chat_page_section = document.getElementById("chat-page");
let send_btn = document.getElementById("send-message");
let msg_from_input = document.getElementById("inp_msg");
let err_audio = document.getElementById("err_sound");
let body = document.getElementsByTagName("body")[0];
let input_username;

const socket = io();
button[0].onclick = () => {
    main.classList.add("hide");
    user_entries.classList.remove("hide");
}

button[1].onclick = () => {
    if (username.value != "") {
        input_username = username.value;
        
        setTimeout(() => {
            username.value = "";
            button[1].style.border = "none";
            user_entries.classList.add("hide");
            chat_page_section.style.display = "flex";
        }, 1000);

        socket.emit("send-name", input_username);
    }
    else {
        user_entries.style.opacity = "0.3";
        err_audio.play();
        wrn_div.classList.remove("hide");
        setTimeout(()=>{
            close_wrn_btn.style["border-color"] = "darkgreen";
        }, 1000)
    }
}

username.addEventListener("keypress", (event)=>{
    button[1].style.border = "2px solid black";
    
    if (event.key == "Enter") {
        button[1].click();
    }
    
})

const hide_wrn = ()=>{
    user_entries.style.opacity = "1";
    close_wrn_btn.style["border-color"] = "black";
    wrn_div.classList.add("hide");
}

close_wrn_img.addEventListener("click", hide_wrn);
close_wrn_btn.addEventListener("click", hide_wrn);

let message;
send_btn.onclick = ()=>{
    message = msg_from_input.value;

    if (message != "") {
        msg_from_input.value = "";
        socket.emit("send-message", message)
    }
    else{
        user_entries.style.opacity = "0.3";
        err_audio.play();
        wrn_div.classList.remove("hide");
    }
}

let msg_sound = document.getElementsByTagName("audio")[0];

socket.on("msg-from-sender", (id, name, message)=>{
    // let msg_node = document.createElement("div");
    // msg_node.style.display = "flex";
    // msg_node.style.margin-top =  "20px";
    // msg_node.style.width = "50px";
   

    if (socket.id == id) {
        msg_div.innerHTML += `<div style = "margin-top: 20px;
        display: flex;
        justify-content: end; padding-left: 20px;
        padding-right: 20px; padding-bottom: 20px;">
        <h2 style = "color: white;
        background: mediumslateblue;
        width: fit-content;
        padding: 10px; ">${message}</h2>
        </div>`;
    }
    else{
        name += ":  ";
        msg_div.innerHTML += `<div style = "margin-top: 20px;
        display: flex;
        justify-content: start; padding-right: 20px;
        padding-left: 20px; padding-bottom: 20px;">
        <h2 style = "color: white;
        background: dimgray;
        width: fit-content;
        padding: 10px; ">${name}${message}</h2>
        </div>`;

        msg_sound.play();
    }
    
    msg_div.scrollTop = msg_div.scrollHeight;
})

// msg_from_input.onkeypress = ()=>{
//     send_btn.style.border = "2px solid black";
// }

msg_from_input.addEventListener("keypress", (event)=>{
    send_btn.style.border = "2px solid black";
    
    if (event.key == "Enter") {
        send_btn.click();
        send_btn.style.border = "none";
    }

})

