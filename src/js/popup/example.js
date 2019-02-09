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
        console.log(document);
        let posts = document.getElementsByClassName("stream-item-footer")
        console.log(posts)
        for(let i =0; i < posts.length; i++){
          posts[i].insertAdjacentHTML('beforeend', "<img height=50px width=50px src=\"https://visualpharm.com/assets/402/Message-595b40b65ba036ed117d44c1.svg\"/>")

        }
        document.body.style.background = "green";
        return {success: true, html: document.body.innerHTML};
    } + ')(' + JSON.stringify() + ');'
}, function(results) {
    console.log(results);
    console.log(document)
    placeBiaslyIcon(document);

});
};
