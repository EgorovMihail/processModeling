let uold = 0,/*начальная скорость */ 
    U_m1 = 100, /* скорость первого шарика*/
    n1 = 2, /*степень n1 */
    n2 = 3,/*степень n2 */ 
    n = 3,/*кол во молекул */
    r = 10,/*радиус моллекулы (большой) */
    tn = 0,/*начальное время */
    tk = 5,/* конечное время */
    tau = 0.5,/*шаг по времени */
    iter = 600,/*кол - во итераций */
    m = 10,/*масса 1 - ой моллекулы */
    x = 60,
    y = 75,/*задали начальные координаты */
    A1 = 1,
    A2 = 2,
    Rx = 0,
    Ry = 0;


let arrMass = [],/*массив масс */
    arr_X = [],/*массив стартовых положений молекул по х */
    arr_Y = [],/*массив стартовых положений молекул по y */
    arr_U = [],/*массив скоростей */
    arr_T = [],
    arr_Xnew = [],
    arr_Ynew = []
    arr_Uxnew = [],
    arr_Uynew = [];


/*функция определяющая массы  */
const masa = function(){

  arrMass[0] = m;

  for (let i = 1; i < n; i++) {
    arrMass[i] =  Math.round( (arrMass[i-1] * 0.6) * 100 ) / 100;
  }

};

masa();

const coord = function(){
  arr_X[0] = x;
  arr_Y[0] = y;

 for (let i = 1; i < n; i++) {
  arr_X[i] = arr_X[i-1] + 60;   
  
 }

};

coord();


/*прокинули контекст */
let canvas = document.getElementById("canva");
let ctx = canva.getContext("2d");


// calculator(Ux, Uy, X, Y, t, tau, N, naprX, naprY) {
//   let eps = 0.01;
  

  


//   //console.log("time: ", `t = ${Math.round(t * 1000) / 1000}`);
//   //console.log(X, Y);

  

//   return {
//     Xnew,
//     Ynew,
//     Uxnew,
//     Uynew,
//     naprX,
//     naprY,
//   };
// }


function calc() {

  for (let i = 0; i < n; i++) {
    arr_Xnew[i] = 0;
    arr_Ynew[i] = 0;

    arr_Uxnew[i] = 0;
    arr_Uynew[i] = 0;
  }

  for (let i = 0; i < n; i++) {

    let data = this.calcCoords(Ux[i], Uy[i], X[i], Y[i], tau);

    arr_Xnew[i] = data.X;
    arr_Ynew[i] = data.Y;

    for (let j = 0; j < n; j++) {
      if (i != j) {
        let d = this.calcCoords(Ux[j], Uy[j], X[j], Y[j], tau);

        arr_Xnew[j] = d.X;
        arr_Ynew[j] = d.Y;

        Rx = Math.abs(
          ((arr_Xnew[i] - arr_Xnew[j]) ** 2 + (arr_Xnew[i] - arr_Xnew[j]) ** 2) ** (1 / 2)
        );

        Ry = Math.abs(
          ((arr_Ynew[i] - arr_Ynew[j]) ** 2 + (arr_Ynew[i] - arr_Ynew[j]) ** 2) ** (1 / 2)
        );

        if (arr_Xnew[i] >= this.width) {
          arr_Xnew[i] = X[i];
          naprX[i] = -1;
        }

        if (arr_Xnew[i] <= 0) {
          arr_Xnew[i] = X[i];
          naprX[i] = 1;
        }

        if (arr_Ynew[i] >= this.height) {
          arr_Ynew[i] = Y[i];
          naprY[i] = -1;
        }

        if (arr_Ynew[i] <= 0) {
          arr_Ynew[i] = Y[i];
          naprY[i] = 1;
        }

        arr_Uxnew[i] += naprX[i] * tau * (A / Rx ** 5 - B / Rx ** 4);
        arr_Uynew[i] += naprY[i] * tau * (A / Ry ** 5 - B / Ry ** 4);
      }
    }

    
  }
 
  
}
calc();


  



/*начальная отрисовка молекул */
function drow(x,y,r) {

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#1a2edb"; // тёмно-синий цвет
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}
drow(x,y,r);





/*расчет */
// function calc(xold1, xold2, xold3, n1, n2, tau, m1, m2, m3){

  

//   for (let i = 0; i < iter; i++) {
  
//     //переделать на Леннард Джонса (в 2х координатах)
//     unew1 = ( 1 / ( Math.pow( (xold2 - xold1), n1 ) ) - 
//             1 / ( Math.pow(  (xold2 - xold1), n2 ) ) ) * tau / m1 + uold1;
      
//     xnew1 = unew1 * tau + xold1;

//     uold1 = unew1;
//     xold1 = xnew1;
//     arr_X1[i] = xold1;
  

      
//     unew2 = ( ( 1 / ( Math.pow( (xold2 - xold1), n1 ) ) - 
//             1 / ( Math.pow(  (xold2 - xold1), n2 ) ) ) + 
//             ( 1 / ( Math.pow( (xold3 - xold2), n1 ) ) - 
//             1 / ( Math.pow(  (xold3 - xold2), n2 ) ) ) ) * tau / m2 + uold2;

//     xnew2 = unew2 * tau + xold2;

//     uold2 = unew2;
//     xold2 = xnew2;
//     arr_X2[i] = xold2;
   
      
//       unew3 = ( 1 / ( Math.pow( (xold3 - xold2), n1 ) ) - 
//             1 / ( Math.pow(  (xold3 - xold2), n2 ) ) ) * tau / m3 + uold3;

//       xnew3 = unew3 * tau + xold3;

//       uold3 = unew3;
//       xold3 = xnew3;
//       arr_X3[i] = xold3;
      


//     console.log(`xnew1 = ${arr_X1[i]}`, `xnew2 = ${arr_X2[i]}`, `xnew3 = ${arr_X3[i]}`);

//     t +=  tau;

//     arr_T[i] = t;

//   }

// }

    // function drow__animation() {
  
    //   let i = 0;
    
    //   setInterval( () => {
    
    //     if (i != iter) {

    //       ctx.clearRect(0, 0, canvas.width, canvas.height); 

    //       drow(x + arr_X1[i], y, 10);
    //       drow(x + arr_X2[i], y, 7);
    //       drow(x + arr_X3[i], y, 5);
    //       line();
    //       i++;
    //     }
    //     else
    //     {

    //       drow(x + arr_X1[i], y, 10);
    //       drow(x + arr_X2[i], y, 7);
    //       drow(x + arr_X3[i], y, 5);
    //       line();
    //     }
        
    //   }, 10);
    
    // }

//     function line() {
  
//     ctx.beginPath();
//     ctx.moveTo(270,120);
//     ctx.lineTo(270,30);
//     ctx.strokeStyle = "#1a2edb"; // тёмно-синий цвет
//     ctx.fillStyle = "#1a2edb"; // тёмно-синий цвет
//     ctx.stroke();
//     ctx.closePath();

// }



//calc(xold1, xold2, xold3, n1, n2, tau, m1, m2, m3);
//drow__animation();

