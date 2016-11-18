$('#search-text-form').on('submit', function(event) {
  event.preventDefault();
  $('#thread-container').empty();
  var matchCounter = 0;
  var searchChoice = $('#search-params-select').val();
  var searchText = $('#search-textarea').val();
  console.log('seaching for ',searchChoice+ ' = '+ searchText);
  const token = 'Bearer ' + sessionStorage.getItem('storedToken');
  if(searchChoice === 'text'){
    superagent
      .get('/api/threads/region/all/drinkType/all')
      .set({'Authorization': token})
      .then((res) => {
        console.log(res.body);
        res.body.forEach(function(thread){
          console.log(thread.userId);
          superagent
            .get('/api/users/'+thread.userId)
            .set({'Authorization': token})
            .then((res) =>{
              console.log(res.body.username);
              
            });

        // const source = $('#thread-template').html();
        // const template = Handlebars.compile(source);
        // const threadObject = {
        //   thread: res.body
        // };
        // const newHtml = template(threadObject);
        // $('#thread-container').append(newHtml);
        // $('#thread-container').fadeIn();
        // if (!sessionStorage.getItem('storedToken')) {
        //   $('#thread-container button').hide();
        //   $('#remark-buttons button').hide();
        // }
        });
      })

    .catch((err) => {
      console.log(err);
    });
  } 
  else if(searchChoice === 'author'){
    superagent
            .get('/api/users/')
            .set({'Authorization': token})
            .then((res) =>{
              res.body.forEach(function(user){
                if(user.username === searchText){
                  matchCounter += 1;
                  const userId = user.userId;
                  superagent
                .get('/api/threads')
                .set({'Authorization': token})
                .then((res) =>{
                  res.body.forEach(function(thread){
                    if(userId === thread.userId){
                      const source = $('#thread-template').html();
                      const template = Handlebars.compile(source);
                      const threadObject = {
                        thread: res.body
                      };
                      const newHtml = template(threadObject);
                      $('#thread-container').append(newHtml);
                      $('#thread-container').fadeIn();
                      if (!sessionStorage.getItem('storedToken')) {
                        $('#thread-container button').hide();
                        $('#remark-buttons button').hide();
                      }
                    }
                  });
                  if(matchCounter<1){
                    alert('No matches found. matchCounter is'+ matchCounter);
                    console.log(matchCounter);
                  }
                })
                
                .catch((err) => {
                  console.log(err);
                });
                }
              });
            });
  }
});




