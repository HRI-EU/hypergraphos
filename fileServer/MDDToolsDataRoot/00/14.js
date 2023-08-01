//=============================
// GetFieldList
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
// Define Speech Field
//////////////////////
function getFieldList() {

  return(
  {
    //[# Loop Begin Fields #]
    //[# Define Field Name #][LinePattern]
    //:'%b': {
    'Bond': {
      'field': [
        //[# Define Field Value #][LinePattern]
        //:'%b',
        '<contactLastName>',
      ],
    },
    //[# Loop End Fields #]
    //[# Begin Skip #]
    'Dr': {
      'field': [
        'Dr',
        'doctor',
        'Prof',
        'professor',
        'professor doctor',
        'Prof Dr',
        '<mister>',
        '<miss>',
      ],
    },
    //[# End Skip #]
  });
}

//////////////////////
// Define Speech Miron
//////////////////////
function getMironList() {

  return(
  {
    //[# Loop Begin Modalities #]
    //[# Define Modality Name #][LinePattern]
    //:'%b': {
    'internalSpeech': {
      //[# Loop Begin Mirons #]
      //[# Define Miron Name #][LinePattern]
      //:'%b': {
      'clean_Hint': {
        'template': [
          //[# Loop Begin Miron Templates #]
          //[# Define Miron Template Name #][LinePattern]
          //:'%b',
          'clean_Hint',
          //[# Loop End Miron Templates #]
        ],
        //[# Loop Begin Data Slots #]
        'data': {
          //[# Define Slot Pairs #][LinePattern]
          //:'%b': '%b',
          'hintToShow': '',
        },
        //[# Loop End Data Slots #]
        //[# Loop Begin Slots #]
        'slot': {
          //[# Define Slot Pairs #][LinePattern]
          //:'%b': '%b',
          'contactTitle': 'Dr',
          //[# Begin Skip #]
          'contactFirstName': 'James',
          'contactLastName': 'Bond',
          //[# End Skip #]
        },
        //[# Loop End Slots #]
      },
      //[# Loop End Mirons #]
      //[# Begin Skip #]
      'clean_IdentityFromVision': {
        'template': [
          'clean_IdentityFromVision',
        ],
        'data': {
          'interlocutorFaceId': '',
          'interlocutorGender': '',
          'interlocutorTitle': '',
          'interlocutorFirstName': '',
          'interlocutorLastName': '',
        },
      },
      'clean_InterlocutorConsentFlag': {
        'template': [
          'clean_InterlocutorConsentFlag',
        ],
        'data': {
          'interlocutorConsentFlag': '',
        },
      },
      //[# End Skip #]
    },
    //[# Loop End Modalities #]
    //[# Begin Skip #]
    'speech': {
      'express_ContactPerson': {
        'template': [
          '(My <contact person> is )({Dr} )({James} ){Bond}',
          '(My <contact person> is ){James}',
        ],
        'data': {
          'interlocutorConsentFlag': '',
        },
      },
      'express_IAmComing': {
        'template': [
          '<I am> coming',
        ],
      },
      'express_IForgotMyContact': {
        'template': [
          '(I )<do not> remember ((who is )my <contact person>)',
          '(I )forgot( my <contact person>)',
          '(I )<do not> know( my <contact person>)',
        ],
      },
    },
    //[# End Skip #]
  });
}
