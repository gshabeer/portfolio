let reviews = [{
        id: 1,
        img: "img2.webp",
        text: "Lorem ipsum dolor sit  repellendus cupiditate impedit modi esse quas quae sed facilis soluta architecto iure adipisci dignissimos reiciendis volamet consectetur adipisicing elit. Sunt enim repudiandae corrupti dicta dolorum incidunt uptatem quam omnis Dicta nam natus quibusdam sapiente eveniet debitis ullam tempora aliquid",
    },
    {
        id: 2,
        img: "img3.webp",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt enim repudiandae corrupti dicta dolorum incidunt repellendus cupiditate impedit modi esse quas quae sed facilis soluta architecto iure adipisci dignissimos reiciendis voluptatem quam omnis Dicta nam natus quibusdam sapiente eveniet debitis ullam tempora aliquid",
    },
    {
        id: 3,
        img: "img.webp",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam facilis assumenda dolorum rerum, expedita voluptatibus porro est commodi fuga voluptatum reprehenderit repellat eum, ipsam ipsum optio sint minus, enim voluptates?Lorem ipsum dolor sit amet, consectetur",
    }
];


let img = document.querySelector('.person-img');
let text = document.querySelector('.text');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

let cuurentItem = 0;

nextBtn.addEventListener('click', () => {
    cuurentItem++;
    if (cuurentItem > reviews.length - 1) {
        cuurentItem = 0;
    }
    currSlide();
});

prevBtn.addEventListener('click', () => {
    if (cuurentItem == 0) {
        cuurentItem = reviews.length;
    }
    cuurentItem--;
    currSlide();
});

function currSlide() {
    let item = reviews[cuurentItem];
    img.src = item.img;
    text.textContent = item.text;
}