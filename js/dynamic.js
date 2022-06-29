// Data about sections
let sections = [
  {
    heading: "About Us",
    sub_heading: "We Build Website That Build Your Business",
    text: "Since the commercialization of the Web, Web development has been a growing industry. The growth of this industry is being driven by businesses wishing to use their Web site to advertise and sell products and services to customers.",
    img: "img/img1.webp",
    id: "about",
    class: "sec2",
    img_class: "img",
    reverse_class: "contents",
    content_class: "content",
    circle_class: "curcle",
  },
  {
    heading: "Our Services",
    sub_heading: "Web Development",
    text: "Web development ranges from creating plain text pages to complex web-based applications, social network applications and electronic business applications.",
    img: "img/img2.webp",
    id: "services",
    class: "sec3",
    img_class: "img2",
    reverse_class: "services-section",
    content_class: "content2",
    circle_class: "curcle2",
  },
  {
    heading: "Our Projects",
    sub_heading: "Responsive Projects",
    text: "I have created many responsive projects. You can also veiw particular project by clicking open project button and you can feel that project.",
    img: "img/img6.webp",
    id: "projects",
    class: "sec4",
    img_class: "img",
    reverse_class: "contents",
    content_class: "content",
    circle_class: "curcle",
  },
];

// Data about services
let services = [
  {
    sub_heading: "Mobile Friendly",
    text: "It's easy to read the text no squinting .It's easy to navigate buttons and links are large enough to be tapped with a finger.It 's pleasing to look at. The user experience is enjoyable.",
    img: "img/img3.webp",
    img_class: "img",
    contents_class: "reverse",
    content_class: "content",
    circle_class: "curcle",
  },
  {
    sub_heading: "Responsive Designs",
    text: "This capability extends to any device or browser used to view a website, which means the website appearance and layout change according to the size of the display screen.",
    img: "img/img4.webp",
    img_class: "img3",
    contents_class: "center-service",
    content_class: "content2",
    circle_class: "curcle2",
  },
  {
    sub_heading: "SEO Friendly",
    text: "Search engine optimization (SEO) refers to methods used to increase traffic to a website by increasing its search engine page rank.",
    img: "img/img5.webp",
    img_class: "img",
    contents_class: "reverse",
    content_class: "content",
    circle_class: "curcle",
  },
];

// Add Sections to body
function addSections() {
  for (let i = 0; i < sections.length; i++) {
    let section = document.createElement("section");
    section.classList.add("sec2", sections[i].class);
    section.id = sections[i].id;
    sec_data = `
                <h1 class="heading">${sections[i].heading}</h1>
                <div class="contents ${sections[i].reverse_class}">
                <div class="content ${sections[i].content_class}">
                <h2 class="sub-heading">${sections[i].sub_heading}</h2>
                <p class="txt-content">${sections[i].text}</p>
                <div class="${sections[i].circle_class}"></div>
                </div>
                <div class="${sections[i].img_class}">
                <img src="load.webp" data-src="${sections[i].img}" alt="Loading..." height="300" loading="lazy">
                </div>
                </div> `;

    let childrens = Array.from(document.body.children);
    let contact = document.getElementById("contact");
    let position = childrens.indexOf(contact);

    section.insertAdjacentHTML("beforeend", sec_data);

    document.body.insertBefore(section, childrens[position]);
  }
}

// Add Services to Services Section
function addServices() {
  for (let i = 0; i < services.length; i++) {
    let contents = document.createElement("div");
    contents.classList.add("contents", services[i].contents_class);

    content_data = `
        <div class="${services[i].img_class}">
                <img src="load.webp" data-src="${services[i].img}" alt="Loading..." height="300" loading="lazy">
            </div>
            <div class="content ${services[i].content_class}">
                <h2 class="sub-heading">${services[i].sub_heading}</h2>
                <p class="txt-content">${services[i].text}</p>
                <div class="curcle ${services[i].circle_class}"></div>
            </div>`;

    contents.insertAdjacentHTML("beforeend", content_data);

    document.getElementById("services").appendChild(contents);
  }
}

// Loading image after load
function imgReplace() {
  const imgRef = document.querySelectorAll("img[data-src]");

  const imgObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      let elm = entry.target;
      if (entry.isIntersecting) {
        elm.src = elm.dataset.src;
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );

  imgRef.forEach((currImg) => {
    imgObserver.observe(currImg);
  });
}

// When document load completely then
window.addEventListener("load", () => {
  // Add sections to document after load
  addSections();
  // Add sections to document after load
  addServices();

  // after above functions are performed completely then
  setTimeout(() => {
    // Loading image after load
    imgReplace();

    let projectBtn = `<div class="btn"><a href="projects/project.html" target="_blank">
        <button>See Projects</button></a></div>`;
    document
      .getElementById("projects")
      .querySelector(".txt-content")
      .insertAdjacentHTML("beforeend", projectBtn);
  }, 0);
});

window.onscroll = () => imgReplace();
