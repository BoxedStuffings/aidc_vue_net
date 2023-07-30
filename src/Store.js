import { reactive } from 'vue'

export const store = reactive({
  // ------------------------------------- //
  // --------------DATA STORE------------- //
  // ------------------------------------- //
  initcount: 0,                     // Ensure first load of web app
  availableTVsFromDataBase: [],     // Array of available TVs in the database (TV.vue)
  canvasObjects: [],                // Array of elements in the canvas (CanvasSelection.vue)
  canvasTemplates: [],              // Templates available in the canvas

  // ------------------------------------- //
  // ------DATA FOR REQUEST CRAFTING------ //
  // ------------------------------------- //
  telegramWebAppInfo: [],       // Information of user provided by Telegram
  telegramColorScheme: '',  // Color scheme determined by Telegram ('light' or 'dark') 
  selectedTvs: [],              // Tv(s) selected by user
  imageObj: {},                 // Image selected by user
  videoObj: {},                 // Video selected by user
  canvasObj: {},                // Canvas created by user 
  mediaType: String,            // Type of media to be submitted
  mediaLink: String,            // Link to retrieve media after uploading to server
  jobType: false,               // Set media as default or scheduled job (true = scheduled job, false = default)
  jobTiming: [],                // Start and End DateTime for scheduled job [start, end]

  // ------------------------------------- //
  // ---------------OPTIONS--------------- //
  // ------------------------------------- //
  // Media type options (MainSelection.vue)
  availableMSOptions: [
      {
        '_id': 1,
        'title': 'Upload Image',
        'desc': 'Share your organization\'s noteworthy images on the big screen! Tap here to display your curated visuals in stunning clarity. Accepted file types: jpeg, png, gif, bmp, webp (max size: 50MB). For optimal viewing, maintain a 16:9 ratio.'
      },

      {
        '_id': 2,
        'title': 'Upload Video',
        'desc': 'Stream videos on your organization\'s TV platform! Tap here to relive important updates and corporate content on the big screen. Accepted video types: mp4 (max size: 50MB). For the best playback experience, maintain a 16:9 ratio and a minimum resolution of 1080p.'  
      },

      {
        '_id': 3,
        'title': 'Create Custom Banner',
        'desc': 'Design custom banners with ease! Utilize our user-friendly feature to create personalized banner designs swiftly. Please note that while this tool offers quick and convenient banner creation, it is not intended to replace poster design functionality. Our extensive collection includes professional templates for greetings and promotions, allowing you to craft stunning banners within seconds.'
      }
  ],
  // Canvas toolbar options (Toolbar.vue)
  canvasToolbarOptions: [
    { _id: 1, name: 'Canvas', icon_class: 'easel'},
    { _id: 2, name: 'Templates', icon_class: 'columns'},
    { _id: 3, name: 'Elements', icon_class: 'circle-square'},
    { _id: 4, name: 'Insert', icon_class: 'image'},
    { _id: 5, name: 'Options', icon_class: 'check-square'}
  ],
  // Canvas toolbar options for editable textbox (Toolbar.vue)
  canvasEditableTexboxOptions: [
    { _id: 1, name: 'Font', icon_class:'fonts'},
    { _id: 2, name: 'Color', icon_class:'palette'},
    // { _id: 3, name: 'Shadow'},
    // { _id: 4, name: 'Animations'},
    { _id: 5, name: 'Options', icon_class:'check-square'}
  ],
  // Canvas toolbar options for objects (Toolbar.vue)
  canvasObjectOptions: [
    { _id: 1, name: 'Color', icon_class:'palette'}
    // { _id: 2, name: 'Shadow'}
  ],

  // ------------------------------------- //
  // -----------STORE FUNCTIONS----------- //
  // ------------------------------------- //
  // Adding Telegram data to store(App.vue)
  initTelegramData(initData) {
    this.telegramWebAppInfo = initData
  },
  initTelegramColor(scheme) {
    this.telegramColorScheme = scheme
  },
  // Add available TVs to store (TV.vue)
  initTVfromDB(tvArray) {
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
  // Add available canvas templates to store (CanvasSelection.vue)
  initCanvasTemplates(templates){
    this.canvasTemplates = templates
  },
  // Add created canvas file to store (CanvasSelection.vue)
  uploadCanvas(file){
    this.canvasObj = file
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
  // Remove all canvas elements from list (CanvasSelection.vue)
  removeallElementsFromCanvas(){
    this.canvasObjects = []
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
  },

  // Test values for tvs
  testTV: [
    {
      "_id": "eyJpdiI6IkVoei9LRHNPS3V4bUlXOTJSSThkTlE9PSIsInZhbHVlIjoiMW4vdkNJUzduZkQybUFDVlR1Vmh3a3grazR3dVJaT09sQU9tY1FBOGd4MD0iLCJtYWMiOiI1NDc0YzdlNzc1OWZkZTNlM2IzNmNiNDJjZTMwYjcwODIwNzBkNTg5ZmU1ZTljNDIzODUwNGIwMzkxNTkzMjM2IiwidGFnIjoiIn0",
      "current_display": null,
      "image": null,
      "info": 'bebebeb',
      "default_display": null,
      "displays": [],
      "updated_at": "2023-07-06T22:02:17.260000Z",
      "created_at": "2023-07-03T14:41:01.127000Z"
    },
    {
      "_id": "b8T2SI-7UmwUShO5CJwb-BtI-c_Lyql_dmrt9Rn3fvY=",
      "current_display": null,
      "image": null,
      "info": 'teoke',
      "default_display": null,
      "displays": [
        {
          "tv_id": "b8T2SI-7UmwUShO5CJwb-BtI-c_Lyql_dmrt9Rn3fvY=",
          "display_start": "2023-02-09T11:30",
          "display_end": "2023-02-09T12:30",
          "asset": "submittedimage.com",
          "_id": {
            "$oid": "64b2e10dd0f2b881000787b5"
          }
        },
        {
          "tv_id": "b8T2SI-7UmwUShO5CJwb-BtI-c_Lyql_dmrt9Rn3fvY=",
          "display_start": "2023-01-09T11:30",
          "display_end": "2023-01-09T12:30",
          "asset": "submittedimage.com",
          "_id": {
            "$oid": "64b2e125d0f2b881000787b6"
          }
        },
        {
          "tv_id": "b8T2SI-7UmwUShO5CJwb-BtI-c_Lyql_dmrt9Rn3fvY=",
          "display_start": "2023-03-09T11:30",
          "display_end": "2023-03-09T12:30",
          "asset": "submittedimage.com",
          "_id": {
            "$oid": "64b2e131d0f2b881000787b7"
          }
        }
      ],
      "updated_at": "2023-07-15T19:22:06.648000Z",
      "created_at": "2023-07-15T14:14:31.470000Z"
    }
  ]
})