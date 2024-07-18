document.addEventListener("DOMContentLoaded", function () {
    var selected = [];
    const customSelect = document.querySelector(".custom-select");
    const selectedOptions = document.querySelector(".selected-options");
    const options = document.querySelector(".options");
    const optionElements = document.querySelectorAll(".option");
    const logs = document.querySelector("#logs");


    // const btnSubmit=document.querySelector(".btn-submit");
    const arrow = document.querySelector(".arrow");
    const arrowi = document.querySelector(".arrow i");
    const encodeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };
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
    function toggleOptions() {
        if (customSelect.classList.contains("open")) {
            customSelect.classList.remove("open");

        } else {
            customSelect.classList.add("open");

        }
    }
    function openOptions() {
        customSelect.classList.add("open");
        arrowi.classList.remove("fa-angle-down");
        arrowi.classList.add("fa-angle-up");
    }
    function closeOptions() {
        customSelect.classList.remove("open");
        arrowi.classList.remove("fa-angle-up");
        arrowi.classList.add("fa-angle-down");
    }
    // btnSubmit.addEventListener('click',(event)=>{
    //     toggleOptions();
    // })
    arrow.addEventListener('click', (event) => {
        addLogs("arrow:click");
        event.stopPropagation();  // Prevent focusout event from firing
        
        // toggleOptions();
        if (arrowi.classList.contains("fa-angle-up")){
            // closeOptions();
            triggerFocusOut();
        }else {
            // openOptions();
            triggerFocusIn();
        }
    })

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

    }
    function handleUnSelected(dataValue) {
        const element = options.querySelector(
            `[data-value="${dataValue}"]`,
        );
        console.log("handleUnSelected", element);
        element.classList.remove("active");
        console.log("handleUnSelected", element);
    }
    optionElements.forEach(option => {
        option.addEventListener("click", (e) => {
            const value = option.getAttribute("data-value");
            console.log("Selected value:", value);
            if (option.classList.contains("active")) {
                handleUnSelected(value)
            } else {
                handleSelected(option);
            }

            console.log({ selected });
        })
    });

    customSelect.addEventListener("focusin", function (event) {
        addLogs("focusin");
        openOptions();
        return;
        // console.log(" customSelect : focusin");
        // console.log(" customSelect : focusin.relatedTarget",event.relatedTarget);
        // console.log(" customSelect : focusin.event",event);
        // console.log(" customSelect : focusin.target",event.target);
        // console.log(" customSelect : focusin.explicitOriginalTarget",event.explicitOriginalTarget);
        // console.log(" customSelect : focusin.explicitOriginalTarget.id",event.explicitOriginalTarget.id);
        try {
            if (event.explicitOriginalTarget && event.explicitOriginalTarget.id) {
                addLogs("focusin: " + event.explicitOriginalTarget.id);
            } else {
                addLogs("focusin: No ID");
                // customSelect.classList.add("open");
                openOptions();
            }
        }
        catch (e) {
            addLogs("focusin: 1");
        }
        // if (!event.explicitOriginalTarget.classList.contains("fa-angle-down")){
        //     customSelect.classList.add("open");
        // }
        if (!(event.explicitOriginalTarget.id === "arrow")) {
            customSelect.classList.add("open");
            openOptions();
        }


    });
    // var a;
    customSelect.addEventListener("focusout", function (event) {
        addLogs("focusout");
        // return;
        // console.log(" customSelect : focusout.relatedTarget",event.relatedTarget);
        // console.log(" customSelect : focusout.event",event);
        // console.log(" customSelect : focusout.taget",event.target);
        // console.log(" customSelect : focusout.explicitOriginalTarget",event.explicitOriginalTarget);
        // a=event;
        // options.style.display = "none";
        if (!customSelect.contains(event.relatedTarget)) {
            // options.style.display = "none";
            customSelect.classList.remove("open");
            closeOptions();
        }
    });

    // Prevent focusout when clicking inside options
    // options.addEventListener("mousedown", function(event) {
    //     console.log(" options : mousedown",event);
    //     event.preventDefault();
    // });
});
