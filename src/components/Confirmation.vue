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
            vid: '',
            mediaType: 0,
            DorS: '',
            scheduledTime: [],
            test: store.testTV
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
            if (store.imageObj instanceof File) {
                let form_data = new FormData()
                form_data.append('file', canvas)

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
        },

        toggleOverlay() {
            this.$refs.ConfirmationOverlay.classList.toggle('overlay-visible')
            this.$refs.ConfirmationLoader.classList.toggle('loader')
        },

        colorTheme() {
            let icon = document.getElementsByTagName('span')
            console.log(icon)
            for (let i=0;i<icon.length;i++) {
                if (store.telegramColorScheme == 'light') {
                    icon[i].classList.add('light-display')
                } else {
                    icon[i].classList.add('dark-display')
                }
            }
        }

    },

    beforeMount() {
        const mainButton = () => {
            this.toggleOverlay()
            this.jobCreation().then((message) => {
                this.toggleOverlay()
                this.pushSuccessToast(message),
                setTimeout(() => {
                    Telegram.WebApp.close()
                }, 5000);
            }).catch((result) => {
                this.toggleOverlay()
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
        this.mediaType = store.mediaType
        
        this.scheduledTime = store.jobTiming
        this.scheduledTime[1] = this.scheduledTime[1].replace('T', ' • ')
        this.scheduledTime[0] = this.scheduledTime[0].replace('T', ' • ')

        setTimeout(() => {
            switch(store.mediaType) {
                case 'Image':
                    const imgPreview = this.$refs.imagePreview
                    let imgWidth = imgPreview.width * 0.5625
                    imgPreview.style.maxHeight = `${imgWidth}px`
                    
                    this.mediaName = store.imageObj.name
                    imgPreview.src = URL.createObjectURL(store.imageObj)
                    break
                case 'Video':
                    const vidPreview = this.$refs.videoPreview
                    let vidWidth = vidPreview.getBoundingClientRect().width * 0.5625
                    vidPreview.style.maxHeight = `${vidWidth}px`
    
                    this.mediaName = store.videoObj.name
                    this.vid = URL.createObjectURL(store.videoObj)
                    break
                case 'Canvas':
                    const canvasPreview = this.$refs.canvasPreview
                    let canvasWidth = canvasPreview.width * 0.5625
                    canvasPreview.style.maxHeight = `${canvasWidth}px`
    
                    this.mediaName = 'Canvas'
                    canvasPreview.src = store.canvasObj
                    break
            }
        }, 10)
        
        setTimeout(() => {
            this.colorTheme()
        }, 50)
    }

}
</script>

<template>
    <div class="confirmation-holder noselect">
        <div ref="ConfirmationOverlay"><div ref="ConfirmationLoader"></div></div>
        <div class="confirmation-details">
            <div class="confirmation-details-sections">
                <h2>TV(s) Selected</h2>
                <div class="confirmation-tv" v-for="i, index in selectedTvs" :key="index">
                    <span class='display icon-base'></span>
                    <h4>TV • {{ i.info }}</h4>
                </div>
            </div>
            <div class="confirmation-details-sections media-section">
                <h2>Media Selected</h2>
            </div>
            <div class="confirmation-details-sections" v-if="DorS">
                <div class="confirmation-job-timings">
                    <h2>Starting Time:</h2>
                    <h6>{{ scheduledTime[0] }}</h6>
                </div>
                <div class="confirmation-job-timings">
                    <h2>Ending Time: </h2>
                    <h6>{{ scheduledTime[1] }}</h6>
                </div>
            </div>
            <div class="confirmation-preview-holder">
                <img ref="canvasPreview" class="confirmation-upload-preview noselect" v-show="this.mediaType == 'Canvas'">
                <img ref="imagePreview" class="confirmation-upload-preview noselect" v-show="this.mediaType == 'Image'">
                <video ref="videoPreview" autoplay muted loop playsinline class="confirmation-upload-preview noselect" :src="vid" v-show="mediaType == 'Video'"></video>
            </div>
            <p> {{ mediaName }} </p>
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
    margin-bottom: 1%;
    position: relative;
}
.media-section{
    margin-top: 20px;
    margin-bottom: 0px;
}
.confirmation-details-sections h2 {
    color: var(--tg-theme-text-color);
}
.confirmation-tv {
    margin-block: 2%;
    margin-left: 30px;
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
  width: 85%;
  object-fit: fill;
}
.icon-base {
    height: 30px;
    width: 30px;
    padding:10px;
    margin-right: 10px;
    display: block;
}
p {
    text-align: center;
    color: var(--tg-theme-text-color);
}
</style>