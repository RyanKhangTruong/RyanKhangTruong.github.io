let cangjie_dict = {};
let random_int;

// Fetches Cangjie v3 and v5 codes from text file & sets first hanzi
window.onload = function() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        const cangjie_list = this.responseText.split(/\r?\n/);
        cangjie_dict = {};

        cangjie_list.forEach(
            (cangjie_row) => {
                cangjie_dict[
                    Number("0x" + cangjie_row.substring(0, 4))
                ] = cangjie_row.substring(4)
            }
        );

        assignHanzi();
    }

    xhr.open("GET", "cangjie-codes.txt", false)
    xhr.send()
}

function assignHanzi() {
    random_int = Math.floor(Math.random() * 20902) + 19968;
    const hanzi_box = document.getElementById("hanzi-box");
    hanzi_box.innerText = String.fromCharCode(random_int);
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
        const cangjie_str = cangjie_dict[random_int];
        const comma_index = cangjie_str.indexOf(',');
        let cangjie5_arr;
        let cangjie3_code = "";
        
        if (comma_index > -1) {
            cangjie5_arr = cangjie_str.substring(0, comma_index)
            .toUpperCase().split(" ");

            cangjie3_code = cangjie_str.substring(comma_index + 1)
            .toUpperCase();
        } else {
            cangjie5_arr = cangjie_str.toUpperCase().split(" ");
        }

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
                answer_box.innerHTML += `<span style="color: green">
                ${cangjie5_code}</span>`;
            }
        )

        // Distinguishes incompatible Cangjie 3 code in red
        if (comma_index > -1) {
            answer_box.innerHTML += `<span style="color: red">
            ${cangjie3_code}</span>`;
        }
    }
}

function checkInput() {
    const user_input = document.getElementById("input-box").innerText;

    // Prevents empty user input from matching with empty Cangjie 3 code
    if (user_input !== "") {
        const cangjie_str = cangjie_dict[random_int];
        const comma_index = cangjie_str.indexOf(',');
        let cangjie5_arr;
        let cangjie3_code = "";
        
        if (comma_index > -1) {
            cangjie5_arr = cangjie_str.substring(0, comma_index)
            .toUpperCase().split(" ");

            cangjie3_code = cangjie_str.substring(comma_index + 1)
            .toUpperCase();
        } else {
            cangjie5_arr = cangjie_str.toUpperCase().split(" ");
        }

        if (cangjie5_arr.includes(user_input) 
            || cangjie3_code === user_input) {
            assignHanzi();
            document.getElementById("input-box").innerHTML = "";
            document.getElementById("answer-box").innerHTML = "";
        }
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