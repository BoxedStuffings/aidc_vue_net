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
                break
            case 'Video':
                this.mediaName = store.videoObj.name
                break
            case 'Canvas':
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
                <h2>TV(s) SELECTED</h2>
                <div class="confirmation-tv" v-for="i, index in selectedTvs" :key="index">
                    <font-awesome-icon icon="fa-solid fa-tv" class="confirmation-tv-icon"/>
                    <h4>TV • {{ i._id }} : {{ i.info }}</h4>
                </div>
            </div>
            <div class="confirmation-details-sections">
                <h2>MEDIA SELECTED</h2>
                <h4>{{ mediaName }}</h4>
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
        </div>
    </div>
</template>

<style scoped>
.confirmation-holder {
    height: 100vh;
    width: 100vw;
    padding: 1vh 2vw;
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
</style>