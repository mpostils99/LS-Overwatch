//Component format pel llistat d'herois.
Vue.component('ow-data', {
  props: {
    show: Boolean,
    data: Object
  },
  data() {
    return {
      isShow: false,
      timerEnabled: false,
      timerCount: 1
    }
  },

  template: `
  <article>
    <div id=heroT v-if="isShow==true && timerCount<1">
      <div class="partEsq">
        <p id="name">{{data.name}}</p>
        <img class="imgT" v-bind:src="data.portrait" v-bind:alt="data.key"/>  
      </div>
      <div class="partDreta">
        <div class="roleT">
          <p class="titolRoleT">Role:&nbsp</p>
          <p class="contingutRoleT">{{data.role}}</p>
        </div>
        <div class="message">
          <p>Message</p>
          <div class="contingutMissatge">{{data.message}}</div>
        </div>
        <button id="hideInfo" v-on:click="HideInfo(); reset();"></button>
      </div>
    </div>

    <div id="hero"v-if="isShow==true && timerCount>=1">
        <img v-bind:src="data.portrait" v-bind:alt="data.key"/>  
        <div id="infoHero">   
          <p id="name">{{data.name}}</p>
          <div class="role"> 
            <p class="first">Role:&nbsp</p>
            <p class="second">{{data.role}}</p>
          </div>
          <div class="loader"></div>
        </div>       
    </div>

    <div id="hero" v-if="isShow==false && timerEnabled==false">
       <img v-bind:src="data.portrait" v-bind:alt="data.key"/>  
        <div id="infoHero">
          <p id="name">{{data.name}}</p>
          <div class="role"> 
            <p class="first">Role:&nbsp</p>
            <p class="second">{{data.role}}</p>
          </div>
          <button id="showInfo" v-on:click="ShowInfo(); play();"></button>
        </div>
    </div>     
  </article>  
    `,
  //S'activa un cop l'usuari li dona al "+".
  watch: {

    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },

    timerCount: {
      handler(value) {

        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }

      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },

  //Mètodes que utlitzarem per canviar els valors de les variables un cop entrem en ells.
  methods: {

    ShowInfo() {
      this.isShow = true;
    },

    HideInfo() {
      this.isShow = false;
    },

    play() {
      this.timerEnabled = true;
    },

    reset() {
      this.timerEnabled = false;
      this.timerCount = 1;
    }

  }
})