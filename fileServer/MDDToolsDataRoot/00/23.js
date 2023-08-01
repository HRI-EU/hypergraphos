//=============================
// GetFieldList
//
// THIS CODE IS GENERATED FROM:
// ./Basic Dialog.json
// PLEASE DO NOT EDIT BY HAND
// VERSION: 2.0
// GENERATED: 07-09-2021
//=============================

//////////////////////
// Define Speech Field
//////////////////////
function getFieldList() {

  return(
  {
    'morning': {
      'field': [
        'morning',
        'afternoon',
        'evening',
        'night',
      ],
    },
    'Hello': {
      'field': [
        'Hi',
        'Hello',
      ],
    },
  });
}

//////////////////////
// Define Speech Miron
//////////////////////
function getMironList() {

  return(
  {
    'internal': {
      'get_PhaseOfDay': {
        'template': [
          'get_PhaseOfDay',
        ],
      },
    },
    'speech': {
      'say_MyName': {
        'template': [
          '<Hello>, my name is Meisy.',
          'Good {morning}, I am Meisy',
        ],
        'slot': {
          'phaseOfDay': 'morning',
        },
      },
      'ask_HowAreYou': {
        'template': [
          'How are you ?',
        ],
      },
      'say_Hello': {
        'template': [
          '<Hello>',
          'Good {morning}',
        ],
        'slot': {
          'phaseOfDay': 'morning',
        },
      },
    },
    'rightHand': {
      'update_NameDictionary': {
        'template': [
          'update_NameDictionary',
        ],
      },
      'drop_Phone': {
        'template': [
          'drop_Phone',
        ],
      },
      'open_Microphone': {
        'template': [
          'open_Microphone',
        ],
      },
    },
    'signal': {
      'beAlive': {
        'template': [
          'beAlive',
        ],
      },
    },
    'canDo': {
    },
    'wm': {
      'perform_Speech': {
        'template': [
          'perform_Speech',
        ],
      },
      'perform_RightHand': {
        'template': [
          'perform_RightHand',
        ],
      },
      'perform_LeftHand': {
        'template': [
          'perform_LeftHand',
        ],
      },
      'perform_InternalSpeech': {
        'template': [
          'perform_InternalSpeech',
        ],
      },
      'perform_Internal': {
        'template': [
          'perform_Internal',
        ],
      },
      'testWM': {
        'template': [
          'testWM',
        ],
      },
    },
  });
}
