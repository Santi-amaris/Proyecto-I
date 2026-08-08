#include <iostream>
#include <cmath>
#include <fstream>
using namespace std;


int main(){
double conver_temp_2, h_max, conver_temp, v0, y0, x0=0, x, y, ang, fac_conver , posicion_y[1000], posicion_x[1000];
const double G=-9.81;
const long double pi= 3.14159265358979323846; // cmath funciona en radianes
float t_v, t_h;
int opcion,t,i;

ofstream archivo("Tabla_tiro_parabolico.csv");
archivo << "Tiempo, x(t), y(t)" << endl;

cout << "Bienvenido al programa de tiro parabolico, elija alguna de las siguientes opciones para proceder:" << endl;
cout << " " << endl; // No se tendrá en cuenta la resistencia del aire 
cout << "1. Calcular altura" << endl; // En nuestro sistema de referencia se toma la derecha como +x y hacia arriba como +y
cout << "2. Salir" << endl; // Nuestro objeto es compacto-rígido 
cout << " " << endl; // Se asume tiempo inicial igual a cero y coordenada x inicial igual a cero
cout << "Introduzca su opcion: ";
cin >> opcion;
cout << " " <<endl;

switch (opcion)
{
case 1:
    cout << "Introduzca los datos siguientes: " <<endl;
    cout << " " <<endl;
    cout << "Velocidad inicial del objeto: ";
    cin >> v0;
    cout << " " <<endl;
    cout << "Altura inicial del objeto: ";
    cin >> y0;
    cout << " " <<endl;
    cout << "Introduzca el angulo inicial al cual fue lanzado el objeto (en grados): ";
    cin >> ang;
    cout << " " <<endl;
    fac_conver= ((ang)*(pi/180));
    t_v=(((v0*sin(fac_conver))+(sqrt((v0*v0*sin(fac_conver)*sin(fac_conver))+(2*G*y0))))/(G*(-1))); //Tiempo máximo de vuelo alcanzado el objeto hasta que toca el suelo (derivado como una de las soluciones a la ecuación 1/2Gt^2 + v0t + y0 =0)
    t_h=(((v0*sin(fac_conver))/(G))*(-1)); //Tiempo en el alcanza la máxima altura (derivado de la ecuación Gt+v0=0)
    h_max= (0.5*G*(t_h*t_h)) + (v0*sin(fac_conver)*t_h); // Altura máxima que alcanza el objeto (reemplazando t_h en la ecuación 1/2Gt^2 + v0t + y0)

    cout << " " << endl;
    cout << t_v << endl;
    cout << t_h << endl;
    cout << h_max << endl;
    cout << " " << endl;
    
    for (t=0;t<1000;t++){

    long double t_1=t;
    conver_temp= t_1/30.00; //Factor de escala temporal aplicado a la simulación, para mayor precisión
    y= (0.5*G*(conver_temp*conver_temp)) + (v0*sin(fac_conver)*conver_temp) + y0;
    posicion_y[t]=y; //Vector de la altura en función del tiempo
    x= (v0*cos(fac_conver))*conver_temp;
    posicion_x[t]=x; //Vector del desplazamiento horizontal en función del tiempo

    if(conver_temp>t_v){
        cout << "El sistema objeto-particula ha tocado suelo a los [~" << (t_v*30) <<"] segundos. " << endl ;
        cout << "El sistema objeto-partícula hizo un recorrido horizontal total de: [" << ((v0*cos(fac_conver))*t_v) << "] metros. " << endl;
        cout << " " << endl;
        break;
    } else{

        cout << "La altura a los [" << t << "] (segundos) es de: " << y << endl;
        cout << "Su recorrrido horizontal a los [" << t << "] (segundos) es de: "<< x <<endl;
        cout << " " << endl;

    }

    }

    cout << " " <<endl;

    for(i=0;i<t;i++){
        archivo << i << " , " << posicion_x[i] << " , " << posicion_y[i] << endl;
    }

    archivo.close();

    break;

case 2:
    cout << "Adios...";
    break;

default:
    break;
}

}