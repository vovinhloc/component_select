document.addEventListener("DOMContentLoaded", function () {
    var selected = [];
    const customSelect = document.querySelector(".custom-select");
    const selectedOptions = document.querySelector(".selected-options");
    const options = document.querySelector(".options");
    const optionElements = document.querySelectorAll(".option");
    const logs = document.querySelector("#logs");

    // const arrow = document.querySelector(".arrow");
    const arrowDown = document.querySelector("#arrowDown");
    const arrowUp = document.querySelector("#arrowUp");

    const encodeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    function addLogs(msg) {
        logs.innerHTML += msg + "  </br>";
    }

    addLogs("start");

    function showArrowDown() {
        arrowUp.classList.remove("show");
        arrowUp.classList.add("hide");

        arrowDown.classList.remove("hide");
        arrowDown.classList.add("show");
    }

    function showArrowUp() {
        arrowDown.classList.remove("show");
        arrowDown.classList.add("hide");

        arrowUp.classList.remove("hide");
        arrowUp.classList.add("show");
    }
    arrowUp.addEventListener("click", (e) => {
        addLogs("arrowUp");
        showArrowDown();
        customSelect.classList.remove("open");

    })
    arrowDown.addEventListener("click", (e) => {
        addLogs("arrowDown");
        showArrowUp();
        customSelect.classList.add("open");

    })

    customSelect.addEventListener("focusin", (event) => {
        addLogs("focusin");
        try {
            if (event.explicitOriginalTarget && event.explicitOriginalTarget.id) {
                addLogs("focusin: " + event.explicitOriginalTarget.id);
            } else {
                addLogs("focusin: No ID");
                customSelect.classList.add("open");
                showArrowUp();
            }
        } catch (e) {
            addLogs("focusin: 1");
        }

    })
    customSelect.addEventListener("focusout", (e) => {
        addLogs("focusout");
        if (!customSelect.contains(event.relatedTarget)) {
            showArrowDown();
            customSelect.classList.remove("open");
        }

    })


});