	let canvas = document.getElementById("canvas");
	let dibujo = canvas.getContext("2d");
	let T=0;
	let X0= 0;
	let Y0= canvas.height;
	let X= X0;
	let Y= Y0;
	let theta;
	let V0;
	let V0X;
	let V0Y;
	let g= 0.0005;
	let boton= document.getElementById("boton");
	let boton2= document.getElementById("boton2");
	let correr= false;
	let Tv;

	boton.addEventListener("click",comienzo);
	boton2.addEventListener("click", ()=>{
		location.reload();
	});

	let segundos=0;
	let segundosviejos=0;
	let facvel;
	let facvelviejo;

	window.onload= init();

	function comienzo(){
		theta=parseFloat(document.getElementById("tang").value);
		V0= parseFloat(document.getElementById("tvel").value);
		V0X=V0*Math.cos(-theta*Math.PI/180.);
		V0Y=V0*Math.sin(-theta*Math.PI/180.);
		facvel= parseFloat(document.getElementById("tfacvel").value);
		facvelviejo= facvel;
		Tv= ((2*V0*Math.sin(-theta*Math.PI/180.))/g);
		if (!correr){
			facvel=facvelviejo;
		}else{
			facvel=0;
		}
		correr=!correr;
	}

	function init()	{
        window.requestAnimationFrame(animationLoop);
	}

	function animationLoop(timeStamp)
	{
            segundos = (timeStamp-segundosviejos)/1000;
            segundosviejos= timeStamp;
            update();
            draw();
            window.requestAnimationFrame(animationLoop);
	}

	function update()
	{
	if (correr){
		{	
	T += segundos*facvel;
	X= V0X*T + X0;
	Y= 0.5*g*T*T + V0Y*T + Y0;
		}
	
	if (Y>=canvas.height || Y<=0){
	V0Y=-(Math.sqrt((V0Y*V0Y) + 2*g*(canvas.height - Y)));
	//V0Y=-(g*T + V0Y); (Código opcional que permite rebotes más variados, pero técnicamente incorrecto ya que por la discretización del tiempo que proviene de la definición de T y por ende de la función timeStamp(reloj interno del equipo), cada vez la pelota va más rápido)
	X0=X;
	Y0=Y;
	T=0;
	V0= Math.sqrt((V0X*V0X)+(V0Y*V0Y));
	theta= Math.atan((Math.abs(V0Y))/V0X);
		}

	if (X<=0 || X>=canvas.width){
	V0X= -(V0X);
	X0=X;
	Y0=Y;
	T=0;
	V0= Math.sqrt((V0X*V0X)+(V0Y*V0Y));
	theta= Math.atan(V0Y/(Math.abs(V0X)));
	}

		}
	}
	
	function draw()
	{
	dibujo.clearRect(0,0, canvas.width, canvas.height);
	dibujo.beginPath();
	dibujo.arc(X, Y, 15, 0, 2*Math.PI);
	dibujo.closePath();
	dibujo.fillStyle= "#feed3a";
	dibujo.shadowColor="whitesmoke";
	dibujo.shadowBlur= 18;
	dibujo.fill();
	}