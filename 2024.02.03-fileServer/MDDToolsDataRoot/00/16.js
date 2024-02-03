//=============================
// GetMapList
//
// THIS CODE IS GENERATED FROM:
//[# Define FileName #]
//:// %b
// ../../../apps/AppReceptionist/2.0/doc/graph/AvatarReceptionist.graphml
// PLEASE DO NOT EDIT BY HAND
//[# Begin Header Info #]
//:// VERSION: %b
//:// GENERATED: %b
// VERSION:   1.0
// GENERATED: 2021-05-28
//[# End Header Info #]
//=============================


//////////////////////
// Define Map List
//////////////////////
//[# Define Avatar #][LinePattern]
//:function getMapList_%b() {
function getMapList_Human() {

  return({
    //[# Loop Begin Modalities #]
    //[# Begin Load Miron Name #]
    //[# End Load Miron Name #]
    //[# Define Modality Name #][LinePattern]
    //:'%b': {
    'signal': {
      'byIndex': {
        //[# Define Miron ByIndex #][LinePattern]
        //:%b: '%b',
        1: 'gdpr_Agreed',
        //[# Begin Skip #]
        2: 'gdpr_NotAgreed',
        3: 'gdpr_Start',
        4: 'keyboardType_End',
        5: 'nobody_Detected',
        6: 'restart_Application',
        7: 'somebody_Detected',
        8: 'speech_End',
        9: 'speech_Start',
        10: 'vision_FaceDetected',
        11: 'vision_NoFaceDetected',
        //[# End Skip #]
       },
      'byName': {
        //[# Define Miron ByName #][LinePattern]
        //:'%b': %b,
        'gdpr_Agreed': 1,
        //[# Begin Skip #]
        'gdpr_NotAgreed': 2,
        'gdpr_Start': 3,
        'keyboardType_End': 4,
        'nobody_Detected': 5,
        'restart_Application': 6,
        'somebody_Detected': 7,
        'speech_End': 8,
        'speech_Start': 9,
        'vision_FaceDetected': 10,
        'vision_NoFaceDetected': 11,
        //[# End Skip #]
      },
      //[# Begin Modality Info #][LinePattern]
      //:'length': %b,
      //:'isPublic': %b,
      'length': 11,
      'isPublic': true,
      //[# End Modality Info #]
    },
    //[# Loop End Modalities #]
    //[# Begin Load CanDo #]
    //[# End Load CanDo #]
    'canDo': {
      'byIndex': {
        //[# Define CanDo ByIndex #][LinePattern]
        //:%b: '%b',
        1: 'perform_Body',
        //[# Begin Skip #]
        2: 'perform_Emotion',
        3: 'perform_EyeLid',
        4: 'perform_Gaze',
        5: 'perform_Internal',
        6: 'perform_InternalSpeech',
        7: 'perform_LeftHand',
        8: 'perform_RightHand',
        9: 'perform_Signal',
        10: 'perform_Speech',
        11: 'perform_Vision',
        //[# End Skip #]
       },
      'byName': {
        //[# Define CanDo ByName #][LinePattern]
        //:'%b': %b,
        'perform_Body': 1,
        //[# Begin Skip #]
        'perform_Emotion': 2,
        'perform_EyeLid': 3,
        'perform_Gaze': 4,
        'perform_Internal': 5,
        'perform_InternalSpeech': 6,
        'perform_LeftHand': 7,
        'perform_RightHand': 8,
        'perform_Signal': 9,
        'perform_Speech': 10,
        'perform_Vision': 11,
        //[# End Skip #]
       },
      //[# Define CanDo Info #][LinePattern]
      //:'length': %b,
      'length': 11,
      'isPublic': false,
    },
    //[# Begin Skip #]
    'wm': {
      'byIndex': {
        1: 'isAlive',
        2: 'isDummy',
        3: 'isInterlocutorSpeaking',
        4: 'isMyselfSpeaking',
        5: 'isTestCase1',
       },
      'byName': {
        'isAlive': 1,
        'isDummy': 2,
        'isInterlocutorSpeaking': 3,
        'isMyselfSpeaking': 4,
        'isTestCase1': 5,
       },
      'length': 5,
      'isPublic': false,
    },
    //[# End Skip #]
    //[# Begin Load Slot #]
    //[# End Load Slot #]
    'slot': {
      'byIndex': {
        //[# Define Slot ByIndex #][LinePattern]
        //:%b: '%b',
        1: 'contactFirstName',
        //[# Begin Skip #]
        2: 'contactLastName',
        3: 'contactTitle',
        4: 'interlocutorCompany',
        5: 'interlocutorFaceId',
        6: 'myFirstName',
        7: 'myLastName',
        8: 'myTitle',
        9: 'selectedTestCase',
        10: 'testCaseToRun',
        //[# End Skip #]
       },
      'byName': {
        //[# Define Slot ByName #][LinePattern]
        //:'%b': %b,
        'contactFirstName': 1,
        //[# Begin Skip #]
        'contactLastName': 2,
        'contactTitle': 3,
        'interlocutorCompany': 4,
        'interlocutorFaceId': 5,
        'myFirstName': 6,
        'myLastName': 7,
        'myTitle': 8,
        'selectedTestCase': 9,
        'testCaseToRun': 10,
        //[# End Skip #]
      },
      //[# Define Slot Info #][LinePattern]
      //:'length': %b,
      'length': 10,
      'isPublic': false,
    },
    //[# Begin Load DataSlot #]
    //[# End Load DataSlot #]
    'data': {
      'byIndex': {
        //[# Define DataSlot ByIndex #][LinePattern]
        //:%b: '%b',
        1: 'affirmation',
        //[# Begin Skip #]
        2: 'contactFirstName',
        3: 'contactLastName',
        4: 'contactTitle',
        5: 'interlocutorCompany',
        6: 'interlocutorFaceId',
        7: 'myFirstName',
        8: 'myLastName',
        9: 'myTitle',
        10: 'recall_IdentityOfMyself',
        11: 'refutation',
        12: 'selectedTestCase',
        13: 'testCaseToRun',
        //[# End Skip #]
       },
      'byName': {
        //[# Define DataSlot ByName #][LinePattern]
        //:'%b': %b,
        'affirmation': 1,
        //[# Begin Skip #]
        'contactFirstName': 2,
        'contactLastName': 3,
        'contactTitle': 4,
        'interlocutorCompany': 5,
        'interlocutorFaceId': 6,
        'myFirstName': 7,
        'myLastName': 8,
        'myTitle': 9,
        'recall_IdentityOfMyself': 10,
        'refutation': 11,
        'selectedTestCase': 12,
        'testCaseToRun': 13,
        //[# End Skip #]
      },
      //[# Define DataSlot Info #][LinePattern]
      //:'length': %b,
      'length': 13,
      'isPublic': false,
    },
    //[# Begin Load Rule #]
    //[# End Load Rule #]
    'rule': {
      'byIndex': {
        //[# Define Rule ByIndex #][LinePattern]
        //:%b: '%b',
        30: 'rule30',
        //[# Begin Skip #]
        32: 'rule32',
        31: 'rule31',
        33: 'rule33',
        401: 'rule401',
        402: 'rule402',
        10: 'rule10',
        20: 'rule20',
        403: 'rule403',
        40: 'rule40',
        //[# End Skip #]
       },
      'byName': {
        //[# Define Rule ByName #][LinePattern]
        //:'%b': %b,
        'rule30': 30,
        //[# Begin Skip #]
        'rule32': 32,
        'rule31': 31,
        'rule33': 33,
        'rule401': 401,
        'rule402': 402,
        'rule10': 10,
        'rule20': 20,
        'rule403': 403,
        'rule40': 40,
        //[# End Skip #]
      },
      //[# Define Rule Info #][LinePattern]
      //:'length': %b,
      'length': 403,
      'isPublic': false,
    },
  });
}
