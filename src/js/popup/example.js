function placeBiaslyIcon(doc){
  let posts = document.getElementsByClassName("stream-item-footer")
  console.log(posts)
  posts.forEach(element => {
    console.log(element);
    element.insertAdjacentHTML('beforeend', "<img src=\"https://visualpharm.com/assets/402/Message-595b40b65ba036ed117d44c1.svg\"/>")
  });
}

export default function () {
  var message = document.querySelector('#test');

  chrome.tabs.executeScript({
    code: '(' + function(params) {
      function httpGet(theUrl)
      {
        console.log(theUrl);
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
          xmlHttp.setRequestHeader('x-requested-with', 'mars')
          xmlHttp.send( null );
          return xmlHttp.responseText;
      }

        let meta = document.getElementsByClassName('meta');
        for (let i = 0; i < meta.length; ++i) {
          meta[i].remove();
        }
        console.log(document);
        let posts = document.getElementsByClassName("tweet")
        console.log(posts)
        for(let i =0; i < posts.length && i < 5; i++){
          setTimeout(() => {
            try {
              let data = httpGet('https://cors-anywhere.herokuapp.com/http://34.73.188.127/isBias/' + posts[i].getElementsByClassName('tweet-text')[0].innerText);
              data = JSON.parse(data);
              let reponse =  ['left', 'right', 'neutral'].indexOf(data.bias);
              let bias = (['blue', 'red', 'none'])[reponse]; // this will be replaced by an API call
              let backgrounds = {
                'blue': '#00ADB5',
                'red': '#FC3C3C',
                'none': 'none'
              };
              posts[i].style.outline = `${backgrounds[bias]} 2px solid`;

              if (bias != 'none') {
                posts[i].insertAdjacentHTML('beforebegin', `<img height=50px width=50px style='border-radius: 50%; box-shadow: 0 0 10px #0004; position: absolute; margin-top: -25px; margin-left: -25px; z-index: 1; ' src='http://biasly.org/images/logo-${bias}.png' />`);
              }
            } catch (e) {
              console.log(e);
            }
          });
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
