//=============================
// GetFieldList
//
// THIS CODE IS GENERATED FROM:
// ./Avatar Receptionist.json
// PLEASE DO NOT EDIT BY HAND
// VERSION: 2.1
// GENERATED: 07-09-2021
//=============================

//////////////////////
// Define Speech Field
//////////////////////
function getFieldList() {

  return(
  {
    'myPlace': {
      'field': [
        'front',
        'back',
      ],
    },
    'myGazePlace': {
      'field': [
        'frontFromCenter',
        'screenLeft',
        'screenRight',
      ],
    },
    'myEmotion': {
      'field': [
        'F_Curious_1',
        'F_Happy_2',
        'F_Sad_1',
        'F_Surprised_1',
        'F_Bored_1',
        'F_Happy_1',
        'F_Angry_1',
        'F_Confused_1',
        'F_Scared_1',
        'F_Thinking_1',
        'F_Float_1',
        'F_Sleeping_1',
        'F_GoToSleep_1',
        'F_WakingUp_1',
      ],
    },
    'fid42': {
      'field': [
        '/fid\\d+/',
        '/[\\d\\w-]+/',
      ],
    },
    'Dr': {
      'field': [
        'Dr(.)',
        'doctor',
        'Prof(.)',
        'professor',
        'Prof(.) Dr(.)',
        'professor doctor',
        'Mr(.)',
        'mister',
        'Ms(.)',
        'Mrs(.)',
        'miss',
      ],
    },
    'visitorFirstName': {
      'field': [
        'Mario',
      ],
    },
    'visitorLastName': {
      'field': [
        'Rossi',
      ],
    },
    'companyName': {
      'field': [
        'Apple',
      ],
    },
    'n222': {
      'field': [
        '/\\d+/',
      ],
    },
    'Sir': {
      'field': [
        'Sir',
        'Madam',
        'Doctor',
        'Professor',
      ],
    },
    'contactList': {
      'field': [
        'uuuuu',
      ],
    },
    'do': {
      'field': [
        'say',
        'tell',
        'do',
      ],
    },
    'should': {
      'field': [
        'should',
        'could',
        'can',
      ],
    },
    'dont': {
      'field': [
        'do not',
        'don\'t',
      ],
    },
    'speak': {
      'field': [
        'speak',
        '<do> something',
        'answer',
      ],
    },
    'contactLastName': {
      'field': [
        'Bond',
      ],
    },
    'contactFirstName': {
      'field': [
        'James',
      ],
    },
    'yes': {
      'field': [
        'yeah',
        '(<it is> )right',
        'yes',
        '(<it is> )correct',
        '(yes )indeed',
      ],
    },
    'it is': {
      'field': [
        'it is',
        'it\'s',
        'that\'s',
        'that is',
        'this is',
      ],
    },
    'no': {
      'field': [
        'no( way)',
        'nope',
        '(<it is> )incorrect',
        '(<it is> )wrong',
      ],
    },
    'hint': {
      'field': [
        'uuuuu',
      ],
    },
    'buttonList': {
      'field': [
        'uuuuu',
      ],
    },
    'morning': {
      'field': [
        'morning',
        'afternoon',
        'evening',
        'night',
      ],
    },
    'contactList': {
      'field': [
        'uuuuu',
      ],
    },
    'visitorId': {
      'field': [
        'uuuuuu',
      ],
    },
    'see': {
      'field': [
        'see',
        'recognize',
      ],
    },
    'could': {
      'field': [
        'could',
        'can',
      ],
    },
    'Hello': {
      'field': [
        'Hello',
        'Hi',
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
    'signal': {
      'be_Alive': {
        'template': [
          'be_Alive',
        ],
      },
      'dictionary_NeedsUpdate': {
        'template': [
          'dictionary_NeedsUpdate',
        ],
      },
      'speech_Start': {
        'template': [
          'speech_Start',
        ],
      },
      'speech_End': {
        'template': [
          'speech_End',
        ],
      },
      'keyboard_Validate': {
        'template': [
          'keyboard_Validate',
        ],
      },
      'keyboard_Show': {
        'template': [
          'keyboard_Show',
        ],
      },
      'keyboard_Type': {
        'template': [
          'keyboard_Type',
        ],
      },
      'button_Click': {
        'template': [
          'button_Click',
        ],
      },
      'button_Show': {
        'template': [
          'button_Show',
        ],
      },
      'vision_NoFaceDetected': {
        'template': [
          'vision_NoFaceDetected',
        ],
      },
      'vision_FaceDetected': {
        'template': [
          'vision_FaceDetected',
        ],
      },
      'nobody_Detected': {
        'template': [
          'Nobody detected',
        ],
      },
      'somebody_Detected': {
        'template': [
          'Somebody detected',
        ],
      },
      'call_Ended': {
        'template': [
          'call_Ended',
        ],
      },
      'call_Started': {
        'template': [
          'call_Started',
        ],
      },
    },
    'canDo': {
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
      'perform_Gaze': {
        'template': [
          'perform_Gaze',
        ],
      },
      'perform_Internal': {
        'template': [
          'perform_Internal',
        ],
      },
      'perform_Emotion': {
        'template': [
          'perform_Emotion',
        ],
      },
      'perform_InternalEmotion': {
        'template': [
          'perform_InternalEmotion',
        ],
      },
      'perform_InternalGaze': {
        'template': [
          'perform_InternalGaze',
        ],
      },
      'perform_Body': {
        'template': [
          'perform_Body',
        ],
      },
      'perform_InternalBody': {
        'template': [
          'perform_InternalBody',
        ],
      },
      'perform_InternalLeftHand': {
        'template': [
          'perform_InternalLeftHand',
        ],
      },
      'perform_InternalRightHand': {
        'template': [
          'perform_InternalRightHand',
        ],
      },
      'perform_Vision': {
        'template': [
          'perform_Vision',
        ],
      },
      'perform_InternalVision': {
        'template': [
          'perform_InternalVision',
        ],
      },
      'perform_Signal': {
        'template': [
          'perform_Signal',
        ],
      },
      'perform_InternalSignal': {
        'template': [
          'perform_InternalSignal',
        ],
      },
    },
    'rightHand': {
      'update_NameDictionary': {
        'template': [
          'update_NameDictionary',
        ],
      },
      'display_SystemUpdate': {
        'template': [
          'display_SystemUpdate',
        ],
      },
      'display_Disclaimer': {
        'template': [
          'display_Disclaimer',
        ],
      },
      'close_Camera': {
        'template': [
          'close_Camera',
        ],
      },
      'open_Microphone': {
        'template': [
          'open_Microphone',
        ],
      },
      'close_Microphone': {
        'template': [
          'close_Microphone',
        ],
      },
      'hide_Keyboard': {
        'template': [
          'hide_Keyboard',
        ],
      },
      'take_Phone': {
        'template': [
          'take_Phone',
        ],
      },
      'send_Email{id:"MST"}': {
        'template': [
          'Hi MST team,\n\nA visitor {Dr} {visitorLastName} is waiting \nat HRE-G lobby.\nI could not reach his contact person \n{contactFirstName} {contactLastName} by phone. \nCan you send someone to the lobby, thanks. \n\nBest regards,\nMeisy',
        ],
        'slot': {
          'contactEmail': 'a@b',
          'contactFirstName': 'contactFirstName',
          'contactLastName': 'contactLastName',
          'interlocutorTitle': 'Dr',
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'send_Email{id:"Contact"}': {
        'template': [
          'Hi {contactFirstName},\n\nYour visitor {Dr} {visitorLastName} is waiting for you\nat HRE-G lobby. \n\nBest regards,\nMeisy',
        ],
        'slot': {
          'contactEmail': 'a@b',
          'contactFirstName': 'contactFirstName',
          'interlocutorTitle': 'Dr',
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'display_GDPRConsent': {
        'template': [
          'display_GDPRConsent',
        ],
      },
      'hide_MessageWindow': {
        'template': [
          'hide_MessageWindow',
        ],
      },
      'drop_Phone': {
        'template': [
          'drop_Phone',
        ],
      },
      'hide_Buttons': {
        'template': [
          'hide_Buttons',
        ],
      },
      'display_Keyboard': {
        'template': [
          '{hint}',
        ],
        'slot': {
          'hint': 'hint',
        },
      },
      'display_Buttons': {
        'template': [
          '{buttonList}',
        ],
        'slot': {
          'contactList': 'buttonList',
        },
      },
      'clean_KeyboardInput': {
        'template': [
          'clean_KeyboardInput',
        ],
      },
      'open_Camera': {
        'template': [
          'open_Camera',
        ],
      },
      'show_Thought': {
        'template': [
          'show_Thought',
        ],
      },
      'hide_Thought': {
        'template': [
          'hide_Thought',
        ],
      },
      'call_PhoneNumber': {
        'template': [
          'call_PhoneNumber',
        ],
      },
      'validate_Keyboard': {
        'template': [
          'validate_Keyboard',
        ],
      },
      'call_Hangup': {
        'template': [
          'call_Hangup',
        ],
      },
    },
    'wm': {
      'isDBChanged': {
        'template': [
          'isDBChanged',
        ],
      },
      'isVisitorUnknown': {
        'template': [
          'isVisitorUnknown',
        ],
      },
      'isLastSpeechKnown': {
        'template': [
          'isLastSpeechKnown',
        ],
      },
      'isVisitorSpeaking': {
        'template': [
          'isVisitorSpeaking',
        ],
      },
      'isVisitorTyping': {
        'template': [
          'isVisitorTyping',
        ],
      },
      'isVisitorClicking': {
        'template': [
          'isVisitorClicking',
        ],
      },
      'isTooNoisy': {
        'template': [
          'isTooNoisy',
        ],
      },
      'hasVisitorFinishedTyping': {
        'template': [
          'hasVisitorFinishedTyping',
        ],
      },
      'isNoInput': {
        'template': [
          'isNoInput',
        ],
      },
      'isVisitorAsweringByVoice': {
        'template': [
          'isVisitorAsweringByVoice',
        ],
      },
      'isVisitorUnderstood': {
        'template': [
          'isVisitorUnderstood',
        ],
      },
      'isRepeatAsked': {
        'template': [
          'isRepeatAsked',
        ],
      },
      'isHelpAsked': {
        'template': [
          'isHelpAsked',
        ],
      },
      'isDialogCompleted': {
        'template': [
          'isDialogCompleted',
        ],
      },
      'hasVisitorChangedAtLeastOneSlot': {
        'template': [
          'hasVisitorChangedAtLeastOneSlot',
        ],
      },
      'isMakingQuery': {
        'template': [
          'isMakingQuery',
        ],
      },
      'isCallSuccessful': {
        'template': [
          'isCallSuccessful',
        ],
      },
      'isNobodyAnswered': {
        'template': [
          'isNobodyAnswered',
        ],
      },
      'isNoGDPRReaction': {
        'template': [
          'isNoGDPRReaction',
        ],
      },
      'isNoReaction': {
        'template': [
          'isNoReaction',
        ],
      },
      'isCaseNotHandled': {
        'template': [
          'isCaseNotHandled',
        ],
      },
      'hasDBChangedAtLeastOneSlot': {
        'template': [
          'hasDBChangedAtLeastOneSlot',
        ],
      },
      'isV0': {
        'template': [
          'isV0',
        ],
      },
      'isSelection': {
        'template': [
          'isSelection',
        ],
      },
      'isV2': {
        'template': [
          'isV2',
        ],
      },
      'isSomethingAsked': {
        'template': [
          'isSomethingAsked',
        ],
      },
      'isContactNotInList': {
        'template': [
          'isContactNotInList',
        ],
      },
      'isButtonExpected': {
        'template': [
          'isButtonExpected',
        ],
      },
      'isKeyboardExpected': {
        'template': [
          'isKeyboardExpected',
        ],
      },
      'isVoiceExpected': {
        'template': [
          'isVoiceExpected',
        ],
      },
      'isNameConfirmed': {
        'template': [
          'isNameConfirmed',
        ],
      },
      'isRepeat': {
        'template': [
          'isRepeat',
        ],
      },
      'isHelp': {
        'template': [
          'isHelp',
        ],
      },
      'isInterruptable': {
        'template': [
          'isInterruptable',
        ],
      },
      'isInterrupted': {
        'template': [
          'isInterrupted',
        ],
      },
      'isInterruptionEnabled': {
        'template': [
          'isInterruptionEnabled',
        ],
      },
      'isYesNoEnabled': {
        'template': [
          'isYesNoEnabled',
        ],
      },
      'isConsentClicked': {
        'template': [
          'isConsentClicked',
        ],
      },
      'isDenyClicked': {
        'template': [
          'isDenyClicked',
        ],
      },
      'isV1': {
        'template': [
          'isV1',
        ],
      },
      'isFirstNameOnlyRecognized': {
        'template': [
          'isFirstNameOnlyRecognized',
        ],
      },
      'isQueryEnabled': {
        'template': [
          'isQueryEnabled',
        ],
      },
      'isV3': {
        'template': [
          'isV3',
        ],
      },
      'isV4': {
        'template': [
          'isV4',
        ],
      },
      'isCompanyOnlyRecognized': {
        'template': [
          'isCompanyOnlyRecognized',
        ],
      },
      'isBasicQuestion': {
        'template': [
          'isBasicQuestion',
        ],
      },
      'isVeryFirstQuestion': {
        'template': [
          'isVeryFirstQuestion',
        ],
      },
      'isContactLastNameOnlyRecognized': {
        'template': [
          'isContactLastNameOnlyRecognized',
        ],
      },
      'isV5': {
        'template': [
          'isV5',
        ],
      },
      'isNameDisconfirmed': {
        'template': [
          'isNameDisconfirmed',
        ],
      },
      'isCriticalError': {
        'template': [
          'isCriticalError',
        ],
      },
      'isSomethingInFrontOfMe': {
        'template': [
          'isSomethingInFrontOfMe',
        ],
      },
      'isUserVisuallyRecognized': {
        'template': [
          'isUserVisuallyRecognized',
        ],
      },
      'isUserLookingAtMe': {
        'template': [
          'isUserLookingAtMe',
        ],
      },
      'NoGDPRReaction': {
        'template': [
          'NoGDPRReaction',
        ],
      },
      'isFaceRecognitionEnabled': {
        'template': [
          'isFaceRecognitionEnabled',
        ],
      },
      'isAlive': {
        'template': [
          'isAlive',
        ],
      },
      'skipGDPR': {
        'template': [
          'skipGDPR',
        ],
      },
      'isVirtualTelephony': {
        'template': [
          'isVirtualTelephony',
        ],
      },
      'isCallToContact': {
        'template': [
          'isCallToContact',
        ],
      },
      'isCallToMST': {
        'template': [
          'isCallToMST',
        ],
      },
      'isCallEnded': {
        'template': [
          'isCallEnded',
        ],
      },
      'isCallTooLong': {
        'template': [
          'isCallTooLong',
        ],
      },
      'isCallStarted': {
        'template': [
          'isCallStarted',
        ],
      },
    },
    'internalSpeech': {
      'request_InitPhase': {
        'template': [
          'request_InitPhase',
        ],
      },
      'say_Something': {
        'template': [
          'say_Something',
        ],
      },
      'say_Something_Done': {
        'template': [
          'say_Something_Done',
        ],
      },
      'ask_Something': {
        'template': [
          'ask_Something',
        ],
      },
      'next_Step': {
        'template': [
          'next_Step',
        ],
      },
      'request_ToSayHello': {
        'template': [
          'request_ToSayHello',
        ],
      },
      'wait_ForVoiceAnswer': {
        'template': [
          'wait_ForVoiceAnswer',
        ],
      },
      'wait_ForKeyboardAnswer': {
        'template': [
          'wait_ForKeyboardAnswer',
        ],
      },
      'request_EndDialog': {
        'template': [
          'request_EndDialog',
        ],
      },
      'request_NextQuestion': {
        'template': [
          'request_NextQuestion',
        ],
      },
      'request_ToRecallMyIdentity': {
        'template': [
          'Recall my identity',
        ],
        'data': {
          'recall_IdentityOfMyself': '',
        },
      },
      'request_ToRecallMyIdentity_Done': {
        'template': [
          'request_ToRecallMyIdentity_Done',
        ],
      },
      'wait_ForButtonAnswer': {
        'template': [
          'wait_ForButtonAnswer',
        ],
      },
      'request_ToAnalyseDB': {
        'template': [
          'request_ToAnalyseDB',
        ],
      },
      'set_LTMQuery': {
        'template': [
          'set_LTMQuery',
        ],
        'data': {
          'recall_VisitorAndContact': 'interlocatorFaceId,interlocutorTitle,interlocutorFirstName,interlocutorLastName,interlocutorCompany,contactFirstName,contactLastName',
        },
      },
      'request_ToMakeCalls': {
        'template': [
          'request_ToMakeCalls',
        ],
      },
      'request_ToDumpState': {
        'template': [
          'request_ToDumpState',
        ],
      },
      'request_ToCheckAnswer': {
        'template': [
          'request_ToCheckAnswer',
        ],
      },
      'clean_VisitSlots': {
        'template': [
          'clean_VisitSlots',
        ],
        'data': {
          'interlocutorFaceId': '',
          'interlocutorTitle': '',
          'interlocutorFirstName': '',
          'interlocutorLastName': '',
          'interlocutorCompany': '',
          'interlocutorGender': '',
          'interlocutorId': '',
          'contactTitle': '',
          'contactFirstName': '',
          'contactLastName': '',
          'contactTelephoneNumber': '',
          'contactEmail': '',
          'contactGender': '',
          'contactId': '',
        },
      },
      'request_ToAnalyseSituation': {
        'template': [
          'request_ToAnalyseSituation',
        ],
      },
      'request_ToCall': {
        'template': [
          'request_ToCall',
        ],
      },
      'request_ToSendEmailToMST': {
        'template': [
          'request_ToSendEmailToMST',
        ],
        'data': {
          'send_Email': 'emailSubject,contactEmail,contactFirstName,contactLastName,interlocutorLastName,interlocutorTitle',
          'emailSubject': 'A visitor is waiting at HREG Lobby',
        },
      },
      'request_ToSendEmailToMST_Done': {
        'template': [
          'request_ToSendEmailToMST_Done',
        ],
      },
      'request_ToSendEmailToContact_Done': {
        'template': [
          'request_ToSendEmailToContact_Done',
        ],
      },
      'request_ToSendEmailToContact': {
        'template': [
          'request_ToSendEmailToContact',
        ],
        'data': {
          'send_Email': 'emailSubject,contactEmail,contactFirstName,interlocutorLastName,interlocutorTitle',
          'emailSubject': 'Your visitor is waiting at HREG Lobby',
        },
      },
      'clean_FaceId': {
        'template': [
          'clean_FaceId',
        ],
        'data': {
          'interlocutorFaceId': '',
        },
      },
      'clean_ConsentFlag': {
        'template': [
          'clean_ConsentFlag',
        ],
        'data': {
          'interlocutorConsentFlag': '',
        },
      },
      'set_ConsentFlag': {
        'template': [
          'set_ConsentFlag',
        ],
        'data': {
          'interlocutorConsentFlag': 'true',
        },
      },
      'request_ToStoreInterlocutorConsent': {
        'template': [
          'request_ToStoreInterlocutorConsent',
        ],
        'data': {
          'store_IdentityOfInterlocutor': 'interlocutorId,interlocutorFaceId,interlocutorTitle,interlocutorFirstName,interlocutorLastName,interlocutorConsentFlag,visitorRegistered,label',
          'label': 'interlocutor',
        },
      },
      'set_VisitorRegistered': {
        'template': [
          'set_VisitorRegistered',
        ],
        'data': {
          'visitorRegistered': 'true',
        },
      },
      'clean_VisitorRegistered': {
        'template': [
          'clean_VisitorRegistered',
        ],
        'data': {
          'visitorRegistered': '',
        },
      },
      'request_ToCall_Done': {
        'template': [
          'request_ToCall_Done',
        ],
      },
      'say_IAgree': {
        'template': [
          'I agree',
        ],
      },
      'say_IDisagree': {
        'template': [
          'I disagree',
        ],
      },
      'clean_LTMFlags': {
        'template': [
          'clean_LTMFlags',
        ],
        'data': {
          'noVisitToday': '',
          'noVisitFound': '',
          'singleVisitFound': '',
          'multipleVisitFound': '',
          'singleCompanyFound': '',
          'multipleCompanyFound': '',
          'singleContactFound': '',
          'multipleContactFound': '',
          'contactList': '',
          'noNameVLastNameFound': '',
        },
      },
      'clean_CurrentCase': {
        'template': [
          'clean_CurrentCase',
        ],
        'data': {
          'currentCase': '',
        },
      },
      'clean_CurrentStep': {
        'template': [
          'clean_CurrentStep',
        ],
        'data': {
          'currentStep': '',
        },
      },
      'request_CheckDBEmpty': {
        'template': [
          'request_CheckDBEmpty',
        ],
      },
      'set_HintFor_C0': {
        'template': [
          'set_HintFor_C0',
        ],
        'data': {
          'hint': 'Type your fullname and/or company name',
        },
      },
      'generateMironSlot_Name': {
        'template': [
          'generateMironSlot_Name',
        ],
      },
      'clean_RecognitionStates': {
        'template': [
          'clean_RecognitionStates',
        ],
      },
      'clean_InterlocutorName': {
        'template': [
          'clean_InterlocutorName',
        ],
        'data': {
          'interlocutorTitle': '',
          'interlocutorFirstName': '',
          'interlocutorLastName': '',
          'interlocutorId': '',
        },
      },
      'clean_CompanyAndContact': {
        'template': [
          'clean_CompanyAndContact',
        ],
        'data': {
          'interlocutorCompany': '',
          'contactTitle': '',
          'contactFirstName': '',
          'contactLastName': '',
          'contactTelephoneNumber': '',
          'contactEmail': '',
          'contactGender': '',
          'contactId': '',
        },
      },
      'request_ToSayHello_Done': {
        'template': [
          'request_ToSayHello_Done',
        ],
      },
      'set_HintFor_C2': {
        'template': [
          'set_HintFor_C2',
        ],
        'data': {
          'hint': 'Type your company name',
        },
      },
      'set_HintFor_C3': {
        'template': [
          'set_HintFor_C3',
        ],
        'data': {
          'hint': 'Type your last name',
        },
      },
      'set_HintFor_C5': {
        'template': [
          'set_HintFor_C5',
        ],
        'data': {
          'hint': 'Type your first name',
        },
      },
      'set_HintFor_C7': {
        'template': [
          'set_HintFor_C7',
        ],
        'data': {
          'hint': 'Type your first name',
        },
      },
      'set_YesNoButtons': {
        'template': [
          'set_YesNoButtons',
        ],
        'data': {
          'contactList': 'yes I am, no I am not',
        },
      },
      'clean_Contact': {
        'template': [
          'clean_Contact',
        ],
        'data': {
          'contactTitle': '',
          'contactFirstName': '',
          'contactLastName': '',
          'contactTelephoneNumber': '',
          'contactEmail': '',
          'contactGender': '',
          'contactId': '',
        },
      },
      'request_ActionStep1': {
        'template': [
          'request_ActionStep1',
        ],
      },
      'request_ActionStep2': {
        'template': [
          'request_ActionStep2',
        ],
      },
      'request_ActionStep3': {
        'template': [
          'request_ActionStep3',
        ],
      },
      'request_ActionStep4': {
        'template': [
          'request_ActionStep4',
        ],
      },
      'reset_Steps': {
        'template': [
          'reset_Steps',
        ],
      },
      'request_ToRecallIdentityOfFaceId': {
        'template': [
          'request_ToRecallIdentityOfFaceId',
        ],
        'data': {
          'recall_IdentityOfFaceId': 'interlocutorFaceId',
        },
      },
      'set_HintFor_C8-1': {
        'template': [
          'set_HintFor_C8-1',
        ],
        'data': {
          'hint': 'Type your first name',
        },
      },
      'set_HintFor_C8-2': {
        'template': [
          'set_HintFor_C8-2',
        ],
        'data': {
          'hint': 'Type your company name',
        },
      },
      'set_HintFor_C10': {
        'template': [
          'set_HintFor_C10',
        ],
        'data': {
          'hint': 'Type your first name',
        },
      },
      'request_InformAtPhone_Done': {
        'template': [
          'request_InformAtPhone_Done',
        ],
      },
      'request_InformAtPhone': {
        'template': [
          'request_InformAtPhone',
        ],
      },
    },
    'speech': {
      'say_startRegistration': {
        'template': [
          'start registration',
        ],
      },
      'generateMironSlot_Text': {
        'template': [
          'generateMironSlot_Text',
        ],
      },
      'say_Basic_S1_C0': {
        'template': [
          'Well,',
          'So,',
        ],
      },
      'ask_Basic_S1_C0': {
        'template': [
          '(Could you )please give me your fullname or your company name?',
        ],
      },
      'say_NotUnderstood_S2': {
        'template': [
          'Sorry I did not understand what you said.',
          'I am sorry, I am not sure I understood you.',
          'I am afraid I did not understand you.',
        ],
      },
      'ask_NotUnderstood_S3_C0': {
        'template': [
          '(Could you )please type your first and last name or your company name?',
        ],
      },
      'say_NoInput_S4': {
        'template': [
          'Please use the keyboard on the screen to type your answer and press okay. Let\'s try again...',
          'Please, type your answer with the screen keyboard and then press okay. Let\'s try again...',
          'Let\'s try again. Please type your answer using the keyboard on the screen, and then press okay',
        ],
      },
      'ask_NoInput_S4_C0': {
        'template': [
          'Could you (please )retype your first and last name or your company name?',
          'May I ask you to type again your first and last name or your company name?',
        ],
      },
      'inform_VisitorNotFound': {
        'template': [
          'I am (very )sorry (but )I cannot find any visit for you today.',
          'I am afraid I have no visit for you today.',
        ],
      },
      'inform_GoToWatchman': {
        'template': [
          '(<could> you )please go to the human receptionist behind the desk and ask her for help.',
          'Please, just go by the human receptionist, she will be able to help you.',
        ],
      },
      'say_Goodbye': {
        'template': [
          'Have a nice day.',
          'Have a great day.',
          'I wish you a nice day.',
        ],
      },
      'ask_ToRepeat': {
        'template': [
          'repeat',
        ],
      },
      'ask_ForHelp': {
        'template': [
          'help',
          'what( the hell) <should> I <do>',
          'I have no idea( what to <do>)',
          'I am( completely) lost',
          'I <dont> know( what to <do>)',
          '<should> I <speak>',
        ],
      },
      'inform_ThanksForRegistering': {
        'template': [
          'Thank you for using H.R.I. virtual receptionist. (Please )ask the human receptionist for your entry card. ',
          'I am very pleased I could help. You still have to ask the human receptionist to get your entry card.',
          'Glad I could help you. (Please )ask the human receptionist for your entry card. ',
        ],
      },
      'ask_NoInput_S2_C0': {
        'template': [
          'Could you tell (me )your full name or your company name, please?',
          'Could you please tell (me )your full name or your company name?',
        ],
      },
      'say_NoInput_S2_C0': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_Help_S2_C0': {
        'template': [
          'Could you (please )tell (me )your full name or your company name?',
          'Please, just tell (me )your full name or your company name?',
        ],
      },
      'say_Help_S2_V0': {
        'template': [
          'You can also say, yes I am, or, no I am not',
        ],
      },
      'say_MyName': {
        'template': [
          '{visitorFirstName}',
          '(my name is )({Dr} )({visitorFirstName} ){visitorLastName}',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'say_TooNoisy_S3': {
        'template': [
          'I am sorry but I hardly understand you. I guess that the room is too noisy. Let\'s try with the screen.',
          'I guess that the room is too noisy. I am sorry but I hardly understand you. Let\'s try with the screen.',
        ],
      },
      'ask_TooNoisy_S3_C0': {
        'template': [
          '(Could you )please type your first and last name or your company name?',
        ],
      },
      'say_NoInput_S3_V0': {
        'template': [
          'Sorry I did not hear you. Let us use buttons on the screen.',
        ],
      },
      'ask_NoInput_S3_V0': {
        'template': [
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'say_NotUnderstood_S4_C0': {
        'template': [
          '(I am )sorry, I cannot find any visit for this name. ',
          '(I am )sorry, I do not find a visit for this name. ',
        ],
      },
      'ask_NotUnderstood_S4': {
        'template': [
          'Could you (please )check your input?',
          'Could you (please )verify what you typed?',
        ],
      },
      'inform_CallingContact': {
        'template': [
          'wait a moment (please, )I am (just )calling your contact person {Dr} {contactLastName}. ',
          'just a moment (please, )I now call your contact person {Dr} {contactLastName}. ',
          'one moment (please, )Let me call your contact person {Dr} {contactLastName}. ',
        ],
        'slot': {
          'contactLastName': 'contactLastName',
          'contactTitle': 'Dr',
        },
      },
      'say_MyCompanyName': {
        'template': [
          '{companyName}',
          'my company is {companyName}',
          'I work for {companyName}',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'say_MyContactName': {
        'template': [
          '({Dr} )({contactFirstName} ){contactLastName}',
        ],
        'slot': {
          'contactTitle': 'Dr',
          'contactFirstName': 'contactFirstName',
          'contactLastName': 'contactLastName',
        },
      },
      'inform_ContactComing': {
        'template': [
          'Thank you(( for waiting ){Sir}). Your contact will come to pick you up( in a moment).',
          'Thanks (( for waiting ){Sir}). Your contact is going to come to pick you up( soon).',
          'Your contact will come to pick you up( in a moment). Thanks for waiting( {Sir}). ',
          'Your contact is going to pick you up( in a moment). Thanks for waiting( {Sir}). ',
        ],
        'slot': {
          'interlocutorGender': 'Sir',
        },
      },
      'inform_ContactNotReached': {
        'template': [
          'It seems (that ){Dr} {contactLastName} cannot take my call(, (so )I just sent an email). I will (try to )reach our Management Support Team instead.',
          '{Dr} {contactLastName} is not reachable(, I just sent an email). Let me (try to )reach our Management Support Team instead.',
          'I am not reaching {Dr} {contactLastName}( with the phone )(, I just sent an email). Let me (try(, instead) to )reach our Management Support Team instead.',
          '{Dr} {contactLastName} did not answer the phone(, I just sent an email). Let me (try(, instead) to )reach our Management Support Team instead.',
        ],
        'slot': {
          'contactLastName': 'contactLastName',
          'contactTitle': 'Dr',
        },
      },
      'inform_MSTComing': {
        'template': [
          'Thank you for waiting( {Sir}). Someone from our Management Support Team will come( to pick you up).',
          'Someone from our Management Support Team will come( to pick you up). Thank you for waiting( {Sir}).',
          'Thanks for waiting( {Sir}). Somebody from our Management Support Team will come( to pick you up).',
        ],
        'slot': {
          'interlocutorGender': 'Sir',
        },
      },
      'inform_MSTNotReached': {
        'template': [
          '(Unfortunately )I cannot reach anybody.',
          'Nobody answered my call (unfortunately)',
          '(Unfortunately )I did not reach somebody at the phone.',
        ],
      },
      'play_EmailSending': {
        'template': [
          'data/sounds/email-sent.mp3',
        ],
      },
      'inform_ToReadGDPR': {
        'template': [
          '(If ok for you )we would like you to participate to our Living Lab research. Please choose if you accept or deny.',
        ],
      },
      'say_Ok': {
        'template': [
          'ok!',
        ],
      },
      'inform_TryAgainLater': {
        'template': [
          '<could> you (please )wait and (try again later or )ask the human receptionist?',
          'Sorry, do you mind to (try again later or )ask the human receptionist?',
        ],
      },
      'play_PhoneRinging': {
        'template': [
          'data/sounds/phone-2calling.mp3',
        ],
      },
      'propose_ToPressConsent': {
        'template': [
          'Please, (you (would )need to )click the checkbox before giving your consent',
          'Please, (you should )click the checkbox before giving your consent',
        ],
      },
      'inform_Restarting': {
        'template': [
          'I am sorry. I <could> not complete the registration.',
          'I am sorry. The registration <could> not be completed.',
        ],
      },
      'ask_Help_S3_V0': {
        'template': [
          'Could you (please )select yes or no.',
        ],
      },
      'say_Help_S3_V0': {
        'template': [
          'To make it easier, (just )use the touch screen.',
        ],
      },
      'ask_Help_S4_C0': {
        'template': [
          'Then type your first and last name or your company name and press enter on the keyboard or the okay button.',
        ],
      },
      'say_Help_S4': {
        'template': [
          'Use the screen keyboard with your finger',
        ],
      },
      'inform_CaseNotHandled': {
        'template': [
          'I am sorry. My intelligence is limited.',
          'I am sorry. Sometimes I wish to be more intelligent.',
        ],
      },
      'inform_NoVisitToday': {
        'template': [
          'I am sorry. I am not expecting any visit today.',
          'I am sorry. I am not informed of your visit.',
          'I am sorry. I have no visit planned for today.',
          'I am sorry. I have not been informed of your visit.',
        ],
      },
      'say_NoInput_S2_K0': {
        'template': [
          'Please (just )use the buttons on the screen. Let us try again',
          'Let us try again by using the buttons on the screen.',
        ],
      },
      'ask_NoInput_S2_K0': {
        'template': [
          '(Please )select now the person I should contact?',
          '(Please )now you can select the person I should contact?',
        ],
      },
      'ask_Basic_S1_K0': {
        'template': [
          '(Could you )please touch the name I should call?',
        ],
      },
      'say_Basic_S1_K0': {
        'template': [
          'I (can )see (that )you have different appointments for today.',
          'Today, it seems, you have several appointments.',
        ],
      },
      'inform_NoOtherContact': {
        'template': [
          'I am sorry, ({Sir} )(but )I have no other contact registered for you today.',
          'I am sorry, ({Sir} )(but ) today I have no other contact registered for you.',
        ],
        'slot': {
          'interlocutorGender': 'Sir',
        },
      },
      'say_MyContactIsNotInList': {
        'template': [
          'contact is not in the list',
        ],
      },
      'say_Basic_S1_V0': {
        'template': [
          'Sorry to ask but, are you {Dr} {visitorFirstName} {visitorLastName}?',
          'Just let me ask, are you {Dr} {visitorFirstName} {visitorLastName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'ask_Basic_S1_V0': {
        'template': [
          '(Could you )please answer with yes or no',
        ],
      },
      'say_NoInput_S2_V0': {
        'template': [
          'You can say, yes it is me, or, no it is not me',
        ],
      },
      'ask_NoInput_S2_V0': {
        'template': [
          '(Sorry but )I did not hear your answer. Are you ({Dr} ){visitorFirstName} {visitorLastName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'say_Help_S2_C0': {
        'template': [
          'You can present yourself saying, I am Mister John Doe, or, I am from the Alpha company. So please...',
          'You can introduce yourself by saying, I am Mister Hanry Doson, or, I am from the company Tele System. So please...',
        ],
      },
      'say_Help_S3_C0': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C0': {
        'template': [
          'Could you (please )type your first and last name or your company name?',
        ],
      },
      'say_NoInput_S3_C0': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C0': {
        'template': [
          'Could you (please )type your first and last name or your company name?',
        ],
      },
      'say_NotUnderstood_S3': {
        'template': [
          '(I am )sorry but I hardly understand you. Let\'s try with the screen.',
          'I hardly understand you, I am sorry. Let\'s try with the screen.',
        ],
      },
      'say_YesIAm': {
        'template': [
          '<yes>',
          '(<yes> )I am',
          '(<yes> )<it is> me',
          '(<yes> )it is',
        ],
      },
      'say_NoIAmNot': {
        'template': [
          '<no>',
          '(<no> )I am not',
          '(<no> )it isn\'t( me)',
          '(<no> )<it is> not( me)',
        ],
      },
      'say_MyMistake': {
        'template': [
          'Sorry, my mistake. ',
        ],
      },
      'say_Hello': {
        'template': [
          'Good {morning}',
        ],
        'slot': {
          'phaseOfDay': 'morning',
        },
      },
      'say_IAmMeisy': {
        'template': [
          'I am Meisy, H.R.I. virtual receptionist.',
          'My name is Meisy, (I am )H.R.I. virtual receptionist.',
        ],
      },
      'say_ThanksWithName': {
        'template': [
          'Thank you {Dr} {visitorLastName}.',
          'Thanks {Dr} {visitorLastName}.',
        ],
        'slot': {
          'interlocutorTitle': 'Dr',
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'say_IAgree': {
        'template': [
          'I agree',
        ],
      },
      'say_IDisagree': {
        'template': [
          'I disagree',
        ],
      },
      'say_Basic_S1_C2': {
        'template': [
          'Well, {Sir} but I am expecting another person with the same name as yours.',
          'I am actually expecting another person with the same name as yours.',
        ],
        'slot': {
          'interlocutorGender': 'Sir',
        },
      },
      'ask_Basic_S1_C2': {
        'template': [
          '(Could you )please tell me your company name?',
        ],
      },
      'say_Help_S2_C2': {
        'template': [
          'You can tell me something such as I am from the Alpha company. So please...',
          'You could tell something like, I am from the company Multi Comm. So please...',
        ],
      },
      'ask_Help_S2_C2': {
        'template': [
          'Could you (please )tell (me )your company name?',
          'Please, tell (me )the name of your company?',
        ],
      },
      'say_NoInput_S2_C2': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_NoInput_S2_C2': {
        'template': [
          'Could you tell (me )your company name, please?',
          'Could you please tell (me )your company name?',
        ],
      },
      'say_Help_S3_C2': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C2': {
        'template': [
          'Could you (please )type your company name?',
        ],
      },
      'say_NoInput_S3_C2': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C2': {
        'template': [
          'Could you (please )type your company name?',
        ],
      },
      'ask_NotUnderstood_S3_C2': {
        'template': [
          '(Could you )please type your company name?',
        ],
      },
      'ask_TooNoisy_S3_C2': {
        'template': [
          '(Could you )please type your company name?',
        ],
      },
      'ask_NoInput_S4_C2': {
        'template': [
          '(Could you )please retype your company name?',
          '(Could you )please type your company name again?',
        ],
      },
      'say_NotUnderstood_S4_C2': {
        'template': [
          '(I am )sorry, I cannot find any visit for this company name. ',
          '(I am )sorry, I do not find a visit for this company name. ',
        ],
      },
      'ask_Help_S4_C2': {
        'template': [
          'Then type your company name and press enter on the keyboard or the okay button.',
        ],
      },
      'say_Basic_S1_C3': {
        'template': [
          'I am sorry {Sir}, but I am still not able to find your contact.',
          'Sorry {Sir}, I am still not able to find your contact.',
        ],
        'slot': {
          'interlocutorGender': 'Sir',
        },
      },
      'ask_Basic_S1_C3': {
        'template': [
          '(Could you )please tell me your last name?',
        ],
      },
      'say_Help_S2_C3': {
        'template': [
          'You can tell me something such as my last name is Doe. So please...',
          'You could say something like, my last name is Doson. So please...',
        ],
      },
      'ask_Help_S2_C3': {
        'template': [
          'Could you (please )tell (me )your last name?',
          'Please, tell (me )what is your last name.',
        ],
      },
      'say_NoInput_S2_C3': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_NoInput_S2_C3': {
        'template': [
          'Could you tell (me )your last name, please?',
          'Could you please tell (me )your last name?',
        ],
      },
      'say_Help_S3_C3': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C3': {
        'template': [
          'Could you (please )type your last name?',
        ],
      },
      'say_NoInput_S3_C3': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C3': {
        'template': [
          'Could you (please )type your last name?',
        ],
      },
      'ask_NotUnderstood_S3_C3': {
        'template': [
          '(Could you )please type your last name?',
        ],
      },
      'ask_TooNoisy_S3_C3': {
        'template': [
          '(Could you )please type your last name?',
        ],
      },
      'ask_Help_S4_C3': {
        'template': [
          'Then type your last name and press enter on the keyboard or the okay button.',
        ],
      },
      'ask_NoInput_S4_C3': {
        'template': [
          '(Could you )please retype your last name?',
          '(Could you )please type your last name again?',
        ],
      },
      'say_NotUnderstood_S4_C3': {
        'template': [
          '(I am )sorry, I cannot find any visit for this last name. ',
          '(I am )sorry, I do not find a visit for this last name. ',
        ],
      },
      'say_Basic_S1_V1': {
        'template': [
          'Sorry to ask but, is your first name {visitorFirstName}?',
          'Let me ask, is your first name {visitorFirstName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
        },
      },
      'say_Basic_S1_V2': {
        'template': [
          'Sorry to ask but, is your last name {visitorLastName}?',
          'Let me ask, is your last name {visitorLastName}?',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'ask_Basic_S1_V1': {
        'template': [
          '(Could you )please answer with yes or no',
        ],
      },
      'ask_Basic_S1_V2': {
        'template': [
          '(Could you )please answer with yes or no',
        ],
      },
      'say_Help_S2_V1': {
        'template': [
          'You can also say, yes I am, or, no I am not',
        ],
      },
      'say_Help_S2_V2': {
        'template': [
          'You can also say, yes I am, or, no I am not',
        ],
      },
      'ask_NoInput_S2_V1': {
        'template': [
          '(Sorry but )I did not hear your answer. Is your first name {visitorFirstName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
        },
      },
      'ask_NoInput_S2_V2': {
        'template': [
          '(Sorry but )I did not hear your answer. Is your last name {visitorLastName}?',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'say_NoInput_S2_V1': {
        'template': [
          'You can say, yes it is me, or, no it is not me',
        ],
      },
      'say_NoInput_S2_V2': {
        'template': [
          'You can say, yes it is me, or, no it is not me',
        ],
      },
      'ask_NotUnderstood_S2_C3': {
        'template': [
          'Could you (please )repeat your last name?',
        ],
      },
      'ask_NotUnderstood_S2_C2': {
        'template': [
          'Could you (please )repeat your company name?',
        ],
      },
      'ask_NotUnderstood_S2_C0': {
        'template': [
          'Could you (please )repeat your full name or your company name?',
        ],
      },
      'say_Help_S3_V1': {
        'template': [
          'To make it easier, (just )use the touch screen.',
        ],
      },
      'say_Help_S3_V2': {
        'template': [
          'To make it easier, (just )use the touch screen.',
        ],
      },
      'ask_Help_S3_V1': {
        'template': [
          'Could you (please )select yes or no.',
        ],
      },
      'ask_Help_S3_V2': {
        'template': [
          'Could you (please )select yes or no.',
        ],
      },
      'say_NoInput_S3_V1': {
        'template': [
          'Sorry I did not hear you. Let us use buttons on the screen.',
        ],
      },
      'say_NoInput_S3_V2': {
        'template': [
          'Sorry I did not hear you. Let us use buttons on the screen.',
        ],
      },
      'ask_NoInput_S3_V1': {
        'template': [
          'Is your first name {visitorFirstName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
        },
      },
      'ask_NoInput_S3_V2': {
        'template': [
          'Is your last name {visitorLastName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'say_Help_S1_V2': {
        'template': [
          'So, is your last name {visitorLastName}?',
          'Then, is your last name {visitorLastName}?',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'say_Help_S1_V1': {
        'template': [
          'So, is your first name {visitorFirstName}?',
          'Then, is your first name {visitorFirstName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
        },
      },
      'say_Help_S1_V0': {
        'template': [
          'So, are you ({Dr} ){visitorFirstName} {visitorLastName}?',
          'Then, are you ({Dr} ){visitorFirstName} {visitorLastName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'say_Basic_S1_C5': {
        'template': [
          'I am sorry {Sir}, but I am expecting two persons named {visitorLastName} today.',
          'I am actually expecting two persons named {visitorLastName} today.',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
          'interlocutorGender': 'Sir',
        },
      },
      'ask_Basic_S1_C5': {
        'template': [
          '(Could you )please tell me your first name?',
        ],
      },
      'say_Help_S2_C5': {
        'template': [
          'You can tell me something such as my first name is John. So please...',
          'You say something like, my first name is Julian. So please...',
        ],
      },
      'ask_Help_S2_C5': {
        'template': [
          'Could you (please )tell (me )your first name?',
          'Please, tell (me )what is your first name.',
        ],
      },
      'say_NoInput_S2_C5': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_NoInput_S2_C5': {
        'template': [
          'Could you tell me your first name, please?',
          'Could you please tell (me )your first name?',
        ],
      },
      'ask_NotUnderstood_S2_C5': {
        'template': [
          'Could you (please )repeat your first name?',
        ],
      },
      'say_Help_S3_C5': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C5': {
        'template': [
          'Could you (please )type your first name?',
        ],
      },
      'say_NoInput_S3_C5': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C5': {
        'template': [
          'Could you (please )type your first name?',
        ],
      },
      'ask_NotUnderstood_S3_C5': {
        'template': [
          '(Could you )please type your first name?',
        ],
      },
      'ask_TooNoisy_S3_C5': {
        'template': [
          '(Could you )please type your first name?',
        ],
      },
      'ask_Help_S4_C5': {
        'template': [
          'Then type your first name and press enter on the keyboard or the okay button.',
        ],
      },
      'ask_NoInput_S4_C5': {
        'template': [
          '(Could you )please retype your first name?',
          '(Could you )please type your first name again?',
        ],
      },
      'say_NotUnderstood_S4_C5': {
        'template': [
          '(I am )sorry, I cannot find any visit for this first name. ',
          '(I am )sorry, I do not find a visit for this first name. ',
        ],
      },
      'say_Basic_S1_V3': {
        'template': [
          'Sorry to ask but, is your company {companyName}?',
          'Let me ask, is your company {companyName}?',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'say_Basic_S1_V4': {
        'template': [
          'Sorry to ask but, are you {Dr} {visitorFirstName} {visitorLastName}?',
          'Let me ask, are you {Dr} {visitorFirstName} {visitorLastName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'ask_Basic_S1_V3': {
        'template': [
          '(Could you )please answer with yes or no',
        ],
      },
      'ask_Basic_S1_V4': {
        'template': [
          '(Could you )please answer with yes or no',
        ],
      },
      'say_Help_S2_V3': {
        'template': [
          'You can also say, yes it is, or, no it is not',
        ],
      },
      'say_Help_S2_V4': {
        'template': [
          'You can also say, yes I am, or, no I am not',
        ],
      },
      'say_Help_S1_V3': {
        'template': [
          'So, is your company {companyName}?',
          'Then, is your company {companyName}?',
          'So, your company is (companyName), right?',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'say_Help_S1_V4': {
        'template': [
          'So, are you from {companyName}?',
          'Then, are you from {companyName}?',
          'So, your company is (companyName), right?',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'say_NoInput_S2_V3': {
        'template': [
          'You can say, yes it is, or, no it is not',
        ],
      },
      'say_NoInput_S2_V4': {
        'template': [
          'You can say, yes it is me, or, no it is not me',
        ],
      },
      'ask_NoInput_S2_V3': {
        'template': [
          '(Sorry but )I did not hear your answer. Is your company {companyName}?',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'ask_NoInput_S2_V4': {
        'template': [
          '(Sorry but )I did not hear your answer. Are you {Dr} {visitorFirstName} {visitorLastName}?',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'say_Help_S3_V3': {
        'template': [
          'To make it easier, (just )use the touch screen.',
        ],
      },
      'say_Help_S3_V4': {
        'template': [
          'To make it easier, (just )use the touch screen.',
        ],
      },
      'ask_Help_S3_V3': {
        'template': [
          'Could you (please )select yes or no.',
        ],
      },
      'ask_Help_S3_V4': {
        'template': [
          'Could you (please )select yes or no.',
        ],
      },
      'say_NoInput_S3_V3': {
        'template': [
          'Sorry I did not hear you. Let us use buttons on the screen.',
        ],
      },
      'say_NoInput_S3_V4': {
        'template': [
          'Sorry I did not hear you. Let us use buttons on the screen.',
        ],
      },
      'ask_NoInput_S3_V3': {
        'template': [
          'Is your company {companyName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'ask_NoInput_S3_V4': {
        'template': [
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'say_Basic_S1_C7': {
        'template': [
          'Well, {Dr} {contactLastName} is expecting several visitors from {companyName} today.',
          'As far as I can see, today {Dr} {contactLastName} is expecting several visitors from {companyName}.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
          'contactLastName': 'contactLastName',
          'contactTitle': 'Dr',
        },
      },
      'ask_Basic_S1_C7': {
        'template': [
          '(Could you )please tell me your full name?',
        ],
      },
      'say_Help_S2_C7': {
        'template': [
          'You can tell me something such as, I am Mister John Doe. So please...',
          'You could tell something like, I am Missis Janna Coleman. So please...',
        ],
      },
      'ask_Help_S2_C7': {
        'template': [
          'Could you (please )tell (me )your full name?',
          'Please, tell (me )what is your full name.',
        ],
      },
      'say_NoInput_S2_C7': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_NoInput_S2_C7': {
        'template': [
          'Could you tell (me )your full name, please?',
          'Could you please tell (me )your full name?',
        ],
      },
      'ask_NotUnderstood_S2_C7': {
        'template': [
          'Could you (please )repeat your full name?',
        ],
      },
      'say_Help_S3_C7': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C7': {
        'template': [
          'Could you (please )type your fullname?',
        ],
      },
      'say_NoInput_S3_C7': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C7': {
        'template': [
          'Could you (please )type your full name?',
        ],
      },
      'ask_NotUnderstood_S3_C7': {
        'template': [
          '(Could you )please type your full name?',
        ],
      },
      'ask_TooNoisy_S3_C7': {
        'template': [
          '(Could you )please type your full name?',
        ],
      },
      'ask_NoInput_S4_C7': {
        'template': [
          '(Could you )please retype your full name?',
          '(Could you )please type your full name again?',
        ],
      },
      'say_NotUnderstood_S4_C7': {
        'template': [
          '(I am )sorry, I cannot find any visit for this name. ',
          '(I am )sorry, I do not find a visit for this name. ',
        ],
      },
      'say_Thanks': {
        'template': [
          'Thank you.',
          'Thanks.',
        ],
      },
      'say_Basic_S1_K1': {
        'template': [
          'I can see that your company has different appointments for today.',
          'Today, it seems, your company has several appointments.',
        ],
      },
      'ask_Basic_S1_K1': {
        'template': [
          '(Could you )please touch the name  I should call?',
        ],
      },
      'say_NoInput_S2_K1': {
        'template': [
          'Please use the buttons on the screen. Let us try again',
          'Let us try again by using the buttons on the screen.',
        ],
      },
      'ask_NoInput_S2_K1': {
        'template': [
          '(Please )select now the person I should contact?',
          '(Please )now you can select the person I should contact?',
        ],
      },
      'say_Basic_S1_V5': {
        'template': [
          'Sorry but {Dr} {contactLastName} is expecting many visitors today. Are you from {companyName}?',
          'I know that today {Dr} {contactLastName} is expecting several visitors. Are you from {companyName}?',
        ],
        'slot': {
          'contactLastName': 'contactLastName',
          'contactTitle': 'Dr',
          'interlocutorCompany': 'companyName',
        },
      },
      'ask_Basic_S1_V5': {
        'template': [
          '(Could you )please answer with yes or no',
        ],
      },
      'say_Help_S2_V5': {
        'template': [
          'You can also say, yes it is, or, no it is not',
        ],
      },
      'say_NoInput_S2_V5': {
        'template': [
          'You can say, yes it is, or, no it is not',
        ],
      },
      'ask_NoInput_S2_V5': {
        'template': [
          '(Sorry but )I did not hear your answer. Is your company {companyName}?',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'say_Help_S3_V5': {
        'template': [
          'To make it easier, (just )use the touch screen.',
        ],
      },
      'ask_Help_S3_V5': {
        'template': [
          'Could you (please )select yes or no.',
        ],
      },
      'ask_NoInput_S3_V5': {
        'template': [
          'Is your company {companyName}? Please, press yes or no.',
          'Your company is {companyName}. Just press yes or no.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'say_Basic_S1_C8-1': {
        'template': [
          'Well, {Dr} {contactLastName} is expecting several visitors today.',
          'As far as I see, {Dr} {contactLastName} is expecting several visitors today.',
        ],
        'slot': {
          'contactLastName': 'contactLastName',
          'contactTitle': 'Dr',
        },
      },
      'ask_Basic_S1_C8-1': {
        'template': [
          '(Could you )please tell me your full name?',
        ],
      },
      'say_Help_S2_C8-1': {
        'template': [
          'You can tell me something such as, I am Mister John Doe. So please...',
          'You could tell something like, I am Missis Janna Coleman. So please...',
        ],
      },
      'ask_Help_S2_C8-1': {
        'template': [
          'Could you (please )tell (me )your full name?',
          'Please, tell (me )what is your full name.',
        ],
      },
      'say_NoInput_S2_C8-1': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_NoInput_S2_C8-1': {
        'template': [
          'Could you tell (me )your full name, please?',
          'Could you please tell (me )your full name?',
        ],
      },
      'ask_NotUnderstood_S2_C8-1': {
        'template': [
          'Could you (please )repeat your full name?',
        ],
      },
      'say_Help_S3_C8-1': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C8-1': {
        'template': [
          'Could you (please )type your fullname?',
        ],
      },
      'say_NoInput_S3_C8-1': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C8-1': {
        'template': [
          'Could you (please )type your full name?',
        ],
      },
      'ask_NotUnderstood_S3_C8-1': {
        'template': [
          '(Could you )please type your full name?',
        ],
      },
      'ask_Help_S4_C7': {
        'template': [
          'Then type your full name and press enter on the keyboard or the okay button.',
        ],
      },
      'ask_Help_S4_C8-1': {
        'template': [
          'Then type your full name and press enter on the keyboard or the okay button.',
        ],
      },
      'ask_NoInput_S4_C8-1': {
        'template': [
          '(Could you )please retype your full name?',
          '(Could you )please type your full name again?',
        ],
      },
      'say_NotUnderstood_S4_C8-1': {
        'template': [
          '(I am )sorry, I cannot find any visit for this name. ',
          '(I am )sorry, I do not find a visit for this name. ',
        ],
      },
      'say_Basic_S1_C8-2': {
        'template': [
          'Well, {Dr} {contactLastName} is expecting several visitors today.',
          'As far as I see, {Dr} {contactLastName} is expecting several visitors today.',
        ],
        'slot': {
          'contactLastName': 'contactLastName',
          'contactTitle': 'Dr',
        },
      },
      'ask_Basic_S1_C8-2': {
        'template': [
          '(Could you )please tell me your company name?',
        ],
      },
      'say_Help_S2_C8-2': {
        'template': [
          'You can tell me something such as I am from the Alpha company. So please...',
          'You could tell something like, I am from the company Multi Comm. So please...',
        ],
      },
      'ask_Help_S2_C8-2': {
        'template': [
          'Could you (please )tell (me )your company name?',
          'Please, tell (me )what is your company name.',
        ],
      },
      'say_NoInput_S2_C8-2': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_NoInput_S2_C8-2': {
        'template': [
          'Could you tell (me )your company name, please?',
          'Could you please tell (me )your company name?',
        ],
      },
      'ask_NotUnderstood_S2_C8-2': {
        'template': [
          'Could you (please )repeat your company name?',
        ],
      },
      'say_Help_S3_C8-2': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C8-2': {
        'template': [
          'Could you (please )type your company name?',
        ],
      },
      'say_NoInput_S3_C8-2': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C8-2': {
        'template': [
          'Could you (please )type your company name?',
        ],
      },
      'ask_NotUnderstood_S3_C8-2': {
        'template': [
          '(Could you )please type your company name?',
        ],
      },
      'ask_Help_S4_C8-2': {
        'template': [
          'Then type your company name and press enter on the keyboard or the okay button.',
        ],
      },
      'ask_NoInput_S4_C8-2': {
        'template': [
          '(Could you )please retype your company name?',
          '(Could you )please type your company name again?',
        ],
      },
      'say_NotUnderstood_S4_C8-2': {
        'template': [
          '(I am )sorry, I cannot find any visit for this company name. ',
          '(I am )sorry, I do not find a visit for this company name. ',
        ],
      },
      'ask_NotUnderstood_S3_V5': {
        'template': [
          'Is your company {companyName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'ask_NotUnderstood_S3_V4': {
        'template': [
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'ask_NotUnderstood_S3_V3': {
        'template': [
          'Is your company {companyName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'ask_NotUnderstood_S3_V2': {
        'template': [
          'Is your last name {visitorLastName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'ask_NotUnderstood_S3_V1': {
        'template': [
          'Is your first name {visitorFirstName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
        },
      },
      'ask_NotUnderstood_S3_V0': {
        'template': [
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Please, press yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'inform_CriticalError': {
        'template': [
          'I am really sorry but an error occured in the system. Please try again.',
          'Sorry, there was an error in the system. Please, try again later.',
        ],
      },
      'ask_NotUnderstood_S2_V0': {
        'template': [
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Please, say yes or no.',
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Just say yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'ask_NotUnderstood_S2_V1': {
        'template': [
          'Is your first name {visitorFirstName}? Please, say yes or no.',
          'Is your first name {visitorFirstName}? Just say yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
        },
      },
      'ask_NotUnderstood_S2_V2': {
        'template': [
          'Is your last name {visitorLastName}? Please, say yes or no.',
          'Is your last name {visitorLastName}? Just say yes or no.',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'ask_NotUnderstood_S2_V3': {
        'template': [
          'Is your company {companyName}? Please, say yes or no.',
          'Is your company {companyName}? Just say yes or no.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'ask_NotUnderstood_S2_V4': {
        'template': [
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Please, say yes or no.',
          'Are you {Dr} {visitorFirstName} {visitorLastName}? Just say yes or no.',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'ask_NotUnderstood_S2_V5': {
        'template': [
          'Is your company {companyName}? Please, say yes or no.',
          'Is your company {companyName}? Just say yes or no.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'say_Basic_S1_C10': {
        'template': [
          'I am sorry, but I am expecting several visitors from {companyName} today.',
          'Sorry, but today I am expecting several visitors from {companyName}.',
        ],
        'slot': {
          'interlocutorCompany': 'companyName',
        },
      },
      'ask_Basic_S1_C10': {
        'template': [
          '(Could you )please tell me your full name?',
        ],
      },
      'say_Help_S2_C10': {
        'template': [
          'You can tell me something such as, I am Mister John Doe. So please...',
          'You could tell something like, I am Missis Janna Coleman. So please...',
        ],
      },
      'ask_Help_S2_C10': {
        'template': [
          'Could you (please )tell (me )your full name?',
          'Please, tell (me )what is your full name.',
        ],
      },
      'say_NoInput_S2_C10': {
        'template': [
          'Sorry I did not hear you. Just speak (to me )naturally(, in English of course).',
          'Unfortunately I could not hear you. Just speak (to me )naturally(, in English of course).',
        ],
      },
      'ask_NoInput_S2_C10': {
        'template': [
          'Could you tell (me )your full name, please?',
          'Could you please tell (me )your full name?',
        ],
      },
      'ask_NotUnderstood_S2_C10': {
        'template': [
          'Could you (please )repeat your full name?',
        ],
      },
      'say_Help_S3_C10': {
        'template': [
          'To make it easier, (just )let us use a keyboard.',
        ],
      },
      'ask_Help_S3_C10': {
        'template': [
          'Could you (please )type your fullname?',
        ],
      },
      'say_NoInput_S3_C10': {
        'template': [
          'Sorry I did not hear you. Let us try with the keyboard.',
        ],
      },
      'ask_NoInput_S3_C10': {
        'template': [
          'Could you (please )type your full name?',
        ],
      },
      'ask_NotUnderstood_S3_C10': {
        'template': [
          '(Could you )please type your full name?',
        ],
      },
      'ask_TooNoisy_S3_C8-2': {
        'template': [
          '(Could you )please type your company name?',
        ],
      },
      'ask_TooNoisy_S3_C8-1': {
        'template': [
          '(Could you )please type your full name?',
        ],
      },
      'ask_TooNoisy_S3_C10': {
        'template': [
          '(Could you )please type your full name?',
        ],
      },
      'ask_Help_S4_C10': {
        'template': [
          'Then type your full name and press enter on the keyboard or the okay button.',
        ],
      },
      'ask_NoInput_S4_C10': {
        'template': [
          '(Could you )please retype your full name?',
          '(Could you )please type your full name again?',
        ],
      },
      'say_NotUnderstood_S4_C10': {
        'template': [
          '(I am )sorry, I cannot find any visit for this name. ',
          '(I am )sorry, I do not find a visit for this name. ',
        ],
      },
      'say_HelloVisitorRecognized': {
        'template': [
          'Good {morning}, I <see>( that) you are {Dr} {visitorLastName}',
        ],
        'slot': {
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
          'phaseOfDay': 'morning',
        },
      },
      'ask_DebugModeOn': {
        'template': [
          'show debug window',
        ],
      },
      'ask_DebugModeOff': {
        'template': [
          'hide debug window',
        ],
      },
      'ask_VirtualTelephonyOff': {
        'template': [
          'virtual telephony of(f)',
        ],
      },
      'ask_VirtualTelephonyOn': {
        'template': [
          'virtual telephony on',
        ],
      },
      'say_MSTCanYouCome': {
        'template': [
          'Can you come at the lobby? A visitor is waiting and his contact( person), ',
        ],
      },
      'say_say_YourVisitor': {
        'template': [
          'your visitor',
        ],
      },
      'say_PhoneSalutation': {
        'template': [
          'Bye',
          'Good bye',
          'Have a nice day',
        ],
      },
      'say_PhoneItsMeisy': {
        'template': [
          '<Hello>, it\'s Meisy',
        ],
      },
      'say_VisitorName': {
        'template': [
          '{Dr} {visitorLastName}',
        ],
        'slot': {
          'interlocutorTitle': 'Dr',
          'interlocutorLastName': 'visitorLastName',
        },
      },
      'say_IsWaitingAtLobby': {
        'template': [
          'is waiting for you at the lobby.',
        ],
      },
      'say_MSTContactName': {
        'template': [
          '{Dr} {contactLastName}, ',
        ],
        'slot': {
          'contactTitle': 'Dr',
          'contactLastName': 'contactLastName',
        },
      },
      'say_MSTIsNotReachable': {
        'template': [
          'is not reachable. ',
        ],
      },
    },
    'internal': {
      'dump_Slots': {
        'template': [
          'dump_Slots',
        ],
      },
      'appendMironSlot': {
        'template': [
          'appendMironSlot',
        ],
      },
      'prependMironSlot': {
        'template': [
          'prependMironSlot',
        ],
      },
      'clearMironSlot': {
        'template': [
          'clearMironSlot',
        ],
      },
      'setMironSlot{type:speech,name:say_Hello}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Basic_S1_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_Basic_S1_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S2"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S2_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S3_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S3"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_NoInput_S4"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_NoInput_S4_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'dump_WM': {
        'template': [
          'dump_WM',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_VisitorNotFound"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_GoToWatchman"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Goodbye"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:5,id:"timeToSpeak"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:15,id:"visitorSpeaking"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:10,id:"timeToValidate"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:10,id:"userNotClicking"}': {
        'template': [
          '',
        ],
      },
      'log_VisitorAnsweringByVoice': {
        'template': [
          'Visitor answering by voice',
        ],
      },
      'log_VisitorIsSilentByVoice': {
        'template': [
          'Visitor is silent by voice',
        ],
      },
      'log_VisitorAnsweredByVoice': {
        'template': [
          'Visitor answered by voice',
        ],
      },
      'log_VisitorUnderstood': {
        'template': [
          'Visitor is understood',
        ],
      },
      'log_VisitorNotUnderstood': {
        'template': [
          'Visitor is not understood',
        ],
      },
      'recall_IdentityOfMyself': {
        'template': [
          'recall_IdentityOfMyself',
        ],
      },
      'log_EnvironmentIsTooNoisy': {
        'template': [
          'Environment is too noisy',
        ],
      },
      'log_VisitorAnsweredByKeyboard': {
        'template': [
          'Visitor answered by keyboard',
        ],
      },
      'log_VisitorIsSilentByKeyboard': {
        'template': [
          'Visitor is silent by keyboard',
        ],
      },
      'log_VisitorAnsweringByKeyboard': {
        'template': [
          'Visitor answering by keyboard',
        ],
      },
      'log_WaitForVisitorToAnswerByVoice': {
        'template': [
          'Wait for visitor to answer by voice',
        ],
      },
      'log_WaitForVisitorToAnswerByKeyboard': {
        'template': [
          'Wait for visitor to answer by keyboard',
        ],
      },
      'log_AnalyseVisitorAnswer': {
        'template': [
          'I analyse visitor answer',
        ],
      },
      'log_VisitorAskedToRepeat': {
        'template': [
          'visitor asked to repeat',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_ThanksForRegistering"}': {
        'template': [
          '',
        ],
      },
      'log_VisitorSaidSomethingBefore': {
        'template': [
          'Visitor said something before',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_NoInput_S2_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_NoInput_S2_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_Help_S2_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Help_S2_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_TooNoisy_S3"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_TooNoisy_S3_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_NoInput_S3_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_NoInput_S3_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S4_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S4"}': {
        'template': [
          '',
        ],
      },
      'log_VisitorPressedStart': {
        'template': [
          'Visitor pressed start registration',
        ],
      },
      'log_StartOfNewSession': {
        'template': [
          'Start of new session',
        ],
      },
      'log_UpdateDictionary': {
        'template': [
          'Update dictionary',
        ],
      },
      'recall_VisitorAndContact': {
        'template': [
          'recall_VisitorAndContact',
        ],
      },
      'log_MakeQuery': {
        'template': [
          'I make a LTM query',
        ],
      },
      'log_NoSlotChanged': {
        'template': [
          'No slot changed, I do not make any LTM  query',
        ],
      },
      'log_CheckWhatToDo': {
        'template': [
          'I check what to do',
        ],
      },
      'log_CaseC1V0': {
        'template': [
          'We are in case C1 V0',
        ],
      },
      'log_CheckIdentity': {
        'template': [
          'I have to check visitor fullname',
        ],
      },
      'log_InformContact': {
        'template': [
          'Visitor is registered, I have to inform his contact',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_CallingContact"}': {
        'template': [
          '',
        ],
      },
      'log_CallContact': {
        'template': [
          'I call {contactFirstName} {contactLastName} on phone number {n222}',
        ],
        'slot': {
          'contactTelephoneNumber': 'n222',
          'contactFirstName': 'contactFirstName',
          'contactLastName': 'contactLastName',
        },
      },
      'setMironSlot{mironType:"speech",mironName:"inform_ContactComing"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_ContactNotReached"}': {
        'template': [
          '',
        ],
      },
      'log_CallMST': {
        'template': [
          'I call MST on phone number {n222}',
        ],
        'slot': {
          'contactTelephoneNumber': 'n222',
        },
      },
      'setMironSlot{mironType:"speech",mironName:"inform_MSTComing"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_MSTNotReached"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_ToReadGDPR"}': {
        'template': [
          '',
        ],
      },
      'log_StoreConsentFlagAndFaceId': {
        'template': [
          'Store consent & FaceID {fid42} for visitor {visitorId} {visitorFirstName} {visitorLastName} ',
          'Store consent for visitor {visitorId} {visitorFirstName} {visitorLastName} ',
        ],
        'slot': {
          'interlocutorFaceId': 'fid42',
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorId': 'visitorId',
        },
      },
      'store_IdentityOfInterlocutor': {
        'template': [
          'store_IdentityOfInterlocutor',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Ok"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_TryAgainLater"}': {
        'template': [
          '',
        ],
      },
      'log_GDPRAgreed': {
        'template': [
          'Visitor gave his consent to GDPR',
        ],
      },
      'log_GDPRNotAgreed': {
        'template': [
          'Visitor denied to give his consent to GDPR',
        ],
      },
      'wait_Timeout{timeout:15,id:"timeToReadConsent"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"propose_ToPressConsent"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:60,id:"timeToGiveConsent"}': {
        'template': [
          '',
        ],
      },
      'log_GDPRNoReaction': {
        'template': [
          'Visitor did not click any GDPR buttons',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_Restarting"}': {
        'template': [
          '',
        ],
      },
      'log_DisplayGDPR': {
        'template': [
          'I display the GDPR screen',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_Help_S3_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Help_S3_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Help_S4"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"ask_Help_S4_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_CaseNotHandled"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentStep",value:"Step1"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentStep",value:"Step2"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentStep",value:"Step3"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentStep",value:"Step4"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentStep",value:"StepEnd"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC0': {
        'template': [
          'We are in case C0',
        ],
      },
      'set_Slot{slot:"currentCase",value:"C0"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentStep",value:"StepBegin"}': {
        'template': [
          '',
        ],
      },
      'log_CheckIfNoVisitToday': {
        'template': [
          'I check if there is no visit today',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_NoVisitToday"}': {
        'template': [
          '',
        ],
      },
      'log_WaitForVisitorToAnswerByButton': {
        'template': [
          'Wait for visitor to answer by buttons',
        ],
      },
      'log_VisitorIsSilentByButton': {
        'template': [
          'Visitor is silent by button',
        ],
      },
      'log_VisitorAnsweredByButton': {
        'template': [
          'Visitor answered by button',
        ],
      },
      'log_AtLeastOneSlotChangedByDB': {
        'template': [
          'At least one slot changed by DB',
        ],
      },
      'log_DisplayC1K0': {
        'template': [
          'We are in case C1 K0 : {contactList}',
        ],
        'slot': {
          'contactList': 'contactList',
        },
      },
      'set_Slot{slot:"currentCase",value:"K0"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentCase",value:"MakeCalls"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_NoOtherContact"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentCase",value:"V0"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC1Calls': {
        'template': [
          'We are in case C1 Calls',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_MyMistake"}': {
        'template': [
          '',
        ],
      },
      'get_PhaseOfDay': {
        'template': [
          'get_PhaseOfDay',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Hello"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_IAmMeisy"}': {
        'template': [
          '',
        ],
      },
      'log_IWasInterrupted': {
        'template': [
          'Visitor interrupt me',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_ThanksWithName"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC2V0': {
        'template': [
          'We are in case C2 V0',
        ],
      },
      'log_CaseC2Calls': {
        'template': [
          'We are in case C2 Calls',
        ],
      },
      'log_DisplayC2K0': {
        'template': [
          'We are in case C2 K0 : {contactList}',
        ],
        'slot': {
          'contactList': 'contactList',
        },
      },
      'log_CaseC2': {
        'template': [
          'We are in case C2',
        ],
      },
      'set_Slot{slot:"currentCase",value:"C2"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentCase",value:"C3"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC3': {
        'template': [
          'We are in case C3',
        ],
      },
      'log_DisplayC3K0': {
        'template': [
          'We are in case C3 K0 : {contactList}',
        ],
        'slot': {
          'contactList': 'contactList',
        },
      },
      'log_CaseC3Calls': {
        'template': [
          'We are in case C3 Calls',
        ],
      },
      'log_CaseC3V1': {
        'template': [
          'We are in case C3 V1',
        ],
      },
      'log_CheckIdentity1': {
        'template': [
          'I have to check visitor first name',
        ],
      },
      'set_Slot{slot:"currentCase",value:"V1"}': {
        'template': [
          '',
        ],
      },
      'log_AtLeastOneSlotChangedByVisitor': {
        'template': [
          'At least one slot changed by visitor',
        ],
      },
      'log_CaseC1V0OnlyFirstName': {
        'template': [
          'We are in case C1 V0 only first name',
        ],
      },
      'set_Slot{slot:"currentCase",value:"V2"}': {
        'template': [
          '',
        ],
      },
      'log_CheckIdentity2': {
        'template': [
          'I have to check visitor last name',
        ],
      },
      'log_CaseC5V2': {
        'template': [
          'We are in case C5 V2',
        ],
      },
      'log_CaseC5Calls': {
        'template': [
          'We are in case C5 Calls',
        ],
      },
      'log_DisplayC5K0': {
        'template': [
          'We are in case C5 K0 : {contactList}',
        ],
        'slot': {
          'contactList': 'contactList',
        },
      },
      'log_CaseC5': {
        'template': [
          'We are in case C5',
        ],
      },
      'set_Slot{slot:"currentCase",value:"C5"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC6': {
        'template': [
          'We are in case C6=C5',
        ],
      },
      'log_CaseC4': {
        'template': [
          'We are in case C4=C3',
        ],
      },
      'log_CaseC7V3': {
        'template': [
          'We are in case C7 V3',
        ],
      },
      'log_CheckIdentity3': {
        'template': [
          'I have to check visitor company',
        ],
      },
      'set_Slot{slot:"currentCase",value:"V3"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentCase",value:"V4"}': {
        'template': [
          '',
        ],
      },
      'log_CheckIdentity4': {
        'template': [
          'I have to check visitor fullname',
        ],
      },
      'log_CaseC7V4': {
        'template': [
          'We are in case C7 V4',
        ],
      },
      'log_CaseC7Calls': {
        'template': [
          'We are in case C7 Calls',
        ],
      },
      'set_Slot{slot:"currentCase",value:"C7"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC7': {
        'template': [
          'We are in case C7',
        ],
      },
      'log_CaseC1V4OnlyCompany': {
        'template': [
          'We are in case C1 V4 only company',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_Thanks"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC9': {
        'template': [
          'We are in case C9',
        ],
      },
      'log_CaseC8V5': {
        'template': [
          'We are in case C8 V5',
        ],
      },
      'log_CheckIdentity5': {
        'template': [
          'I have to check visitor company',
        ],
      },
      'set_Slot{slot:"currentCase",value:"V5"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC8-1': {
        'template': [
          'We are in case C8-1',
        ],
      },
      'set_Slot{slot:"currentCase",value:"C8-1"}': {
        'template': [
          '',
        ],
      },
      'set_Slot{slot:"currentCase",value:"C8-2"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC8-2': {
        'template': [
          'We are in case C8-2',
        ],
      },
      'log_IIgnoreInterruption': {
        'template': [
          'I ignore visitor\'s interruption',
        ],
      },
      'log_Stat_Start': {
        'template': [
          '%Start',
        ],
      },
      'wait_Timeout{timeout:45,id:"SecurityTimer"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"inform_CriticalError"}': {
        'template': [
          '',
        ],
      },
      'recall_IdentityOfFaceId{label:"interlocutor"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:3,id:"outOfCamera"}': {
        'template': [
          '',
        ],
        'data': {
          'recall_IdentityOfFaceId': 'interlocutorFaceId',
        },
      },
      'wait_Timeout{timeout:1,id:"outOfProximity"}': {
        'template': [
          '',
        ],
      },
      'log_PresenceDetected': {
        'template': [
          'I detect a presence',
        ],
      },
      'log_NoPresenceDetected': {
        'template': [
          'I detect no presence',
        ],
      },
      'log_VisitorLookingAtMe': {
        'template': [
          'Visitor is looking at me with faceId: {fid42}',
        ],
        'slot': {
          'interlocutorFaceId': 'fid42',
        },
      },
      'log_VisitorNotLookingAtMe': {
        'template': [
          'Visitor is looking away',
        ],
      },
      'log_VisitorVisuallyRecognized': {
        'template': [
          'Visitor ({Dr} ){visitorFirstName} {visitorLastName} is visually recognized',
        ],
        'slot': {
          'interlocutorFirstName': 'visitorFirstName',
          'interlocutorLastName': 'visitorLastName',
          'interlocutorTitle': 'Dr',
        },
      },
      'log_VisitorNotVisuallyRecognized': {
        'template': [
          'Visitor is not visually recognized',
        ],
      },
      'set_Slot{slot:"currentCase",value:"K1"}': {
        'template': [
          '',
        ],
      },
      'log_DisplayC10K1': {
        'template': [
          'We are in case C10 K1 : {contactList}',
        ],
        'slot': {
          'contactList': 'contactList',
        },
      },
      'set_Slot{slot:"currentCase",value:"C10"}': {
        'template': [
          '',
        ],
      },
      'log_CaseC10V4': {
        'template': [
          'We are in case C10 V4',
        ],
      },
      'log_CaseC10V5': {
        'template': [
          'We are in case C10 V5',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_HelloVisitorRecognized"}': {
        'template': [
          '',
        ],
      },
      'log_DebugVoiceCommand': {
        'template': [
          'You can say:\n-            "show/hide debug window"\n-            "virtual telephony on/off"',
        ],
      },
      'clear_AllRules': {
        'template': [
          'clear_AllRules',
        ],
      },
      'log_Stat_Visitor': {
        'template': [
          '%Visitor',
        ],
      },
      'log_Stat_RegisteredVisitor': {
        'template': [
          '%RegisteredVisitor',
        ],
      },
      'log_Stat_ContactCall': {
        'template': [
          '%ContactCall',
        ],
      },
      'log_Stat_SecretariatCall': {
        'template': [
          '%SecretariatCall',
        ],
      },
      'log_Stat_Email': {
        'template': [
          '%Email',
        ],
      },
      'log_Stat_NewVisitor': {
        'template': [
          '%NewVisitor',
        ],
      },
      'log_Stat_KnownVisitor': {
        'template': [
          '%KnownVisitor',
        ],
      },
      'log_Stat_DeniedConsent': {
        'template': [
          '%DeniedConsent',
        ],
      },
      'log_Stat_AcceptedConsent': {
        'template': [
          '%AcceptedConsent',
        ],
      },
      'log_Stat_NonRegisteredVisitor': {
        'template': [
          '%NonRegisteredVisitor',
        ],
      },
      'log_Stat_ClosedDialog': {
        'template': [
          '%ClosedDialog',
        ],
      },
      'log_Stat_NoReaction': {
        'template': [
          '%NoReaction',
        ],
      },
      'log_Stat_WentAway': {
        'template': [
          '%WentAway',
        ],
      },
      'log_Stat_NotUnderstood': {
        'template': [
          '%NotUnderstood',
        ],
      },
      'log_Stat_Silence': {
        'template': [
          '%Silence',
        ],
      },
      'wait_Timeout{timeout:10,id:"userNotTyping"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:60,id:"timeToType"}': {
        'template': [
          '',
        ],
      },
      'log_CaseMissingYesNoInVx': {
        'template': [
          'Visitor said something else than yes no in a verification',
        ],
      },
      'log_Stat_FullyUnderstood': {
        'template': [
          '%FullyUnderstood',
        ],
      },
      'log_CaseHelpInVx': {
        'template': [
          'Visitor said help in a verification',
        ],
      },
      'log_CaseHelp': {
        'template': [
          'Visitor ask for  help',
        ],
      },
      'recall_MSTInfo': {
        'template': [
          'recall_MSTInfo',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_MSTCanYouCome"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_YourVisitor"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_PhoneSalutation"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:2,id:"LetUserSpeak"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_PhoneItsMeisy"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:2,id:"LetUserHear"}': {
        'template': [
          '',
        ],
      },
      'wait_Timeout{timeout:30,id:"Calling"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_VisitorName"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_IsWaitingAtLobby"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_MSTContactName"}': {
        'template': [
          '',
        ],
      },
      'setMironSlot{mironType:"speech",mironName:"say_MSTIsNotReachable"}': {
        'template': [
          '',
        ],
      },
      'log_EndSession': {
        'template': [
          '@LOG_END',
        ],
      },
      'log_StartSession': {
        'template': [
          '@LOG_START',
        ],
      },
    },
    'internalEmotion': {
      'setLoopAnimationTo_Float': {
        'template': [
          'setLoopAnimationTo_Float',
        ],
        'data': {
          'emotion': 'F_Float_1',
        },
      },
      'animate_In_Done': {
        'template': [
          'animate_In_Done',
        ],
      },
      'animate_In': {
        'template': [
          'animate_In',
        ],
      },
      'animate_InLoop': {
        'template': [
          'animate_InLoop',
        ],
      },
      'animate_InLoop_Done': {
        'template': [
          'animate_InLoop_Done',
        ],
      },
      'setAnimationTo_Curiosity': {
        'template': [
          'setAnimationTo_Curiosity',
        ],
        'data': {
          'emotion': 'F_Curious_1',
        },
      },
      'setAnimationTo_Happiness': {
        'template': [
          'setAnimationTo_Happiness',
        ],
        'data': {
          'emotion': 'F_Happy_2',
        },
      },
      'setAnimationTo_Sadness': {
        'template': [
          'setAnimationTo_Sadness',
        ],
        'data': {
          'emotion': 'F_Sad_1',
        },
      },
      'setAnimationTo_Surprise': {
        'template': [
          'setAnimationTo_Surprise',
        ],
        'data': {
          'emotion': 'F_Surprised_1',
        },
      },
      'setAnimationTo_Boredom': {
        'template': [
          'setAnimationTo_Boredom',
        ],
        'data': {
          'emotion': 'F_Bored_1',
        },
      },
      'setAnimationTo_Excitement': {
        'template': [
          'setAnimationTo_Excitement',
        ],
        'data': {
          'emotion': 'F_Happy_1',
        },
      },
      'setAnimationTo_Anger': {
        'template': [
          'setAnimationTo_Anger',
        ],
        'data': {
          'emotion': 'F_Angry_1',
        },
      },
      'setAnimationTo_Confusion': {
        'template': [
          'setAnimationTo_Confusion',
        ],
        'data': {
          'emotion': 'F_Confused_1',
        },
      },
      'setAnimationTo_Fear': {
        'template': [
          'setAnimationTo_Fear',
        ],
        'data': {
          'emotion': 'F_Scared_1',
        },
      },
      'setAnimationTo_Reflexion': {
        'template': [
          'setAnimationTo_Reflexion',
        ],
        'data': {
          'emotion': 'F_Thinking_1',
        },
      },
      'setLoopAnimationTo_Sleeping': {
        'template': [
          'setLoopAnimationTo_Sleeping',
        ],
        'data': {
          'emotion': 'F_Sleeping_1',
        },
      },
      'setAnimationTo_WakeUp': {
        'template': [
          'setAnimationTo_WakeUp',
        ],
        'data': {
          'emotion': 'F_WakingUp_1',
        },
      },
      'setAnimationTo_GoToSleep': {
        'template': [
          'setAnimationTo_GoToSleep',
        ],
        'data': {
          'emotion': 'F_GoToSleep_1',
        },
      },
      'animate_Out': {
        'template': [
          'animate_Out',
        ],
      },
      'animate_Out_Done': {
        'template': [
          'animate_Out_Done',
        ],
      },
    },
    'internalGaze': {
      'lookAt_Something_Done': {
        'template': [
          'lookAt_Something_Done',
        ],
      },
      'lookAt_Something': {
        'template': [
          'lookAt_Something',
        ],
      },
      'setGazeTo_Front': {
        'template': [
          'setGazeTo_Front',
        ],
        'data': {
          'gazePlaceCell': 'frontFromCenter',
        },
      },
      'setGazeTo_Left': {
        'template': [
          'setGazeTo_Left',
        ],
        'data': {
          'gazePlaceCell': 'screenLeft',
        },
      },
      'setGazeTo_Right': {
        'template': [
          'setGazeTo_Right',
        ],
        'data': {
          'gazePlaceCell': 'screenRight',
        },
      },
    },
    'gaze': {
      'look': {
        'template': [
          'Look at {myGazePlace}',
        ],
        'slot': {
          'gazePlaceCell': 'myGazePlace',
        },
      },
    },
    'body': {
      'move': {
        'template': [
          'Move to {myPlace}',
        ],
        'slot': {
          'placeCell': 'myPlace',
        },
      },
    },
    'internalBody': {
      'move_Somewhere': {
        'template': [
          'move_Somewhere',
        ],
      },
      'move_Somewhere_Done': {
        'template': [
          'move_Somewhere_Done',
        ],
      },
      'setMotionTo_Back': {
        'template': [
          'setMotionTo_Back',
        ],
        'data': {
          'placeCell': 'back',
        },
      },
      'setMotionTo_Front': {
        'template': [
          'setMotionTo_Front',
        ],
        'data': {
          'placeCell': 'front',
        },
      },
    },
    'emotion': {
      'express_In': {
        'template': [
          'Express {myEmotion}',
        ],
        'slot': {
          'emotion': 'myEmotion',
        },
      },
      'express_InLoop': {
        'template': [
          'Express {myEmotion}',
        ],
        'slot': {
          'emotion': 'myEmotion',
        },
      },
      'express_Out': {
        'template': [
          'Express {myEmotion}',
        ],
        'slot': {
          'emotion': 'myEmotion',
        },
      },
    },
    'internalSignal': {
      'speech_Known': {
        'template': [
          'speech_Known',
        ],
      },
      'speech_Unknown': {
        'template': [
          'speech_Unknown',
        ],
      },
    },
    'leftHand': {
      'pause_Engine': {
        'template': [
          'pause_Engine',
        ],
      },
    },
    'vision': {
      'noface_Detected': {
        'template': [
          'No face detected',
        ],
      },
      'face_Detected': {
        'template': [
          'Visitor face {fid42} detected',
        ],
        'slot': {
          'interlocutorFaceId': 'fid42',
        },
      },
      'nobody_Detected': {
        'template': [
          'Nobody detected',
        ],
      },
      'somebody_Detected': {
        'template': [
          'Somebody detected',
        ],
      },
    },
  });
}
