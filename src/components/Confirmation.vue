<script>
import $ from 'jquery'
import { store } from '../Store.js'

export default {
  data() {
    return {
        telegramMainButton: Telegram.WebApp.MainButton,
        testarray: [{
            "_id": 3,
            "current_display": "nnn",
            "image": "adwdwadawd.com",
            "info": "wdwdwd",
            "address": "heheMACAddress",
            "displays": [
                {
                    "tv_id": 3,
                    "display_type": "2",
                    "display_start": "2023-05-08T08:30",
                    "display_end": "2023-05-08T09:30",
                    "asset": "image.com",
                    "_id": {
                        "$oid": "648a0a27d27a66362c0a1ff4"
                    }
                },
                {
                    "tv_id": 3,
                    "display_type": "2",
                    "display_start": "2023-06-08T08:30",
                    "display_end": "2023-06-08T09:30",
                    "asset": "image.com",
                    "_id": {
                        "$oid": "648a0a3ed27a66362c0a1ff5"
                    }
                },
                {
                    "tv_id": 3,
                    "display_type": "2",
                    "display_start": "2023-07-08T08:30",
                    "display_end": "2023-07-08T09:30",
                    "asset": "image.com",
                    "_id": {
                        "$oid": "648a0a4bd27a66362c0a1ff6"
                    }
                },
                {
                    "tv_id": 3,
                    "display_type": "2",
                    "display_start": "2023-07-08T09:31",
                    "display_end": "2023-07-08T10:30",
                    "asset": "image.com",
                    "_id": {
                        "$oid": "648a0a6ed27a66362c0a1ff7"
                    }
                },
                {
                    "tv_id": "3",
                    "display_type": "2",
                    "display_start": "2023-01-09T09:30",
                    "display_end": "2023-01-09T10:30",
                    "asset": "image.com",
                    "_id": {
                        "$oid": "648d8a542c7e760a3906c832"
                    }
                }
                    
            ],
            "updated_at": "2023-06-17T10:26:28.632000Z",
            "created_at": "2023-06-12T21:11:07.065000Z"
        },
        {
            "_id": 4,
            "current_display": "nnn",
            "image": "adwdwadawd.com",
            "info": "wdwdwd",
            "address": "heheMACAddress",
            "displays": [],
            "updated_at": "2023-06-14T13:25:55.724000Z",
            "created_at": "2023-06-14T13:25:55.724000Z"
        }
    ],
    
    media: {},
    test: {},
    testconfirm: "",
    mediaSrc: Object
    }
  },

  methods: {
    async uploadImage(image) {
    //   if (store.imageObj instanceof File) {
        let form_data = new FormData()
        form_data.append('file', image)
        await $.ajax({
        url: 'https://heehee.amphibistudio.sg/api/save/image',
          method: 'POST',
          headers: {
            'Authorization' : 'Bearer ' + '648daddfbc0acb0ad907bdd7|Xj7e4Hmn5eAoq7dDkns3ZnfJGuBMG3D1s7ia384f'
          },
          processData: false,
          mimeType: 'multipart/form-data',
          contentType: false,
          data: form_data,
          success: (obj) => {
            obj = JSON.parse(obj),
            console.log(obj.message),
            store.setMediaUploadLink(obj.data)
          },
          error: (error) => console.log(error)
        })
    //   }
    },

    async uploadVideo(video) {
      if (store.videoObj instanceof File) {
        let form_data = new FormData()
        form_data.append('file', video)
        
        await $.ajax({
        url: 'https://heehee.amphibistudio.sg/api/save/video',
          method: 'POST',
          headers: {
            'Authorization' : 'Bearer ' + '648dbe64b1981ef0c4039be2|fxfgCqI8o9eig8ABkMR0ES7isHzGr5MCh4L74T49'
          },
          processData: false,
          mimeType: 'multipart/form-data',
          contentType: false,
          data: form_data,
          success: (obj) => {
            obj = JSON.parse(obj),
            console.log(obj.message),
            store.setMediaUploadLink(obj.data)
          },
          error: (error) => console.log(error)
        })
      }
    },

    jobCreation() {
        let mediaUploadPromise = Promise
        switch (store.mediaType) {
            case 'Image':
                mediaUploadPromise = this.uploadImage(store.imageObj)
                break
            case 'Video':
                mediaUploadPromise = this.uploadVideo(store.videoObj)
                break
        }
        mediaUploadPromise.then(() => this.submitConfirmation(), (e) => console.log(e))
    },

    async submitConfirmation() {
        let tv = 1
        let displayType = 2
        let mediaLink = store.mediaLink
        let startTime = jobTiming[0]
        let endTime = jobTiming[1]

        let url =`https://heehee.amphibistudio.sg/api/tv/${tv}/display?display_type=${displayType}&asset=${mediaLink}&display_start=${startTime}&display_end=${endTime}`
        $.ajax({
            url: url,
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + '648daddfbc0acb0ad907bdd7|Xj7e4Hmn5eAoq7dDkns3ZnfJGuBMG3D1s7ia384f'
            },
            success: (obj) => {
                console.log(obj.message)
                this.testconfirm = 'uploaded'
            },
            error: (error) => console.log(error)
        })
    },

    selectImageFile(fileEvent) {
        let image = fileEvent.target.files[0]
        console.log(image.type)

        image.type.indexOf('image/') !== 0 ? console.log('invalid image') : this.test = image
        console.log(this.test)

        let img = URL.createObjectURL(image)
        this.mediaSrc = img
        console.log(img)
    },

  },

  mounted() {
    const telegramBackButton = Telegram.WebApp.BackButton

    let confirmationTelegramButton = () => {
      if (this.telegramMainButton.isVisible) {
        this.submitConfirmation()
      }
    }
    
    this.telegramMainButton.show()
    this.telegramMainButton.setParams({
      text: 'Confirm',
    }).onClick(confirmationTelegramButton)


    telegramBackButton.show()
    telegramBackButton.onClick(() => {
      if (telegramBackButton.isVisible) {
        this.$router.go(-1)
        telegramBackButton.hide()
      }
    })
  }

}
</script>

