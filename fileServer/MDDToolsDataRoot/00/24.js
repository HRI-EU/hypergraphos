//=============================
// GetMapList
//
// THIS CODE IS GENERATED FROM:
// ./Basic Dialog.json
// PLEASE DO NOT EDIT BY HAND
// VERSION: 2.0
// GENERATED: 07-09-2021
//=============================


//////////////////////
// Define Map List
//////////////////////
function getMapList_Receptionist() {

  return({
    'internal': {
      'byIndex': {
        1: 'get_PhaseOfDay',
       },
      'byName': {
        'get_PhaseOfDay': 1,
      },
      'length': 1,
      'isPublic': false,
    },
    'speech': {
      'byIndex': {
        1: 'say_MyName',
        2: 'ask_HowAreYou',
        3: 'say_Hello',
       },
      'byName': {
        'say_MyName': 1,
        'ask_HowAreYou': 2,
        'say_Hello': 3,
      },
      'length': 3,
      'isPublic': true,
    },
    'rightHand': {
      'byIndex': {
        1: 'update_NameDictionary',
        2: 'drop_Phone',
        3: 'open_Microphone',
       },
      'byName': {
        'update_NameDictionary': 1,
        'drop_Phone': 2,
        'open_Microphone': 3,
      },
      'length': 3,
      'isPublic': true,
    },
    'signal': {
      'byIndex': {
        1: 'beAlive',
       },
      'byName': {
        'beAlive': 1,
      },
      'length': 1,
      'isPublic': true,
    },
    'wm': {
      'byIndex': {
       },
      'byName': {
      },
      'length': 0,
      'isPublic': false,
    },
    'canDo': {
      'byIndex': {
        1: 'perform_Speech',
        2: 'perform_RightHand',
        3: 'perform_LeftHand',
        4: 'perform_InternalSpeech',
        5: 'perform_Internal',
       },
      'byName': {
        'perform_Speech': 1,
        'perform_RightHand': 2,
        'perform_LeftHand': 3,
        'perform_InternalSpeech': 4,
        'perform_Internal': 5,
       },
      'length': 5,
      'isPublic': false,
    },
    'slot': {
      'byIndex': {
        1: 'phaseOfDay',
       },
      'byName': {
        'phaseOfDay': 1,
      },
      'length': 1,
      'isPublic': false,
    },
    'data': {
      'byIndex': {
       },
      'byName': {
      },
      'length': 0,
      'isPublic': false,
    },
    'rule': {
      'byIndex': {
        1: 'rule31',
        2: 'rule32',
        3: 'rule34',
        4: 'rule36',
        5: 'rule57',
       },
      'byName': {
        'rule31': 1,
        'rule32': 2,
        'rule34': 3,
        'rule36': 4,
        'rule57': 5,
      },
      'length': 5,
      'isPublic': false,
    },
  });
}
