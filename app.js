const url = 'https://my-json-server.typicode.com/mitkeys/api-simple/posts/';

document.addEventListener("DOMContentLoaded", function () { 
  getAll();
});

document.querySelector("#get").addEventListener('click', function(){
  getAll();
});
document.querySelector("#get_id").addEventListener('click', function(){
	getByIdRequest();
});
document.querySelector("#create").addEventListener('click', function(){
	postRequest();
});
document.querySelector("#update").addEventListener('click', function(){
	putRequest();

});
document.querySelector("#delete").addEventListener('click', function(){
	deleteRequest();
});


function getAll(){
	axios.get(url)
	.then(function (response) {
		makeRows(response.data);
		setMessage(response);
	})
	.catch(function (error) {
		setMessage(error.response);
	})
	.then(function () {
	});
}
 
function getByIdRequest(){
	let id = document.getElementById("id").value;
	let data = [];
	axios.get(url+id)
	.then(function (response) {
		data[0] = response.data;
		makeRows(data);
		setMessage(response);
	})
	.catch(function (error) {
		makeRows();
		setMessage(error.response);
	})
	.then(function () {
	});
}
 
function postRequest(){
	let id = document.getElementById("id").value;
	let title = document.getElementById("title").value;
	let author = document.getElementById("author").value;
	let data = [];
   axios.post(url, {
		id: id,
		title: title,
		author: author
     })
     .then(function (response) {
		data[0] = response.data;
		makeRows(data);
		setMessage(response);
     })
     .catch(function (error) {
		makeRows();
		setMessage(error.response);
     })
     .then(function () {
     });
}
 
function putRequest(){
	let id = document.getElementById("id").value;
	let title = document.getElementById("title").value;
	let author = document.getElementById("author").value;
	let data = [];
   axios.put(url + id, {
		id: id,
		title: title,
		author: author
     })
     .then(function (response) {
		data[0] = response.data;
		makeRows(data);
		setMessage(response);
     })
     .catch(function (error) {
		makeRows();
		setMessage(error.response);
     })
     .then(function () {
     });
}
 
function deleteRequest()
{
	let id = document.getElementById("id").value;
   axios.delete(url+id)
     .then(function (response) {
		 makeRows();
		setMessage(response);
     })
     .catch(function (error) {
		makeRows();
		setMessage(error.response);
     })
     .then(function () {
     });
}

function makeRows(data) {
	const container = document.getElementById('container');
	container.innerHTML = "";
	if(data == undefined)
		return;
	cols = 3;
	rows = Object.keys(data).length/cols;
	container.style.setProperty('--grid-rows', rows);
	for (c = 0; c < (rows * cols); c++) {
		let cell = document.createElement("div");
		cell.innerText = 'Post '+data[c].id+'\n'+data[c].title+'\n'+data[c].author;
		container.appendChild(cell).className = "btn btn-outline-secondary";
	}
}

function setMessage(response) {
	const container = document.getElementById('message');
	let status = response.status;
	let data = JSON.stringify(response.data);
	if(status >= 200 && status < 300){
		container.innerText = 'Successful action\nResponse Status '+ 
		status+'\n Response data '+data;
	} else if(status >=400 && status <500){
		container.innerText = 'There was an error in the given information, please check it again\nResponse Status '+ 
		status+'\n Response data '+data;
	}else{
		container.innerText = 'There was an internal error '+
		'\nResponse Status '+ 
		status+'\n Response data '+data;
	}
}

