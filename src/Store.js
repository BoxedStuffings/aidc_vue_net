import { reactive } from 'vue'

export const store = reactive({   
    // Tvs as in db (TV.vue)
    availableTVs: [
        {
          "_id": 1,
          "current_display":null,
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "updated_at":{"$date":{"$numberLong":"1683464890493"}},
          "created_at":{"$date":{"$numberLong":"1683459833600"}}
        },

        {
          "_id": 2,
          "current_display":null,
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "updated_at":{"$date":{"$numberLong":"1683462882369"}},
          "created_at":{"$date":{"$numberLong":"1683462580446"}}
        },

        {
          "_id": 3,
          "current_display":null,
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "updated_at":{"$date":{"$numberLong":"1683488829939"}},
          "created_at":{"$date":{"$numberLong":"1683462677844"}},
          "displays":[
            {"tv_id":{"$numberInt":"3"},
              "display_type":"seed",
              "display_variation":"seed",
              "display_start":"2023-05-08T14:30",
              "display_end":"2023-05-08T16:30",
              "userdefinedfields":{
                "field1":{
                    "size":"12",
                    "font":"Montserrat",
                    "colour":"#HEX"
                  }
                },
              "_id":{"$oid":"6457e537888697b4e10d9323"}
            },
            {"tv_id": 3,
              "display_type":"2",
              "display_variation":"1",
              "display_start":"2023-05-08T08:30",
              "display_end":"2023-05-08T09:30",
              "userdefinedfields":{
                "field1":{
                    "size":"12",
                    "font":"Montserrat",
                    "colour":"#HEX"
                  }
                },
              "_id":{"$oid":"6458003d0f33f0ac5d09ed62"}
            }
          ]
        },

        {
          "_id": 4,
          "current_display":"nnn",
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "displays":[
              {
                "tv_id": 4,
                "display_type":"2",
                "display_variation":"1",
                "display_start":"2023-05-08T08:30",
                "display_end":"2023-05-08T09:30",
                "userdefinedfields":{
                  "field1":{
                      "size":"12",
                      "font":"Montserrat",
                      "colour":"#HEX"
                    }
                  },
                "_id":{"$oid":"645805da560e36c1dd0c39a2"}
              }
            ],
          "updated_at":{"$date":{"$numberLong":"1683490266918"}},
          "created_at":{"$date":{"$numberLong":"1683489545605"}}
        }
    ],
    
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

    // Cards (placeholder values) (BootstrapTest.vue)
    availableCardOptions: [
        { _id: 1, name: "Variation 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
        { _id: 2, name: "Variation 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
        { _id: 3, name: "Variation 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."}
    ],

    // Data to be sent (Selected TVs from TV.vue)
    telegramWebAppInfo: [],

    selectedTvs: [],

    imageObj: {},

    videoObj: {},

    // Functions for selectedTvs array
    findIndexOfSelectedTv(TV) {
        return this.selectedTvs.findIndex(x => x == TV)
    },

    spliceSelectedTvAt(index){
        this.selectedTvs.splice(index, 1)
    },

    pushSelectedTv(TV) {
        this.selectedTvs.push(TV)
    },

    // Functions for image upload
    uploadImage(image) {
      this.imageObj = image
    },

    // Functions for image upload
    uploadVideo(video) {
      this.videoObj = video
    },

    initTelegramData(initData) {
      this.telegramWebAppInfo = initData
    }

})