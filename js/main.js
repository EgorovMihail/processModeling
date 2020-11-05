
let uold = 0,/*начальная скорость */ 
    U_m1 = 100, /* скорость первого шарика*/
    n1 = 2, /*степень n1 */
    n2 = 3,/*степень n2 */ 
    n = 4,/*кол во молекул */
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



let  appData = {

  arrMass: [],
  arrMass: [],/*массив масс */
  arr_X: [],/*массив стартовых положений молекул по х */
  arr_Y: [],/*массив стартовых положений молекул по y */
  arr_U: [],/*массив скоростей */
  arr_T: [],
  arr_Xnew: [],
  arr_Ynew: [],
  arr_Uxnew: [],
  arr_Uynew: []

};




/*функция определяющая массы малекул  */
const masa = function(){

  appData.arrMass[0] = m;

  for (let i = 1; i < n; i++) {
    appData.arrMass[i] =  Math.round( (appData.arrMass[i-1] * 0.6) * 100 ) / 100;
    console.log('appData.arrMass[i]: ', appData.arrMass[i]);
  }
};
masa();

const coord = function(){
  appData.arr_X[0] = x;
  console.log('appData.arr_X: ', appData.arr_X);
  appData.arr_Y[0] = y;
  console.log('appData.arr_Y: ', appData.arr_Y);

  for (let i = 1; i < n; i++) {
    appData.arr_X[i] = appData.arr_X[i-1] + 50;
    console.log('appData.arr_X[i]: ', appData.arr_X[i]);
    appData.arr_Y[i] = appData.arr_Y[i-1] + 50;
    console.log('appData.arr_Y[i]: ', appData.arr_Y[i]);
  }

};
coord();


/*прокинули контекст */
let canvas = document.getElementById("canva");
let ctx = canva.getContext("2d");



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


let drow__animation = function(){

  let i = 0;
    
      setInterval( () => {
    
        if (i != iter) {

          ctx.clearRect(0, 0, canvas.width, canvas.height); 

          drow(appData.arr_X[i], appData.arr_Y[i], 10);
          // drow(x + arr_X1[i], y, 10);
          // drow(x + arr_X2[i], y, 7);
          // drow(x + arr_X3[i], y, 5);
          // line();
          i++;
        }
        else
        {

          drow(appData.arr_X[i], appData.arr_Y[i], 10);
        }
        
      }, 10);

};
drow__animation();




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

