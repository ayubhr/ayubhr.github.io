const getCovid = () => {


  document.getElementById("loaderCorona").style.display = "block";

  document.getElementById("CovidBox").style.display = "none";


  let url = 'https://corona.lmao.ninja/v2/countries/tunisia?yesterday=1';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

	let date_up =  new Date(this.response.updated).toLocaleDateString("en-US")

	boxCovid = document.getElementById("CovidBox");

	boxCovid.getElementsByTagName("p")[0].innerText = `Updated Date : ${date_up}`

	//TODAY STATS
	boxCovid.getElementsByTagName("div")[0].children[0].getElementsByTagName('span')[0].innerText = this.response.todayRecovered;
	boxCovid.getElementsByTagName("div")[0].children[1].getElementsByTagName('span')[0].innerText =	this.response.todayCases;
	boxCovid.getElementsByTagName("div")[0].children[2].getElementsByTagName('span')[0].innerText = this.response.todayDeaths;


	//TOTAL STATS
	boxCovid.getElementsByTagName("div")[4].children[0].getElementsByTagName('span')[0].innerText = this.response.cases;
	boxCovid.getElementsByTagName("div")[4].children[1].getElementsByTagName('span')[0].innerText = this.response.deaths;
	boxCovid.getElementsByTagName("div")[4].children[2].getElementsByTagName('span')[0].innerText = this.response.recovered;
	boxCovid.getElementsByTagName("div")[4].children[3].getElementsByTagName('span')[0].innerText = this.response.active;


	boxCovid.getElementsByTagName("img")[0].src = this.response.countryInfo.flag;

       setTimeout(function(){

  			document.getElementById("loaderCorona").style.display = "none";
	    	document.getElementById("CovidBox").style.display = "block";


       },1000);
     

    }
  };
  xhttp.responseType = 'json';
  xhttp.open("GET", `https://api.codetabs.com/v1/proxy/?quest=${url}`, true);
  xhttp.send();



}