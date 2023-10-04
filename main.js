const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.playerX = 0;
    this.playerY = 0;
  }

  updatePlayerPosition(direction) {
    switch (direction) {
      case 'w':
        if (this.playerY > 0)
          this.playerY--;
        break;
      case 'a':
        if (this.playerX > 0)
          this.playerX--;
        break;
      case 's':
        if (this.playerY < this.field.length - 1)
          this.playerY++;
        break;
      case 'd':
        if (this.playerX < this.field[this.playerY].length - 1)
          this.playerX++;
        break;
      default:
        console.log('Must enter w, a, s or d');
    }

    if (this.field[this.playerY][this.playerX] === hole) {
      console.log('You fell down a hole! Game over!');
      process.exit();
    } 
    if (this.field[this.playerY][this.playerX] === hat) {
      console.log('Congrats on finding your hat!');
      process.exit();
    }
    this.field[this.playerY][this.playerX] = pathCharacter;
  }

  print() {
    for (let i = 0; i < this.field.length; i++) {
      let result = '';
      for (let j = 0; j < this.field[i].length; j++) {
        result += this.field[i][j];
      }
      console.log(result);
    }
  }

  static generateField(width, height) {
    let result = [[]];
    //Initialise 2d array
    for (let i = 0; i < height; i++ ) {
      result[i] = []; 
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let holeChance = Math.floor(Math.random() * 3);
        let char = fieldCharacter;
        if (holeChance === 1) char = hole;
        result[i][j] = char;
      }
    }

    //Add hat character
    const hatX = Math.floor(Math.random() * width);
    const hatY = Math.floor(Math.random() * height);
    result[hatY][hatX] = hat;

    //Add player to first position
    result[0][0] = pathCharacter;
    return result;
  }
}

const playGame = (userInput) => {
  let input = userInput.toString().trim();
  myField.updatePlayerPosition(input);
  myField.print();
  process.stdout.write('Please enter a direction (wasd): ');
}

let myField;

if (parseInt(process.argv[2], 10) && parseInt(process.argv[3], 10)) {
  myField = new Field(Field.generateField(Math.floor(process.argv[2]),
   Math.floor(process.argv[3])));
} else {
  myField = new Field(Field.generateField(10, 8));
}

myField.print();
process.stdout.write('Please enter a direction (wasd): ');
process.stdin.on('data', playGame);