[
  {
    "Define_FileName": [
      [
        "./Basic Dialog.json"
      ]
    ]
  },
  {
    "Begin_Header_Info": [
      [
        "2.0"
      ],
      [
        "07-09-2021"
      ]
    ]
  },
  {
    "Loop_Begin_Fields[0]": [
      {
        "Define_Field_Name": [
          [
            "morning"
          ]
        ]
      },
      {
        "Define_Field_Value": [
          [
            "morning"
          ],
          [
            "afternoon"
          ],
          [
            "evening"
          ],
          [
            "night"
          ]
        ]
      }
    ]
  },
  {
    "Loop_Begin_Fields[1]": [
      {
        "Define_Field_Name": [
          [
            "Hello"
          ]
        ]
      },
      {
        "Define_Field_Value": [
          [
            "Hi"
          ],
          [
            "Hello"
          ]
        ]
      }
    ]
  },
  {
    "Begin_Skip": []
  },
  {
    "Loop_Begin_Modalities[0]": [
      {
        "Define_Modality_Name": [
          [
            "internal"
          ]
        ]
      },
      {
        "Loop_Begin_Mirons[0]": [
          {
            "Define_Miron_Name": [
              [
                "get_PhaseOfDay"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "get_PhaseOfDay"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      }
    ]
  },
  {
    "Loop_Begin_Modalities[1]": [
      {
        "Define_Modality_Name": [
          [
            "speech"
          ]
        ]
      },
      {
        "Loop_Begin_Mirons[0]": [
          {
            "Define_Miron_Name": [
              [
                "say_MyName"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "<Hello>, my name is Meisy."
                  ],
                  [
                    "Good {morning}, I am Meisy"
                  ]
                ]
              }
            ]
          },
          {
            "Loop_Begin_Slots[0]": [
              {
                "Define_Slot_Pairs": [
                  [
                    "phaseOfDay",
                    "morning"
                  ]
                ]
              },
              {
                "Begin_Skip": []
              }
            ]
          }
        ]
      },
      {
        "Loop_Begin_Mirons[1]": [
          {
            "Define_Miron_Name": [
              [
                "ask_HowAreYou"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "How are you ?"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "Loop_Begin_Mirons[2]": [
          {
            "Define_Miron_Name": [
              [
                "say_Hello"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "<Hello>"
                  ],
                  [
                    "Good {morning}"
                  ]
                ]
              }
            ]
          },
          {
            "Loop_Begin_Slots[0]": [
              {
                "Define_Slot_Pairs": [
                  [
                    "phaseOfDay",
                    "morning"
                  ]
                ]
              },
              {
                "Begin_Skip": []
              }
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      }
    ]
  },
  {
    "Loop_Begin_Modalities[2]": [
      {
        "Define_Modality_Name": [
          [
            "rightHand"
          ]
        ]
      },
      {
        "Loop_Begin_Mirons[0]": [
          {
            "Define_Miron_Name": [
              [
                "update_NameDictionary"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "update_NameDictionary"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "Loop_Begin_Mirons[1]": [
          {
            "Define_Miron_Name": [
              [
                "drop_Phone"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "drop_Phone"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "Loop_Begin_Mirons[2]": [
          {
            "Define_Miron_Name": [
              [
                "open_Microphone"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "open_Microphone"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      }
    ]
  },
  {
    "Loop_Begin_Modalities[3]": [
      {
        "Define_Modality_Name": [
          [
            "signal"
          ]
        ]
      },
      {
        "Loop_Begin_Mirons[0]": [
          {
            "Define_Miron_Name": [
              [
                "beAlive"
              ]
            ]
          },
          {
            "Loop_Begin_Miron_Templates[0]": [
              {
                "Define_Miron_Template_Name": [
                  [
                    "beAlive"
                  ]
                ]
              }
            ]
          }
        ]
      },
      {
        "Begin_Skip": []
      }
    ]
  },
  {
    "Begin_Skip": []
  }
]