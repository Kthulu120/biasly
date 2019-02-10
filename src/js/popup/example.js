function placeBiaslyIcon(doc){
  let posts = document.getElementsByClassName("stream-item-footer")
  console.log(posts)
  posts.forEach(element => {
    console.log(element);
    element.insertAdjacentHTML('beforeend', "<img src=\"https://visualpharm.com/assets/402/Message-595b40b65ba036ed117d44c1.svg\"/>")
  });
}

function httpGet(theUrl)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

export default function () {
  var message = document.querySelector('#test');

  chrome.tabs.executeScript({
    code: '(' + function(params) {
        let meta = document.getElementsByClassName('meta');
        for (let i = 0; i < meta.length; ++i) {
          meta[i].remove();
        }
        console.log(document);
        let posts = document.getElementsByClassName("tweet")
        console.log(posts)
        for(let i =0; i < posts.length; i++){
          // posts[i].insertAdjacentHTML('beforeend', "<img height=50px width=50px src=\"https://visualpharm.com/assets/402/Message-595b40b65ba036ed117d44c1.svg\"/>")
          $.ajax({url: 'https://cors-anywhere.herokuapp.com/http://34.73.188.127/isBias/hello', headers: {'Origin': 'mars'}}, function (data) { console.log(data) });

          function(data) {
            let reponse =  ['left', 'right', 'neutral'].indexOf(data.bias);
            let bias = (['blue', 'red', 'none'])[Math.floor(Math.random() * 3)]; // this will be replaced by an API call
            let backgrounds = {
              'blue': '#00ADB5',
              'red': '#FC3C3C',
              'none': 'none'
            };
            posts[i].style.outline = `${backgrounds[bias]} 2px solid`;

            if (bias != 'none') {
              posts[i].insertAdjacentHTML('beforebegin', `<img height=50px width=50px style='border-radius: 50%; box-shadow: 0 0 10px #0004; position: absolute; margin-top: -25px; margin-left: -25px; z-index: 1; ' src='http://biasly.org/images/logo-${bias}.png' />`);
            }
          }
        }
        // document.body.style.background = "green";
        return {success: true, html: document.body.innerHTML};
    } + ')(' + JSON.stringify() + ');'
}, function(results) {
    console.log(results);
    console.log(document)
    placeBiaslyIcon(document);

});
};
