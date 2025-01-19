let wubi_list, random_int, wubi_arr;

// Fetches wubi v3 and v5 codes from text file & sets first hanzi
window.onload = function() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        wubi_list = this.responseText.split(/\r?\n/);
        assignHanzi();
    }

    xhr.open("GET", "wubi-codes.txt", false)
    xhr.send()
}

function assignHanzi() {
    // CJK Unified Ideographs has 20902 characters in total
    random_int = Math.floor(Math.random() * 20902);
    const hanzi_box = document.getElementById("hanzi-box");
    // Adjusting random_int to the CJK Unified Ideographs Block
    hanzi_box.innerText = String.fromCharCode(random_int + 19968);
    // Forcing fonts on mobile devices
    hanzi_box.style.fontFamily = "Kaiti";

    wubi_arr = wubi_list[random_int].toUpperCase().split(" ");
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
        const code_count = wubi_arr.length;

        // Adjusts size of answers
        if (code_count === 1) {
            answer_box.style.fontSize = "min(60px, 10vw)";
            answer_box.style.gridTemplateColumns = "repeat(1, 1fr)";
        } else {
            answer_box.style.fontSize = "min(60px, 10vw)";
            answer_box.style.gridTemplateColumns = "repeat(2, 1fr)";       
        }

        wubi_arr.forEach(
            (wubi_code) => {
                answer_box.innerHTML += `<span style="color: #1e90ff">
                ${wubi_code}</span>`;
            }
        )
    }
}

function checkInput() {
    const user_input = document.getElementById("input-box").innerText;

    if (wubi_arr.includes(user_input)) {
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
});