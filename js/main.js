var inputSiteName = document.getElementById('siteName')
var inputUrlName = document.getElementById('siteUrl')
var btnSub = document.getElementById("btnSub")
var siteModal = document.getElementById("exampleModal")
var globalIndex = 0
var webSite = []

if(localStorage.getItem("site")){
    webSite = JSON.parse(localStorage.getItem("site"))
    display()
}



function submit(){
    if(validationSiteName() == true && validationSiteUrl() == true){
        
  var url ={
        name: inputSiteName.value,
        link: inputUrlName.value,
    }
    modal()
    webSite.push(url)
    localStorage.setItem("site", JSON.stringify(webSite))
    display()
    clearInputs()
    } 
    modal()
}

function clearInputs(){
    inputSiteName.value = ""
    inputUrlName.value = ""

    inputSiteName.classList.remove('is-valid')
    inputUrlName.classList.remove('is-valid')
}

function display(){
    var cartona = ""
    for(var i = 0; i < webSite.length; i++){
        if(webSite[i].link.startsWith("https://")){
            cartona+= `
            <tr>
            <td>${i+1}</td>
            <td>${webSite[i].name}</td>
            <td>
                <a href="${webSite[i].link}" target="_blank">
                <button class="btn btn-warning fw-semibold">
                    <i class="anime fa-solid fa-eye"></i>
                    Visit
                </button>
                </a>
            </td>
            <td>
                <button onclick="clearItem(${i})" class="btn btn-primary fw-semibold">
                    <i class="fa-solid fa-trash"></i>                        Delete
                </button>
            </td>
        </tr>
            `
        }else if(webSite[i].link.startsWith("www.")){
            cartona+= `
            <tr>
            <td>${i+1}</td>
            <td>${webSite[i].name}</td>
            <td>
                <a href="https://${webSite[i].link}" target="_blank">
                <button class="btn btn-warning fw-semibold">
                    <i class="anime fa-solid fa-eye"></i>
                    Visit
                </button>
                </a>
            </td>
            <td>
                <button onclick="clearItem(${i})" class="btn btn-primary fw-semibold">
                    <i class="fa-solid fa-trash"></i>                        Delete
                </button>
            </td>
        </tr>
            `
        }else{
            cartona+= `
            <tr>
            <td>${i+1}</td>
            <td>${webSite[i].name}</td>
            <td>
                <a href="https://www.${webSite[i].link}" target="_blank">
                <button class="btn btn-warning fw-semibold">
                    <i class="anime fa-solid fa-eye"></i>
                    Visit
                </button>
                </a>
            </td>
            <td>
                <button onclick="clearItem(${i})" class="btn btn-primary fw-semibold">
                    <i class="fa-solid fa-trash"></i>                        Delete
                </button>
            </td>
        </tr>
            `
        }
       
    }
    document.getElementById('data').innerHTML = cartona
}

function clearItem(index){
webSite.splice(index, 1)
localStorage.setItem("site", JSON.stringify(webSite))
display()
}

function validationSiteName(){
    var text = inputSiteName.value
    var regex = /^[a-zA-Z0-9\.]+[a-zA-Z]{2,}(\/[^\s]*)?$/i
    var msgSite = document.getElementById('msgSite')
    if(regex.test(text) == true){
        inputSiteName.classList.add('is-valid')
        inputSiteName.classList.remove('is-invalid')
        // msgSite.classList.add('d-none')
        return true
    }else{
        inputSiteName.classList.remove('is-valid')
        inputSiteName.classList.add('is-invalid')
        // msgSite.classList.remove('d-none')
        return false
    }
}

function validationSiteUrl(){
    var text = inputUrlName.value
    var regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\.]+[a-zA-Z]{2,}(\/[^\s]*)?$/i
    var msgUrl = document.getElementById('msgUrl')
    if(regex.test(text) == true){
        inputUrlName.classList.add('is-valid')
        inputUrlName.classList.remove('is-invalid')
        // msgUrl.classList.add('d-none')
        return true
    }else{
        inputUrlName.classList.remove('is-valid')
        inputUrlName.classList.add('is-invalid')
        // msgUrl.classList.remove('d-none')
        return false
    }
}

function modal(){
    if(validationSiteName() && validationSiteUrl){
        siteModal.classList.add("d-none")
        let backGround = document.querySelector(".modal-backdrop")
        backGround.classList.remove("show")
        location.reload()
    }else{
        siteModal.classList.replace('d-none', 'd-show')
    }
}