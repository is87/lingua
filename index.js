var activePhrase = null;
var db = { "phrases": [{ "a": "Hello!", "b": "¡Hola!", "start": "35", "end": "37" }, { "a": "How are you?", "b": "¿Cómo estás?", "start": "43", "end": "45" }, { "a": "I'm good, thank you.", "b": "Estoy bien, gracias.", "start": "53", "end": "55" }, { "a": "What is your name?", "b": "¿Cuál es tu nombre?", "start": "64.5", "end": "67" }, { "a": "My name is...", "b": "Mi nombre es...", "start": "74.5", "end": "77" }, { "a": "Where are you from?", "b": "¿De dónde eres?", "start": "85", "end": "87" }, { "a": "I am from Sweden.", "b": "Soy de Suecia.", "start": "96", "end": "98" }] };
var timer;
var speed = 1;

window.addEventListener("load", () => {
    init();
});


function init() {
    var player = document.getElementById("player");
    player.addEventListener('canplay', playNow);
    gid("main").innerHTML = "";
    for (i = 0; i < db.phrases.length; i++) {
        gid("main").innerHTML += "<div onclick='playPhrase(" + i + ");' class='phraseDiv'><div class='lang1'>" + db.phrases[i].a + "</div><div class='lang2'>" + db.phrases[i].b + "</div></div>";
    }
}
function gid(id) {
    return document.getElementById(id);
}

function stopAudio() {
    player.pause();
    gid("main").children[activePhrase].style.backgroundColor = "#FFFFFF";
    gid("main").children[activePhrase].children[1].style.color = "#666666";
    activePhrase = null;
}

function playPhrase(id) {
    start = Number(db.phrases[id].start);
    end = Number(db.phrases[id].end);
    duration = (end - start) * 1000;
    console.log(start, end, duration);
    if (activePhrase != null) {
        gid("main").children[activePhrase].style.backgroundColor = "#FFFFFF";
        gid("main").children[activePhrase].children[1].style.color = "#666666";
    }

    player.playbackRate = speed;
    duration /= speed;

    player.currentTime = start;
    player.play();
    clearTimeout(timer);
    activePhrase = id;
}

function playNow() {
    if (activePhrase != null) {
        console.log("Playing...");
        timer = setTimeout(stopAudio, duration);
        //gid("main").children[activePhrase].children[1].style.color = "#337536";
        gid("main").children[activePhrase].style.backgroundColor = "#4CAF50";
        gid("main").children[activePhrase].children[1].style.color = "#FFFFFF"
    }
}

function toggleSpeed(){
    if(speed == 1){
        speed = 0.5;
        gid("speedToggle").className = "fa fa-toggle-on blue";
        gid("half").style.color = "black";
    }else{
        speed = 1;
        gid("speedToggle").className = "fa fa-toggle-off gray";
        gid("half").style.color = "gray";
    }
}