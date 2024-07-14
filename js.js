class CustomSelect extends HTMLElement {
    constructor() {
        super();

        // Tạo Shadow DOM
        this.attachShadow({ mode: 'open' });
        this._value = ''; // Thêm biến để lưu giá trị đã chọn

        // Nội dung HTML của component
        this.shadowRoot.innerHTML = `
    <style>

.custom-select-container {
position: relative;

}

#searchInput {
width: 100%;
padding: 10px;
box-sizing: border-box;
border: 1px solid #ccc;
border-radius: 4px;
}

.select-box {
position: absolute;
top: 100%;
left: 0;
right: 0;
border: 1px solid #ccc;
border-top: none;
border-radius: 0 0 4px 4px;
max-height: 200px;
overflow-y: auto;
display: none;
background-color: #fff;
z-index: 1000;
}

.select-box-item {
padding: 10px;
cursor: pointer;
}

.select-box-item:hover {
background-color: #f0f0f0;
}

    </style>
    <div class="custom-select-container">
        <input type="text" id="searchInput" placeholder="Search...">
        <div id="selectBox" class="select-box">
            
        </div>
    </div>
`;

        // Lấy các phần tử cần thiết
        this.searchInput = this.shadowRoot.getElementById('searchInput');
        this.selectBox = this.shadowRoot.getElementById('selectBox');
        this.items = this.shadowRoot.querySelectorAll('.select-box-item');

        // Xử lý sự kiện
        this.addEvents();
    }

    connectedCallback() {
        console.log(
            "connectedCallback"
        )
        this.fetchOptions();
    }

    async fetchOptions(query = "") {
        try {
            if (!query) {
                return this.updateOptions([]); // Xóa danh sách nếu không có query
            }
            const apiUrl = this.getAttribute('api-url') || 'http://localhost:3000/api/options'; // Thay đổi nếu cần
            const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`); // Gửi query lên server
            // const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const options = await response.json();
            this.updateOptions(options);
        } catch (error) {
            console.error('Error fetching options:', error);
            this.selectBox.innerHTML = '<div class="select-box-item">Error loading options</div>';
        }
    }

    updateOptions(options) {
        this.selectBox.innerHTML = options.map(option => `<div class="select-box-item" data-id="${option.id}">${option.name}</div>`).join('');
        this.items = this.shadowRoot.querySelectorAll('.select-box-item');
        this.addEvents();
    }
    // Thêm phương thức xử lý sự kiện input với debounce
    handleInput = debounce(() => {
        const query = this.searchInput.value.trim();
        this.fetchOptions(query); // Gọi fetchOptions với query
    }, 300); // Debounce với thời gian 300ms (có thể tùy chỉnh)

    // Thêm các sự kiện cho component
    addEvents() {
        this.searchInput.addEventListener('focus', () => this.selectBox.style.display = 'block');
        this.searchInput.addEventListener('blur', () => setTimeout(() => this.selectBox.style.display = 'none', 200));

        this.searchInput.addEventListener('input', this.handleInput); // Sử dụng handleInput với debounce
        // this.searchInput.addEventListener('input', () => {
        //     const filter = this.searchInput.value.toLowerCase();
        //     this.items.forEach(item => {
        //         const text = item.textContent.toLowerCase();
        //         item.style.display = text.includes(filter) ? '' : 'none';
        //     });
        // });


        this.items.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                const name = item.textContent;

                this.searchInput.value = item.textContent;
                this.selectBox.style.display = 'none';
                // this._value = item.textContent;
                this._value = { id, name }; // Lưu cả id và name
                // this.dispatchEvent(new Event('change')); 
                // Tạo và dispatch một custom event
                // event.detail={ value: this._value };
                const event = new CustomEvent('change', {
                    detail: { value: this._value },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(event);
            });

            // this.dispatchEvent(event);
        });


    }

    // Thêm getter để lấy giá trị hiện tại
    get value() {
        return this._value;
    }
}
// Hàm debounce để tối ưu hóa việc gọi API khi người dùng gõ liên tục
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
// Đăng ký custom element
customElements.define('custom-select', CustomSelect);
