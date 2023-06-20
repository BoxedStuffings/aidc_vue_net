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
            DorS: '',
            mediaName: String,
            scheduledTime: [],
            
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
            }],
            test: {},
            testconfirm: "",
            testdate: [['2023-07-08T08:30', '2023-07-08T09:30'], ['2023-07-08T09:30', '2023-07-08T010:30']],
            mediaSrc: Object,
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
                        break
                }

                if (this.DorS) {
                    mediaUploadPromise.then(() => {
                        let to = store.selectedTvs
                        this.submitScheduledJobConfirmation(to).then(() => {
                            resolve('Successfully Submitted!')
                        }, (e) => {console.log('Errors in: ' + e), reject('test1')})
                    }, (e) => {console.log(e), reject('test2')})
                } else {
                    mediaUploadPromise.then(() => {
                        let to = store.selectedTvs
                        this.submitDefaultConfirmation(to).then(() => {
                            resolve('Successfully Submitted!')
                        }, (e) => {console.log('Errors in: ' + e), reject('test3')})
                    }, (e) => {console.log(e), reject('test4')})
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
                    // headers: {
                    //     'Authorization' : 'Bearer ' + '648daddfbc0acb0ad907bdd7|Xj7e4Hmn5eAoq7dDkns3ZnfJGuBMG3D1s7ia384f'
                    // },
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

        async submitScheduledJobConfirmation(to) {
            return new Promise((resolve, reject) => {
                let errorArray = []
                // let tv = 1
                // let startTime = jobTiming[0]
                // let endTime = jobTiming[1]
                let mediaLink = store.mediaLink

                let startTime = store.jobTiming[0]
                let endTime = store.jobTiming[1]
                for (let i = 0; i < to.length; i++) {
                    let url =`https://heehee.amphibistudio.sg/api/tv/${to[i]._id}/display?display_type=${displayType}&asset=${mediaLink}&display_start=${startTime}&display_end=${endTime}`
                    $.ajax({
                        url: url,
                        method: 'POST',
                        success: (obj) => {
                            console.log(obj.message)
                            this.testconfirm = 'uploaded'
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
                            this.testconfirm = 'uploaded'
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
                icon: true,
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

        // TBR
        selectImageFile(fileEvent) {
            let image = fileEvent.target.files[0]
            console.log(image.type)

            image.type.indexOf('image/') !== 0 ? this.pushErrorToast('Invalid Image!') : this.test = image
            console.log(this.test)

            let img = URL.createObjectURL(image)
            this.mediaSrc = img
            console.log(img)
        }

    },

    mounted() {
        this.telegramMainButton.show()
        this.telegramMainButton.setParams({ text: 'Confirm'})
        Telegram.WebApp.onEvent('mainButtonClicked', () => {
            this.jobCreation().then((message) => {
                this.pushSuccessToast(message),
                setTimeout(() => {
                    Telegram.WebApp.close()
                }, 5000);
            }).catch((result) => {
                this.telegramMainButton.show()
                this.pushErrorToast(result)
                // if (result == 0) {
                //     this.pushErrorToast('Error Submitting!')
                // } else {
                //     this.pushErrorToast('Error Uploading Image!')
                // }
            })
        })

        this.telegramBackButton.show()
        Telegram.WebApp.onEvent('backButtonClicked', () => {
            this.telegramMainButton.hide()
            this.$router.go(-1)
        })

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
        this.DorS = store.jobType
    }

}
</script>

<template>
    <div class="confirmation-holder">
        <div class="confirmation-details">
            <div class="confirmation-details-sections">
                <h2>TV(s) SELECTED</h2>
                {{ scheduledTime }}
                {{ DorS }}
                <div class="confirmation-tv" v-for="i, index in testarray" :key="index">
                    <font-awesome-icon icon="fa-solid fa-tv" class="confirmation-tv-icon"/>
                    <h4>TV • {{ i._id }} : {{ i.info }}</h4>
                </div>
            </div>
            <div class="confirmation-details-sections">
                <h2>MEDIA SELECTED</h2>
                <!-- <h4>{{ test.name }}</h4> -->
                <h4>{{ mediaName }}</h4>
            </div>
            <div class="confirmation-details-sections" v-if="DorS">
                <div class="confirmation-job-timings">
                    <h2>Starting Time:</h2>
                    <!-- <h4>{{ testdate[0][0] }}</h4> -->
                    <h4>{{ scheduledTime[0] }}</h4>
                </div>
                <div class="confirmation-job-timings">
                    <h2>Ending Time: </h2>
                    <!-- <h4>{{ testdate[0][1] }}</h4> -->
                    <h4>{{ scheduledTime[1] }}</h4>
                </div>
            </div>
            <input type="file" accept="image/*" @change="(env) => selectImageFile(env)"/>
            <!-- <button @click="submitConfirmation">test up</button> -->
            <!-- <button @click="jobCreation">test image up</button> -->
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