const options = ['pedra','papel','tesoura']

const cpu = options[Math.floor((Math.random() * options.length))]

switch(process.argv[2]){
    case 'pedra': switch(cpu)  {
        case 'papel': console.log("Você escolheu pedra e o computador escolheu papel. Você Perdeu!") ;break
        case 'tesoura': console.log("Você escolheu pedra e o computador escolheu tesoura. Você Ganhou!");break
        case 'pedra': console.log("Você escolheu pedra e o computador escolheu pedra. Empatou!");break
    };break

    case 'papel': switch(cpu) {
        case 'papel': console.log("Você escolheu papel e o computador escolheu papel. Empate");break
        case 'tesoura': console.log("Você escolheu papel e o computador escolheu tesoura. Você Perdeu");break
        case 'pedra': console.log("Você escolheu papel e o computador escolheu pedra. Você Ganhou");break
    };break

    case 'tesoura': switch(cpu) {
        case 'papel': console.log("Você escolheu tesoura e o computador escolheu papel. Você Ganhou!");break
        case 'tesoura': console.log("Você escolheu tesoura e o computador escolheu tesoura. Empate");break
        case 'pedra': console.log("Você escolheu tesoura e o computador escolheu pedra. Você Perdeu");break
    };break
}