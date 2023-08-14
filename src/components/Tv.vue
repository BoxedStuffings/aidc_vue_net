<script>
import $ from 'jquery'
import  CryptoJS from 'crypto-js'
import { store } from '../Store.js'
import { useToast } from "vue-toastification"
import TvSkeleton from '../components/TvSkeleton.vue'

export default {
  setup() {
    const toast = useToast()
    return {toast}
  },

  data() {
    return {
      store,
      checkTheme: '../assets/icons/dark/check.svg',
      telegramMainButton: Telegram.WebApp.MainButton,
      telegramBackButton: Telegram.WebApp.BackButton,
      loading: 0
    }
  },

  components: {
    TvSkeleton
  },

  methods: {
    async initTV(){
      const encoder = new TextEncoder()
      const decoder = new TextDecoder()
      let uid = ''

      // try {
      //   uid = store.telegramWebAppInfo.user.id.toString()
      // } catch(error) {
      //   this.loading = 2
      //   return
      // }
      uid = '2386ebb2b54bac45'

      // Hashing ID for IV
      let hashid = CryptoJS.SHA256(uid)
      let eiv = btoa(decoder.decode(encoder.encode(hashid).slice(0, 16)))

      // Encrypting ID
      var encrypted = CryptoJS.AES.encrypt(uid, CryptoJS.enc.Base64.parse('tHagGVi1kYLe403CNvV20VwU82+Flz3z7S7TDN6IDFw='), {
        iv: CryptoJS.enc.Base64.parse(eiv),
      })
      let eid = encrypted.ciphertext.toString(CryptoJS.enc.Base64).replace(/[+]/g,'-').replace(/[/]/g,'_')

      // Authing user
      let url = `https://heehee.amphibistudio.sg/api/auth/user?id=${eid}&iv=${eiv}&chat_id=`
      await $.ajax({
        url: url,
        method: 'POST',
        success: (success) => {
          $.ajaxSetup({
            headers: { 'Authorization' : 'Bearer ' + success.token }
          })
        },
        error: (error) => {
          Telegram.WebApp.expand()
          this.pushToast(error.responseJSON.message)
          console.log(error.responseJSON.message)
          setTimeout(() => {
            Telegram.WebApp.close()
          }, 5000);
        }
      })

      // Grabbing TVs
      await $.ajax({
        url: 'https://heehee.amphibistudio.sg/api/tv',
        method: 'GET',
        success:  (success) => {
          store.initTVfromDB(success.data)
          console.log(success.data)
        },
        error: (error) => {
          Telegram.WebApp.expand()
          this.pushToast(error.responseJSON.message)
          console.log(error.responseJSON.message)
          setTimeout(() => {
            Telegram.WebApp.close()
          }, 5000);
        }
      })

      this.loading = !this.loading
      store.initcount++
    },

    checkTVSelection() {
      store.availableTVsFromDataBase.forEach((tv) => {
        let selectionCheck = store.findIndexOfSelectedTv(tv)
        if (selectionCheck >= 0) {
          let ref = `button-ref-id_${tv._id}`
          this.$refs[ref][0].innerHTML = 'Unselect'
        }
      })
      this.mainButtonVisibility()
    },

    selectTV(TV, selection_ref) {
      let index = store.findIndexOfSelectedTv(TV)
      let button = this.$refs[selection_ref][0]

      if (index >= 0) {
        store.spliceSelectedTvAt(index)
        button.innerHTML = 'Select'
      } else {
        store.pushSelectedTv(TV)
        button.innerHTML = 'Unselect'
      }

      this.mainButtonVisibility()
    },

    pressingDown(selection_ref) {
      let card = this.$refs[selection_ref][0]

      card.style.transitionDuration = '0.4s'
      card.style.transform = 'scale(0.95)'
    },

    notPressingDown(selection_ref) {
      let card = this.$refs[selection_ref][0]

      card.style.transform = 'scale(1)'
      card.style.transitionDuration = '0.2s'
    },
    
    pushToast(msg) {
      this.toast.error(msg, {
        position: 'bottom-left',
        timeout: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.5,
        closeButton: 'button',
        icon: true
      })
    },

    mainButtonVisibility() {
      store.selectedTvs.length >= 1 ? this.telegramMainButton.show() : this.telegramMainButton.hide() 
    }

  },

  mounted() {
    this.telegramMainButton.setParams({ text: 'Select Tv'})
    Telegram.WebApp.onEvent('mainButtonClicked', () => this.$router.push('/ScheduleDisplay'))

    this.telegramBackButton.hide()

    store.initcount >= 1 ? this.loading = 1 : this.initTV()

    this.mainButtonVisibility()
  },

  updated() {
    this.checkTVSelection()
  }

}
</script>

<template>
  <div>
    <TvSkeleton v-if="this.loading == 0"></TvSkeleton>
    <!-- Main Grid -->
    <div id="tv-grid" v-else-if="this.loading == 1">
    <!-- Individual cards -->
      <ui class="tv-card noselect" v-for="TV in store.availableTVsFromDataBase" :key="TV._id">
        <!-- Image outline for selection -->
        <div class="tv-card-imageOutline" :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }">
          <!-- Card check mark -->
          <img class="tv-card-imageCheck" :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }" :src="'../assets/icons/light/check.svg'">
          <!-- Display image -->
          <img :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }" src="../assets/tv.png">
        </div>
        <!-- Display name -->
        <p>TV • {{ TV.info }}</p>
        <button :ref="`button-ref-id_${TV._id}`" @click="selectTV(TV, `button-ref-id_${TV._id}`)" @touchstart="pressingDown(`button-ref-id_${TV._id}`)" @touchend="notPressingDown(`button-ref-id_${TV._id}`)">Select</button>
      </ui>
    </div>
    <div id="tv-grid" v-else-if="this.loading == 2">
      <h3 :style="{'margin':'0', 'padding-top':'2%', 'text-align':'center'}">Please open the app from a Telegram client!</h3>
    </div>
  </div>
</template>

<style>
#tv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  row-gap: 2vh;
  justify-items: center;
  padding: 1vh 2vw;
  box-sizing: border-box;
}
.tv-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
}
.tv-card-imageOutline {
  position: relative;
  height: auto;
  max-width: 70%;
}
.tv-card-imageCheck.selected {
  visibility: visible;
  transform: scale(1);
  z-index: 2;
}
.tv-card-imageCheck {
  display: block;
  visibility: hidden;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  transform: scale(0);
  transition-duration: 0.4s;
  z-index: 2;
}
.tv-card-imageOutline img {
  height: auto;
  max-width: 100%;
}
img.selected {
  background-color: white;
  transform: scale(0.9);
  z-index: -1;
}
.tv-card button {
  display: inline-block;
  justify-content: center;
  width: 80%;
  border: 0px;
  border-radius: 6px;
  padding: 5px 0;
  background-color: var(--accent);
  color: var(--tg-theme-button-text-color);
  text-align: center;
}
</style>