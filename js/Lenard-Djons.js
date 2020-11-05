"use strict";

calculator(Ux, Uy, X, Y, t, tau, N, naprX, naprY) {
    let A = 1;
    let B = 1;

    let Rx = 0;
    let Ry = 0;

    let Xnew = [];
    let Ynew = [];

    let Uxnew = [];
    let Uynew = [];

    for (let i = 0; i < N; i++) {
      Xnew[i] = 0;
      Ynew[i] = 0;

      Uxnew[i] = 0;
      Uynew[i] = 0;
    }

    //console.log("time: ", `t = ${Math.round(t * 1000) / 1000}`);
    //console.log(X, Y);

    for (let i = 0; i < N; i++) {
      let data = this.calcCoords(Ux[i], Uy[i], X[i], Y[i], tau);

      Xnew[i] = data.X;
      Ynew[i] = data.Y;

      for (let j = 0; j < N; j++) {
        if (i != j) {
          let d = this.calcCoords(Ux[j], Uy[j], X[j], Y[j], tau);

          Xnew[j] = d.X;
          Ynew[j] = d.Y;

          Rx = Math.abs(
            ((Xnew[i] - Xnew[j]) ** 2 + (Xnew[i] - Xnew[j]) ** 2) ** (1 / 2)
          );

          Ry = Math.abs(
            ((Ynew[i] - Ynew[j]) ** 2 + (Ynew[i] - Ynew[j]) ** 2) ** (1 / 2)
          );

          // if (Xnew[i] >= 70) {
          //   naprX[i] = -1;
          // }

          // if (Xnew[i] <= 0) {
          //   naprX[i] = 1;
          // }

          // if (Ynew[i] >= 70) {
          //   naprY[i] = -1;
          // }

          // if (Ynew[i] <= 0) {
          //   naprY[i] = 1;
          // }

          Uxnew[i] += naprX[i] * tau * (A / Rx ** 6 - B / Rx ** 3);
          Uynew[i] += naprY[i] * tau * (A / Ry ** 6 - B / Ry ** 3);
        }
      }

      // console.log(
      //   `Частица ${i + 1}:`,
      //   `x = ${Xnew[i]}; y = ${Ynew[i]}; Ux = ${Uxnew[i]}; Uy = ${Uynew[i]}`
      // );
    }

    return {
      Xnew,
      Ynew,
      Uxnew,
      Uynew,
      naprX,
      naprY,
    };
  }

  calcCoords(prevUx, prevUy, prevX, prevY, tau) {
    let X = prevUx * tau + prevX;
    let Y = prevUy * tau + prevY;

    return {
      X,
      Y,
    };
  }

  animate(fps) {
    let cnvs = this.$refs.canvas;
    let ctx = cnvs.getContext("2d");

    let vm = this;

    let maxXY = 50;
    let minXY = 20;

    let maxU = 10;
    let minU = 5;

    let t = 0;
    let tau = 0.0002;
    let Ux = [];
    let Uy = [];
    let X = [];
    let Y = [];
    let naprX = [];
    let naprY = [];

    let N = 25; // Кол-во частиц

    for (let i = 0; i < N; i++) {
      // X[i] = this.getRandom(maxXY, minXY);
      // Y[i] = this.getRandom(maxXY, minXY);

       X[i] = i * 0.1 + 15;
       Y[i] = i + 10;

      Ux[i] = this.getRandom(maxU, minU);
      Uy[i] = this.getRandom(maxU, minU);

      naprX[i] = 1;
      naprY[i] = 1;
    }

    setInterval(() => {
      ctx.clearRect(0, 0, cnvs.width, cnvs.height);

      let data = this.calculator(Ux, Uy, X, Y, t, tau, N, naprX, naprY);

      X = data.Xnew;
      Y = data.Ynew;

      // if (Math.abs(X) > this.width) X = this.getRandom(maxXY, minXY);
      // if (Math.abs(Y) > this.height) Y = this.getRandom(maxXY, minXY);

      Ux = data.Uxnew;
      Uy = data.Uynew;

      naprX = data.naprX;
      naprY = data.naprY;

      for (let i = 0; i < N; i++) {
        vm.ballInit(ctx, X[i] * 15, Y[i] * 10);

        console.log(`Частица ${i + 1}:`, `x = ${X[i]}; y = ${Y[i]}`);
      }

      t += tau;
    }, fps);
  }

  getRandom(max, min) {
    return Math.random() * (max - min) + min;
  },