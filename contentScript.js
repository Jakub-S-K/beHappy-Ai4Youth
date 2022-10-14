//console.log(div_text);
let fetch_array = [];
let data = [];
const img_prefix = '/content_img/';
const imgs = ['0.png', '1.png'];
let blur = 1;

var fetch_counter = 0;
var counter = 0;
var filtered_div = [];
var new_divs = [];

let response = undefined;

let lastUrl = '';
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        data = [];
        fetch_counter = 0;
        counter = 0;
        fetch_array = [];
        onUrlChange();
    }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
    console.log('URL changed!', location.href);
    var interval_instance = undefined;
    (async () => {
        interval_instance = setInterval(async function () {
            div_text = [...document.getElementsByTagName('div')];
            let comment_div = [];
            for (let i = 0; i < div_text.length; i++) {
                if (div_text[i].classList?.contains('RichTextJSON-root')) {
                    if (div_text[i].parentNode.hasAttribute('ai-fetch-count')) {
                        comment_div.push(div_text[i]);
                    } else {
                        new_divs.push(div_text[i]);
                    }
                }
            }
            
            comment_div.push(...new_divs);
            //console.log(comment_div);
            for (let x = fetch_counter; x < comment_div.length; x++) {
                //console.log(div_text.length);
                let div = comment_div[x];
                div.parentNode.setAttribute('ai-fetch-count', fetch_counter);
                let text = div.innerText + "\n";
                n = div.children;
                while (n.nextElementSibling != null) {
                    text += n.nextElementSibling.innerText;
                    n = n.nextElementSibling;
                }
                //console.log(fetch_counter + ' text: ' + text);
                fetch_array.push(fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quote: text })
                })
                    .then(response => response.json())
                    .then(function (json) {
                        return {
                            ...json,
                            ...this
                        }

                    }.bind({ fetch_counter })));
                fetch_counter++;
                //console.log(text);
            }
            data.push(... await Promise.all(fetch_array));
            fetch_array = []

            //console.log(data);

            all_divs = document.getElementsByTagName('div');
            length = all_divs.length;
            //console.log(data);
            for (let i = 0; i < length; i++) {
                div = all_divs[i];
                if (div.hasAttribute('data-testid')) {
                    if (div.getAttribute('data-testid') == 'post-comment-header') {
                        if (data != null && data[counter] != null && data[counter].is_negative != null) {
                            insert = document.createElement('img');
                            let img_number = imgs[data[counter].is_negative];
                            let ai_fetch_count = 0;

                            if(div.nextElementSibling != null && (div.nextElementSibling).firstChild != null){
                                ai_fetch_count = div.nextElementSibling.getAttribute('ai-fetch-count');
                                //console.log(ai_fetch_count);
                                if (data[ai_fetch_count].is_negative !== null) {
                                    img_number = imgs[data[ai_fetch_count].is_negative];
                                }
                            } else {
                                continue;
                            }

                            if (data[ai_fetch_count].is_negative === 1) {
                                
                                //chrome.storage.sync.get({ blurFlag: blur });
                                ////console.log('Blur: ' + blur);
                                if(div.nextElementSibling != null && ((div.nextElementSibling).firstChild).firstChild != null){
                                    //img_number = imgs[data[div.nextElementSibling]]
                                    //console.log(div.nextElementSibling);
                                    if (blur === 1) {
                                        let parToBlur = ((div.nextElementSibling).firstChild);
                                        parToBlur.classList.add('addonBlur');
                                    }
                                } else {
                                    continue;
                                }

                            }
                            if (attributeInChildren(div.children[0], 'ai-img-id')) {
                                continue;
                            }
                            insert.src = chrome.runtime.getURL(`${img_prefix + img_number}`);
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
            }

        }, 3000);

    })();
    return interval_instance;
}

function attributeInChildren(parent, name) {
    var node = parent.children[0];
    if (node.getAttribute(name)) {
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
