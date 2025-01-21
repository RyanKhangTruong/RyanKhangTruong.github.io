let wubi_list, random_int, wubi_code;

// Fetches wubi codes from text file & sets first hanzi
window.onload = function() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        wubi_list = this.responseText.split(/\r?\n/);
        assignHanzi();
    }

    xhr.open("GET", "wubi-vocab.csv", false)
    xhr.send()
}

function assignHanzi() {
    // Number of wubi vocab words
    random_int = Math.floor(Math.random() * 73578);
    // Get wubi vocab and its code
    wubi_code = wubi_list[random_int].split(",")[0].toUpperCase();
    wubi_vocab = wubi_list[random_int].split(",")[1];
    code_len = wubi_vocab.length; console.log(code_len)
    // Assign wubi vocab to screen
    const hanzi_box = document.getElementById("hanzi-box");
    hanzi_box.style.fontSize = `min(${576 / code_len}px, ${96 / code_len}vw)`;
    hanzi_box.innerText = wubi_vocab
}

function insertKey(char) {
    const input_text = document.getElementById("input-box");
    if (input_text.innerText.length < 4) {
        input_text.innerText += char;
    }
}

function removeKey() {
    const input_text = document.getElementById("input-box");
    if (input_text.innerText.length > 0) {
        input_text.innerText = input_text.innerText.slice(0, -1);
    }
}

function showAnswers() {
    const answer_box = document.getElementById("answer-box");

    if (answer_box.innerHTML.trim() === "") {
        answer_box.innerHTML = wubi_code;
    }
}

function checkInput() {
    const user_input = document.getElementById("input-box").innerText;

    if (wubi_code === user_input) {
        assignHanzi();
        document.getElementById("input-box").innerHTML = "";
        document.getElementById("answer-box").innerHTML = "";
    }
}

document.addEventListener("keydown", (event) => {
    const key_name = event.key.toUpperCase();

    if (key_name >= 'A' && key_name <= 'Y' && key_name.length === 1) {
        insertKey(key_name);
    } else if (key_name === "BACKSPACE") {
        removeKey();
    } else if (key_name === " " && event.target == document.body) {
        event.preventDefault();
        checkInput();
    }

    document.activeElement.blur();
});