const btn = document.querySelector('.input');
const content = document.querySelector('.content');
const history = document.querySelector('#history')

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}



function wishMe() {
    const hour = new Date().getHours();
    if (hour < 12) {
        speak("Good morning, boss...");
    } else if (hour < 17) {
        speak("Good afternoon, master...");
    } else {
        speak("Good evening, boss...");
    }
}

window.addEventListener('load', () => {
    requestPermissions()
        .then(() => {
            wishMe();
            speak("Jarvis at your service.");
        })
        .catch((error) => {
            console.error("Permission denied:", error);
            speak("I could not get microphone access. Please check your microphone settings.");
        });
});

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function checkAppAvailability(url) {
    return new Promise((resolve) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        
        document.body.appendChild(iframe);

        const timeout = setTimeout(() => {
            document.body.removeChild(iframe);
            resolve(false);
        }, 2000);

        iframe.onload = () => {
            clearTimeout(timeout);
            document.body.removeChild(iframe);
            resolve(true);
        };
    });
}

async function openApp(appUrl, appName) {
    const isAppAvailable = await checkAppAvailability(appUrl);
    if (isAppAvailable) {
        window.location.href = appUrl;
        speak(`Opening ${appName}...`);
    } else {
        // speak(``);
        speak("not get info ")
    }
}

function takeCommand(message) {
    // here anyone can make command for voice assistant
    
    if (message.includes('how are you') || message.includes('hello')  || message.includes('hey')) {
        speak("Hello sir, how can I assist you?");
    } else if (message.includes('who are you') || message.includes('tell me about')  ) {
        speak("I am a chat assistant created by HARSH. I can perform tasks like opening applications or searching for information.");
    } else if (message.includes("open google")) {
        openApp("google://", "Google");
    } else if (message.includes("open youtube")) {
        openApp("youtube://", "YouTube");
    } else if (message.includes("open facebook")) {
        openApp("fb://", "Facebook");
    } else if (message.includes("open instagram")) {
        openApp("instagram://", "Instagram");
    } else if (message.includes("open twitter")) {
        openApp("twitter://", "Twitter");
    } else if (message.includes("open linkedin")) {
        openApp("linkedin://", "LinkedIn");
    } else if (message.includes("open whatsapp")) {
        openApp("whatsapp://", "WhatsApp");
    } else if (message.includes("open vs code") || message.includes("open visual studio code")) {
        openApp("vscode://", "Visual Studio Code");
    } else if (message.includes("open free fire")) {
        openApp("freefire://", "Free Fire");
    } else if (message.includes("open amazon")) {
        openApp("amazon://", "Amazon");
    } else if (message.includes("open flipkart")) {
        openApp("flipkart://", "Flipkart");
    } else if (message.includes("open shopify")) {
        openApp("shopify://", "Shopify");
    } else if (message.includes("open meesho")) {
        openApp("meesho://", "Meesho");
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    } else if (message.includes('notepad')) {
        try {
            window.open('notepad.exe');
            speak("Opening Notepad...");
        } catch {
            window.open("https://www.google.com/search?q=notepad");
            speak("Notepad is not installed. Searching online.");
        }
    } else if (message.includes('calculator')) {
        try {
            window.open('calc.exe');
            speak("Opening Calculator...");
        } catch {
            window.open("https://www.google.com/search?q=calculator");
            speak("Calculator is not installed. Searching online.");
        }
    } else if (message.includes('game')) {
        window.open("https://ev.io");
        speak("Opening ev.io...");
    } else {
        window.open(`https://www.google.com/search?q=${message}`);
        speak("I found some information on Google for " + message);
    }
}

let newpass = localStorage.getItem("userPASS") || prompt("Create a Password");
        if (!localStorage.getItem("userPASS")) {
            localStorage.setItem("userPASS", newpass);
        }

        function passCheck() {
            let passcheckin = prompt("Enter the Password You created");

            const app = document.querySelector(".app");
            const mainSection = app.querySelector(".main");
            const historySection = app.querySelector(".history");

            if (newpass === passcheckin) {
                console.log("Password is correct");
                mainSection.classList.add("hide");
                historySection.classList.remove("hide");
                displayHistory(); 
            } else {
                while (newpass !== passcheckin) {
                    passcheckin = prompt("Incorrect. Enter the Password You created");
                }
                console.log("Password is correct");
                mainSection.classList.add("hide");
                historySection.classList.remove("hide");
                displayHistory(); 
            }
        }

        
      


    

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            content.textContent = transcript;
            takeCommand(transcript);
        };

        btn.addEventListener('click', () => {
            content.textContent = "Listening...";
            recognition.start();
        });

      
     

        function saveToHistory(query, response) {
            const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
            history.push({ query, response });
            localStorage.setItem('searchHistory', JSON.stringify(history));
        }

        function displayHistory() {
            const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
            historyResult.innerHTML = ''; // Clear previous history code 
            history.forEach(item => {
                historyResult.innerHTML += `<p>You said: ${item.query}</p><p>Response: ${item.response}</p>`;
            });
        }

