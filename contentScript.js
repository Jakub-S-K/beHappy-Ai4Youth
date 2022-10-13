//console.log(div_text);
let empty_objects = [];
let fetch_array = [];
let data = [];
const img_prefix = '/content_img/';
const imgs = ['0.png', '1.png'];

let response = undefined;

let lastUrl = '';
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        data = [];
        empty_objects = [];
        fetch_array = [];
        onUrlChange();
    }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
    console.log('URL changed!', location.href);
    var interval_instance = undefined;
    (async () => {
        div_text = [...document.getElementsByTagName('div')];
        interval_instance = setTimeout(async function () {
            for (div of div_text) {
                if (div.classList?.contains('RichTextJSON-root')) {
                    if(div.hasOwnProperty('ai-img-id')) {
                        console.log('ma property');
                        
                        continue;
                    }
                    empty_objects.push(div.cloneNode(true));
                    //console.log(div.innerText);
                    let text = div.innerText + "\n";
                    //console.log('node uri = ' + div.baseURI);
                    n = div.children;
                    while (n.nextElementSibling != null) {
                        text += n.nextElementSibling.innerText;
                        n = n.nextElementSibling;
                    }
                    //console.log(text);
                    fetch_array.push(fetch('http://127.0.0.1:5000/predict', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ quote: text })
                    }).then(response => response.json()));
                }
            }
            data = await Promise.all(fetch_array);
            for (obj of data) {
                obj['send'] = true;
            };
            console.log(data);

            all_divs = document.getElementsByTagName('div');
            length = all_divs.length;
            let counter = 0;
            for (let i = 0; i < length; i++) {
                div = all_divs[i];
                //console.log(div);
                if (div.hasAttribute('data-testid')) {
                    if (div.getAttribute('data-testid') == 'post-comment-header') {
                        //console.log('jest naglowek');
                        insert = document.createElement('img');
                        if (data != null && data[counter] != null && data[counter].is_negative != null) {
                            img_number = imgs[data[counter].is_negative];
                        } else {
                            var img_number = imgs[0];
                        }
                        //console.log(div.children[0]);
                        if(attributeInChildren(div.children[0], 'ai-img-id')) {
                            console.log('jest juz'); //TODO: check if img exists 
                            continue;
                        }
                        insert.src = chrome.runtime.getURL(`${img_prefix + img_number }`);
                        insert.setAttribute('ai-img-id', counter);
                        //insert['ai-img-id'] = counter;
                        insert.height = 32;
                        insert.width = 32;
                        insert.style.position = 'absolute';
                        insert.style.right = '0px';
                        div.children[0].appendChild(insert);
                        counter++;
                    }
                }
            }

        }, 3000);

    })();
    return interval_instance;
}

function attributeInChildren(parent, name) {
    console.log(parent);
    var node = parent.children[0];
    if (node.getAttribute(name)) {
        console.log('pierwsze')
        return true;
    }
    while (node.nextElementSibling != null) {
        if (node.getAttribute(name)) {
            return true;
        }
        node = node.nextElementSibling;
    }
    if (node.getAttribute(name)) {
        return true;
    }
    return false;
}

/*
losowe_p.map((element, idx, array) => {
    if (element.innerHTML) {
        let temp = {
            quote: element.innerHTML
        }
        //element.innerText = "div_text"
        //console.log(el.innerHTML);
        empty_objects.push(temp);
    }

});
console.log(JSON.stringify(empty_objects)); //potezny obiekt
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
fetch_array = []
empty_objects.map((element, idx, array) => {
    fetch_array.push(fetch('http://127.0.0.1:5000/predict', {...options, body: JSON.stringify(element)}
    ).then(response => response.json()));
});
console.log(empty_objects)
//console.log(fetch_array);
let batch = Promise.all(fetch_array).then(response => console.log(response));
*/