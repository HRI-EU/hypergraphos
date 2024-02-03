[
  {
    "Define_FileName": [
      [
        "./Avatar Receptionist.json"
      ]
    ]
  },
  {
    "Begin_Header_Info": [
      [
        "2.1"
      ],
      [
        "07-09-2021"
      ]
    ]
  },
  {
    "Define_Avatar": [
      [
        "Receptionist"
      ]
    ]
  },
  {
    "Loop_Begin_Rule[0]": [
      {
        "Begin_Header_Rule": [
          [
            70,
            70,
            "Say Meisy's name"
          ],
          [
            "rule70"
          ],
          [
            70
          ]
        ]
      },
      {
        "Loop_Begin_FanIn[0]": [
          {
            "Begin_OR": [
              [
                "previousRule",
                "rule73",
                "rule",
                0.5,
                "is previous rule active?: rule73"
              ],
              [
                "intention",
                "update_NameDictionary",
                "rightHand",
                0.5,
                "is outer miron recognized?: update_NameDictionary"
              ]
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      },
      {
        "Begin_FanOut": [
          [
            "goal",
            "say_MyName",
            "speech",
            "1",
            "do outer miron!: say_MyName"
          ],
          [
            "goal",
            "drop_Phone",
            "rightHand",
            "1",
            "do outer miron!: drop_Phone"
          ],
          [
            "goal",
            "open_Microphone",
            "rightHand",
            "1",
            "do outer miron!: open_Microphone"
          ]
        ]
      }
    ]
  },
  {
    "Loop_Begin_Rule[1]": [
      {
        "Begin_Header_Rule": [
          [
            71,
            71,
            "Say how are you"
          ],
          [
            "rule71"
          ],
          [
            71
          ]
        ]
      },
      {
        "Loop_Begin_FanIn[0]": [
          {
            "Begin_OR": [
              [
                "intention",
                "say_Hello",
                "speech",
                0.5,
                "is outer miron recognized?: say_Hello"
              ],
              [
                "previousRule",
                "rule85",
                "rule",
                0.5,
                "is previous rule active?: rule85"
              ]
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      },
      {
        "Begin_FanOut": [
          [
            "goal",
            "ask_HowAreYou",
            "speech",
            "1",
            "do outer miron!: ask_HowAreYou"
          ]
        ]
      }
    ]
  },
  {
    "Loop_Begin_Rule[2]": [
      {
        "Begin_Header_Rule": [
          [
            73,
            73,
            "Update dictionary & start ASR"
          ],
          [
            "rule73"
          ],
          [
            73
          ]
        ]
      },
      {
        "Loop_Begin_FanIn[0]": [
          {
            "Begin_OR": [
              [
                "previousRule",
                "rule74",
                "rule",
                1,
                "is previous rule active?: rule74"
              ]
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      },
      {
        "Begin_FanOut": [
          [
            "goal",
            "update_NameDictionary",
            "rightHand",
            "1",
            "do outer miron!: update_NameDictionary"
          ],
          [
            "goal",
            "get_PhaseOfDay",
            "internal",
            "1",
            "do inner miron!: get_PhaseOfDay"
          ]
        ]
      }
    ]
  },
  {
    "Loop_Begin_Rule[3]": [
      {
        "Begin_Header_Rule": [
          [
            74,
            74,
            "Allow all actions to be effective"
          ],
          [
            "rule74"
          ],
          [
            74
          ]
        ]
      },
      {
        "Loop_Begin_FanIn[0]": [
          {
            "Begin_OR": [
              [
                "intention",
                "beAlive",
                "signal",
                1,
                "is outer miron recognized?: beAlive"
              ]
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      },
      {
        "Begin_FanOut": [
          [
            "activateWM",
            "perform_Speech",
            "wm",
            "1",
            "activate wm!: perform_Speech"
          ],
          [
            "activateWM",
            "perform_RightHand",
            "wm",
            "1",
            "activate wm!: perform_RightHand"
          ],
          [
            "activateWM",
            "perform_LeftHand",
            "wm",
            "1",
            "activate wm!: perform_LeftHand"
          ],
          [
            "inhibitWM",
            "perform_InternalSpeech",
            "wm",
            "1",
            "inhibit wm!: perform_InternalSpeech"
          ],
          [
            "activateWM",
            "perform_Internal",
            "wm",
            "1",
            "activate wm!: perform_Internal"
          ]
        ]
      }
    ]
  },
  {
    "Loop_Begin_Rule[4]": [
      {
        "Begin_Header_Rule": [
          [
            85,
            85,
            "Wait for response"
          ],
          [
            "rule85"
          ],
          [
            85
          ]
        ]
      },
      {
        "Loop_Begin_FanIn[0]": [
          {
            "Begin_OR": [
              [
                "actionDone",
                "say_MyName",
                "speech",
                0.5,
                "is outer miron done?: say_MyName"
              ],
              [
                "previousRule",
                "rule70",
                "rule",
                0.5,
                "is previous rule active?: rule70"
              ]
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      },
      {
        "Begin_FanOut": []
      }
    ]
  },
  {
    "Begin_Skip": []
  }
]