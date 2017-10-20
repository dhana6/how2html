// function getElement(selector) {
//     return document.querySelector(selector);
// }

function getElement(el) {
 return  document.getElementsByClassName(el)[0];
}
function getElementId(el){
    return document.getElementById(el);
}

var main = getElement('.main');

function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function addNewMessage(args) {
    var newMessageDIV = document.createElement("div");
    newMessageDIV.className = "new-message";

    var userinfoDIV = document.createElement("div");
    userinfoDIV.className = "user-info";
    userinfoDIV.innerHTML = args.userinfo || '<img src="images/user.png">';

    userinfoDIV.style.background =
        args.color || rtcMultiConnection.extra.color || getRandomColor();

    newMessageDIV.appendChild(userinfoDIV);

    var userActivityDIV = document.createElement("div");
    userActivityDIV.className = "user-activity";

    userActivityDIV.innerHTML = '<h2 class="header">' + args.header + "</h2>";

    var p = document.createElement("p");
    p.className = "message";
    userActivityDIV.appendChild(p);
    p.innerHTML = args.message;

    newMessageDIV.appendChild(userActivityDIV);

    main.insertBefore(newMessageDIV, main.firstChild);

    userinfoDIV.style.height = newMessageDIV.clientHeight + "px";

    if (args.callback) {
        args.callback(newMessageDIV);
    }
}

main.getElementId("#your-name").onkeyup = function(e) {
    if (e.keyCode != 13) return;
    main.getElementId("#continue").onclick();
};

main.getElementId("#room-name").onkeyup = function(e) {
    if (e.keyCode != 13) return;
    main.getElementId("#continue").onclick();
};

main.getElementId("#room-name").value = (Math.random() * 1000)
    .toString()
    .replace(".", "");
if (localStorage.getItem("roomname")) {
    main.getElementId("#room-name").value = localStorage.getItem("roomname");
}

main.getElementId("#room-name").onkeyup = function() {
    localStorage.setItem("roomname", main.getElementId("#room-name").value);
};
/*edit content*/
main.getElementId("#continue").onclick = function() {
    var yourName = this.parentNode.getElementId("#your-name");
    var roomName = this.parentNode.getElementId("#room-name");
    if (!roomName.value || !roomName.value.length) {
        roomName.focus();
        return alert("Your MUST Enter Room Name!");
    }

    main.getElementId("#room-name").onkeyup();

    yourName.disabled = roomName.disabled = this.disabled = true;

    var username = yourName.value || "Anonymous";
   

    rtcMultiConnection.extra = {
        username: username,
        color: getRandomColor()
    };

    addNewMessage({
        header: username,
        message: "Searching for existing rooms...",
        userinfo: '<img src="images/action-needed.png">'
    });

    var roomid = main.getElementId("#room-name").value;
    rtcMultiConnection.channel = roomid;

    console.log(username)
    console.log(roomid)
    var firebaseRef = firebase.database().ref();
    console.log(firebaseRef);

    var websocket = new WebSocket(SIGNALING_SERVER);
    websocket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data.isChannelPresent == false) {
            addNewMessage({
                header: username,
                message:
                    'No room found. Creating new room...<br /><br />You can share following room-id with your friends: <input type=text value="' +
                    roomid +
                    '">',
                userinfo: '<img src="images/action-needed.png">'
            });

            rtcMultiConnection.open();
        } else {
            addNewMessage({
                header: username,
                message: "Room found. Joining the room...",
                userinfo: '<img src="images/action-needed.png">'
            });
            rtcMultiConnection.join(roomid);
        }
    };
    websocket.onopen = function() {
        websocket.send(
            JSON.stringify({
                checkPresence: true,
                channel: roomid
            })
        );
    };
};

function getUserinfo(blobURL, imageURL) {
    return blobURL
        ? '<video src="' + blobURL + '" autoplay controls></video>'
        : '<img src="' + imageURL + '">';
}

var isShiftKeyPressed = false;

getElement(".main-input-box textarea").onkeydown = function(e) {
    if (e.keyCode == 16) {
        isShiftKeyPressed = true;
    }
};

var numberOfKeys = 0;
getElement(".main-input-box textarea").onkeyup = function(e) {
    numberOfKeys++;
    if (numberOfKeys > 3) numberOfKeys = 0;

    if (!numberOfKeys) {
        if (e.keyCode == 8) {
            return rtcMultiConnection.send({
                stoppedTyping: true
            });
        }

        rtcMultiConnection.send({
            typing: true
        });
    }

    if (isShiftKeyPressed) {
        if (e.keyCode == 16) {
            isShiftKeyPressed = false;
        }
        return;
    }

    if (e.keyCode != 13) return;

    addNewMessage({
        header: rtcMultiConnection.extra.username,
        message: "Your Message:<br /><br />" + linkify(this.value),
        userinfo: getUserinfo(
            rtcMultiConnection.blobURLs[rtcMultiConnection.userid],
            "images/chat-message.png"
        ),
        color: rtcMultiConnection.extra.color
    });

    rtcMultiConnection.send(this.value);

    this.value = "";
};

getElement("#allow-mic").onclick = function() {
    this.disabled = true;
    var session = { audio: true };

    rtcMultiConnection.captureUserMedia(function(stream) {
        var streamid = rtcMultiConnection.token();
        rtcMultiConnection.customStreams[streamid] = stream;

        rtcMultiConnection.sendMessage({
            hasMic: true,
            streamid: streamid,
            session: session
        });
    }, session);
};

getElement("#allow-screen").onclick = function() {
    this.disabled = true;
    var session = { screen: true };

    rtcMultiConnection.captureUserMedia(function(stream) {
        var streamid = rtcMultiConnection.token();
        rtcMultiConnection.customStreams[streamid] = stream;

        rtcMultiConnection.sendMessage({
            hasScreen: true,
            streamid: streamid,
            session: session
        });
    }, session);
};

function fireClickEvent(element) {
    var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
    });

    element.dispatchEvent(evt);
}

function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Bytes";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
