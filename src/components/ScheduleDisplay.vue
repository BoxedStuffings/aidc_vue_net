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
            store,
            telegramMainButton: Telegram.WebApp.MainButton,
            telegramBackButton: Telegram.WebApp.BackButton,
            startX: 0,
            endX: 0
        }
    },

    methods: {
        clickSelf() {
            if (this.checkSlide()) {
                this.resetSlide()
            }
        },

        touchStart(e) {
            // Record initial position
            this.startX = e.touches[0].clientX
        },

        touchEnd(e) {
            let parentElement = e.currentTarget.parentElement
            // Record end position
            this.endX = e.changedTouches[0].clientX

            // Swipe left to show delete button
            if (parentElement.dataset.type == 0 && this.startX-this.endX> 30) {
                this.resetSlide()
                parentElement.dataset.type = 1
            }

            // Swipe right
            if (parentElement.dataset.type == 1 && this.startX-this.endX <-30) {
                this.resetSlide()
                parentElement.dataset.type = 0
            }

            this.startX = 0
            this.endX = 0
        },

        checkSlide() {
            let items = document.querySelectorAll(".schedule-display-detail-content")
            for (let i = 0; i < items.length; i++) {
                if (items[i].dataset.type == 1) {
                return true
                }
            }
            return false
        },

        resetSlide() {
            let items = document.querySelectorAll(".schedule-display-detail-content")
            for (let i = 0; i <items.length; i++) {
                items[i].dataset.type = 0
            }
        },

        removeAll(TV) {
            if (store.selectedTvs[store.findIndexOfSelectedTv(TV)].displays.length <= 0) {
                this.pushErrorToast('There are no scheduled displays for this TV')
            } else {
                let confirmMsg = 'Are you sure you want to remove all scheduled jobs for this tv?'
                Telegram.WebApp.showConfirm(confirmMsg, (status) => {
                    if (status) {
                        let allDisplaysDeletionPromise = Promise
                        allDisplaysDeletionPromise = this.deleteAllDisplays(TV._id)

                        allDisplaysDeletionPromise.then(() => {
                            store.emptySelectedTVDisplays(TV),
                            this.pushSuccessToast('All scheduled displays removed'),
                            this.resetSlide()
                        }, (e) => {console.log(e), this.pushErrorToast('Error removing displays'), this.resetSlide()})
                    }
                })
            }
        },

        remove(TV, index) {
            let displayDeletionPromise = Promise
            displayDeletionPromise = this.deleteDisplayJob(TV.displays[index]._id.$oid)

            displayDeletionPromise.then(() => {
                store.spliceDisplayFromSelectedTV(TV, index),
                this.pushSuccessToast('Scheduled display removed'),
                this.resetSlide()
            }, (e) => {console.log(e), this.pushErrorToast('Error removing display'), this.resetSlide()})
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

        async deleteDisplayJob(displayId){
            await $.ajax({
                url: 'https://heehee.amphibistudio.sg/api/displays/' + displayId,
                method: 'DELETE',
                success:  (success) => {
                    console.log(success.message)
                },
                error: (error) => console.log(error)
            })
        },

        async deleteAllDisplays(tvID){
            await $.ajax({
                url: 'https://heehee.amphibistudio.sg/api/tv/' + tvID + '/display',
                method: 'DELETE',
                success:  (success) => {
                    console.log(success.message)
                },
                error: (error) => console.log(error)
            })
        }
    },

    beforeMount() {
        const mainButton = () => {
            this.telegramMainButton.hide()
            this.$router.push('/MainSelection')
        }

        const backButton = () => {
            Telegram.WebApp.offEvent('mainButtonClicked', mainButton)
            Telegram.WebApp.offEvent('backButtonClicked', backButton)
            this.telegramMainButton.hide()
            this.$router.go(-1)
        }

        this.telegramMainButton.setParams({ text: 'Next'})
        Telegram.WebApp.onEvent('mainButtonClicked', mainButton)
        
        Telegram.WebApp.onEvent('backButtonClicked', backButton)
        
    },

    mounted() {
        this.telegramMainButton.show()
        this.telegramBackButton.show()
        Telegram.WebApp.expand()

    }

}
</script>

<template>
  <div class="schedule-holder">
    <div class="schedule-display-block" v-for="TV, index in store.selectedTvs" :key="index">
        <div class="schedule-display-tv">
            <div class="schedule-display-header noselect">
                <h2 :style="{'margin':0}">TV • {{ TV._id }}</h2>
                <font-awesome-icon :icon="['fas', 'trash']" class="schedule-display-header-icon" @click="removeAll(TV)"/>
            </div>
            <div class="schedule-display-detail" v-if="TV.displays.length != 0">
                <div class="schedule-display-detail-holder">
                    <ul class="schedule-display-detail-content-holder">
                        <!-- data-type=0 hide the delete button, data-type=1 show the delete button -->
                        <li class="schedule-display-detail-content" v-for="(displaySchedule, index) in TV.displays" data-type="0" :key="index">
                        <div @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="clickSelf">
                            <div class="schedule-display-detail-info">
                                <img class="schedule-display-detail-image" src="../assets/boxedstuffings.png">
                                <div class="schedule-display-detail-timing noselect">
                                    <h5>Start Time:</h5>
                                    {{ displaySchedule.display_start }}
                                    <h5>End Time:</h5>
                                    {{ displaySchedule.display_end }}
                                </div>
                            </div>
                        </div>
                        <div class="schedule-display-delete-btn" @click="remove(TV, index)" :data-index="index">Delete</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="schedule-display-detail" v-else>
                <h4>No Scheduled Jobs</h4>
            </div>
        </div>
    </div>
  </div>
</template>

<style>
.schedule-holder {
    padding-inline: 2%;
}
.schedule-holder .schedule-display-block:first-child .schedule-display-tv .schedule-display-header{
    margin-top: 5%
}
.schedule-display-header {
    margin-top: 10%;
    margin-bottom: 2%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.schedule-display-header-icon {
    height: 24px;
    width: auto;
    margin-right: 3vw;
}
.schedule-display-detail-holder {
    overflow: hidden;
}
.schedule-display-detail-content-holder {
    list-style: none;
    padding: 0;
    margin: 0;
}
.schedule-display-detail-content {
    transition: all 0.2s;
}
/* 0: hide */
.schedule-display-detail-content[data-type="0"] {
    transform: translate3d(0, 0, 0);
}
/* 1: display */
.schedule-display-detail-content[data-type="1"] {
    transform: translate3d(-64px, 0, 0);
}
.schedule-display-detail-content .schedule-display-delete-btn {
    width: 64px;
    height: 116px;
    background: #e01212;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 22px;
    position: absolute;
    top: 0px;
    right: -65px;
    line-height: 103px;
    text-align: center;
    border-radius: 2px;
}
.schedule-display-detail-info {
    overflow: hidden;
    padding: 10px;
    background-color: color-mix(in srgb, var(--tg-theme-bg-color), white 5%);
}
.schedule-display-detail-info .schedule-display-detail-image {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    float: left;
}
.schedule-display-detail-timing {
    overflow: hidden;
    padding-left: 8px;
}
.schedule-display-detail-timing h5{
    margin: 0;
}
</style>