let customSelect=document.querySelector(".custom-select");
let selectBox=document.querySelector(".select-box");
let tagsInput=document.querySelector(".tags-input");
let searchTags=document.querySelector(".search-tags");
customSelect.addEventListener("focusin",(e)=>{
    console.log("customSelect:focusin");
    customSelect.classList.add("open");
})
customSelect.addEventListener("focusout",(e)=>{
    console.log("customSelect:focusout");
    customSelect.classList.remove("open");
})


// Prevent focusout when clicking inside options
options.addEventListener("mousedown", function(event) {
    event.preventDefault();
});

// searchTags.addEventListener("focus",(e)=>{
//     console.log("searchTags : Focus");
//     customSelect.classList.add("open");
// })
// searchTags.addEventListener("blur",(e)=>{
//     console.log("searchTags : Blur");
//     customSelect.classList.remove("open");
// })

// tagsInput.addEventListener("focus",(e)=>{
//     console.log("tagsInput : Focus");
//     customSelect.classList.add("open");
// })
// tagsInput.addEventListener("blur",(e)=>{
//     console.log("tagsInput:Blur");
//     customSelect.classList.remove("open");
// })

// function handleFocustOut(){
//     console.log("handleFocustOut");
// }
// selectBox.addEventListener("focusout",handleFocustOut);
// tagsInput.addEventListener("focus",(e)=>{
//     console.log("tagsInput : Focus");
// })


// searchTags.addEventListener("focus",(e)=>{
//     console.log("searchTags : Focus");
// })
// searchTags.addEventListener("blur",(e)=>{
//     console.log("searchTags:Blur");
// })
