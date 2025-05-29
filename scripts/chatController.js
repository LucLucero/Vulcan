async function sendMessage() {
      const input = document.getElementById('userInput');
      const message = input.value.trim();
      if (!message) return;

      const userDiv = document.createElement('div');
      userDiv.className = 'user-message message';
      userDiv.innerText = message;

      document.getElementById('chat').appendChild(userDiv);

      input.value = '';
      input.focus();
      
      await botResponse(message);
      
    }

    async function botResponse(userMessage) {

      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Origin", "http://localhost:8080");
      
     
      var requestOptions = {

        method: 'POST',
        headers: headers,        
        redirect: 'follow'

      }

      var botRes = await fetch("http://localhost:8080/chat?message="+userMessage, requestOptions)            
        .catch(error => console.log('error', error)); 
      
      var response = await botRes.text();
      console.log(response);
      var responseFormatted = marked.parse(response);
      const botDiv = document.createElement('div');
        botDiv.className = 'bot-message message';        
        botDiv.innerHTML = responseFormatted;
        MathJax.typesetPromise();  
        document.getElementById('chat').appendChild(botDiv);
        document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight; 
           

    }

    function logout() {

      window.location.href = 'login.html';

    }

