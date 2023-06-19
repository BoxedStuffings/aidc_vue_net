import { reactive } from 'vue'

export const store = reactive({
    availableTVsFromDataBase: [],
    initcount: 0,

    // MainSelection as in db (placeholder values) (MainSelection.vue)
    availableMSOptions: [
        {
          "_id": 1,
          "title":"Upload Image",
          "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
          "media":"hehe.com"
        },

        {
          "_id": 2,
          "title":"Upload Video",
          "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
          "media":"hehe.com",
        },

        {
          "_id": 3,
          "title":"Create Custome Banner",
          "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
          "media":"hehe.com",
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

    // Canvas editable textbox options
    canvasEditableTexboxOptions: [
      { _id: 1, name: "Font"},
      { _id: 2, name: "Color"},
      { _id: 3, name: "Shadow"},
      { _id: 4, name: "Animations"},
      { _id: 5, name: "Options"}
    ],

    // Canvas Objects
    canvasObjects: [],

    // Data to be sent
    telegramWebAppInfo: [],

    selectedTvs: [],

    imageObj: {},

    videoObj: {},

    mediaType: String,

    mediaLink: String,

    jobTiming: [],

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

    // Remove specific displays from selectedTVs (ScheduleDisplay.vue)
    spliceDisplayFromSelectedTV(TV, index) {
      let tv = this.selectedTvs.findIndex(x => x._id == TV._id)
      this.selectedTvs[tv].displays.splice(index, 1)
    },

    // Image upload (StandardDisplaySelection.vue)
    uploadImage(image) {
      this.imageObj = image
    },

    // Clearing image object (StandardDisplaySelection.vue)
    clearImage() {
      this.imageObj = {}
    },

    // Video upload (VideoUpload.vue)
    uploadVideo(video) {
      this.videoObj = video
    },

    // Clearing video object (VideoUpload.vue)
    clearVideo() {
      this.videoObj = {}
    },

    // Setting media type to be uploaded
    setMediaType(type) {
      this.mediaType = type
    },

    // Setting media upload link (VideoUpload.vue, StandardDisplaySelection.vue)
    setMediaUploadLink(link) {
      this.mediaLink = link
    },

    // Set job start and end timing
    setjobTiming(value) {
      this.jobTiming = value
    },

    // Getting Telegram data (TV.vue)
    initTelegramData(initData) {
      this.telegramWebAppInfo = initData
    },

    // Override canvas elements 
    setCanvasLayer(value) {
      this.canvasObjects = value
    },

    // Adding canvas elements to list (Elements.vue)
    addElementToCanvas(element) {
      let count = 1
      while (true) {
        let key = element.type + ` ${count}`
        if (this.canvasObjects.find(e => e.Name === key)) {
          count++
        } else {
          var elementobj = {
            Name: key,
            Object: element
          }
          this.canvasObjects.push(elementobj)
          break
        }
      }
      
    },
    
    // Removing canvas elements from list (CanvasSelection.vue)
    removeElementFromCanvas(elementKey){
      let i = this.canvasObjects.findIndex(e => e.Name === elementKey);
      if (i > -1) {
        this.canvasObjects.splice(i, 1)
        console.log("test")
      }
      // delete this.canvasObjects[`${elementKey}`]
    }

})