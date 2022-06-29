        let mainDiv = document.querySelector('.main');
        let text = document.querySelector('.text');
        let imgViewer = document.querySelector('.img-viewer');
        let closeBtn = document.querySelector('.cross');
        let inputBox = document.querySelector('input');
        let file;

        inputBox.addEventListener("change", function () {
            file = this.files[0];
            showImg();
        });

        mainDiv.addEventListener('dragover', (e) => e.preventDefault());

        mainDiv.addEventListener('dragenter', (e) => {
            text.innerHTML = `<h2>Release To Veiw</h2>`;
            mainDiv.classList.add('hold');
        });

        document.addEventListener('dragleave', (e) => {
            text.innerHTML = `<h2>Drop An Image <br> OR <br> Browse Image</h2>`;
        });

        mainDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            mainDiv.classList.remove('hold');
            file = e.dataTransfer.files[0];
            showImg();
        });

        closeBtn.addEventListener("click", () => {
            imgViewer.classList.add('hide');
            closeBtn.classList.add('hide');
        });

        function showImg() {
            let fileType = file.type;
            let validExt = ["image/jpeg", "image/jpg", "image/png"];
            if (validExt.includes(fileType)) {
                let fileReader = new FileReader();

                fileReader.onload = () => {
                    let fileUrl = fileReader.result;
                    let imgTag = `<img src="${fileUrl}" alt="No Image Loaded">`;
                    closeBtn.classList.remove('hide');
                    imgViewer.classList.remove('hide');
                    imgViewer.innerHTML = imgTag;
                }
                fileReader.readAsDataURL(file);
            } else {
                alert("Please drop an image file!");
            }

        }


        // Body default getting everything open in body
        document.body.addEventListener('dragover', (e) => e.preventDefault(), false);

        document.body.addEventListener('drop', (e) => e.preventDefault(), false);