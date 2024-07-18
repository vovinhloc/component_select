document.addEventListener("DOMContentLoaded", function () {
    let selected = [];
    const customSelect = document.querySelector(".custom-select");
    const selectedOptions = document.querySelector(".selected-options");
    const options = document.querySelector(".options");
    const optionElements = document.querySelectorAll(".option");
    const logs = document.querySelector("#logs");

    const arrowDown = document.querySelector("#arrowDown");


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
            arrowDown.classList.remove("fa-angle-down");
            arrowDown.classList.add("fa-angle-up");
        } else {
            arrowDown.classList.remove("fa-angle-up");
            arrowDown.classList.add("fa-angle-down");
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



    // arrowUp.addEventListener("click", (e) => {
    //     e.preventDefault();  // Prevent any default action
    //     e.stopPropagation();  // Stop the event from bubbling up
    //     addLogs("arrowUp");
    //     closeSelect();
    //     customSelect.blur();  // Manually blur the custom select
    // });

    arrowDown.addEventListener("mousedown", (e) => {
        addLogs("arrowDown: mousedown ");
        e.preventDefault();
        // isArrowClicked = true;
        
    });
    arrowDown.addEventListener("click", (e) => {
        e.preventDefault();  // Prevent any default action
        e.stopPropagation();  // Stop the event from bubbling up
        if (arrowDown.classList.contains("fa-angle-down")) {
            addLogs("arrowDown");
            openSelect();
            customSelect.focus();  // Manually focus the custom select
        } else {
            addLogs("arrowUp");
            closeSelect();
            customSelect.blur();  // Manually blur the custom select
        }

        // Immediately stop focusin event after arrowDown click
        // customSelect.addEventListener("focusin", function handler(event) {
        //     event.stopImmediatePropagation();
        //     customSelect.removeEventListener("focusin", handler);
        // }, { once: true });
    });

    customSelect.addEventListener("focusin", (event) => {
        addLogs("focusin");
        if (!customSelect.classList.contains("open")) {
            openSelect();
        }
        // try {
        //     if (event.explicitOriginalTarget && event.explicitOriginalTarget.id) {
        //         addLogs(`focusin: ${event.explicitOriginalTarget.id}`);
        //     } else {
        //         addLogs("focusin: No ID");
        //     }
        // } catch (e) {
        //     addLogs("focusin: Error");
        // }
    });

    customSelect.addEventListener("focusout", (event) => {
        addLogs("focusout");
        if (!customSelect.contains(event.relatedTarget)) {
            closeSelect();
        }
    });
});
