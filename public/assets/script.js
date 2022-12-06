let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let imgButton = document.getElementById("insertImage");
let htmlButton = document.getElementById("editHtml");
let modalHtml = document.getElementById("modalHtml");
let htmlCancelBtn = document.getElementById("Cancel");
let htmlSaveBtn = document.getElementById("Save");
let inputHtml = document.getElementById('html-input');
let modalImg = document.getElementById("modalImg");
let buttonCancel = document.querySelectorAll("#btnCancel");
let buttonConfirm = document.getElementById('btnEnviar');
let buttonEnviarLink = document.getElementById('btnEnviarLink')


let fontList = ["Times New Roman","Arial","Verdana","Garamond","Georgia","Courier New","Montserrat","Poppins","Cursive"];

const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontList.map(value => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for(let i = 1; i<=10; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    };

    fontSizeRef.value = 4;
}

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

imgButton.addEventListener("click", () => {
    modalImg.showModal();
});

htmlButton.addEventListener("click", () => {
    inputHtml.innerText = writingArea.innerHTML;
    modalHtml.showModal();
})

htmlCancelBtn.addEventListener("click", () =>{
    modalHtml.close();
})

htmlSaveBtn.addEventListener("click", () =>{
    writingArea.innerHTML = inputHtml.innerText;
    modalHtml.close();
})

buttonCancel.forEach((button) => {
    button.addEventListener("click", () => {
        modalImg.close();
    });
});

buttonConfirm.addEventListener("click", () =>{
    const Link = document.getElementById('imageLink');
    let imgHeight = document.getElementById('imgheight').value;
    let imgWidth = document.getElementById('imgwidth').value;
    Link.select();
    Link.setSelectionRange(0, 99999);
    const imgUrl = Link.value;
    writingArea.innerHTML += `<img src="${imgUrl}" style="width: ${imgWidth}px; height: ${imgHeight}px; max-width: 90%;"/>`;
    document.getElementById('success').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');
    modalImg.close();
});

buttonEnviarLink.addEventListener("click", () => {
    const Link = document.getElementById('imgLinkInsert');
    const imgHeight = document.getElementById('imgheight').value;
    const imgWidth = document.getElementById('imgwidth').value;
    Link.select();
    Link.setSelectionRange(0, 99999);
    const imgUrl = Link.value;
    writingArea.innerHTML += `<img src="${imgUrl}" style="width: ${imgWidth}px; height: ${imgHeight}px; max-width: 90%;"/>`;
    modalImg.close();
});

optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id,false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    })
})

linkButton.addEventListener("click", () => {
    let userLink = prompt("Insira a URL");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink)
    }
    else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink)
    }
})

const highlighter = (className, highlight) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if(highlight){
                let Active = false;

                if(button.classList.contains("active") || button.classList.contains("spacing")){
                    Active = true;
                }
                highlighterRemover(className);
                if(!Active){
                    button.classList.add("active");
                }
            }
            else{
                button.classList.toggle("active")
            }
        })
    })
}

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    })
}

window.onload = initializer();