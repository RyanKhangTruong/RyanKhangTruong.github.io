let cangjie_list, random_int;
let cangjie_str, comma_index;
let cangjie5_arr, cangjie3_code; 

// Fetches Cangjie v3 and v5 codes from text file & sets first hanzi
window.onload = function() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        cangjie_list = this.responseText.split(/\r?\n/);
        assignHanzi();
    }

    xhr.open("GET", "cangjie-codes.txt", false)
    xhr.send()
}

function assignHanzi() {
    // CJK Unified Ideographs has 20902 characters in total
    random_int = Math.floor(Math.random() * 20902);
    const hanzi_box = document.getElementById("hanzi-box");
    // Adjusting random_int to the CJK Unified Ideographs Block
    hanzi_box.innerText = String.fromCharCode(random_int + 19968);

    cangjie_str = cangjie_list[random_int];
    comma_index = cangjie_str.indexOf(',');

    if (comma_index > -1) {
        cangjie5_arr = cangjie_str.substring(0, comma_index)
        .toUpperCase().split(" ");

        cangjie3_code = cangjie_str.substring(comma_index + 1)
        .toUpperCase();
    } else {
        cangjie5_arr = cangjie_str.toUpperCase().split(" ");

        cangjie3_code = null;
    }
}

function insertKey(char) {
    const input_text = document.getElementById("input-box");
    if (input_text.innerText.length < 5) {
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
        const code_count = cangjie5_arr.length + (comma_index > -1);

        // Adjusts size of answers
        if (code_count === 1) {
            answer_box.style.fontSize = "min(60px, 10vw)";
            answer_box.style.gridTemplateColumns = "repeat(1, 1fr)";
        } else if (code_count <= 4) {
            answer_box.style.fontSize = "min(60px, 10vw)";
            answer_box.style.gridTemplateColumns = "repeat(2, 1fr)";       
        } else {
            answer_box.style.fontSize = "min(36px, 6vw)";
            answer_box.style.gridTemplateColumns = "repeat(4, 1fr)";  
        }

        // Cangjie 5 codes are in green
        cangjie5_arr.forEach(
            (cangjie5_code) => {
                answer_box.innerHTML += `<span style="color: #1e90ff">
                ${cangjie5_code}</span>`;
            }
        )

        // Distinguishes incompatible Cangjie 3 code in red
        if (comma_index > -1) {
            answer_box.innerHTML += `<span style="color: #6a5acd">
            ${cangjie3_code}</span>`;
        }
    }
}

function checkInput() {
    const user_input = document.getElementById("input-box").innerText;

    if (cangjie5_arr.includes(user_input) || cangjie3_code === user_input) {
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