
const verficaParImpar = (parimpar, num) => {
   const cpuNum = Math.floor(Math.random() * 6);
   let result = parseInt(num) + parseInt(cpuNum)

   if (parimpar == 'par') {

      if (result % 2 == 0) {
         console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${result} . Você Ganhou!`)
      } else {
         console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${result} . Você Perdeu!`)
      }

   } else {

      if (result % 2 == 0) {
         console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${result} . Você Perdeu!`)
      } else {
         console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${result} . Você Ganhou!`)
      }
   }


}

verficaParImpar(process.argv[2], process.argv[3])