<script>
import $ from 'jquery'
import { store } from '../Store.js'
import { useToast } from "vue-toastification"

export default {
    setup() {
        const toast = useToast()
        return {toast}
    },
    
    data() {
        return {
            telegramMainButton: Telegram.WebApp.MainButton,
            telegramBackButton: Telegram.WebApp.BackButton,
            selectedTvs: [],
            mediaName: 'Default Media Name',
            img: '',
            vid: '',
            mediaType: 0,
            DorS: '',
            scheduledTime: [],
        }
    },

    methods: {
        jobCreation() {
            return new Promise((resolve, reject) => {
                let mediaUploadPromise = Promise
                switch (store.mediaType) {
                    case 'Image':
                        mediaUploadPromise = this.uploadImage(store.imageObj)
                        break
                    case 'Video':
                        mediaUploadPromise = this.uploadVideo(store.videoObj)
                        break
                    case 'Canvas':
                        mediaUploadPromise = this.uploadCanvas(store.canvasObj)
                        break
                }

                if (this.DorS) {
                    mediaUploadPromise.then(() => {
                        let to = store.selectedTvs
                        this.submitScheduledJobConfirmation(to).then(() => {
                            resolve('Successfully Submitted!')
                        }, (e) => {console.log('Errors in: ' + e), reject(0)})
                    }, (e) => {console.log(e), reject(1)})
                } else {
                    mediaUploadPromise.then(() => {
                        let to = store.selectedTvs
                        this.submitDefaultConfirmation(to).then(() => {
                            resolve('Successfully Submitted!')
                        }, (e) => {console.log('Errors in: ' + e), reject(0)})
                    }, (e) => {console.log(e), reject(1)})
                }
            })
        },

        async uploadImage(image) {
            if (store.imageObj instanceof File) {
                let form_data = new FormData()
                form_data.append('file', image)

                await $.ajax({
                    url: 'https://heehee.amphibistudio.sg/api/save/image',
                    method: 'POST',
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

        async uploadVideo(video) {
            if (store.videoObj instanceof File) {
                let form_data = new FormData()
                form_data.append('file', video)
                
                await $.ajax({
                    url: 'https://heehee.amphibistudio.sg/api/save/video',
                    method: 'POST',
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

        async uploadCanvas(canvas) {
            if (store.canvasObj instanceof File) {
                let form_data = new FormData()
                form_data.append('file', canvas)
                
                await $.ajax({
                    url: 'https://heehee.amphibistudio.sg/api/save/video',
                    method: 'POST',
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

        async submitScheduledJobConfirmation(to) {
            return new Promise((resolve, reject) => {
                let errorArray = []
                let mediaLink = store.mediaLink
                let startTime = store.jobTiming[0]
                let endTime = store.jobTiming[1]

                for (let i = 0; i < to.length; i++) {
                    let url =`https://heehee.amphibistudio.sg/api/tv/${to[i]._id}/display?asset=${mediaLink}&display_start=${startTime}&display_end=${endTime}`
                    $.ajax({
                        url: url,
                        method: 'POST',
                        success: (obj) => {
                            console.log(obj.message)
                        },
                        error: (error) => errorArray.push(error)
                    })
                }
                errorArray.length == 0 ? resolve('Successful') : reject(errorArray)
            })
        },

        async submitDefaultConfirmation(to) {
            return new Promise((resolve, reject) => {
                let errorArray = []
                let mediaLink = store.mediaLink

                for (let i = 0; i < to.length; i++) {
                    let url =`https://heehee.amphibistudio.sg/api/tv/${to[i]._id}/default?default=${mediaLink}`
                    $.ajax({
                        url: url,
                        method: 'PUT',
                        success: (obj) => {
                            console.log(obj.message)
                        },
                        error: (error) => errorArray.push(error)
                    })
                }
                errorArray.length == 0 ? resolve('Successful') : reject(errorArray)
            })
        },

        pushSuccessToast(msg) {
            this.toast.success(msg, {
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

        pushErrorToast(msg) {
            this.toast.error(msg, {
                position: 'bottom-left',
                timeout: 5000,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.5,
                closeButton: 'button',
                icon: true,
            })
        }

    },

    beforeMount() {
        const mainButton = () => {
            this.jobCreation().then((message) => {
                this.pushSuccessToast(message),
                setTimeout(() => {
                    Telegram.WebApp.close()
                }, 5000);
            }).catch((result) => {
                this.telegramMainButton.show()
                if (result == 0) {
                    this.pushErrorToast('Error Submitting!')
                } else {
                    this.pushErrorToast('Error Uploading Image!')
                }
            })
        }

        const backButton = () => {
            Telegram.WebApp.offEvent('mainButtonClicked', mainButton)
            this.telegramMainButton.hide()
            this.$router.go(-1)
        }

        this.telegramMainButton.setParams({ text: 'Confirm'})
        Telegram.WebApp.onEvent('mainButtonClicked', mainButton)

        Telegram.WebApp.onEvent('backButtonClicked', backButton)
    },

    mounted() {
        this.telegramMainButton.show()
        this.telegramBackButton.show()

        this.selectedTvs = store.selectedTvs
        this.DorS = store.jobType
        switch(store.mediaType) {
            case 'Image':
                this.mediaName = store.imageObj.name
                this.img = URL.createObjectURL(store.imageObj)
                this.mediaType = 1
                break
            case 'Video':
                this.mediaName = store.videoObj.name
                this.vid = URL.createObjectURL(store.videoObj)
                this.mediaType = 2
                break
            case 'Canvas':
                this.mediaName = 'Canvas'
                this.mediaType = 0
                break
        }
        this.scheduledTime = store.jobTiming
    }

}
</script>

<template>
    <div class="confirmation-holder">
        <div class="confirmation-details">
            <div class="confirmation-details-sections">
                <h2>TV(s) Selected</h2>
                <div class="confirmation-tv" v-for="i, index in selectedTvs" :key="index">
                    <span class='icon1'></span>
                    <h4>TV • {{ i.info }}</h4>
                </div>
            </div>
            <div class="confirmation-details-sections">
                <h2>Media Selected</h2>
            </div>
            <div class="confirmation-details-sections" v-if="DorS">
                <div class="confirmation-job-timings">
                    <h2>Starting Time:</h2>
                    <h4>{{ scheduledTime[0] }}</h4>
                </div>
                <div class="confirmation-job-timings">
                    <h2>Ending Time: </h2>
                    <h4>{{ scheduledTime[1] }}</h4>
                </div>
            </div>
            <div class="confirmation-preview-holder">
                <img class="confirmation-upload-preview noselect" :src="img" v-if="this.mediaType == 1">
                <video autoplay muted loop playsinline class="confirmation-upload-preview noselect" :src="vid" v-else-if="mediaType == 2"></video>
                <img class="confirmation-upload-preview noselect" src="../assets/boxedstuffings.png">
            </div>
            <h2> {{ mediaName }} </h2>
        </div>
    </div>
</template>

<style scoped>
.confirmation-holder {
    height: 100vh;
    width: 100vw;
    padding: 2vh 4vw;
    background-color: var(--tg-theme-bg-color);
    overflow-x: clip;
    overflow-y: scroll;
}
.confirmation-details-sections {
    margin-bottom: 5%;
    position: relative;
}
.confirmation-details-sections h2 {
    color: var(--tg-theme-text-color);
}
.confirmation-tv {
    margin-block: 2%;
    display: flex;
    align-items: center;
}
.confirmation-tv h4 {
    margin: 0 0 0 4%;
    text-align: center;
    color: var(--tg-theme-text-color);
}
.confirmation-job-timings {
    margin-bottom: 2%;
}
.confirmation-preview-holder {
    display: flex;
    justify-content: center;
}
.confirmation-upload-preview {
  height: auto;
  width: 85%;
}
.icon1 {
    background: url('../assets/icons/display.svg');
    height: 30px;
    width: 30px;
    padding:10px;
    margin-right: 10px;
    display: block;
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: center;
    /* Other styles here */
}
</style>