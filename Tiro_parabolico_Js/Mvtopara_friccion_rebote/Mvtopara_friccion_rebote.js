let canvas = document.getElementById("canvas");
	let dibujo = canvas.getContext("2d");
	let T=0;
    let T2=0;
	let X0= 0;
	let Y0= (canvas.height);
	let X= X0;
	let Y= Y0;
	let theta;
	let V0;
	let V0X;
	let V0Y;
	let g= 9.81;
	let boton= document.getElementById("boton");
	let boton2= document.getElementById("boton2");
    let boton3= document.getElementById("boton3");
	let correr= false;
	let t_max;
	let y_max;
	let Tv;
	let a;
	let c;
	let R;
	let k=0.01;
	let k1;
	let rastro=[];

	boton.addEventListener("click",comienzo);
	boton2.addEventListener("click", ()=>{
		location.reload();
	});
    boton3.addEventListener("click",parar);

	let segundos=0;
	let segundosviejos=0;
	let facvel;
	let facvelviejo;

	window.onload= init();

	function parar(){
		alert("\nEl tiempo de simulación [en segundos] fue de: " + (T2) + "\nLa altura máxima a la que llegó la pelota [en metros] fue de: " + y_max);
		throw new Error("Se ha detenido la simulación");
	}

	function comienzo(){
		rastro=[];
		theta=parseFloat(document.getElementById("tang").value);
		V0= ((parseFloat(document.getElementById("tvel").value)));
		V0X=V0*Math.cos(-theta*Math.PI/180.);
		V0Y=V0*Math.sin(-theta*Math.PI/180.);
		k1= g/(k*(V0Y-(g/k)));
		t_max=(Math.log(-k1))/(-k);
		y_max= -(((1/k)*(V0Y-(g/k))*(1-Math.exp(-k*t_max))) + ((g/k)*t_max));
		a=((2*k)/(3*V0*Math.cos(theta*Math.PI/180.)));
		c=((2*(V0*Math.sin(theta*Math.PI/180.))*(V0*Math.cos(theta*Math.PI/180.)))/(g));
		R=(-1 + Math.sqrt((1)+(4*a*c)))*((3*V0*Math.cos(theta*Math.PI/180.))/(4*k));
		facvel= parseFloat(document.getElementById("tfacvel").value);
		facvelviejo= facvel;
		Tv= -((1/k)*(Math.log(1+((k*V0Y)/g))));
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
    T2 += segundos;
	//X= V0X*T + X0;
	//X= V0X*(m/k)*(1-Math.exp((-k/m)*T)) + X0
	X= ((V0X/k)*(1-(Math.exp(((-k*T)))))) + X0;
	//Y= 0.5*g*T*T + V0Y*T + Y0;
	//Y= ((m*g)/k)*T + ((m/k)*(V0Y-((m*g)/k))*(1-(Math.exp((-k/m)*T)))) + Y0;
	Y= ((1/k)*(V0Y-(g/k))*(1-(Math.exp((-k*T))))) + ((g/k)*T) + Y0;
		}

	rastro.push({x: X,y: Y});
	
	if (Y>=canvas.height){
    V0X=(V0X*Math.exp(-k*T));
	V0Y=-(((V0Y-(g/k))*Math.exp(-k*T)) + (g/k));
	theta= Math.atan(V0Y/V0X);
	X0=X;
	Y0=Y;
	T=0;
		}

    if (Y<=0){
    V0X=(V0X*Math.exp(-k*T));
	V0Y=-(((V0Y-(g/k))*Math.exp(-k*T)) + (g/k));
	theta= Math.atan(V0Y/V0X);
	X0=X;
	Y0=Y;
	T=0;
		}

    if (X<=0 || X>=canvas.width){
	V0Y=(((V0Y-(g/k))*Math.exp(-k*T)) + (g/k));
	V0X=-(V0X*Math.exp(-k*T));
	theta= Math.atan((V0Y/V0X));
	Y0=Y
	X0=X;
	T=0;
	}

		}
	}
	
	function draw()
	{
	dibujo.clearRect(0,0, canvas.width, canvas.height);
	dibujo.beginPath();
	for(let i=0; i<rastro.length; i++){
			if(i==0){
				dibujo.moveTo(rastro[i].x, rastro[i].y);
			} else{
				dibujo.lineTo(rastro[i].x, rastro[i].y);
			}
		}
	dibujo.strokeStyle = "whitesmoke";
	dibujo.lineWidth = 2;
	dibujo.stroke();
	dibujo.closePath();
	dibujo.beginPath();
	dibujo.arc(X, Y, 12, 0, 2*Math.PI);
	dibujo.closePath();
	dibujo.fillStyle= "#feed3a";
	dibujo.shadowColor="whitesmoke";
	dibujo.shadowBlur= 18;
	dibujo.fill();
	}