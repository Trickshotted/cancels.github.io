var faunadb = window.faunadb
  var q = faunadb.query
  var client = new faunadb.Client({
    secret: 'fnAEfgMszjAAwTmNhhjJa2-AN1iqVi4sLAk1_htP',
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  })

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function createPaste(){

    let id = makeid(7)

    if(document.getElementById("title").value == "" || document.getElementById("content").value == "")
    {
      alert("Fill out all fields first!")
    }
    else
    {
 
client.query(
  q.Get(
    q.Match(q.Index('paste_by_id'), id)
  )
)
.then(function(ret){ 
     
alert("Matching IDs lol")

})
  
.catch(function(e){



  let date = new Date();
    client.query(
  q.Create(
    q.Collection('pastes'),
    { data: { title: document.getElementById("title").value, content: document.getElementById("content").value, id: id, date: date.toUTCString()} },
  )
)
.then(function(ret){

     alert("Success! Your paste can be found at: https://cancels.github.io/?id=" + ret.data.id)
     
    })

});

    }

}


function getPaste(){

    let urlParams = new URLSearchParams(window.location.search);

    client.query(
        q.Get(
          q.Match(q.Index('paste_by_id'), urlParams.get('id'))
        )
      )
      .then(function(ret) {
          

          document.getElementById("content").innerHTML = ret.data.title + "<br>Uploaded at " + ret.data.date + "<br><hr><br>" + ret.data.content
          document.title = ret.data.title + " at " + ret.data.date
          
          
      })
      .catch(function(e){
         document.write("Page not found.")
      });


}