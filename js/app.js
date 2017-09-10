new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack(min = 3, max = 10, isSpecial = false) {
      if (this.playerAttacks(min, max, isSpecial)) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack() {
      this.attack(10, 20, true);
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.logHealing();
      this.monsterAttacks();
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    playerAttacks(min, max, isSpecial) {
      const damage = this.calculateDamage(min, max);
      this.monsterHealth -= damage;
      this.logAttacking(true, 'Player', 'Monster', damage, isSpecial);
      return this.checkWin();
    },
    monsterAttacks() {
      const damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.logAttacking(false, 'Monster', 'Player', damage);
      return this.checkWin();
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        return this.endGame('won');
      } else if (this.playerHealth <= 0) {
        return this.endGame('lost');
      }

      return false;
    },
    endGame(result) {
      if (confirm('You ' + result + '! New Game?')) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }

      return true;
    },
    logAttacking(isPlayer, attacking, attacked, damage,  isSpecial = false) {
      this.turns.unshift({
        isPlayer: isPlayer,
        text: attacking + ' hits' + (isSpecial ? ' hard ' : ' ') + attacked + ' for ' + damage
      });
    },
    logHealing() {
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });
    }
  }
});