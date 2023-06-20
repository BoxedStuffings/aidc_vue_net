import { reactive } from 'vue'

export const store = reactive({
  // ------------------------------------- //
  // --------------DATA STORE------------- //
  // ------------------------------------- //
  initcount: 0,                     // Ensure first load of web app
  availableTVsFromDataBase: [],     // Array of available TVs in the database (TV.vue)
  canvasObjects: [],                // Array of elements in the canvas (CanvasSelection.vue)

  // ------------------------------------- //
  // ------DATA FOR REQUEST CRAFTING------ //
  // ------------------------------------- //
  telegramWebAppInfo: [],     // Information of user provided by Telegram
  selectedTvs: [],            // Tv(s) selected by user
  imageObj: {},               // Image selected by user
  videoObj: {},               // Video selected by user
  mediaType: String,          // Type of media to be submitted
  mediaLink: String,          // Link to retrieve media after uploading to server
  jobType: false,             // Set media as default or scheduled job (true = scheduled job, false = default)
  jobTiming: [],              // Start and End DateTime for scheduled job [start, end]

  // ------------------------------------- //
  // ---------------OPTIONS--------------- //
  // ------------------------------------- //
  // Media type options (MainSelection.vue)
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
        "title":"Create Custom Banner",
        "desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        "media":"hehe.com",
      }
  ],
  // Canvas toolbar options (Toolbar.vue)
  canvasToolbarOptions: [
    { _id: 1, name: "Canvas"},
    { _id: 2, name: "Templates"},
    { _id: 3, name: "Elements"},
    { _id: 4, name: "Insert"},
    { _id: 5, name: "Options"}
  ],
  // Canvas toolbar options for editable textbox (Toolbar.vue)
  canvasEditableTexboxOptions: [
    { _id: 1, name: "Font"},
    { _id: 2, name: "Color"},
    { _id: 3, name: "Shadow"},
    { _id: 4, name: "Animations"},
    { _id: 5, name: "Options"}
  ],

  // ------------------------------------- //
  // -----------STORE FUNCTIONS----------- //
  // ------------------------------------- //
  // Adding Telegram data to store(App.vue)
  initTelegramData(initData) {
    this.telegramWebAppInfo = initData
  },
  // Add available TVs to store (TV.vue)
  initTVfromDB(tvArray){
    this.availableTVsFromDataBase = tvArray
  },
  // Find the index of selected TV within selectedTVs (TV.vue, ScheduleDisplay.vue)
  findIndexOfSelectedTv(TV) {
    return this.selectedTvs.findIndex(x => x._id == TV._id)
  },
  // Add selected TV to selectedTVs (TV.vue)
  pushSelectedTv(TV) {
    this.selectedTvs.push(TV)
  },
  // Remove unselected TV from selectedTVs (TV.vue)
  spliceSelectedTvAt(index){
    this.selectedTvs.splice(index, 1)
  },
  // Remove specific displays from selectedTVs (ScheduleDisplay.vue)
  spliceDisplayFromSelectedTV(TV, index) {
    let tv = this.selectedTvs.findIndex(x => x._id == TV._id)
    this.selectedTvs[tv].displays.splice(index, 1)
  },
  // Remove all displays from selectedTVs (ScheduleDisplay.vue)
  emptySelectedTVDisplays(TV) {
    let tv = this.selectedTvs.findIndex(x => x._id == TV._id)
    this.selectedTvs[tv].displays = []
  },
  // Add selected image to store (StaticImageUpload.vue)
  uploadImage(image) {
    this.imageObj = image
  },
  // Remove image from store (StaticImageUpload.vue)
  clearImage() {
    this.imageObj = {}
  },
  // Add selected video to store (VideoUpload.vue)
  uploadVideo(video) {
    this.videoObj = video
  },
  // Remove video from store (VideoUpload.vue)
  clearVideo() {
    this.videoObj = {}
  },
  // Create canvas element id (Elements.vue)
  createElementID(element) {
    let count = 1
    while (true) {
      let key = element.type + ` ${count}`
      if (this.canvasObjects.find(e => e.Name === key)) {
        count++
      } else {
        return key
      }
    }
  },
  // Adding canvas elements to canvasObjects (Elements.vue)
  addElementToCanvas(element) {
    let key = element.id
    let elementobj = {Name: key, Object: element}
    this.canvasObjects.push(elementobj)
  },
  // Removing canvas elements from list (CanvasSelection.vue)
  removeElementFromCanvas(element){
    let i = this.canvasObjects.findIndex(e => e.Name === element.id)
    if (i > -1) {
      this.canvasObjects.splice(i, 1)
    }
  },
  // Override canvas elements (CanvasSelection.vue)
  setCanvasLayer(value) {
    this.canvasObjects = value
  },
  // Setting type of media to be uploaded (StaticImageUpload.vue, VideoUpload.vue, CanvasSelection.vue)
  setMediaType(type) {
    this.mediaType = type
  },
  // Set job type (ScheduleSelection.vue)
  setjobType(state) {
    this.jobType = state
  },
  // Set job start and end timing (ScheduleSelection.vue)
  setjobTiming(value) {
    this.jobTiming = value
  },
  // Setting media upload link (Confirmation.vue)
  setMediaUploadLink(link) {
    this.mediaLink = link
  }

})