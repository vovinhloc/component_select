document.addEventListener("DOMContentLoaded", function () {
    let selected = [];
    const customSelect = document.querySelector(".custom-select");
    const selectedOptions = document.querySelector(".selected-options");
    const options = document.querySelector(".options");
    const optionElements = document.querySelectorAll(".option");
    const logs = document.querySelector("#logs");

    const arrowDown = document.querySelector("#arrowDown");
    const arrowUp = document.querySelector("#arrowUp");

    const encodeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    const addLogs = (msg) => {
        logs.innerHTML += `${msg} </br>`;
    };

    const toggleArrows = (showUp) => {
        if (showUp) {
            arrowDown.classList.replace("show", "hide");
            arrowUp.classList.replace("hide", "show");
        } else {
            arrowUp.classList.replace("show", "hide");
            arrowDown.classList.replace("hide", "show");
        }
    };

    const openSelect = () => {
        customSelect.classList.add("open");
        toggleArrows(true);
    };

    const closeSelect = () => {
        customSelect.classList.remove("open");
        toggleArrows(false);
    };

    arrowUp.addEventListener("click", () => {
        addLogs("arrowUp");
        closeSelect();
    });

    arrowDown.addEventListener("click", () => {
        addLogs("arrowDown");
        openSelect();
    });

    customSelect.addEventListener("focusin", (event) => {
        addLogs("focusin");
        openSelect();
        try {
            if (event.explicitOriginalTarget && event.explicitOriginalTarget.id) {
                addLogs(`focusin: ${event.explicitOriginalTarget.id}`);
            } else {
                addLogs("focusin: No ID");
            }
        } catch (e) {
            addLogs("focusin: Error");
        }
    });

    customSelect.addEventListener("focusout", (event) => {
        addLogs("focusout");
        if (!customSelect.contains(event.relatedTarget)) {
            closeSelect();
        }
    });
});
