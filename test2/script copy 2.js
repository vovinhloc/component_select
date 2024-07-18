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

    arrowUp.addEventListener("click",(e)=>{
        arrowUp.classList.remove("show");
        arrowUp.classList.add("hide");

        arrowDown.classList.remove("hide");
        arrowDown.classList.add("show");
    })
    function addLogs(msg) {
        logs.innerHTML += msg + "  </br>";
    }

    addLogs("start");

    function triggerFocusOut() {
        const event = new FocusEvent('focusout', {
            bubbles: true,
            cancelable: true,
            relatedTarget: document.body // Set to the element that should receive focus next
        });
        customSelect.dispatchEvent(event);
    }

    function triggerFocusIn() {
        const event = new FocusEvent('focusin', {
            bubbles: true,
            cancelable: true,
            relatedTarget: document.body // Set to the element that should receive focus next
        });
        customSelect.dispatchEvent(event);
    }

    function openOptions() {
        customSelect.classList.add("open");
        // arrowi.classList.remove("fa-angle-down");
        // arrowi.classList.add("fa-angle-up");
    }

    function closeOptions() {
        customSelect.classList.remove("open");
        // arrowi.classList.remove("fa-angle-up");
        // arrowi.classList.add("fa-angle-down");
    }

    // arrow.addEventListener('click', (event) => {
    //     addLogs("arrow:click");
    //     event.stopPropagation();  // Prevent focusout event from firing

    //     if (arrowi.classList.contains("fa-angle-up")) {
    //         triggerFocusOut();
    //     } else {
    //         triggerFocusIn();
    //     }
    // });

    function handleSelected(option) {
        const value = option.getAttribute("data-value");
        selected.push(value);
        let span = document.createElement("span");
        span.innerText = value;
        span.id = "selected_" + encodeHTML(value);
        span.classList.add("tag");

        let spanx = document.createElement("span");
        spanx.classList.add("remove-tag");
        spanx.innerHTML = "&times;";

        span.appendChild(spanx);
        selectedOptions.appendChild(span)
        option.classList.add("active");

        spanx.addEventListener("click", function () {
            handleUnSelected(value);
            span.remove();
        });
    }

    function handleUnSelected(dataValue) {
        const element = options.querySelector(`[data-value="${dataValue}"]`);
        if (element) {
            element.classList.remove("active");
        }
        selected = selected.filter(value => value !== dataValue);
    }

    optionElements.forEach(option => {
        option.addEventListener("click", (e) => {
            const value = option.getAttribute("data-value");
            console.log("Selected value:", value);
            if (option.classList.contains("active")) {
                handleUnSelected(value);
                const tag = document.getElementById("selected_" + encodeHTML(value));
                if (tag) tag.remove();
            } else {
                handleSelected(option);
            }
            console.log({ selected });
        });
    });

    customSelect.addEventListener("focusin", function (event) {
        addLogs("focusin");
        openOptions();
        try {
            if (event.explicitOriginalTarget && event.explicitOriginalTarget.id) {
                addLogs("focusin: " + event.explicitOriginalTarget.id);
            } else {
                addLogs("focusin: No ID");
            }
        } catch (e) {
            addLogs("focusin: 1");
        }
        if (!(event.explicitOriginalTarget && event.explicitOriginalTarget.id === "arrow")) {
            customSelect.classList.add("open");
            openOptions();
        }
    });

    customSelect.addEventListener("focusout", function (event) {
        addLogs("focusout");
        if (!customSelect.contains(event.relatedTarget)) {
            customSelect.classList.remove("open");
            closeOptions();
        }
    });

    options.addEventListener("mousedown", function (event) {
        event.preventDefault();
    });
});
