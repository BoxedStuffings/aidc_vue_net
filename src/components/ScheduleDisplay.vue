<script>
import { store } from '../Store.js'

export default {
    data() {
        return {
            store,
            telegramMainButton: Telegram.WebApp.MainButton,
            startX: 0,
            endX: 0
        }
    },

    methods: {
        clickSelf() {
            if (this.checkSlide()) {
                this.restSlide()
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
                this.restSlide()
                parentElement.dataset.type = 1
            }

            // Swipe right
            if (parentElement.dataset.type == 1 && this.startX-this.endX <-30) {
                this.restSlide()
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

        restSlide() {
            let items = document.querySelectorAll(".schedule-display-detail-content")
            console.log(items)
            for (let i = 0; i <items.length; i++) {
                items[i].dataset.type = 0
            }
        },

        remove(TV, index) {
            // TO BE TESTED
            // let displayDeletionPromise = Promise
            // displayDeletionPromise = this.deleteDisplayJob()

            // displayDeletionPromise.then(() => {
            //     store.spliceDisplayFromSelectedTV(TV, index),
            //     this.restSlide()
            // },
            // (e) => {console.log(e), this.restSlide()}
            // )
        },

        async deleteDisplayJob(displayId){
            await $.ajax({
                url: 'https://heehee.amphibistudio.sg/api/displays/' + displayId,
                method: 'DELETE',
                headers: {
                    'Authorization' : 'Bearer ' + '648daddfbc0acb0ad907bdd7|Xj7e4Hmn5eAoq7dDkns3ZnfJGuBMG3D1s7ia384f'
                },
                success:  (success) => {
                    console.log(success.message)
                },
                error: (error) => console.log(error)
            })
        },
    },

    mounted() {
        const telegramBackButton = Telegram.WebApp.BackButton

        let scheduleSelectionTelegramButton = () => {
        if (this.telegramMainButton.isVisible) {
            this.$router.push('/MainSelection')
            this.telegramMainButton.offClick(scheduleSelectionTelegramButton)
            this.telegramMainButton.hide()
        }}

        this.telegramMainButton.setParams({
        text: 'Select Tv',
        }).onClick(scheduleSelectionTelegramButton)

        telegramBackButton.show()
        telegramBackButton.onClick(() => {
        if (telegramBackButton.isVisible) {
            this.telegramMainButton.offClick(scheduleSelectionTelegramButton)
            this.$router.go(-1)
            telegramBackButton.hide()
        }
        }),

        this.telegramMainButton.show()
    },

}
</script>

<template>
  <div class="schedule-holder">
    <div class="schedule-display-block" v-for="TV, index in store.selectedTvs" :key="index">
        <div class="schedule-display-tv">
            <div class="schedule-display-header">
                <h2 :style="{'margin':0}">TV • {{ TV._id }}</h2>
                <font-awesome-icon :icon="['fas', 'trash']" class="schedule-display-header-icon"/>
            </div>
            <div class="schedule-display-detail" v-if="TV.displays.length != 0">
                <div class="schedule-display-detail-holder">
                    <ul class="schedule-display-detail-content-holder">
                        <!-- data-type=0 hide the delete button, data-type=1 show the delete button -->
                        <li class="schedule-display-detail-content" v-for="(displaySchedule, index) in TV.displays" data-type="0" :key="index">
                        <div @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="clickSelf">
                            <div class="schedule-display-detail-info">
                                <img class="schedule-display-detail-image" src="../assets/boxedstuffings.png">
                                <div class="schedule-display-detail-timing">
                                    <h5>Start Time:</h5>
                                    {{ displaySchedule.display_start    }}
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
  height: 103px;
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
  background-color: var(--tg-theme-secondary-bg-color);
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