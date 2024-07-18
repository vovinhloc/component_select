class CustomSelect extends HTMLElement {
    constructor() {
        super();

        // Tạo Shadow DOM
        this.attachShadow({ mode: 'open' });
        this._value = []; // Thêm biến để lưu giá trị đã chọn
        this.selectedItemsContainer = null; // Thêm container cho các item đã chọn
        // Nội dung HTML của component
        const htmlElement=`
         <div class="custom-select open1" tabindex="0">
            <div class="select-box">
                <input type="text" class="tags-input" name="tags" hidden>
                <div class="selected-options">
                    <!-- <span class="tag">Black<span class="remove-tag">&times;</span></span>
                    <span class="tag">Red<span class="remove-tag">&times;</span></span>
                    <span class="tag">Green<span class="remove-tag">&times;</span></span>
                    <span class="tag">See see<span class="remove-tag">&times;</span></span>
                    <span class="tag">Hello k<span class="remove-tag">&times;</span></span>
                    <span class="tag">kk helo<span class="remove-tag">&times;</span></span>
                    <span class="tag">+5<span class="remove-tag">&times;</span></span> -->
                </div>
                <div  class="arrow">
                    <i id="arrowDown" id="arrow" class="fa fa-angle-down "></i>
                    
                </div>
            </div>
            <div class="options">
                <div class="option-search-tags">
                    <input type="text" class="search-tags" placeholder="Search tags ...">
                    <button class="clear"><i class="fa fa-close"></i></button>
                </div>
                <div class="option all-tags" data-value="all">Select All</div>
                <div class="option " data-value="Apple">Apple</div>
                <div class="option" data-value="Bom">Bom</div>
                
                <div class="option" data-value="le">Le</div>
                <div class="option" data-value="hoa">hoa</div>
                <div class="option" data-value="dau">dau</div>
                <div class="option" data-value="ga">ga</div>
                <div class="option" data-value="nong">nong</div>
                <div class="option" data-value="dan">dân</div>
                <div class="option" data-value="kho">kho</div>
                <div class="no-result-message" style="display: none;">No result match</div>
            </div>
            <div class="tag_error_msg error">This field is required.</div>
        </div>
        <div id="logs"></div>
        `;
        const style=`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'); 
        *{
    font-family: 'REM' ,sans-serif;
    box-sizing: border-box;
    margin:0;
    padding:0;
}
body{
    background-color: antiquewhite;
}
.show{
  display: block;
}
.hide{
  display: none;

}
.container {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .custom-select {
    position: relative;
    width: 30rem;
    border: 1px solid gold;
  }
  .select-box{
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 0.8rem;
    cursor: pointer;
  }
  .selected-options{
    display: flex;
    flex-wrap: wrap;
    margin-top:0;
  }
  .tag{
    background-color: #f2f2f2;
    color: #000;
    border-radius: .3rem;
    margin-right: 0.3rem;
    margin-top:0.15rem;
    margin-bottom: 0.15rem;
    padding:0.2rem 1rem;
    display: flex;
    align-items: center;
  }
  .remove-tag{
    margin-left:.5rem;
    cursor: pointer;
  }
  .arrow{
    margin :0 1rem;
  }
  .fa-angle-down,.fa-angle-up{
    color: #404040;
    font-size: 1.5rem;
  }
  .options{
    display:none;
    width: 100%;
    background-color:white;
    border:1px solid #ced4da;
    max-height: 20rem;
    overflow-y:auto;
    z-index: 1;
    box-shadow: 0px 4px 8px rgb(0,0,0,0.1);
  }
  .open .options{
    display: block;
  }
  .option-search-tags{
    position: relative;
    background-color: #ffffff;
    border: 1px solid #ced4da;
    padding: 8px 0px;
    margin: 8px;
  }
  .search-tags{
width: 100%;
    border: none;
    outline: none;
    padding:8px;
    font-size: 14px;
  }
  .clear{
    position: absolute;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size:14px;
    font-weight: 600;
    padding:0px;
    color: blue;
    top:15px;
    left:auto;
    right:15px;
  }
  .option{
    padding:12px;
    cursor: pointer;
  }
  .option.active{
    color:#000;
    background-color:#f2f2f2;
    border-bottom: 1px solid yellow;
    font-weight: bold;;
    /* pointer-events: none; */
  }
  .tag:hover{
    background-color: #eaeaea;
    
  }
  .option:hover{
    background-color: #f3f1f1c7;
  }
  .option.active:hover{
    background-color: #eaeaeab7;
  }
  .no-result-message{
    padding: 0px 0px 12px 12px;
  }
  .error{
    color:#ff1a2a;
    margin-top:8px;
  }

  
.btn-submit {
    border: none;
    padding: 1rem;
    font-size: 1rem;
    background: #2fe22f;
    color: white;
    font-weight: 600;
  }
  .btn-submit:hover {
    background: #27c127;
  }
        `;
        // console.log(style);
        this.shadowRoot.innerHTML = `
    <style>

        ${style}

    </style>
    
    ${htmlElement}
`;

        // Lấy các phần tử cần thiết
        // this.searchInput = this.shadowRoot.getElementById('searchInput');
        // this.selectBox = this.shadowRoot.getElementById('selectBox');
        // this.items = this.shadowRoot.querySelectorAll('.select-box-item');
        // this.selectedItemsContainer = this.shadowRoot.getElementById('selectedItems');
        

        // Xử lý sự kiện
        // this.addEvents();

        this.customSelect = this.shadowRoot.querySelector(".custom-select");
        this.logs = this.shadowRoot.querySelector("#logs");
        console.log(this.logs);
        this.arrowDown = this.shadowRoot.querySelector("#arrowDown");
        this.addEvents();
    }

    encodeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };
    addLogs = (msg) => {
        this.logs.innerHTML += `${msg} </br>`;
    };
    toggleArrows = (showUp) => {
        if (showUp) {
            this.arrowDown.classList.remove("fa-angle-down");
            this.arrowDown.classList.add("fa-angle-up");
        } else {
            this.arrowDown.classList.remove("fa-angle-up");
            this.arrowDown.classList.add("fa-angle-down");
        }
    };
    openSelect = () => {
        this.customSelect.classList.add("open");
        this.toggleArrows(true);
    };

    closeSelect = () => {
        this.customSelect.classList.remove("open");
        this.toggleArrows(false);
    };
    addEvents(){
        this.arrowDown.addEventListener("mousedown", (e) => {
            this.addLogs("arrowDown: mousedown ");
            e.preventDefault();
            // isArrowClicked = true;
            
        });
        this.arrowDown.addEventListener("click", (e) => {
            e.preventDefault();  // Prevent any default action
            e.stopPropagation();  // Stop the event from bubbling up
            if (this.arrowDown.classList.contains("fa-angle-down")) {
                this.addLogs("arrowDown");
                this.openSelect();
                this.customSelect.focus();  // Manually focus the custom select
            } else {
                this.addLogs("arrowUp");
                this.closeSelect();
                this.customSelect.blur();  // Manually blur the custom select
            }
    
            // Immediately stop focusin event after arrowDown click
            // customSelect.addEventListener("focusin", function handler(event) {
            //     event.stopImmediatePropagation();
            //     customSelect.removeEventListener("focusin", handler);
            // }, { once: true });
        });
    
        this.customSelect.addEventListener("focusin", (event) => {
            this.addLogs("focusin");
            if (!this.customSelect.classList.contains("open")) {
                this.openSelect();
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
    
        this.customSelect.addEventListener("focusout", (event) => {
            this.addLogs("focusout");
            if (!this.customSelect.contains(event.relatedTarget)) {
                this.closeSelect();
            }
        });
    }
    // connectedCallback() {

    //     this.fetchOptions();
    //     // this.selectedItemsContainer = document.createElement('div');
    //     // this.selectedItemsContainer.classList.add('selected-items-container');
    //     // this.shadowRoot.querySelector('.custom-select-container').appendChild(this.selectedItemsContainer);
    // }

    // async fetchOptions(query = "") {
    //     try {
    //         if (!query) {
    //             return this.updateOptions([]); // Xóa danh sách nếu không có query
    //         }
    //         const apiUrl = this.getAttribute('api-url') || 'http://localhost:3000/api/options'; // Thay đổi nếu cần
    //         const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`); // Gửi query lên server
    //         // const response = await fetch(apiUrl);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok.');
    //         }
    //         const options = await response.json();
    //         this.updateOptions(options);
    //     } catch (error) {
    //         console.error('Error fetching options:', error);
    //         this.selectBox.innerHTML = '<div class="select-box-item">Error loading options</div>';
    //     }
    // }

    // updateOptions(options) {
    //     // this.selectBox.innerHTML = options.map(option => `<div class="select-box-item" data-id="${option.id}">${option.name}</div>`).join('');
    //     this.selectBox.innerHTML = options.map(option => `
    //         <div class="select-box-item" data-id="${option.id}">
    //             <input type="checkbox" id="cb_${option.id}">
    //             <label for="cb_${option.id}">${option.name}</label>
    //         </div>
    //     `).join('');
    //     this.items = this.shadowRoot.querySelectorAll('.select-box-item');
    //     this.addEvents();
    // }
    // Thêm phương thức xử lý sự kiện input với debounce
    // handleInput = debounce(() => {
    //     const query = this.searchInput.value.trim();
    //     this.fetchOptions(query); // Gọi fetchOptions với query
    // }, 300); // Debounce với thời gian 300ms (có thể tùy chỉnh)

    // Thêm các sự kiện cho component
    // addEvents() {
    //     this.searchInput.addEventListener('focus', () => this.selectBox.style.display = 'block');
    //     this.searchInput.addEventListener('blur', () => setTimeout(() => this.selectBox.style.display = 'none', 200));

    //     this.searchInput.addEventListener('input', this.handleInput); // Sử dụng handleInput với debounce
    //     // this.searchInput.addEventListener('input', () => {
    //     //     const filter = this.searchInput.value.toLowerCase();
    //     //     this.items.forEach(item => {
    //     //         const text = item.textContent.toLowerCase();
    //     //         item.style.display = text.includes(filter) ? '' : 'none';
    //     //     });
    //     // });


    //     this.items.forEach(item => {
    //         const checkbox = item.querySelector('input[type="checkbox"]');
    //         checkbox.addEventListener('change', () => {
    //             const id = item.dataset.id;
    //             const name = item.textContent;
    //             const value = { id, name };

    //             if (checkbox.checked) {
    //                 this._value.push(value);
    //                 this.addSelectedItem(value); // Thêm vào container

    //                 const selectedItem = document.createElement('div');
    //                 selectedItem.classList.add('selected-item');
    //                 selectedItem.textContent = item.textContent;

    //                 const removeIcon = document.createElement('span');
    //                 removeIcon.classList.add('remove-item');
    //                 removeIcon.textContent = 'x';
    //                 removeIcon.addEventListener('click', function () {
    //                     selectedItemsContainer.removeChild(selectedItem);
    //                 });
    //                 selectedItem.appendChild(removeIcon);
    //                 selectedItemsContainer.appendChild(selectedItem);

    //                 searchInput.value = '';
    //             } else {
    //                 this._value = this._value.filter(v => v.id !== id);
    //                 this.removeSelectedItem(id); // Xóa khỏi container
    //             }

    //             // this.searchInput.value = this._value.map(v => v.name).join(',');
    //             // console.log(this.searchInput.value);
    //             this.dispatchEvent(new CustomEvent('change', {
    //                 detail: { value: this._value },
    //                 bubbles: true,
    //                 composed: true
    //             }));
    //         });
    //         // item.addEventListener('click', () => {
    //         //     const id = item.dataset.id;
    //         //     const name = item.textContent;

    //         //     this.searchInput.value = item.textContent;
    //         //     this.selectBox.style.display = 'none';
    //         //     // this._value = item.textContent;
    //         //     this._value = { id, name }; // Lưu cả id và name
    //         //     // this.dispatchEvent(new Event('change')); 
    //         //     // Tạo và dispatch một custom event
    //         //     // event.detail={ value: this._value };
    //         //     const event = new CustomEvent('change', {
    //         //         detail: { value: this._value },
    //         //         bubbles: true,
    //         //         composed: true
    //         //     });
    //         //     this.dispatchEvent(event);
    //         // });

    //         // this.dispatchEvent(event);
    //     });


    // }

    // addSelectedItem(value) {
    //     const item = document.createElement('div');
    //     item.classList.add('selected-item');
    //     item.textContent = value.name;
    //     item.dataset.id = value.id;
    //     this.selectedItemsContainer.appendChild(item);

    //     // Thêm sự kiện click để xóa item đã chọn
    //     item.addEventListener('click', () => {
    //         const checkbox = this.shadowRoot.querySelector(`#cb_${value.id}`);
    //         if (checkbox) {
    //             checkbox.checked = false;
    //             checkbox.dispatchEvent(new Event('change')); // Kích hoạt lại sự kiện change
    //         }
    //     });
    // }

    // removeSelectedItem(id) {
    //     const item = this.selectedItemsContainer.querySelector(`[data-id="${id}"]`);
    //     if (item) {
    //         item.remove();
    //     }
    // }
    // // Thêm getter để lấy giá trị hiện tại
    // get value() {
    //     return this._value;
    // }
}
// Hàm debounce để tối ưu hóa việc gọi API khi người dùng gõ liên tục
// function debounce(func, wait) {
//     let timeout;
//     return function (...args) {
//         const context = this;
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(context, args), wait);
//     };
// }
// Đăng ký custom element
customElements.define('custom-select', CustomSelect);
