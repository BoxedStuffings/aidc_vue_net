import { reactive } from 'vue'

export const store = reactive({
    availableTVsFromDataBase: [],
    initcount: 0,
    
    // MainSelection as in db (placeholder values) (MainSelection.vue)
    availableMSOptions: [
        {
            "_id": 0,
            "title":"Default Banner",
            "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            "media":"hehe.com"
        },

        {
            "_id": 2,
            "title":"Custom",
            "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            "media":"hehe.com",
            "display_variations":[
                {
                    "_id": 1,
                    "title":"Variation 1",
                    "desc":"",
                    "wireframe":"",
                    "sample_media":"",
                    "background_media":[""]
                }
            ]
        },

        {
            "_id": 1,
            "title":"Standard",
            "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            "media":"hehe.com",
            "display_variations":[
                {
                    "_id": 1,
                    "title":"Variation 1",
                    "desc":"",
                    "wireframe":"",
                    "sample_media":"",
                    "background_media":[""]
                }
            ]
        }
    ],

    standardDisplayOptions: [
      {
        "_id": 0,
        "title":"Static Image",
        "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        "media":"hehe.com"
      },

      {
        "_id": 1,
        "title":"Video Loop",
        "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        "media":"hehe.com"
      },
    ],

    // Cards (placeholder values)
    availableCardOptions: [
        { _id: 1, name: "Variation 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
        { _id: 2, name: "Variation 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
        { _id: 3, name: "Variation 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."}
    ],

    // Toolbar options
    canvasToolbarOptions: [
      { _id: 1, name: "Canvas"},
      { _id: 2, name: "Templates"},
      { _id: 3, name: "Elements"},
      { _id: 4, name: "Insert"},
      { _id: 5, name: "Options"}
    ],

    // Data to be sent
    telegramWebAppInfo: [],

    selectedTvs: [],

    imageObj: {},

    videoObj: {},

    // Getting available TVs into store (TV.vue)
    initTVfromDB(tvArray){
      this.availableTVsFromDataBase = tvArray
    },

    // Find the selected TV within selectedTVs (TV.vue)
    findIndexOfSelectedTv(TV) {
      return this.selectedTvs.findIndex(x => x._id == TV._id)
    },

    // Remove unselected TV from selectedTVs (TV.vue)
    spliceSelectedTvAt(index){
      this.selectedTvs.splice(index, 1)
    },

    // Add selected TV to selectedTVs (TV.vue)
    pushSelectedTv(TV) {
      this.selectedTvs.push(TV)
    },

    // Image upload (StandardDisplaySelection.vue)
    uploadImage(image) {
      this.imageObj = image
    },

    // Video upload (VideoUpload.vue)
    uploadVideo(video) {
      this.videoObj = video
    },

    // Getting Telegram data (TV.vue)
    initTelegramData(initData) {
      this.telegramWebAppInfo = initData
    }

})