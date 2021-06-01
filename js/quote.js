const getQuote = () => {

let tags = [
			"business",
			"future",
			"famous-quotes",
			"inspirational",
			"success",
			"technology",
			"wisdom",
			];

let random_tag = tags[Math.floor(Math.random()*tags.length)];

let random_token = Math.floor(Math.random()*897987987987987);


let api_choice = false;
let url;
if(  (new Date().getSeconds() % 2) == 0 ){

   url = `https://api.quotable.io/random?tags=${random_tag}&token=${random_token}`;


}else{


   url = `https://www.affirmations.dev/?token=${random_token}`;
   api_choice = true;

}

  document.getElementById("loader").style.display = "block";

  document.getElementById("quoteDiv").style.display = "none";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {


    	let speach_text;

    	if(api_choice){

    		speach_text = this.response.affirmation;
		    document.getElementById("quote").innerText = `“ ${this.response.affirmation} ”`;
	 	    document.getElementById("author").innerText = `— Anonymous`;


    	}else{

    		speach_text = this.response.content;
		    document.getElementById("quote").innerText = `“ ${this.response.content} ”`;
	 	    document.getElementById("author").innerText = `— ${this.response.author}`;

	 	}

       setTimeout(function(){

  			document.getElementById("loader").style.display = "none";
	    	document.getElementById("quoteDiv").style.display = "block";
	    	document.getElementById("quote").classList.add("Fade");
	    	document.getElementById("author").classList.add("Fade");

					if ('speechSynthesis' in window) {

						var msg    = new SpeechSynthesisUtterance();
						var voices = window.speechSynthesis.getVoices();

						msg.text   = speach_text;
						msg.lang   = 'en';
						speechSynthesis.speak(msg);


					}


       },0);
     

    }
  };
  xhttp.responseType = 'json';
  xhttp.open("GET", `https://api.codetabs.com/v1/proxy/?quest=${url}&token=${random_token}`, true);
  xhttp.send();



}