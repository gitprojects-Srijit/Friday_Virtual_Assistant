let btn = document.querySelector(".btn");
let context = document.querySelector(".content");
let voice_gif = document.querySelector(".voice");

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.volume = 1;
    speech.lang = "hi-GB";
    speech.pitch = 1;
    window.speechSynthesis.speak(speech); //whenever we say any query then it can return it through voice
}

function talking() {
    let day = new Date();   //create a variable name Date
    let hours = day.getHours();  //call hours through  getHours()
    console.log(hours);
    if (hours >= 0 && hours < 12) {
        speak("Good Morning, I'm Friday.")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon, I'm Friday.")
    }
    else {
        speak("Good Evening, I'm Friday.")
    }
}

window.addEventListener("load",()=>{
    talking();  //calling the function talking() whenever the page is loaded
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;  //used for speech recognition
let recognize = new speechRecognition();   //create an object of speechRecognition and stored it in variable recognize
recognize.onresult = (event) => {
    let current = event.resultIndex;  //get the current index of the result
    let tranScript = event.results[current][0].transcript;  //get the text from the result index
    context.innerText = tranScript;
    console.log(event);
    commandTaken(tranScript.toLowerCase());
}

btn.addEventListener("click", () => {
    recognize.start();  //start the speech recognition and click the button to speak
    btn.style.display = "none";
    voice_gif.style.display = "block";
})

function commandTaken(message) {
    if (!message) {
        console.log("Message is undefined or null.");
        return;
    }
    message = message.toLowerCase();
    btn.style.display = "flex";
    voice_gif.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        console.log("47");
        speak("Hello, what can I help you?");
    }
    else if (message.includes("what is your name") || message.includes("who are you")) {
        speak("I'm Friday, a Virtual Assistant, created by Srijit Bhowmick.");
    }
    else if (message.includes("how are you")) {
        speak("I'm doing great, thanks for asking! What about you?");
    }
    else if (message.includes("i am fine") || message.includes("i am good") || message.includes("i am great")) {
        speak("nice! It's good to hear");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    }
    else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com/", "_blank");
    }
    else if (message.includes("open github")) {
        speak("Opening Github...");
        window.open("https://github.com/", "_blank");
    }
    else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak("The current time is " + time);
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak("The current date is " + date);
    }
    else if(message){
        let text = "This is what i found on internet regarding" +  message.replace("Friday","")||message.replace("Fiday","");
        speak(text);
        window.open(`https://www.google.com/search?q=${message.replace("Friday","") ||  message.replace("Fiday","")}`, "_blank");
    }
    else{
        speak("Sorry, I can't recognize your command. Please try again.....");
    }
}

