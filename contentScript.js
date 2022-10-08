//console.log(div_text);
let empty_objects = [];
let fetch_array = [];
let data = [];
const img_prefix = '/content_img/';
const imgs = ['0.png', '1.png'];

let response = undefined;

let lastUrl = location.href;
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


    (async () => {
        div_text = [...document.getElementsByTagName('div')];
        setInterval(async function () {
            for (div of div_text) {
                if (div.classList?.contains('RichTextJSON-root')) {
                    empty_objects.push(div.cloneNode(true));
                    //console.log(div.innerText);
                    let text = div.innerText + "\n";
                    //console.log('node uri = ' + div.baseURI);
                    n = div.children;
                    while (n.nextElementSibling != null) {
                        text += n.nextElementSibling.innerText;
                        n = n.nextElementSibling;
                    }

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
            data.forEach(object => {
                object['send'] = true;
            })
            console.log(fetch_array);

            all_divs = document.getElementsByTagName('div');
            length = all_divs.length;
            let counter = 0;
            for (let i = 0; i < length; i++) {
                div = all_divs[i];
                //console.log(div);
                if (div.hasAttribute('data-testid')) {
                    if (div.getAttribute('data-testid') == 'post-comment-header') {
                        console.log('jest naglowek');
                        insert = document.createElement('img');
                        if (data[counter].is_negative !== undefined) {
                            var img_number = imgs[data[counter].is_negative];
                        } else {
                            var img_number = '0';
                        }
                        if(div.lastChild.getAttribute('custom')) {
                            console.log('jest juz'); //TODO: check if img exists 
                        }
                        insert.src = chrome.runtime.getURL(`${img_prefix + img_number }`);
                        insert['custom'] = 'ai4youth'
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