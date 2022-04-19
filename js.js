let form = document.querySelector('form'),
    done = document.querySelector('#done'),
    sag = document.querySelector('.pasp i'),
    typ = document.querySelector('.pasp input'),
    fal = document.querySelector('.fandl'),
    slc = document.querySelector('.slc'),
    or = document.querySelector('.or'),
    alin = document.querySelectorAll('input[type]'),
    file = document.querySelector('input[type ="file"]'),
    logup = true,
    errors = document.querySelectorAll('.ero'),
    prr;

sag.onclick = () => {

    if (typ.type == 'password') {
        
        sag.className = 'fa-solid fa-eye-slash';
        typ.type = 'text';
        
    } else {
        sag.className = 'fa-solid fa-eye';
        typ.type = 'password';
    };
};

form.onsubmit = (a) => {
    a.preventDefault();
};

or.lastElementChild.onclick = () => {
    
    if (logup) {
        
        fal.style.cssText = 'display:none';
        slc.style.cssText = 'display:none';
        done.innerHTML = 'sign in';
        or.lastElementChild.innerHTML = 'sign up?'
        or.firstElementChild.innerHTML = 'not have account';
        logup = false;
        alin[0].name = '';
        alin[1].name = '';   
    } else {
        fal.removeAttribute('style');
        slc.removeAttribute('style');
        done.innerHTML = 'sign up';
        or.lastElementChild.innerHTML = 'sign in?'
        or.firstElementChild.innerHTML = 'already login';
        alin[0].name = 'first name';
        alin[1].name = 'last name';
        logup = true;
        
    }
}

// on send data to database

let num = 0;

alin.forEach((a) => {
    
    let s = num;

    a.oninput = (e) => {

        e = e.path[0];

        if (e.name == 'password') {

            password(e.value, e)
            
        } else if (e.name == 'file') {

            image(e.value)

        }else if (e.name == 'email') {

            email(e.value);

        } else {

            if (e.value != '') {

                errori(errors[s])
            } else {
                errori(errors[s], e.name + " " + 'required');
            }
            
        }
}
    num++

});
done.onclick = () => {

    ch()
       
    if (email(alin[2].value)) {

        errori(errors[2]);
        
        if (password(alin[3].value,alin[3])) {
            
            errori(errors[3]);
            
    if (image(file.value)) {
            
            sendd('php.php')
    }
    
   
    }}
}
function sendd(t) {


    console.log(t);
    
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', t, true);
    
    xhr.onload = () => {
        
        if (xhr.readyState == XMLHttpRequest.DONE) {
            
            
        if (xhr.status == 200) {
         let data = xhr.response;
                
         console.log(data)
                
        }}}
            
    xhr.send(new FormData(form));
            
}
function erim(t) {
    let ero = document.querySelector('.error');
    let erop = document.querySelector('.error p');

    if (t) {
        
        erop.innerHTML = t;
        ero.classList.remove('tim');
        setTimeout(() => { ero.classList.add('tim'); }, 0);
        ero.removeAttribute('style');

    } else {
                ero.style.display = 'none';
    }
}
function errori(s, t = false, color = "#f00", i = "fa solid fa-circle-xmark") {
            
    if (t) {
        
        s.style.opacity = 1
        s.firstElementChild.innerHTML = t;
        s.lastElementChild.className = i;
        s.firstElementChild.style.color = color;
        s.lastElementChild.style.color = color;
        
    } else {
        
        s.style.opacity = 0;

    }
}
function ch() {

    let aa = 0;

    alin.forEach((a) => {


        if (a.name == 'password') {

            password(a.value, a)
            
        } else if (a.name == 'file') {

            image(a.value);


        } else if (a.name == 'email') {

            email(a.value);

        } else {

            if (a.value != '') {

                errori(errors[aa])
                
            } else {
                
                errori(errors[aa], a.name + " " + 'required');

            }
        }
    aa++;
    
    });

};

// function check email valid or not

function email(text) {

    prr = text.match(/\w+@\w+\.\w+/);
    
            
    if (prr != '' && prr != null && prr[0] == text) {

        errori(errors[2], 'email is valid',
        '#0f0', "fa solid fa-circle-check");
        return true;
        
    } else {
        
        errori(errors[2], 'email is not valid')
        return false;
    }
    
}
// chick is image or not 
function image(text) {

    let arr = text.split('.'); arr = arr[arr.length - 1];

    if (arr == 'png' || arr == 'jpg' || arr == 'jpeg') {
        
        erim();
        return true;
        
    } else {
        
        erim("this image not valid");

        return false;
    }
    
}

// password check is valid or not

function password(text, v) {
    
    let par = v.parentElement;
        
        let pass = 0;
        if (/[a-z]/i.test(text)) { pass += 1; };
        if (/\W/.test(text)) { pass += 1; };
        if (/\d/.test(text)) { pass += 1; };

    if (pass == 3 && text.length >= 6) {

        errori(errors[3], 'password is sterng',
            '#0f0', "fa solid fa-circle-check");
        par.style.border = 'solid 2px #0f0';
        par.lastElementChild.style.color = '#0f0';
            
    } else if (pass == 2 && text.length >= 6) {
            
        errori(errors[3], 'password is medium',
            '#ff9800', "fa solid fa-circle-check");
        par.style.border = 'solid 2px #ff9800';
        par.lastElementChild.style.color = '#ff9800';  
    }
    else {
            
        errori(errors[3], 'password is weak');
        par.style.border = 'solid 2px #f00';
        par.lastElementChild.style.color = '#f00';
        return false;
    }
        return true;
}