<template>
    <div class="confirmation-holder">
        <div class="confirmation-details">
            <div class="confirmation-details-sections">
                <h2>TV(s) SELECTED</h2>
                <div class="confirmation-tv" v-for="i, index in testarray" :key="index">
                    <font-awesome-icon icon="fa-solid fa-tv" class="confirmation-tv-icon"/>
                    <h4>TV • {{ i._id }} : {{ i.info }}</h4>
                </div>
            </div>
            <div class="confirmation-details-sections">
                <h2>MEDIA SELECTED</h2>
                <h4>{{ test.name }}</h4>
                <img :src="mediaSrc">   
                <!-- <video autoplay muted loop playsinline id="vid-bg" :src="vid"></video> -->
            </div>
            <div class="confirmation-details-sections">
                <div class="confirmation-job-timings">
                    <h2>Starting Time:</h2>
                    <h4>TEST</h4>
                    <!-- <h4>{{ store.jobTiming[0] }}</h4> -->
                </div>
                <div class="confirmation-job-timings">
                    <h2>Ending Time: </h2>
                    <h4>TEST</h4>
                    <!-- <h4>{{ store.jobTiming[1] }}</h4> -->
                </div>
            </div>
            <input type="file" accept="image/*" @change="(env) => selectImageFile(env)"/>
            <button @click="submitConfirmation">test up</button>
            <button @click="jobCreation">test image up</button>
            {{ testconfirm }}
        </div>
    </div>
</template>

<style scoped>
.confirmation-holder {
    height: 100vh;
    width: 100vw;
    padding: 1vh 2vw;
    background-color: var(--tg-theme-bg-color);
    overflow: hidden;
}
.confirmation-details-sections {
    margin-bottom: 5%;
    position: relative;
}
.confirmation-details-sections h2 {
    color: var(--tg-theme-text-color);
}
.confirmation-details-sections img {
    height: 10vh;
    width: auto;
    /* position: absolute;
    top: 5vh;
    right: 3vw;
    float: right; */
}
.confirmation-tv {
    margin-block: 2%;
    display: flex;
    align-items: center;
}
/* .confirmation-tv-icon {
    height: auto;
    width: 7vw;
    scale: 1;
} */
.confirmation-tv h4 {
    margin: 0 0 0 4%;
    text-align: center;
    color: var(--tg-theme-text-color);
}
.confirmation-job-timings {
    margin-bottom: 2%;
}
</style>