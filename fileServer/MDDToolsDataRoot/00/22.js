//=============================
// GetRuleList
//
// THIS CODE IS GENERATED FROM:
// ./Basic Dialog.json
// PLEASE DO NOT EDIT BY HAND
// VERSION: 2.0
// GENERATED: 07-09-2021
//=============================

function getRuleList_Receptionist() {
    return [
      //////////////////////
      // Define Rules
      //////////////////////
      { // RULE 31 (31): Say Meisy's name
        name:  'rule31',
        index: 31,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule34',                type: 'rule',      weight: 0.5 },   // is previous rule active?: rule34 
                    { src: 'intention',    mironName: 'update_NameDictionary', type: 'rightHand', weight: 0.5 } ], // is outer miron recognized?: update_NameDictionary
                ],
        fanOut: [ { dest: 'goal', mironName: 'say_MyName',      type: 'speech',    weight: 1 },   // do outer miron!: say_MyName 
                  { dest: 'goal', mironName: 'drop_Phone',      type: 'rightHand', weight: 1 },   // do outer miron!: drop_Phone 
                  { dest: 'goal', mironName: 'open_Microphone', type: 'rightHand', weight: 1 } ], // do outer miron!: open_Microphone
      },
      { // RULE 32 (32): Say how are you
        name:  'rule32',
        index: 32,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Hello', type: 'speech', weight: 0.5 },   // is outer miron recognized?: say_Hello 
                    { src: 'previousRule', mironName: 'rule57',    type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule57
                ],
        fanOut: [ { dest: 'goal',       mironName: 'ask_HowAreYou', type: 'speech', weight: 1 },   // do outer miron!: ask_HowAreYou 
                  { dest: 'activateWM', mironName: 'testWM',        type: 'wm',     weight: 1 } ], // activate wm!: testWM
      },
      { // RULE 34 (34): Update dictionary & start ASR
        name:  'rule34',
        index: 34,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule36', type: 'rule', weight: 1 } ], // is previous rule active?: rule36 
                ],
        fanOut: [ { dest: 'goal', mironName: 'update_NameDictionary', type: 'rightHand', weight: 1 },   // do outer miron!: update_NameDictionary 
                  { dest: 'goal', mironName: 'get_PhaseOfDay',        type: 'internal',  weight: 1 } ], // do inner miron!: get_PhaseOfDay
      },
      { // RULE 36 (36): Allow all actions to be effective
        name:  'rule36',
        index: 36,
        fanIn:  [
                  [ { src: 'intention', mironName: 'beAlive', type: 'signal', weight: 1 } ], // is outer miron recognized?: beAlive 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'perform_Speech',         type: 'canDo', weight: 1 },   // activate wm!: perform_Speech 
                  { dest: 'activateWM', mironName: 'perform_RightHand',      type: 'canDo', weight: 1 },   // activate wm!: perform_RightHand 
                  { dest: 'activateWM', mironName: 'perform_LeftHand',       type: 'canDo', weight: 1 },   // activate wm!: perform_LeftHand 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalSpeech', type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalSpeech 
                  { dest: 'activateWM', mironName: 'perform_Internal',       type: 'canDo', weight: 1 } ], // activate wm!: perform_Internal
      },
      { // RULE 57 (57): Wait for response
        name:  'rule57',
        index: 57,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'say_MyName', type: 'speech', weight: 0.5 },   // is outer miron done?: say_MyName 
                    { src: 'previousRule', mironName: 'rule31',     type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule31
                ],
        fanOut: [],   
      },
    ];
  } 