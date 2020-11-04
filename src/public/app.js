
const Form = document.querySelector('form');
const search = document.querySelector('input');
const messageTwo = document.getElementsByClassName('created1')[0];
let messageOne = document.getElementsByClassName('error')[0];

// messageOne.textContent='From JavaScript';
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
function ERROR(){
    messageOne.style.visibility = "visible";
        setTimeout(() => {
            messageOne.style.visibility = "collapse";

        }, 2000);
        return;
}
Form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validURL(search.value)) {
        return ERROR();
    }
    try
    {
        const response=await fetch('/url/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: search.value
            })
        });
        const data= await response.json();
        if(!(data.url._key && (data.url._key+"").length==5))
            return ERROR();
        console.log(data.url);
        //console.log(data.url._key);
        messageTwo.innerHTML="<h3><a href=\""+data.url._url+"\"> https://sumantourlshort.herokuapp.com/"+data.url._key+"</a> is the shortened URL</h3>";
    }
    catch(error)
    {
        console.log(error);
    }
    
});
