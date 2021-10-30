//=============================
// GetRuleList
//
// THIS CODE IS GENERATED FROM:
// ./Avatar Receptionist.json
// PLEASE DO NOT EDIT BY HAND
// VERSION: 2.1
// GENERATED: 07-09-2021
//=============================

function getRuleList_Receptionist() {
    return [
      //////////////////////
      // Define Rules
      //////////////////////
      { // RULE 73 (73): Update dictionary & start ASR
        name:  'rule73',
        index: 73,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'display_SystemUpdate', type: 'rightHand', weight: 0.5 },   // is outer miron done?: display_SystemUpdate 
                    { src: 'previousRule', mironName: 'rule183',              type: 'rule',      weight: 0.5 } ], // is previous rule active?: rule183
                ],
        fanOut: [ { dest: 'goal',      mironName: 'update_NameDictionary', type: 'rightHand',      weight: 1 },   // do outer miron!: update_NameDictionary 
                  { dest: 'inhibitWM', mironName: 'isDBChanged',           type: 'wm',             weight: 1 },   // inhibit wm!: isDBChanged 
                  { dest: 'goal',      mironName: 'log_UpdateDictionary',  type: 'internal',       weight: 1 },   // do inner miron!: log_UpdateDictionary 
                  { dest: 'goal',      mironName: 'request_CheckDBEmpty',  type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_CheckDBEmpty
      },
      { // RULE 74 (74): Allow all actions to be effective
        name:  'rule74',
        index: 74,
        fanIn:  [
                  [ { src: 'intention', mironName: 'be_Alive', type: 'signal', weight: 1 } ], // is outer miron recognized?: be_Alive 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'perform_Speech',            type: 'canDo', weight: 1 },   // activate wm!: perform_Speech 
                  { dest: 'activateWM', mironName: 'perform_RightHand',         type: 'canDo', weight: 1 },   // activate wm!: perform_RightHand 
                  { dest: 'activateWM', mironName: 'perform_LeftHand',          type: 'canDo', weight: 1 },   // activate wm!: perform_LeftHand 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalSpeech',    type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalSpeech 
                  { dest: 'activateWM', mironName: 'perform_Gaze',              type: 'canDo', weight: 1 },   // activate wm!: perform_Gaze 
                  { dest: 'activateWM', mironName: 'perform_Internal',          type: 'canDo', weight: 1 },   // activate wm!: perform_Internal 
                  { dest: 'activateWM', mironName: 'perform_Emotion',           type: 'canDo', weight: 1 },   // activate wm!: perform_Emotion 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalEmotion',   type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalEmotion 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalGaze',      type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalGaze 
                  { dest: 'activateWM', mironName: 'perform_Body',              type: 'canDo', weight: 1 },   // activate wm!: perform_Body 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalBody',      type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalBody 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalLeftHand',  type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalLeftHand 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalRightHand', type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalRightHand 
                  { dest: 'activateWM', mironName: 'perform_Vision',            type: 'canDo', weight: 1 },   // activate wm!: perform_Vision 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalVision',    type: 'canDo', weight: 1 },   // inhibit wm!: perform_InternalVision 
                  { dest: 'activateWM', mironName: 'perform_Signal',            type: 'canDo', weight: 1 },   // activate wm!: perform_Signal 
                  { dest: 'inhibitWM',  mironName: 'perform_InternalSignal',    type: 'canDo', weight: 1 } ], // inhibit wm!: perform_InternalSignal
      },
      { // RULE 90 (90): Init Session
        name:  'rule90',
        index: 90,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'close_Camera',                    type: 'rightHand',      weight: 1 },   // do outer miron!: close_Camera 
                  { dest: 'resetWM',    mironName: 'isLastSpeechKnown',               type: 'wm',             weight: 1 },   // reset wm!: isLastSpeechKnown 
                  { dest: 'inhibitWM',  mironName: 'isVisitorSpeaking',               type: 'wm',             weight: 1 },   // inhibit wm!: isVisitorSpeaking 
                  { dest: 'goal',       mironName: 'close_Microphone',                type: 'rightHand',      weight: 1 },   // do outer miron!: close_Microphone 
                  { dest: 'inhibitWM',  mironName: 'isVisitorTyping',                 type: 'wm',             weight: 1 },   // inhibit wm!: isVisitorTyping 
                  { dest: 'resetWM',    mironName: 'isDialogCompleted',               type: 'wm',             weight: 1 },   // reset wm!: isDialogCompleted 
                  { dest: 'inhibitWM',  mironName: 'isTooNoisy',                      type: 'wm',             weight: 1 },   // inhibit wm!: isTooNoisy 
                  { dest: 'resetWM',    mironName: 'isNoInput',                       type: 'wm',             weight: 1 },   // reset wm!: isNoInput 
                  { dest: 'goal',       mironName: 'log_StartOfNewSession',           type: 'internal',       weight: 1 },   // do inner miron!: log_StartOfNewSession 
                  { dest: 'goal',       mironName: 'clean_VisitSlots',                type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_VisitSlots 
                  { dest: 'inhibitWM',  mironName: 'isMakingQuery',                   type: 'wm',             weight: 1 },   // inhibit wm!: isMakingQuery 
                  { dest: 'resetWM',    mironName: 'isCallSuccessful',                type: 'wm',             weight: 1 },   // reset wm!: isCallSuccessful 
                  { dest: 'goal',       mironName: 'clean_ConsentFlag',               type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_ConsentFlag 
                  { dest: 'goal',       mironName: 'clean_FaceId',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_FaceId 
                  { dest: 'goal',       mironName: 'clean_VisitorRegistered',         type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_VisitorRegistered 
                  { dest: 'goal',       mironName: 'clean_LTMFlags',                  type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_LTMFlags 
                  { dest: 'goal',       mironName: 'clean_CurrentCase',               type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_CurrentCase 
                  { dest: 'goal',       mironName: 'clean_CurrentStep',               type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_CurrentStep 
                  { dest: 'inhibitWM',  mironName: 'isV2',                            type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                     type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM',  mironName: 'isHelpAsked',                     type: 'wm',             weight: 1 },   // inhibit wm!: isHelpAsked 
                  { dest: 'inhibitWM',  mironName: 'isRepeatAsked',                   type: 'wm',             weight: 1 },   // inhibit wm!: isRepeatAsked 
                  { dest: 'inhibitWM',  mironName: 'isInterruptable',                 type: 'wm',             weight: 1 },   // inhibit wm!: isInterruptable 
                  { dest: 'inhibitWM',  mironName: 'isInterrupted',                   type: 'wm',             weight: 1 },   // inhibit wm!: isInterrupted 
                  { dest: 'inhibitWM',  mironName: 'isInterruptionEnabled',           type: 'wm',             weight: 1 },   // inhibit wm!: isInterruptionEnabled 
                  { dest: 'inhibitWM',  mironName: 'isYesNoEnabled',                  type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                            type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV0',                            type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',             weight: 1 },   // inhibit wm!: isFirstNameOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'isV3',                            type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                            type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',             weight: 1 },   // inhibit wm!: isCompanyOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'hasVisitorChangedAtLeastOneSlot', type: 'wm',             weight: 1 },   // inhibit wm!: hasVisitorChangedAtLeastOneSlot 
                  { dest: 'inhibitWM',  mironName: 'isBasicQuestion',                 type: 'wm',             weight: 1 },   // inhibit wm!: isBasicQuestion 
                  { dest: 'activateWM', mironName: 'isVeryFirstQuestion',             type: 'wm',             weight: 1 },   // activate wm!: isVeryFirstQuestion 
                  { dest: 'inhibitWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',             weight: 1 } ], // inhibit wm!: isContactLastNameOnlyRecognized
      },
      { // RULE 96 (96): System needs update from DB
        name:  'rule96',
        index: 96,
        fanIn:  [
                  [ { src: 'intention', mironName: 'dictionary_NeedsUpdate', type: 'signal', weight: 1 } ], // is outer miron recognized?: dictionary_NeedsUpdate 
                  [ { src: 'actionDone',   mironName: 'display_SystemUpdate', type: 'rightHand', weight: -0.5 },   // is outer miron done?: display_SystemUpdate 
                    { src: 'previousRule', mironName: 'rule183',              type: 'rule',      weight: -0.5 } ], // is previous rule active?: rule183
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isDBChanged', type: 'wm', weight: 1 } ], // activate wm!: isDBChanged 
      },
      { // RULE 183 (183): Display message that system is updating
        name:  'rule183',
        index: 183,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isDBChanged', type: 'wm',   weight: 0.5 },   // is wm activated?: isDBChanged 
                    { src: 'previousRule', mironName: 'rule352',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule352
                  [ { src: 'activatedWM',  mironName: 'isDBChanged', type: 'wm',   weight: 0.5 },   // is wm activated?: isDBChanged 
                    { src: 'previousRule', mironName: 'rule196',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule196
                ],
        fanOut: [ { dest: 'goal', mironName: 'display_SystemUpdate', type: 'rightHand', weight: 1 } ], // do outer miron!: display_SystemUpdate 
      },
      { // RULE 192 (192): Display disclaimer splash & close microphone
        name:  'rule192',
        index: 192,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'update_NameDictionary', type: 'rightHand', weight: 0.5 },   // is outer miron done?: update_NameDictionary 
                    { src: 'previousRule', mironName: 'rule73',                type: 'rule',      weight: 0.5 } ], // is previous rule active?: rule73
                  [ { src: 'inhibitedWM',  mironName: 'isDBChanged', type: 'wm',   weight: 0.5 },   // is wm inhibited?: isDBChanged 
                    { src: 'previousRule', mironName: 'rule352',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule352
                ],
        fanOut: [ { dest: 'goal', mironName: 'display_Disclaimer', type: 'rightHand', weight: 1 },   // do outer miron!: display_Disclaimer 
                  { dest: 'goal', mironName: 'close_Microphone',   type: 'rightHand', weight: 1 } ], // do outer miron!: close_Microphone
      },
      { // RULE 196 (196): Wait for start button
        name:  'rule196',
        index: 196,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'display_Disclaimer', type: 'rightHand', weight: 0.5 },   // is outer miron done?: display_Disclaimer 
                    { src: 'previousRule', mironName: 'rule192',            type: 'rule',      weight: 0.5 } ], // is previous rule active?: rule192
                ],
        fanOut: [],   
      },
      { // RULE 143 (143): Dump slots
        name:  'rule143',
        index: 143,
        fanIn:  [
                  [ { src: 'intention', mironName: 'wait_ForVoiceAnswer', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: wait_ForVoiceAnswer 
                  [ { src: 'intention', mironName: 'wait_ForKeyboardAnswer', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: wait_ForKeyboardAnswer 
                  [ { src: 'intention', mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_NextQuestion 
                  [ { src: 'intention', mironName: 'say_startRegistration', type: 'speech', weight: 1 } ], // is outer miron recognized?: say_startRegistration 
                  [ { src: 'intention', mironName: 'request_ToAnalyseDB', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToAnalyseDB 
                  [ { src: 'intention', mironName: 'request_ToDumpState', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToDumpState 
                  [ { src: 'intention', mironName: 'request_ToCheckAnswer', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToCheckAnswer 
                  [ { src: 'intention', mironName: 'request_ToStoreInterlocutorConsent', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToStoreInterlocutorConsent 
                  [ { src: 'intention', mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_EndDialog 
                  [ { src: 'intention', mironName: 'request_ToCheckAnswer', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToCheckAnswer 
                  [ { src: 'intention', mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToAnalyseSituation 
                  [ { src: 'actionDone', mironName: 'call_PhoneNumber', type: 'rightHand', weight: 1 } ], // is outer miron done?: call_PhoneNumber 
                ],
        fanOut: [ { dest: 'goal', mironName: 'dump_Slots', type: 'internal', weight: 1 },   // do inner miron!: dump_Slots 
                  { dest: 'goal', mironName: 'dump_WM',    type: 'internal', weight: 1 } ], // do inner miron!: dump_WM
      },
      { // RULE 165 (165): Say something
        name:  'rule165',
        index: 165,
        fanIn:  [
                  [ { src: 'intention', mironName: 'say_Something', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: say_Something 
                ],
        fanOut: [ { dest: 'goal', mironName: 'generateMironSlot_Text', type: 'speech', weight: 1 } ], // do outer miron!: generateMironSlot_Text 
      },
      { // RULE 112 (112): End of say something
        name:  'rule112',
        index: 112,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule165',                type: 'rule',   weight: 0.5 },   // is previous rule active?: rule165 
                    { src: 'actionDone',   mironName: 'generateMironSlot_Text', type: 'speech', weight: 0.5 } ], // is outer miron done?: generateMironSlot_Text
                ],
        fanOut: [ { dest: 'goal', mironName: 'say_Something_Done', type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something_Done 
      },
      { // RULE 141 (141): End of look at something
        name:  'rule141',
        index: 141,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'look',    type: 'gaze', weight: 0.5 },   // is outer miron done?: look 
                    { src: 'previousRule', mironName: 'rule148', type: 'rule', weight: 0.5 } ], // is previous rule active?: rule148
                ],
        fanOut: [ { dest: 'goal', mironName: 'lookAt_Something_Done', type: 'internalGaze', weight: 1 } ], // do inner miron!: lookAt_Something_Done 
      },
      { // RULE 148 (148): Look at something
        name:  'rule148',
        index: 148,
        fanIn:  [
                  [ { src: 'intention', mironName: 'lookAt_Something', type: 'internalGaze', weight: 1 } ], // is inner miron recognized?: lookAt_Something 
                ],
        fanOut: [ { dest: 'goal', mironName: 'look', type: 'gaze', weight: 1 } ], // do outer miron!: look 
      },
      { // RULE 172 (172): Move somewhere
        name:  'rule172',
        index: 172,
        fanIn:  [
                  [ { src: 'intention', mironName: 'move_Somewhere', type: 'internalBody', weight: 1 } ], // is inner miron recognized?: move_Somewhere 
                ],
        fanOut: [ { dest: 'goal', mironName: 'move', type: 'body', weight: 1 } ], // do outer miron!: move 
      },
      { // RULE 179 (179): End of move somewhere
        name:  'rule179',
        index: 179,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule172', type: 'rule', weight: 0.5 },   // is previous rule active?: rule172 
                    { src: 'actionDone',   mironName: 'move',    type: 'body', weight: 0.5 } ], // is outer miron done?: move
                ],
        fanOut: [ { dest: 'goal', mironName: 'move_Somewhere_Done', type: 'internalBody', weight: 1 } ], // do inner miron!: move_Somewhere_Done 
      },
      { // RULE 202 (202): End of start animation
        name:  'rule202',
        index: 202,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'express_In', type: 'emotion', weight: 0.5 },   // is outer miron done?: express_In 
                    { src: 'previousRule', mironName: 'rule205',    type: 'rule',    weight: 0.5 } ], // is previous rule active?: rule205
                ],
        fanOut: [ { dest: 'goal', mironName: 'animate_In_Done', type: 'internalEmotion', weight: 1 } ], // do inner miron!: animate_In_Done 
      },
      { // RULE 205 (205): Start Animation
        name:  'rule205',
        index: 205,
        fanIn:  [
                  [ { src: 'intention', mironName: 'animate_In', type: 'internalEmotion', weight: 1 } ], // is inner miron recognized?: animate_In 
                ],
        fanOut: [ { dest: 'goal', mironName: 'express_In', type: 'emotion', weight: 1 } ], // do outer miron!: express_In 
      },
      { // RULE 226 (226): Animate in loop
        name:  'rule226',
        index: 226,
        fanIn:  [
                  [ { src: 'intention', mironName: 'animate_InLoop', type: 'internalEmotion', weight: 1 } ], // is inner miron recognized?: animate_InLoop 
                ],
        fanOut: [ { dest: 'goal', mironName: 'express_InLoop', type: 'emotion', weight: 1 } ], // do outer miron!: express_InLoop 
      },
      { // RULE 229 (229): End of animate in loop
        name:  'rule229',
        index: 229,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule226',        type: 'rule',    weight: 0.5 },   // is previous rule active?: rule226 
                    { src: 'actionDone',   mironName: 'express_InLoop', type: 'emotion', weight: 0.5 } ], // is outer miron done?: express_InLoop
                ],
        fanOut: [ { dest: 'goal', mironName: 'animate_InLoop_Done', type: 'internalEmotion', weight: 1 } ], // do inner miron!: animate_InLoop_Done 
      },
      { // RULE 280 (280): Make Avatar stop sleeping
        name:  'rule280',
        index: 280,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule305', type: 'rule', weight: 1 } ], // is previous rule active?: rule305 
                ],
        fanOut: [ { dest: 'goal', mironName: 'setLoopAnimationTo_Sleeping', type: 'internalEmotion', weight: 1 },   // do inner miron!: setLoopAnimationTo_Sleeping 
                  { dest: 'goal', mironName: 'animate_Out',                 type: 'internalEmotion', weight: 1 } ], // do inner miron!: animate_Out
      },
      { // RULE 294 (294): Set Avatar Posture
        name:  'rule294',
        index: 294,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule74', type: 'rule', weight: 1 } ], // is previous rule active?: rule74 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isDBChanged',              type: 'wm',              weight: 1 },   // activate wm!: isDBChanged 
                  { dest: 'goal',       mironName: 'drop_Phone',               type: 'rightHand',       weight: 1 },   // do outer miron!: drop_Phone 
                  { dest: 'goal',       mironName: 'setLoopAnimationTo_Float', type: 'internalEmotion', weight: 1 },   // do inner miron!: setLoopAnimationTo_Float 
                  { dest: 'goal',       mironName: 'animate_InLoop',           type: 'internalEmotion', weight: 1 },   // do inner miron!: animate_InLoop 
                  { dest: 'goal',       mironName: 'request_InitPhase',        type: 'internalSpeech',  weight: 1 } ], // do inner miron!: request_InitPhase
      },
      { // RULE 312 (312): Stop animation
        name:  'rule312',
        index: 312,
        fanIn:  [
                  [ { src: 'intention', mironName: 'animate_Out', type: 'internalEmotion', weight: 1 } ], // is inner miron recognized?: animate_Out 
                ],
        fanOut: [ { dest: 'goal', mironName: 'express_Out', type: 'emotion', weight: 1 } ], // do outer miron!: express_Out 
      },
      { // RULE 315 (315): End of stop animation
        name:  'rule315',
        index: 315,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule312',     type: 'rule',    weight: 0.5 },   // is previous rule active?: rule312 
                    { src: 'actionDone',   mironName: 'express_Out', type: 'emotion', weight: 0.5 } ], // is outer miron done?: express_Out
                ],
        fanOut: [ { dest: 'goal', mironName: 'animate_Out_Done', type: 'internalEmotion', weight: 1 } ], // do inner miron!: animate_Out_Done 
      },
      { // RULE 352 (352): Set Avatar in sleep loop and bring it back
        name:  'rule352',
        index: 352,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule90', type: 'rule', weight: 1 } ], // is previous rule active?: rule90 
                ],
        fanOut: [ { dest: 'goal', mironName: 'setLoopAnimationTo_Sleeping', type: 'internalEmotion', weight: 1 },   // do inner miron!: setLoopAnimationTo_Sleeping 
                  { dest: 'goal', mironName: 'animate_InLoop',              type: 'internalEmotion', weight: 1 },   // do inner miron!: animate_InLoop 
                  { dest: 'goal', mironName: 'setMotionTo_Back',            type: 'internalBody',    weight: 1 },   // do inner miron!: setMotionTo_Back 
                  { dest: 'goal', mironName: 'move_Somewhere',              type: 'internalBody',    weight: 1 },   // do inner miron!: move_Somewhere 
                  { dest: 'goal', mironName: 'request_ToDumpState',         type: 'internalSpeech',  weight: 1 } ], // do inner miron!: request_ToDumpState
      },
      { // RULE 361 (361): Make Avatar wake up
        name:  'rule361',
        index: 361,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule280',          type: 'rule',            weight: 0.5 },   // is previous rule active?: rule280 
                    { src: 'intention',    mironName: 'animate_Out_Done', type: 'internalEmotion', weight: 0.5 } ], // is inner miron recognized?: animate_Out_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'animate_In',            type: 'internalEmotion', weight: 1 },   // do inner miron!: animate_In 
                  { dest: 'goal', mironName: 'setAnimationTo_WakeUp', type: 'internalEmotion', weight: 1 } ], // do inner miron!: setAnimationTo_WakeUp
      },
      { // RULE 300 (300): Bring Avatar to front
        name:  'rule300',
        index: 300,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule361',         type: 'rule',            weight: 0.5 },   // is previous rule active?: rule361 
                    { src: 'intention',    mironName: 'animate_In_Done', type: 'internalEmotion', weight: 0.5 } ], // is inner miron recognized?: animate_In_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMotionTo_Front', type: 'internalBody', weight: 1 },   // do inner miron!: setMotionTo_Front 
                  { dest: 'goal', mironName: 'move_Somewhere',    type: 'internalBody', weight: 1 },   // do inner miron!: move_Somewhere 
                  { dest: 'goal', mironName: 'setGazeTo_Front',   type: 'internalGaze', weight: 1 },   // do inner miron!: setGazeTo_Front 
                  { dest: 'goal', mironName: 'lookAt_Something',  type: 'internalGaze', weight: 1 } ], // do inner miron!: lookAt_Something
      },
      { // RULE 305 (305): Open Camera & microphone
        name:  'rule305',
        index: 305,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_startRegistration', type: 'speech', weight: 0.5 },   // is outer miron recognized?: say_startRegistration 
                    { src: 'previousRule', mironName: 'rule196',               type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule196
                ],
        fanOut: [ { dest: 'goal',    mironName: 'open_Microphone',         type: 'rightHand', weight: 1 },   // do outer miron!: open_Microphone 
                  { dest: 'resetWM', mironName: 'isLastSpeechKnown',       type: 'wm',        weight: 1 },   // reset wm!: isLastSpeechKnown 
                  { dest: 'goal',    mironName: 'log_VisitorPressedStart', type: 'internal',  weight: 1 },   // do inner miron!: log_VisitorPressedStart 
                  { dest: 'goal',    mironName: 'log_Stat_Start',          type: 'internal',  weight: 1 },   // do inner miron!: log_Stat_Start 
                  { dest: 'goal',    mironName: 'log_StartSession',        type: 'internal',  weight: 1 } ], // do inner miron!: log_StartSession
      },
      { // RULE 347 (347): Formulate Welcome
        name:  'rule347',
        index: 347,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep1 
                ],
        fanOut: [ { dest: 'goal',      mironName: 'setMironSlot{mironType:"speech",mironName:"say_Basic_S1_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Basic_S1_",mironPostfix:"currentCase"} 
                  { dest: 'goal',      mironName: 'say_Something',                                                                         type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'inhibitWM', mironName: 'isVeryFirstQuestion',                                                                   type: 'wm',             weight: 1 } ], // inhibit wm!: isVeryFirstQuestion
      },
      { // RULE 366 (366): Ask for full name or company name
        name:  'rule366',
        index: 366,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule347',            type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule347 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal',       mironName: 'setMironSlot{mironType:"speech",mironName:"ask_Basic_S1_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_Basic_S1_",mironPostfix:"currentCase"} 
                  { dest: 'goal',       mironName: 'ask_Something',                                                                         type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'activateWM', mironName: 'isInterruptionEnabled',                                                                 type: 'wm',             weight: 1 } ], // activate wm!: isInterruptionEnabled
      },
      { // RULE 380 (380): Inform answer not understood
        name:  'rule380',
        index: 380,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep2 
                    { src: 'inhibitedWM', mironName: 'isTooNoisy',          type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isTooNoisy 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep2 
                    { src: 'inhibitedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isNoInput 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep2 
                    { src: 'inhibitedWM', mironName: 'isHelpAsked',         type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isHelpAsked 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'inhibitedWM', mironName: 'isVisitorUnderstood', type: 'wm',             weight: 0.5 },   // is wm inhibited?: isVisitorUnderstood 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep2
                ],
        fanOut: [ { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S2"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S2"} 
                  { dest: 'goal',    mironName: 'say_Something',                                                     type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'resetWM', mironName: 'isVisitorUnderstood',                                               type: 'wm',             weight: 1 } ], // reset wm!: isVisitorUnderstood
      },
      { // RULE 389 (389): Reask for full name or company name 
        name:  'rule389',
        index: 389,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule380',            type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule380 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S2_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S2_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'ask_Something',                                                                                 type: 'internalSpeech', weight: 1 } ], // do inner miron!: ask_Something
      },
      { // RULE 432 (432): Ask for full name or company name via keyboard because not understood
        name:  'rule432',
        index: 432,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule441',            type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule441 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'ask_Something',                                                                                 type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S3_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S3_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}',  type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'generateMironSlot_Name',                                                                        type: 'internalSpeech', weight: 1 } ], // do inner miron!: generateMironSlot_Name
      },
      { // RULE 441 (441): Reinform answer not understood
        name:  'rule441',
        index: 441,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isTooNoisy',          type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isTooNoisy 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'inhibitedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isNoInput 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'inhibitedWM', mironName: 'isHelpAsked',         type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isHelpAsked 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'inhibitedWM', mironName: 'isVisitorUnderstood', type: 'wm',             weight: 0.5 } ], // is wm inhibited?: isVisitorUnderstood
                ],
        fanOut: [ { dest: 'goal',    mironName: 'say_Something',                                                     type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S3"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S3"} 
                  { dest: 'resetWM', mironName: 'isVisitorUnderstood',                                               type: 'wm',             weight: 1 } ], // reset wm!: isVisitorUnderstood
      },
      { // RULE 427 (427): Ask first question
        name:  'rule427',
        index: 427,
        fanIn:  [
                  [ { src: 'intention', mironName: 'next_Step', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: next_Step 
                  [ { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: -0.5 },   // is inner miron recognized?: next_Step 
                    { src: 'previousRule', mironName: 'rule427',   type: 'rule',           weight: -0.5 } ], // is previous rule active?: rule427
                  [ { src: 'previousRule', mironName: 'rule448',   type: 'rule',           weight: -0.5 },   // is previous rule active?: rule448 
                    { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: -0.5 } ], // is inner miron recognized?: next_Step
                  [ { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: -0.5 },   // is inner miron recognized?: next_Step 
                    { src: 'previousRule', mironName: 'rule451',   type: 'rule',           weight: -0.5 } ], // is previous rule active?: rule451
                  [ { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: -0.5 },   // is inner miron recognized?: next_Step 
                    { src: 'previousRule', mironName: 'rule454',   type: 'rule',           weight: -0.5 } ], // is previous rule active?: rule454
                ],
        fanOut: [ { dest: 'goal', mironName: 'set_Slot{slot:"currentStep",value:"Step1"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentStep",value:"Step1"} 
                  { dest: 'goal', mironName: 'request_ActionStep1',                        type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ActionStep1
      },
      { // RULE 448 (448): Reask first question
        name:  'rule448',
        index: 448,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: next_Step 
                    { src: 'previousRule', mironName: 'rule427',   type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule427
                ],
        fanOut: [ { dest: 'goal', mironName: 'set_Slot{slot:"currentStep",value:"Step2"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentStep",value:"Step2"} 
                  { dest: 'goal', mironName: 'request_ActionStep2',                        type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ActionStep2
      },
      { // RULE 451 (451): Ask first question with keyboard
        name:  'rule451',
        index: 451,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: next_Step 
                    { src: 'previousRule', mironName: 'rule448',   type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule448
                ],
        fanOut: [ { dest: 'goal', mironName: 'set_Slot{slot:"currentStep",value:"Step3"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentStep",value:"Step3"} 
                  { dest: 'goal', mironName: 'request_ActionStep3',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ActionStep3 
                  { dest: 'goal', mironName: 'clean_KeyboardInput',                        type: 'rightHand',      weight: 1 } ], // do outer miron!: clean_KeyboardInput
      },
      { // RULE 454 (454): Reask first question with keyboard
        name:  'rule454',
        index: 454,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: next_Step 
                    { src: 'previousRule', mironName: 'rule451',   type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule451
                ],
        fanOut: [ { dest: 'goal', mironName: 'set_Slot{slot:"currentStep",value:"Step4"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentStep",value:"Step4"} 
                  { dest: 'goal', mironName: 'request_ActionStep4',                        type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ActionStep4
      },
      { // RULE 488 (488): Visitor is unknown
        name:  'rule488',
        index: 488,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule454',   type: 'rule',           weight: 0.5 },   // is previous rule active?: rule454 
                    { src: 'intention',    mironName: 'next_Step', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: next_Step
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isVisitorUnknown',                             type: 'wm',             weight: 1 },   // activate wm!: isVisitorUnknown 
                  { dest: 'goal',       mironName: 'request_EndDialog',                            type: 'internalSpeech', weight: 1 },   // do inner miron!: request_EndDialog 
                  { dest: 'goal',       mironName: 'hide_Keyboard',                                type: 'rightHand',      weight: 1 },   // do outer miron!: hide_Keyboard 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentStep",value:"StepEnd"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentStep",value:"StepEnd"} 
                  { dest: 'goal',       mironName: 'hide_Buttons',                                 type: 'rightHand',      weight: 1 } ], // do outer miron!: hide_Buttons
      },
      { // RULE 495 (495): No input
        name:  'rule495',
        index: 495,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isNoInput 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isV0 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                ],
        fanOut: [ { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"say_NoInput_S4"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_NoInput_S4"} 
                  { dest: 'goal',    mironName: 'say_Something',                                               type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'resetWM', mironName: 'isNoInput',                                                   type: 'wm',             weight: 1 } ], // reset wm!: isNoInput
      },
      { // RULE 504 (504): Reask for full name or company name via keyboard
        name:  'rule504',
        index: 504,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule495',            type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule495 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_NoInput_S4_",mironPostfix:"currentCase"}',      type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_NoInput_S4_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'ask_Something',                                                                                type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'generateMironSlot_Name',                                                                       type: 'internalSpeech', weight: 1 } ], // do inner miron!: generateMironSlot_Name
      },
      { // RULE 523 (523): Say Welcome
        name:  'rule523',
        index: 523,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'move_Somewhere_Done', type: 'internalBody', weight: 0.5 },   // is inner miron recognized?: move_Somewhere_Done 
                    { src: 'previousRule', mironName: 'rule300',             type: 'rule',         weight: 0.5 } ], // is previous rule active?: rule300
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToSayHello', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToSayHello 
      },
      { // RULE 553 (553): Choose which end dialog to perform
        name:  'rule553',
        index: 553,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_EndDialog 
                ],
        fanOut: [ { dest: 'goal',      mironName: 'close_Microphone',      type: 'rightHand', weight: 1 },   // do outer miron!: close_Microphone 
                  { dest: 'inhibitWM', mironName: 'isInterruptionEnabled', type: 'wm',        weight: 1 },   // inhibit wm!: isInterruptionEnabled 
                  { dest: 'goal',      mironName: 'hide_Keyboard',         type: 'rightHand', weight: 1 } ], // do outer miron!: hide_Keyboard
      },
      { // RULE 558 (558): Inform visitor not found
        name:  'rule558',
        index: 558,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule553',          type: 'rule', weight: 0.5 },   // is previous rule active?: rule553 
                    { src: 'activatedWM',  mironName: 'isVisitorUnknown', type: 'wm',   weight: 0.5 } ], // is wm activated?: isVisitorUnknown
                ],
        fanOut: [ { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"inform_VisitorNotFound"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_VisitorNotFound"} 
                  { dest: 'goal',    mironName: 'say_Something',                                                       type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'resetWM', mironName: 'isVisitorUnknown',                                                    type: 'wm',             weight: 1 } ], // reset wm!: isVisitorUnknown
      },
      { // RULE 567 (567): Inform to go to watchman
        name:  'rule567',
        index: 567,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule558',            type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule558
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1698',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1698
                  [ { src: 'previousRule', mironName: 'rule2035',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule2035 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                  [ { src: 'previousRule', mironName: 'rule2117',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule2117 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"inform_GoToWatchman"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_GoToWatchman"} 
                  { dest: 'goal', mironName: 'say_Something',                                                    type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 580 (580): Say goodbye
        name:  'rule580',
        index: 580,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule567',            type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule567
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1133',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1133
                  [ { src: 'previousRule', mironName: 'rule1799',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule1799 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                  [ { src: 'previousRule', mironName: 'rule1535',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule1535 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                  [ { src: 'activatedWM',  mironName: 'NoGDPRReaction', type: 'wm',   weight: 0.5 },   // is wm activated?: NoGDPRReaction 
                    { src: 'previousRule', mironName: 'rule553',        type: 'rule', weight: 0.5 } ], // is previous rule active?: rule553
                ],
        fanOut: [ { dest: 'goal',    mironName: 'say_Something',                                            type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"say_Goodbye"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Goodbye"} 
                  { dest: 'resetWM', mironName: 'NoGDPRReaction',                                           type: 'wm',             weight: 1 } ], // reset wm!: NoGDPRReaction
      },
      { // RULE 583 (583): Restart session
        name:  'rule583',
        index: 583,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule580',            type: 'rule',           weight: 0.5 },   // is previous rule active?: rule580 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                  [ { src: 'intention',    mironName: 'animate_In_Done', type: 'internalEmotion', weight: 0.5 },   // is inner miron recognized?: animate_In_Done 
                    { src: 'previousRule', mironName: 'rule707',         type: 'rule',            weight: 0.5 } ], // is previous rule active?: rule707
                  [ { src: 'previousRule', mironName: 'rule3904',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule3904 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_InitPhase 
                  { dest: 'goal', mironName: 'log_EndSession',    type: 'internal',       weight: 1 } ], // do inner miron!: log_EndSession
      },
      { // RULE 482 (482): User Answer is Not Understood
        name:  'rule482',
        index: 482,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isLastSpeechKnown',     type: 'wm',             weight: 0.5 },   // is wm inhibited?: isLastSpeechKnown 
                    { src: 'intention',   mironName: 'request_ToCheckAnswer', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ToCheckAnswer
                ],
        fanOut: [ { dest: 'goal',      mironName: 'log_VisitorNotUnderstood', type: 'internal',       weight: 1 },   // do inner miron!: log_VisitorNotUnderstood 
                  { dest: 'resetWM',   mironName: 'isLastSpeechKnown',        type: 'wm',             weight: 1 },   // reset wm!: isLastSpeechKnown 
                  { dest: 'inhibitWM', mironName: 'isVisitorUnderstood',      type: 'wm',             weight: 1 },   // inhibit wm!: isVisitorUnderstood 
                  { dest: 'goal',      mironName: 'request_NextQuestion',     type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_NextQuestion
      },
      { // RULE 603 (603): Visitor last utterance is not understood
        name:  'rule603',
        index: 603,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isTooNoisy',     type: 'wm',             weight: 0.5 },   // is wm inhibited?: isTooNoisy 
                    { src: 'intention',   mironName: 'speech_Unknown', type: 'internalSignal', weight: 0.5 } ], // is inner miron recognized?: speech_Unknown
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isLastSpeechKnown', type: 'wm', weight: 1 } ], // inhibit wm!: isLastSpeechKnown 
      },
      { // RULE 608 (608): Visitor last utterance is understood
        name:  'rule608',
        index: 608,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isTooNoisy',   type: 'wm',             weight: 0.5 },   // is wm inhibited?: isTooNoisy 
                    { src: 'intention',   mironName: 'speech_Known', type: 'internalSignal', weight: 0.5 } ], // is inner miron recognized?: speech_Known
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isLastSpeechKnown', type: 'wm', weight: 1 } ], // activate wm!: isLastSpeechKnown 
      },
      { // RULE 611 (611): Visitor answer is understood
        name:  'rule611',
        index: 611,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isLastSpeechKnown',     type: 'wm',             weight: 0.5 },   // is wm activated?: isLastSpeechKnown 
                    { src: 'intention',   mironName: 'request_ToCheckAnswer', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ToCheckAnswer
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_VisitorUnderstood', type: 'internal', weight: 1 },   // do inner miron!: log_VisitorUnderstood 
                  { dest: 'resetWM',    mironName: 'isLastSpeechKnown',     type: 'wm',       weight: 1 },   // reset wm!: isLastSpeechKnown 
                  { dest: 'activateWM', mironName: 'isVisitorUnderstood',   type: 'wm',       weight: 1 } ], // activate wm!: isVisitorUnderstood
      },
      { // RULE 621 (621): Visitor is silent by voice 
        name:  'rule621',
        index: 621,
        fanIn:  [
                  [ { src: 'inhibitedWM',  mironName: 'isVisitorSpeaking',                        type: 'wm',       weight: 0.25 },   // is wm inhibited?: isVisitorSpeaking 
                    { src: 'previousRule', mironName: 'rule626',                                  type: 'rule',     weight: 0.25 },   // is previous rule active?: rule626 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:3,id:"timeToSpeak"}', type: 'internal', weight: 0.25 },   // is outer miron done?: wait_Timeout{timeout:3,id:"timeToSpeak"} 
                    { src: 'inhibitedWM',  mironName: 'isVisitorAsweringByVoice',                 type: 'wm',       weight: 0.25 } ], // is wm inhibited?: isVisitorAsweringByVoice
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isNoInput',                  type: 'wm',             weight: 1 },   // activate wm!: isNoInput 
                  { dest: 'goal',       mironName: 'request_NextQuestion',       type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'log_VisitorIsSilentByVoice', type: 'internal',       weight: 1 } ], // do inner miron!: log_VisitorIsSilentByVoice
      },
      { // RULE 626 (626): Wait for visitor to answer by voice
        name:  'rule626',
        index: 626,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule909', type: 'rule', weight: 1 } ], // is previous rule active?: rule909 
                  [ { src: 'previousRule', mironName: 'rule922', type: 'rule', weight: 1 } ], // is previous rule active?: rule922 
                  [ { src: 'activatedWM',  mironName: 'isLastSpeechKnown', type: 'wm',   weight: -0.5 },   // is wm activated?: isLastSpeechKnown 
                    { src: 'previousRule', mironName: 'rule909',           type: 'rule', weight: -0.5 } ], // is previous rule active?: rule909
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:3,id:"timeToSpeak"}', type: 'internal', weight: 1 },   // do inner miron!: wait_Timeout{timeout:3,id:"timeToSpeak"} 
                  { dest: 'goal', mironName: 'log_WaitForVisitorToAnswerByVoice',        type: 'internal', weight: 1 } ], // do inner miron!: log_WaitForVisitorToAnswerByVoice
      },
      { // RULE 709 (709): Visitor is speaking
        name:  'rule709',
        index: 709,
        fanIn:  [
                  [ { src: 'intention', mironName: 'speech_Start', type: 'signal', weight: 1 } ], // is outer miron recognized?: speech_Start 
                  [ { src: 'previousRule', mironName: 'rule811',      type: 'rule',   weight: -0.5 },   // is previous rule active?: rule811 
                    { src: 'intention',    mironName: 'speech_Start', type: 'signal', weight: -0.5 } ], // is outer miron recognized?: speech_Start
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isVisitorSpeaking',                             type: 'wm',       weight: 1 },   // activate wm!: isVisitorSpeaking 
                  { dest: 'goal',       mironName: 'wait_Timeout{timeout:10,id:"visitorSpeaking"}', type: 'internal', weight: 1 },   // do inner miron!: wait_Timeout{timeout:10,id:"visitorSpeaking"} 
                  { dest: 'inhibitWM',  mironName: 'isTooNoisy',                                    type: 'wm',       weight: 1 } ], // inhibit wm!: isTooNoisy
      },
      { // RULE 718 (718): Visitor finish speaking
        name:  'rule718',
        index: 718,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'speech_End', type: 'signal', weight: 0.5 },   // is outer miron recognized?: speech_End 
                    { src: 'previousRule', mironName: 'rule709',    type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule709
                  [ { src: 'previousRule', mironName: 'rule709',          type: 'rule',      weight: 0.5 },   // is previous rule active?: rule709 
                    { src: 'intention',    mironName: 'close_Microphone', type: 'rightHand', weight: 0.5 } ], // is outer miron recognized?: close_Microphone
                  [ { src: 'previousRule', mironName: 'rule721',          type: 'rule',      weight: 0.5 },   // is previous rule active?: rule721 
                    { src: 'intention',    mironName: 'close_Microphone', type: 'rightHand', weight: 0.5 } ], // is outer miron recognized?: close_Microphone
                  [ { src: 'previousRule', mironName: 'rule811',          type: 'rule',      weight: 0.5 },   // is previous rule active?: rule811 
                    { src: 'intention',    mironName: 'close_Microphone', type: 'rightHand', weight: 0.5 } ], // is outer miron recognized?: close_Microphone
                  [ { src: 'previousRule', mironName: 'rule709',                                       type: 'rule',     weight: 0.5 },   // is previous rule active?: rule709 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:10,id:"visitorSpeaking"}', type: 'internal', weight: 0.5 } ], // is inner miron done?: wait_Timeout{timeout:10,id:"visitorSpeaking"}
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isVisitorSpeaking', type: 'wm', weight: 1 },   // inhibit wm!: isVisitorSpeaking 
                  { dest: 'inhibitWM', mironName: 'isTooNoisy',        type: 'wm', weight: 1 } ], // inhibit wm!: isTooNoisy
      },
      { // RULE 721 (721): Sound environment too noisy
        name:  'rule721',
        index: 721,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule811',      type: 'rule',   weight: 0.5 },   // is previous rule active?: rule811 
                    { src: 'intention',    mironName: 'speech_Start', type: 'signal', weight: 0.5 } ], // is outer miron recognized?: speech_Start
                  [ { src: 'previousRule', mironName: 'rule709',                                       type: 'rule',     weight: -0.5 },   // is previous rule active?: rule709 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:10,id:"visitorSpeaking"}', type: 'internal', weight: -0.5 } ], // is inner miron done?: wait_Timeout{timeout:10,id:"visitorSpeaking"}
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isTooNoisy',        type: 'wm', weight: 1 },   // activate wm!: isTooNoisy 
                  { dest: 'activateWM', mironName: 'isVisitorSpeaking', type: 'wm', weight: 1 } ], // activate wm!: isVisitorSpeaking
      },
      { // RULE 725 (725): No Validation Detected before Timeout
        name:  'rule725',
        index: 725,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:5,id:"userTyping"}', type: 'internal', weight: 0.5 },   // is inner miron done?: wait_Timeout{timeout:5,id:"userTyping"} 
                    { src: 'previousRule', mironName: 'rule737',                                 type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule737
                  [ { src: 'previousRule', mironName: 'rule737',           type: 'rule',   weight: -0.5 },   // is previous rule active?: rule737 
                    { src: 'intention',    mironName: 'keyboard_Validate', type: 'signal', weight: -0.5 } ], // is outer miron recognized?: keyboard_Validate
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isVisitorTyping',          type: 'wm', weight: 1 },   // inhibit wm!: isVisitorTyping 
                  { dest: 'inhibitWM', mironName: 'hasVisitorFinishedTyping', type: 'wm', weight: 1 } ], // inhibit wm!: hasVisitorFinishedTyping
      },
      { // RULE 728 (728): User Finished Typing
        name:  'rule728',
        index: 728,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule737',           type: 'rule',   weight: 0.5 },   // is previous rule active?: rule737 
                    { src: 'intention',    mironName: 'keyboard_Validate', type: 'signal', weight: 0.5 } ], // is outer miron recognized?: keyboard_Validate
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isVisitorTyping',          type: 'wm',        weight: 1 },   // inhibit wm!: isVisitorTyping 
                  { dest: 'activateWM', mironName: 'hasVisitorFinishedTyping', type: 'wm',        weight: 1 },   // activate wm!: hasVisitorFinishedTyping 
                  { dest: 'goal',       mironName: 'hide_Keyboard',            type: 'rightHand', weight: 1 } ], // do outer miron!: hide_Keyboard
      },
      { // RULE 737 (737): User Is Typing
        name:  'rule737',
        index: 737,
        fanIn:  [
                  [ { src: 'intention', mironName: 'keyboard_Show', type: 'signal', weight: 1 } ], // is outer miron recognized?: keyboard_Show 
                  [ { src: 'previousRule', mironName: 'rule4664', type: 'rule', weight: 1 } ], // is previous rule active?: rule4664 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'wait_Timeout{timeout:5,id:"userTyping"}', type: 'internal', weight: 1 },   // do inner miron!: wait_Timeout{timeout:5,id:"userTyping"} 
                  { dest: 'activateWM', mironName: 'isVisitorTyping',                         type: 'wm',       weight: 1 },   // activate wm!: isVisitorTyping 
                  { dest: 'resetWM',    mironName: 'hasVisitorFinishedTyping',                type: 'wm',       weight: 1 } ], // reset wm!: hasVisitorFinishedTyping
      },
      { // RULE 825 (825): No Button Clicked before Timeout
        name:  'rule825',
        index: 825,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:10,id:"userClicking"}', type: 'internal', weight: 0.5 },   // is inner miron done?: wait_Timeout{timeout:10,id:"userClicking"} 
                    { src: 'previousRule', mironName: 'rule837',                                    type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule837
                  [ { src: 'intention',    mironName: 'button_Click', type: 'signal', weight: -0.5 },   // is outer miron recognized?: button_Click 
                    { src: 'previousRule', mironName: 'rule837',      type: 'rule',   weight: -0.5 } ], // is previous rule active?: rule837
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isVisitorClicking',          type: 'wm', weight: 1 },   // inhibit wm!: isVisitorClicking 
                  { dest: 'inhibitWM', mironName: 'hasVisitorFinishedClicking', type: 'wm', weight: 1 } ], // inhibit wm!: hasVisitorFinishedClicking
      },
      { // RULE 828 (828): User Clicked a Button
        name:  'rule828',
        index: 828,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule837',      type: 'rule',   weight: 0.5 },   // is previous rule active?: rule837 
                    { src: 'intention',    mironName: 'button_Click', type: 'signal', weight: 0.5 } ], // is outer miron recognized?: button_Click
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isVisitorClicking',          type: 'wm',        weight: 1 },   // inhibit wm!: isVisitorClicking 
                  { dest: 'activateWM', mironName: 'hasVisitorFinishedClicking', type: 'wm',        weight: 1 },   // activate wm!: hasVisitorFinishedClicking 
                  { dest: 'goal',       mironName: 'hide_Buttons',               type: 'rightHand', weight: 1 } ], // do outer miron!: hide_Buttons
      },
      { // RULE 837 (837): User Has Been Presented with Buttons
        name:  'rule837',
        index: 837,
        fanIn:  [
                  [ { src: 'intention', mironName: 'button_Show', type: 'signal', weight: 1 } ], // is outer miron recognized?: button_Show 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'wait_Timeout{timeout:10,id:"userClicking"}', type: 'internal', weight: 1 },   // do inner miron!: wait_Timeout{timeout:10,id:"userClicking"} 
                  { dest: 'activateWM', mironName: 'isVisitorClicking',                          type: 'wm',       weight: 1 },   // activate wm!: isVisitorClicking 
                  { dest: 'resetWM',    mironName: 'hasVisitorFinishedClicking',                 type: 'wm',       weight: 1 } ], // reset wm!: hasVisitorFinishedClicking
      },
      { // RULE 909 (909): Init voice answering process
        name:  'rule909',
        index: 909,
        fanIn:  [
                  [ { src: 'intention', mironName: 'wait_ForVoiceAnswer', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: wait_ForVoiceAnswer 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isVisitorAsweringByVoice', type: 'wm', weight: 1 },   // inhibit wm!: isVisitorAsweringByVoice 
                  { dest: 'resetWM',   mironName: 'isVisitorUnderstood',      type: 'wm', weight: 1 } ], // reset wm!: isVisitorUnderstood
      },
      { // RULE 915 (915): Visitor answered by voice
        name:  'rule915',
        index: 915,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule626',                  type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule626 
                    { src: 'activatedWM',  mironName: 'isVisitorAsweringByVoice', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isVisitorAsweringByVoice 
                    { src: 'inhibitedWM',  mironName: 'isVisitorSpeaking',        type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isVisitorSpeaking
                  [ { src: 'previousRule', mironName: 'rule868', type: 'rule', weight: 1 } ], // is previous rule active?: rule868 
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isNoInput',                  type: 'wm',             weight: 1 },   // reset wm!: isNoInput 
                  { dest: 'goal',    mironName: 'log_VisitorAnsweredByVoice', type: 'internal',       weight: 1 },   // do inner miron!: log_VisitorAnsweredByVoice 
                  { dest: 'goal',    mironName: 'request_ToCheckAnswer',      type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToCheckAnswer
      },
      { // RULE 922 (922): Visitor is answering by voice
        name:  'rule922',
        index: 922,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isVisitorSpeaking',        type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isVisitorSpeaking 
                    { src: 'previousRule', mironName: 'rule626',                  type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule626 
                    { src: 'inhibitedWM',  mironName: 'isVisitorAsweringByVoice', type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isVisitorAsweringByVoice
                  [ { src: 'previousRule', mironName: 'rule626',                                  type: 'rule',     weight: 0.3333333333333333 },   // is previous rule active?: rule626 
                    { src: 'activatedWM',  mironName: 'isVisitorSpeaking',                        type: 'wm',       weight: 0.3333333333333333 },   // is wm activated?: isVisitorSpeaking 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:3,id:"timeToSpeak"}', type: 'internal', weight: 0.3333333333333333 } ], // is outer miron done?: wait_Timeout{timeout:3,id:"timeToSpeak"}
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isVisitorAsweringByVoice',    type: 'wm',       weight: 1 },   // activate wm!: isVisitorAsweringByVoice 
                  { dest: 'goal',       mironName: 'log_VisitorAnsweringByVoice', type: 'internal', weight: 1 } ], // do inner miron!: log_VisitorAnsweringByVoice
      },
      { // RULE 707 (707): Set Avatar to go to sleep
        name:  'rule707',
        index: 707,
        fanIn:  [
                ],
        fanOut: [ { dest: 'goal', mironName: 'setAnimationTo_GoToSleep', type: 'internalEmotion', weight: 1 },   // do inner miron!: setAnimationTo_GoToSleep 
                  { dest: 'goal', mironName: 'animate_In',               type: 'internalEmotion', weight: 1 } ], // do inner miron!: animate_In
      },
      { // RULE 755 (755): Ask to repeat
        name:  'rule755',
        index: 755,
        fanIn:  [
                  [ { src: 'intention', mironName: 'ask_ToRepeat', type: 'speech', weight: 1 } ], // is outer miron recognized?: ask_ToRepeat 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isRepeatAsked', type: 'wm', weight: 1 } ], // activate wm!: isRepeatAsked 
      },
      { // RULE 764 (764): Visitor asked to repeat
        name:  'rule764',
        index: 764,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isRepeatAsked', type: 'wm',   weight: 0.5 },   // is wm activated?: isRepeatAsked 
                    { src: 'previousRule', mironName: 'rule2994',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule2994
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isRepeatAsked',            type: 'wm',             weight: 1 },   // inhibit wm!: isRepeatAsked 
                  { dest: 'goal',      mironName: 'ask_Something',            type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal',      mironName: 'log_VisitorAskedToRepeat', type: 'internal',       weight: 1 } ], // do inner miron!: log_VisitorAskedToRepeat
      },
      { // RULE 778 (778): Wait for voice answer
        name:  'rule778',
        index: 778,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isVoiceExpected',  type: 'wm', weight: 0.5 },   // is wm activated?: isVoiceExpected 
                    { src: 'activatedWM', mironName: 'isSomethingAsked', type: 'wm', weight: 0.5 } ], // is wm activated?: isSomethingAsked
                ],
        fanOut: [ { dest: 'goal',    mironName: 'wait_ForVoiceAnswer', type: 'internalSpeech', weight: 1 },   // do inner miron!: wait_ForVoiceAnswer 
                  { dest: 'resetWM', mironName: 'isSomethingAsked',    type: 'wm',             weight: 1 } ], // reset wm!: isSomethingAsked
      },
      { // RULE 782 (782): Ask something
        name:  'rule782',
        index: 782,
        fanIn:  [
                  [ { src: 'intention', mironName: 'ask_Something', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: ask_Something 
                ],
        fanOut: [ { dest: 'goal', mironName: 'generateMironSlot_Text',  type: 'speech',         weight: 1 },   // do outer miron!: generateMironSlot_Text 
                  { dest: 'goal', mironName: 'clean_RecognitionStates', type: 'internalSpeech', weight: 1 } ], // do inner miron!: clean_RecognitionStates
      },
      { // RULE 787 (787): Wait for keyboard answer
        name:  'rule787',
        index: 787,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isKeyboardExpected', type: 'wm', weight: 0.5 },   // is wm activated?: isKeyboardExpected 
                    { src: 'activatedWM', mironName: 'isSomethingAsked',   type: 'wm', weight: 0.5 } ], // is wm activated?: isSomethingAsked
                ],
        fanOut: [ { dest: 'goal',    mironName: 'wait_ForKeyboardAnswer', type: 'internalSpeech', weight: 1 },   // do inner miron!: wait_ForKeyboardAnswer 
                  { dest: 'resetWM', mironName: 'isSomethingAsked',       type: 'wm',             weight: 1 } ], // reset wm!: isSomethingAsked
      },
      { // RULE 792 (792): Wait for button answer
        name:  'rule792',
        index: 792,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isButtonExpected', type: 'wm', weight: 0.5 },   // is wm activated?: isButtonExpected 
                    { src: 'activatedWM', mironName: 'isSomethingAsked', type: 'wm', weight: 0.5 } ], // is wm activated?: isSomethingAsked
                ],
        fanOut: [ { dest: 'goal',    mironName: 'wait_ForButtonAnswer', type: 'internalSpeech', weight: 1 },   // do inner miron!: wait_ForButtonAnswer 
                  { dest: 'resetWM', mironName: 'isSomethingAsked',     type: 'wm',             weight: 1 } ], // reset wm!: isSomethingAsked
      },
      { // RULE 993 (993): Environment is too noisy
        name:  'rule993',
        index: 993,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule626',    type: 'rule', weight: 0.5 },   // is previous rule active?: rule626 
                    { src: 'activatedWM',  mironName: 'isTooNoisy', type: 'wm',   weight: 0.5 } ], // is wm activated?: isTooNoisy
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_EnvironmentIsTooNoisy', type: 'internal',       weight: 1 },   // do inner miron!: log_EnvironmentIsTooNoisy 
                  { dest: 'goal',       mironName: 'request_NextQuestion',      type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'activateWM', mironName: 'isTooNoisy',                type: 'wm',             weight: 1 } ], // activate wm!: isTooNoisy
      },
      { // RULE 811 (811): speechmatics send a speech end
        name:  'rule811',
        index: 811,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'speech_End', type: 'signal', weight: 0.5 },   // is outer miron recognized?: speech_End 
                    { src: 'previousRule', mironName: 'rule721',    type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule721
                ],
        fanOut: [ { dest: 'goal',    mironName: 'wait_Timeout{timeout:1,id:"isToNoisy"}', type: 'internal', weight: 1 },   // do inner miron!: wait_Timeout{timeout:1,id:"isToNoisy"} 
                  { dest: 'goal',    mironName: 'log_EnvironmentIsStillTooNoisy',         type: 'internal', weight: 1 },   // do inner miron!: log_EnvironmentIsStillTooNoisy 
                  { dest: 'resetWM', mironName: 'isLastSpeechKnown',                      type: 'wm',       weight: 1 } ], // reset wm!: isLastSpeechKnown
      },
      { // RULE 877 (877): speechmatics send a speech end
        name:  'rule877',
        index: 877,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:1,id:"isToNoisy"}', type: 'internal', weight: 0.5 },   // is inner miron done?: wait_Timeout{timeout:1,id:"isToNoisy"} 
                    { src: 'previousRule', mironName: 'rule811',                                type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule811
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isTooNoisy',                   type: 'wm',       weight: 1 },   // inhibit wm!: isTooNoisy 
                  { dest: 'inhibitWM', mironName: 'isVisitorSpeaking',            type: 'wm',       weight: 1 },   // inhibit wm!: isVisitorSpeaking 
                  { dest: 'resetWM',   mironName: 'isLastSpeechKnown',            type: 'wm',       weight: 1 },   // reset wm!: isLastSpeechKnown 
                  { dest: 'goal',      mironName: 'log_EnvironmentStopToBeNoisy', type: 'internal', weight: 1 } ], // do inner miron!: log_EnvironmentStopToBeNoisy
      },
      { // RULE 905 (905): Last input was noise
        name:  'rule905',
        index: 905,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isTooNoisy',   type: 'wm',             weight: 0.5 },   // is wm activated?: isTooNoisy 
                    { src: 'intention',   mironName: 'speech_Known', type: 'internalSignal', weight: 0.5 } ], // is inner miron recognized?: speech_Known
                  [ { src: 'intention',   mironName: 'speech_Unknown', type: 'internalSignal', weight: 0.5 },   // is inner miron recognized?: speech_Unknown 
                    { src: 'activatedWM', mironName: 'isTooNoisy',     type: 'wm',             weight: 0.5 } ], // is wm activated?: isTooNoisy
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isLastSpeechKnown', type: 'wm', weight: 1 } ], // reset wm!: isLastSpeechKnown 
      },
      { // RULE 1019 (1019): Visitor is answering
        name:  'rule1019',
        index: 1019,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:3,id:"timeToType"}', type: 'internal', weight: 0.3333333333333333 },   // is outer miron done?: wait_Timeout{timeout:3,id:"timeToType"} 
                    { src: 'activatedWM',  mironName: 'isVisitorTyping',                         type: 'wm',       weight: 0.3333333333333333 },   // is wm activated?: isVisitorTyping 
                    { src: 'previousRule', mironName: 'rule1031',                                type: 'rule',     weight: 0.3333333333333333 } ], // is previous rule active?: rule1031
                  [ { src: 'inhibitedWM',  mironName: 'isVisitorAsweringByKeyboard', type: 'wm',   weight: 0.3333333333333333 },   // is wm inhibited?: isVisitorAsweringByKeyboard 
                    { src: 'previousRule', mironName: 'rule1031',                    type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule1031 
                    { src: 'activatedWM',  mironName: 'isVisitorTyping',             type: 'wm',   weight: 0.3333333333333333 } ], // is wm activated?: isVisitorTyping
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_VisitorAnsweringByKeyboard', type: 'internal', weight: 1 },   // do inner miron!: log_VisitorAnsweringByKeyboard 
                  { dest: 'activateWM', mironName: 'isVisitorAsweringByKeyboard',    type: 'wm',       weight: 1 } ], // activate wm!: isVisitorAsweringByKeyboard
      },
      { // RULE 1023 (1023): Visitor answered by keyboard
        name:  'rule1023',
        index: 1023,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'hasVisitorFinishedTyping',    type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: hasVisitorFinishedTyping 
                    { src: 'activatedWM',  mironName: 'isVisitorAsweringByKeyboard', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isVisitorAsweringByKeyboard 
                    { src: 'previousRule', mironName: 'rule1031',                    type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule1031
                ],
        fanOut: [ { dest: 'goal',    mironName: 'log_VisitorAnsweredByKeyboard', type: 'internal',       weight: 1 },   // do inner miron!: log_VisitorAnsweredByKeyboard 
                  { dest: 'resetWM', mironName: 'isNoInput',                     type: 'wm',             weight: 1 },   // reset wm!: isNoInput 
                  { dest: 'goal',    mironName: 'request_ToCheckAnswer',         type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToCheckAnswer
      },
      { // RULE 1026 (1026): Init keyboard answering process
        name:  'rule1026',
        index: 1026,
        fanIn:  [
                  [ { src: 'intention', mironName: 'wait_ForKeyboardAnswer', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: wait_ForKeyboardAnswer 
                ],
        fanOut: [ { dest: 'resetWM',   mironName: 'isVisitorUnderstood',         type: 'wm',        weight: 1 },   // reset wm!: isVisitorUnderstood 
                  { dest: 'inhibitWM', mironName: 'isVisitorAsweringByKeyboard', type: 'wm',        weight: 1 },   // inhibit wm!: isVisitorAsweringByKeyboard 
                  { dest: 'inhibitWM', mironName: 'isTooNoisy',                  type: 'wm',        weight: 1 },   // inhibit wm!: isTooNoisy 
                  { dest: 'goal',      mironName: 'display_Keyboard',            type: 'rightHand', weight: 1 } ], // do outer miron!: display_Keyboard
      },
      { // RULE 1031 (1031): Wait for visitor to answer by keyboard
        name:  'rule1031',
        index: 1031,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1019', type: 'rule', weight: 1 } ], // is previous rule active?: rule1019 
                  [ { src: 'previousRule', mironName: 'rule1026', type: 'rule', weight: 1 } ], // is previous rule active?: rule1026 
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:3,id:"timeToType"}', type: 'internal', weight: 1 },   // do inner miron!: wait_Timeout{timeout:3,id:"timeToType"} 
                  { dest: 'goal', mironName: 'log_WaitForVisitorToAnswerByKeyboard',    type: 'internal', weight: 1 } ], // do inner miron!: log_WaitForVisitorToAnswerByKeyboard
      },
      { // RULE 1036 (1036): Visitor is silent by keyboard
        name:  'rule1036',
        index: 1036,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isVisitorAsweringByKeyboard', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isVisitorAsweringByKeyboard 
                    { src: 'previousRule', mironName: 'rule1031',                    type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule1031 
                    { src: 'inhibitedWM',  mironName: 'hasVisitorFinishedTyping',    type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: hasVisitorFinishedTyping
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_VisitorIsSilentByKeyboard', type: 'internal',       weight: 1 },   // do inner miron!: log_VisitorIsSilentByKeyboard 
                  { dest: 'goal',       mironName: 'request_NextQuestion',          type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'activateWM', mironName: 'isNoInput',                     type: 'wm',             weight: 1 } ], // activate wm!: isNoInput
      },
      { // RULE 1085 (1085): Ask for help
        name:  'rule1085',
        index: 1085,
        fanIn:  [
                  [ { src: 'intention', mironName: 'ask_ForHelp', type: 'speech', weight: 1 } ], // is outer miron recognized?: ask_ForHelp 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isHelpAsked', type: 'wm', weight: 1 } ], // activate wm!: isHelpAsked 
      },
      { // RULE 1091 (1091): Analyse answer
        name:  'rule1091',
        index: 1091,
        fanIn:  [
                  [ { src: 'inhibitedWM',  mironName: 'isRepeatAsked', type: 'wm',   weight: 0.5 },   // is wm inhibited?: isRepeatAsked 
                    { src: 'previousRule', mironName: 'rule2994',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule2994
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToAnalyseDB',      type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToAnalyseDB 
                  { dest: 'goal', mironName: 'log_AnalyseVisitorAnswer', type: 'internal',       weight: 1 } ], // do inner miron!: log_AnalyseVisitorAnswer
      },
      { // RULE 1133 (1133): Thanks for registering
        name:  'rule1133',
        index: 1133,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule553',           type: 'rule', weight: 0.5 },   // is previous rule active?: rule553 
                    { src: 'activatedWM',  mironName: 'isDialogCompleted', type: 'wm',   weight: 0.5 } ], // is wm activated?: isDialogCompleted
                ],
        fanOut: [ { dest: 'goal',    mironName: 'say_Something',                                                            type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"inform_ThanksForRegistering"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_ThanksForRegistering"} 
                  { dest: 'resetWM', mironName: 'isDialogCompleted',                                                        type: 'wm',             weight: 1 } ], // reset wm!: isDialogCompleted
      },
      { // RULE 868 (868): Visitor said something before
        name:  'rule868',
        index: 868,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule909',           type: 'rule', weight: 0.5 },   // is previous rule active?: rule909 
                    { src: 'activatedWM',  mironName: 'isLastSpeechKnown', type: 'wm',   weight: 0.5 } ], // is wm activated?: isLastSpeechKnown
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_VisitorSaidSomethingBefore', type: 'internal', weight: 1 } ], // do inner miron!: log_VisitorSaidSomethingBefore 
      },
      { // RULE 911 (911): Reask for full name or company name 
        name:  'rule911',
        index: 911,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule947',            type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule947 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'ask_Something',                                                                           type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_NoInput_S2_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_NoInput_S2_",mironPostfix:"currentCase"}
      },
      { // RULE 947 (947): Inform could not hear
        name:  'rule947',
        index: 947,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.5 },   // is wm activated?: isNoInput 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep2
                ],
        fanOut: [ { dest: 'goal',    mironName: 'say_Something',                                                                           type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"say_NoInput_S2_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_NoInput_S2_",mironPostfix:"currentCase"} 
                  { dest: 'resetWM', mironName: 'isNoInput',                                                                               type: 'wm',             weight: 1 } ], // reset wm!: isNoInput
      },
      { // RULE 956 (956): Reask for full name or company name 
        name:  'rule956',
        index: 956,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule966',            type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule966 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'ask_Something',                                                                        type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_Help_S2_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_Help_S2_",mironPostfix:"currentCase"}
      },
      { // RULE 966 (966): Give help
        name:  'rule966',
        index: 966,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isHelpAsked',         type: 'wm',             weight: 0.5 },   // is wm activated?: isHelpAsked 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep2
                ],
        fanOut: [ { dest: 'goal',      mironName: 'say_Something',                                                                        type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',      mironName: 'setMironSlot{mironType:"speech",mironName:"say_Help_S2_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Help_S2_",mironPostfix:"currentCase"} 
                  { dest: 'inhibitWM', mironName: 'isHelpAsked',                                                                          type: 'wm',             weight: 1 } ], // inhibit wm!: isHelpAsked
      },
      { // RULE 1210 (1210): Skip this step and go to case too noisy of step 3
        name:  'rule1210',
        index: 1210,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isTooNoisy',          type: 'wm',             weight: 0.5 },   // is wm activated?: isTooNoisy 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep2
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_NextQuestion 
      },
      { // RULE 1215 (1215): inform too noisy
        name:  'rule1215',
        index: 1215,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isTooNoisy',          type: 'wm',             weight: 0.5 },   // is wm activated?: isTooNoisy 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep3
                ],
        fanOut: [ { dest: 'goal',      mironName: 'setMironSlot{mironType:"speech",mironName:"say_TooNoisy_S3"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_TooNoisy_S3"} 
                  { dest: 'goal',      mironName: 'say_Something',                                                type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'inhibitWM', mironName: 'isTooNoisy',                                                   type: 'wm',             weight: 1 } ], // inhibit wm!: isTooNoisy
      },
      { // RULE 1224 (1224): Reask for full name or company name 
        name:  'rule1224',
        index: 1224,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1215',           type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule1215 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_TooNoisy_S3_",mironPostfix:"currentCase"}',     type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_TooNoisy_S3_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'ask_Something',                                                                                type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'generateMironSlot_Name',                                                                       type: 'internalSpeech', weight: 1 } ], // do inner miron!: generateMironSlot_Name
      },
      { // RULE 1245 (1245): Inform could not hear
        name:  'rule1245',
        index: 1245,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.5 },   // is wm activated?: isNoInput 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep3
                  [ { src: 'activatedWM', mironName: 'isSelection',         type: 'wm',             weight: -0.3333333333333333 },   // is wm activated?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: -0.3333333333333333 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: -0.3333333333333333 } ], // is wm activated?: isNoInput
                ],
        fanOut: [ { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"say_NoInput_S3_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_NoInput_S3_",mironPostfix:"currentCase"} 
                  { dest: 'goal',    mironName: 'say_Something',                                                                           type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'resetWM', mironName: 'isNoInput',                                                                               type: 'wm',             weight: 1 } ], // reset wm!: isNoInput
      },
      { // RULE 1254 (1254): Ask for full name or company name via keyboard because not understood
        name:  'rule1254',
        index: 1254,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1245',           type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule1245 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_NoInput_S3_",mironPostfix:"currentCase"}',      type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_NoInput_S3_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'ask_Something',                                                                                type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'generateMironSlot_Name',                                                                       type: 'internalSpeech', weight: 1 } ], // do inner miron!: generateMironSlot_Name
      },
      { // RULE 1273 (1273): Reinform answer not understood
        name:  'rule1273',
        index: 1273,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep4 
                    { src: 'inhibitedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isNoInput 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.1111111111111111 },   // is inner miron recognized?: request_ActionStep4 
                    { src: 'inhibitedWM', mironName: 'isHelpAsked',         type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isHelpAsked 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.1111111111111111 },   // is wm inhibited?: isV5 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.1111111111111111 } ], // is wm inhibited?: isSelection
                  [ { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_ActionStep4 
                    { src: 'inhibitedWM', mironName: 'isVisitorUnderstood', type: 'wm',             weight: 0.5 } ], // is wm inhibited?: isVisitorUnderstood
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isVisitorUnderstood',                                                                           type: 'wm',             weight: 1 },   // reset wm!: isVisitorUnderstood 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S4_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_NotUnderstood_S4_",mironPostfix:"currentCase"} 
                  { dest: 'goal',    mironName: 'say_Something',                                                                                 type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 1282 (1282): Ask for full name or company name via keyboard because not understood
        name:  'rule1282',
        index: 1282,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1273',           type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule1273 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S4"}',                            type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_NotUnderstood_S4"} 
                  { dest: 'goal', mironName: 'ask_Something',                                                                                type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'generateMironSlot_Name',                                                                       type: 'internalSpeech', weight: 1 } ], // do inner miron!: generateMironSlot_Name
      },
      { // RULE 981 (981): Reset current step
        name:  'rule981',
        index: 981,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule427',     type: 'rule', weight: 0.5 },   // is previous rule active?: rule427 
                    { src: 'changedSlot',  mironName: 'currentCase', type: 'slot', weight: 0.5 } ], // is active?: currentCase
                  [ { src: 'changedSlot',  mironName: 'currentCase', type: 'slot', weight: 0.5 },   // is active?: currentCase 
                    { src: 'previousRule', mironName: 'rule454',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule454
                  [ { src: 'changedSlot',  mironName: 'currentCase', type: 'slot', weight: 0.5 },   // is active?: currentCase 
                    { src: 'previousRule', mironName: 'rule451',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule451
                  [ { src: 'changedSlot',  mironName: 'currentCase', type: 'slot', weight: 0.5 },   // is active?: currentCase 
                    { src: 'previousRule', mironName: 'rule448',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule448
                  [ { src: 'intention',    mironName: 'reset_Steps', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: reset_Steps 
                    { src: 'previousRule', mironName: 'rule454',     type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule454
                  [ { src: 'intention',    mironName: 'reset_Steps', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: reset_Steps 
                    { src: 'previousRule', mironName: 'rule451',     type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule451
                  [ { src: 'intention',    mironName: 'reset_Steps', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: reset_Steps 
                    { src: 'previousRule', mironName: 'rule448',     type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule448
                  [ { src: 'intention',    mironName: 'reset_Steps', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: reset_Steps 
                    { src: 'previousRule', mironName: 'rule427',     type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule427
                ],
        fanOut: [ { dest: 'goal', mironName: 'set_Slot{slot:"currentStep",value:"StepBegin"}', type: 'internal', weight: 1 } ], // do inner miron!: set_Slot{slot:"currentStep",value:"StepBegin"} 
      },
      { // RULE 1148 (1148): Recall visit and contact info
        name:  'rule1148',
        index: 1148,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ToAnalyseDB',             type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_ToAnalyseDB 
                    { src: 'activatedWM', mironName: 'hasVisitorChangedAtLeastOneSlot', type: 'wm',             weight: 0.5 } ], // is wm activated?: hasVisitorChangedAtLeastOneSlot
                ],
        fanOut: [ { dest: 'goal',      mironName: 'set_LTMQuery',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: set_LTMQuery 
                  { dest: 'inhibitWM', mironName: 'hasVisitorChangedAtLeastOneSlot', type: 'wm',             weight: 1 },   // inhibit wm!: hasVisitorChangedAtLeastOneSlot 
                  { dest: 'inhibitWM', mironName: 'isHelpAsked',                     type: 'wm',             weight: 1 } ], // inhibit wm!: isHelpAsked
      },
      { // RULE 1169 (1169): Perform DB query
        name:  'rule1169',
        index: 1169,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1148', type: 'rule', weight: 1 } ], // is previous rule active?: rule1148 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'recall_VisitorAndContact', type: 'internal', weight: 1 },   // do inner miron!: recall_VisitorAndContact 
                  { dest: 'goal',       mironName: 'log_MakeQuery',            type: 'internal', weight: 1 },   // do inner miron!: log_MakeQuery 
                  { dest: 'activateWM', mironName: 'isMakingQuery',            type: 'wm',       weight: 1 } ], // activate wm!: isMakingQuery
      },
      { // RULE 1208 (1208): Check what to do
        name:  'rule1208',
        index: 1208,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'recall_VisitorAndContact', type: 'internal', weight: 0.5 },   // is inner miron done?: recall_VisitorAndContact 
                    { src: 'previousRule', mironName: 'rule1169',                 type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule1169
                  [ { src: 'previousRule', mironName: 'rule1073', type: 'rule', weight: 1 } ], // is previous rule active?: rule1073 
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_CheckWhatToDo', type: 'internal', weight: 1 } ], // do inner miron!: log_CheckWhatToDo 
      },
      { // RULE 1073 (1073): Skip query
        name:  'rule1073',
        index: 1073,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ToAnalyseDB',             type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_ToAnalyseDB 
                    { src: 'inhibitedWM', mironName: 'hasVisitorChangedAtLeastOneSlot', type: 'wm',             weight: 0.5 } ], // is wm inhibited?: hasVisitorChangedAtLeastOneSlot
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_NoSlotChanged', type: 'internal', weight: 1 } ], // do inner miron!: log_NoSlotChanged 
      },
      { // RULE 1317 (1317): C1 case
        name:  'rule1317',
        index: 1317,
        fanIn:  [
                  [ { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.2 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.2 },   // is active?: contactFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 } ], // is active?: interlocutorFirstName
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 } ], // is active?: interlocutorFirstName
                ],
        fanOut: [],   
      },
      { // RULE 1328 (1328): V0: Verify visitor fullname
        name:  'rule1328',
        index: 1328,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'noVisitFound', type: 'slot', weight: 0.5 },   // is active?: noVisitFound 
                    { src: 'previousRule', mironName: 'rule1317',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1317
                  [ { src: 'previousRule', mironName: 'rule2933', type: 'rule', weight: 1 } ], // is previous rule active?: rule2933 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_CheckIdentity',                       type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity 
                  { dest: 'activateWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // activate wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V0"} 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'log_CaseC1V0',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC1V0 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 1370 (1370): At least one visit slot changed by visitor
        name:  'rule1370',
        index: 1370,
        fanIn:  [
                  [ { src: 'changedSlot', mironName: 'interlocutorTitle', type: 'slot', weight: 0.5 },   // is active?: interlocutorTitle 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',     type: 'wm',   weight: 0.5 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'interlocutorFirstName', type: 'slot', weight: 0.5 },   // is active?: interlocutorFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.5 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'interlocutorLastName', type: 'slot', weight: 0.5 },   // is active?: interlocutorLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',        type: 'wm',   weight: 0.5 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'contactFirstName', type: 'slot', weight: 0.5 },   // is active?: contactFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',    type: 'wm',   weight: 0.5 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'contactLastName', type: 'slot', weight: 0.5 },   // is active?: contactLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',   type: 'wm',   weight: 0.5 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'interlocutorCompany', type: 'slot', weight: 0.5 },   // is active?: interlocutorCompany 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',       type: 'wm',   weight: 0.5 } ], // is wm inhibited?: isMakingQuery
                ],
        fanOut: [],   
      },
      { // RULE 1390 (1390): C2 case
        name:  'rule1390',
        index: 1390,
        fanIn:  [
                  [ { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                ],
        fanOut: [],   
      },
      { // RULE 1489 (1489): Inform contact persons
        name:  'rule1489',
        index: 1489,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2656',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule2656 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                  [ { src: 'previousRule', mironName: 'rule3883',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule3883 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                  [ { src: 'previousRule', mironName: 'rule2671',                 type: 'rule', weight: 0.5 },   // is previous rule active?: rule2671 
                    { src: 'activatedWM',  mironName: 'isUserVisuallyRecognized', type: 'wm',   weight: 0.5 } ], // is wm activated?: isUserVisuallyRecognized
                ],
        fanOut: [ { dest: 'goal', mironName: 'close_Microphone', type: 'rightHand', weight: 1 } ], // do outer miron!: close_Microphone 
      },
      { // RULE 1499 (1499): Inform visitor I call the contact person
        name:  'rule1499',
        index: 1499,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1489', type: 'rule', weight: 1 } ], // is previous rule active?: rule1489 
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"inform_CallingContact"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_CallingContact"} 
                  { dest: 'goal', mironName: 'say_Something',                                                      type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 1523 (1523): Call the contact person
        name:  'rule1523',
        index: 1523,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1499',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1499
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_CallContact', type: 'internal',       weight: 1 },   // do inner miron!: log_CallContact 
                  { dest: 'goal',       mironName: 'request_ToCall',  type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToCall 
                  { dest: 'activateWM', mironName: 'isCallToContact', type: 'wm',             weight: 1 } ], // activate wm!: isCallToContact
      },
      { // RULE 1536 (1536): Make the call
        name:  'rule1536',
        index: 1536,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ToCall',     type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_ToCall 
                    { src: 'activatedWM', mironName: 'isVirtualTelephony', type: 'wm',             weight: 0.5 } ], // is wm activated?: isVirtualTelephony
                ],
        fanOut: [ { dest: 'goal', mironName: 'take_Phone',       type: 'rightHand',    weight: 1 },   // do outer miron!: take_Phone 
                  { dest: 'goal', mironName: 'setGazeTo_Left',   type: 'internalGaze', weight: 1 },   // do inner miron!: setGazeTo_Left 
                  { dest: 'goal', mironName: 'lookAt_Something', type: 'internalGaze', weight: 1 } ], // do inner miron!: lookAt_Something
      },
      { // RULE 1547 (1547): Call sucessful
        name:  'rule1547',
        index: 1547,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1346',          type: 'rule',   weight: 0.5 },   // is previous rule active?: rule1346 
                    { src: 'actionDone',   mironName: 'play_PhoneRinging', type: 'speech', weight: 0.5 } ], // is outer miron done?: play_PhoneRinging
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isCallSuccessful', type: 'wm', weight: 1 } ], // activate wm!: isCallSuccessful 
      },
      { // RULE 1553 (1553): Call sucessful
        name:  'rule1553',
        index: 1553,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1346',          type: 'rule',   weight: 0.5 },   // is previous rule active?: rule1346 
                    { src: 'actionDone',   mironName: 'play_PhoneRinging', type: 'speech', weight: 0.5 } ], // is outer miron done?: play_PhoneRinging
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isCallSuccessful', type: 'wm', weight: 1 } ], // inhibit wm!: isCallSuccessful 
      },
      { // RULE 1558 (1558): Inform visitor contact is coming
        name:  'rule1558',
        index: 1558,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1647',         type: 'rule', weight: 0.5 },   // is previous rule active?: rule1647 
                    { src: 'activatedWM',  mironName: 'isCallSuccessful', type: 'wm',   weight: 0.5 } ], // is wm activated?: isCallSuccessful
                ],
        fanOut: [ { dest: 'goal',       mironName: 'setMironSlot{mironType:"speech",mironName:"inform_ContactComing"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_ContactComing"} 
                  { dest: 'goal',       mironName: 'say_Something',                                                     type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'activateWM', mironName: 'isDialogCompleted',                                                 type: 'wm',             weight: 1 } ], // activate wm!: isDialogCompleted
      },
      { // RULE 1572 (1572): Inform visitor contact is not reached
        name:  'rule1572',
        index: 1572,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1715',                          type: 'rule',           weight: 0.5 },   // is previous rule active?: rule1715 
                    { src: 'intention',    mironName: 'request_ToSendEmailToContact_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ToSendEmailToContact_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'say_Something',                                                         type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"inform_ContactNotReached"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_ContactNotReached"}
      },
      { // RULE 1579 (1579): Call MST
        name:  'rule1579',
        index: 1579,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1580', type: 'rule', weight: 1 } ], // is previous rule active?: rule1580 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_ToCall', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToCall 
                  { dest: 'goal',       mironName: 'log_CallMST',    type: 'internal',       weight: 1 },   // do inner miron!: log_CallMST 
                  { dest: 'activateWM', mironName: 'isCallToMST',    type: 'wm',             weight: 1 } ], // activate wm!: isCallToMST
      },
      { // RULE 1580 (1580): Select MST phone number
        name:  'rule1580',
        index: 1580,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1572',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1572
                ],
        fanOut: [ { dest: 'goal', mironName: 'set_MSTPhoneNumber', type: 'internalSpeech', weight: 1 } ], // do inner miron!: set_MSTPhoneNumber 
      },
      { // RULE 1608 (1608): Inform visitor MST is coming
        name:  'rule1608',
        index: 1608,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1657',         type: 'rule', weight: 0.5 },   // is previous rule active?: rule1657 
                    { src: 'activatedWM',  mironName: 'isCallSuccessful', type: 'wm',   weight: 0.5 } ], // is wm activated?: isCallSuccessful
                  [ { src: 'inhibitedWM',  mironName: 'isCallSuccessful', type: 'wm',   weight: 0.5 },   // is wm inhibited?: isCallSuccessful 
                    { src: 'previousRule', mironName: 'rule1657',         type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1657
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isDialogCompleted',                                             type: 'wm',             weight: 1 },   // activate wm!: isDialogCompleted 
                  { dest: 'goal',       mironName: 'say_Something',                                                 type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',       mironName: 'setMironSlot{mironType:"speech",mironName:"inform_MSTComing"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_MSTComing"}
      },
      { // RULE 1611 (1611): Inform visitor MST is not reached
        name:  'rule1611',
        index: 1611,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'request_ToSendEmailToMST_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_ToSendEmailToMST_Done 
                    { src: 'previousRule', mironName: 'rule1619',                      type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1619
                ],
        fanOut: [ { dest: 'goal',       mironName: 'setMironSlot{mironType:"speech",mironName:"inform_MSTNotReached"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_MSTNotReached"} 
                  { dest: 'goal',       mironName: 'say_Something',                                                     type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'activateWM', mironName: 'isNobodyAnswered',                                                  type: 'wm',             weight: 1 } ], // activate wm!: isNobodyAnswered
      },
      { // RULE 1619 (1619): Send email to MST
        name:  'rule1619',
        index: 1619,
        fanIn:  [
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToSendEmailToMST', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToSendEmailToMST 
      },
      { // RULE 1633 (1633): Play email sound
        name:  'rule1633',
        index: 1633,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1638',             type: 'rule',      weight: 0.5 },   // is previous rule active?: rule1638 
                    { src: 'actionDone',   mironName: 'send_Email{id:"MST"}', type: 'rightHand', weight: 0.5 } ], // is outer miron done?: send_Email{id:"MST"}
                ],
        fanOut: [ { dest: 'goal', mironName: 'play_EmailSending', type: 'speech', weight: 1 } ], // do outer miron!: play_EmailSending 
      },
      { // RULE 1638 (1638): Send email to MST
        name:  'rule1638',
        index: 1638,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ToSendEmailToMST', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToSendEmailToMST 
                ],
        fanOut: [ { dest: 'goal', mironName: 'send_Email{id:"MST"}', type: 'rightHand', weight: 1 } ], // do outer miron!: send_Email{id:"MST"} 
      },
      { // RULE 1654 (1654): MST email done
        name:  'rule1654',
        index: 1654,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1633',          type: 'rule',   weight: 0.5 },   // is previous rule active?: rule1633 
                    { src: 'actionDone',   mironName: 'play_EmailSending', type: 'speech', weight: 0.5 } ], // is outer miron done?: play_EmailSending
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToSendEmailToMST_Done', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToSendEmailToMST_Done 
      },
      { // RULE 1660 (1660): Contact email done
        name:  'rule1660',
        index: 1660,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'play_EmailSending', type: 'speech', weight: 0.5 },   // is outer miron done?: play_EmailSending 
                    { src: 'previousRule', mironName: 'rule1675',          type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule1675
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToSendEmailToContact_Done', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToSendEmailToContact_Done 
      },
      { // RULE 1670 (1670): Send email to contact
        name:  'rule1670',
        index: 1670,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ToSendEmailToContact', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToSendEmailToContact 
                ],
        fanOut: [ { dest: 'goal', mironName: 'send_Email{id:"Contact"}', type: 'rightHand', weight: 1 } ], // do outer miron!: send_Email{id:"Contact"} 
      },
      { // RULE 1675 (1675): Play email sound
        name:  'rule1675',
        index: 1675,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1670',                 type: 'rule',      weight: 0.5 },   // is previous rule active?: rule1670 
                    { src: 'actionDone',   mironName: 'send_Email{id:"Contact"}', type: 'rightHand', weight: 0.5 } ], // is outer miron done?: send_Email{id:"Contact"}
                ],
        fanOut: [ { dest: 'goal', mironName: 'play_EmailSending', type: 'speech', weight: 1 } ], // do outer miron!: play_EmailSending 
      },
      { // RULE 1715 (1715): Send email to Contact
        name:  'rule1715',
        index: 1715,
        fanIn:  [
                  [ { src: 'inhibitedWM',  mironName: 'isCallSuccessful', type: 'wm',   weight: 0.5 },   // is wm inhibited?: isCallSuccessful 
                    { src: 'previousRule', mironName: 'rule1647',         type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1647
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToSendEmailToContact', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToSendEmailToContact 
      },
      { // RULE 1721 (1721): Check for GDPR
        name:  'rule1721',
        index: 1721,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1558',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1558
                  [ { src: 'previousRule', mironName: 'rule1608',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule1608 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                ],
        fanOut: [],   
      },
      { // RULE 1733 (1733): Propose to read GDPR consent
        name:  'rule1733',
        index: 1733,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1721',                type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule1721 
                    { src: 'emptySlot',    mironName: 'interlocutorConsentFlag', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorConsentFlag 
                    { src: 'emptySlot',    mironName: 'noNameVLastNameFound',    type: 'slot', weight: 0.3333333333333333 } ], // is active?: noNameVLastNameFound
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"inform_ToReadGDPR"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_ToReadGDPR"} 
                  { dest: 'goal', mironName: 'say_Something',                                                  type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 1748 (1748): Clean faceId and consent flag
        name:  'rule1748',
        index: 1748,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1767',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1767
                  [ { src: 'previousRule', mironName: 'rule1506', type: 'rule', weight: 1 } ], // is previous rule active?: rule1506 
                  [ { src: 'previousRule', mironName: 'rule1611',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule1611 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'clean_ConsentFlag', type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_ConsentFlag 
                  { dest: 'goal', mironName: 'clean_FaceId',      type: 'internalSpeech', weight: 1 } ], // do inner miron!: clean_FaceId
      },
      { // RULE 1753 (1753): Store consent
        name:  'rule1753',
        index: 1753,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1483', type: 'rule', weight: 1 } ], // is previous rule active?: rule1483 
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_StoreConsentFlagAndFaceId', type: 'internal', weight: 1 },   // do inner miron!: log_StoreConsentFlagAndFaceId 
                  { dest: 'goal', mironName: 'store_IdentityOfInterlocutor',  type: 'internal', weight: 1 } ], // do inner miron!: store_IdentityOfInterlocutor
      },
      { // RULE 1767 (1767): GDPR denied
        name:  'rule1767',
        index: 1767,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isDenyClicked', type: 'wm',   weight: 0.5 },   // is wm activated?: isDenyClicked 
                    { src: 'previousRule', mironName: 'rule1694',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1694
                  [ { src: 'activatedWM',  mironName: 'isDenyClicked', type: 'wm',   weight: 0.5 },   // is wm activated?: isDenyClicked 
                    { src: 'previousRule', mironName: 'rule1688',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1688
                ],
        fanOut: [ { dest: 'goal',      mironName: 'setMironSlot{mironType:"speech",mironName:"say_Ok"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Ok"} 
                  { dest: 'goal',      mironName: 'log_GDPRNotAgreed',                                   type: 'internal',       weight: 1 },   // do inner miron!: log_GDPRNotAgreed 
                  { dest: 'goal',      mironName: 'set_VisitorRegistered',                               type: 'internalSpeech', weight: 1 },   // do inner miron!: set_VisitorRegistered 
                  { dest: 'goal',      mironName: 'say_Something',                                       type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'inhibitWM', mironName: 'isDenyClicked',                                       type: 'wm',             weight: 1 } ], // inhibit wm!: isDenyClicked
      },
      { // RULE 1780 (1780): End dialog
        name:  'rule1780',
        index: 1780,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1721',                type: 'rule', weight: 0.5 },   // is previous rule active?: rule1721 
                    { src: 'filledSlot',   mironName: 'interlocutorConsentFlag', type: 'slot', weight: 0.5 } ], // is active?: interlocutorConsentFlag
                  [ { src: 'actionDone',   mironName: 'store_IdentityOfInterlocutor', type: 'internal', weight: 0.5 },   // is inner miron done?: store_IdentityOfInterlocutor 
                    { src: 'previousRule', mironName: 'rule1753',                     type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule1753
                  [ { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.5 },   // is active?: noNameVLastNameFound 
                    { src: 'previousRule', mironName: 'rule1721',             type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1721
                  [ { src: 'previousRule', mironName: 'rule1721', type: 'rule', weight: 0.5 },   // is previous rule active?: rule1721 
                    { src: 'activatedWM',  mironName: 'skipGDPR', type: 'wm',   weight: 0.5 } ], // is wm activated?: skipGDPR
                ],
        fanOut: [ { dest: 'goal',    mironName: 'request_EndDialog',  type: 'internalSpeech', weight: 1 },   // do inner miron!: request_EndDialog 
                  { dest: 'goal',    mironName: 'hide_MessageWindow', type: 'rightHand',      weight: 1 },   // do outer miron!: hide_MessageWindow 
                  { dest: 'resetWM', mironName: 'skipGDPR',           type: 'wm',             weight: 1 } ], // reset wm!: skipGDPR
      },
      { // RULE 1799 (1799): Inform to try again later
        name:  'rule1799',
        index: 1799,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isNobodyAnswered', type: 'wm',   weight: 0.5 },   // is wm activated?: isNobodyAnswered 
                    { src: 'previousRule', mironName: 'rule553',          type: 'rule', weight: 0.5 } ], // is previous rule active?: rule553
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isNobodyAnswered',                                                  type: 'wm',             weight: 1 },   // reset wm!: isNobodyAnswered 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"inform_TryAgainLater"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_TryAgainLater"} 
                  { dest: 'goal',    mironName: 'say_Something',                                                     type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 1818 (1818): GDPR agreed
        name:  'rule1818',
        index: 1818,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isConsentClicked', type: 'wm',   weight: 0.5 },   // is wm activated?: isConsentClicked 
                    { src: 'previousRule', mironName: 'rule1694',         type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1694
                  [ { src: 'activatedWM',  mironName: 'isConsentClicked', type: 'wm',   weight: 0.5 },   // is wm activated?: isConsentClicked 
                    { src: 'previousRule', mironName: 'rule1688',         type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1688
                ],
        fanOut: [ { dest: 'goal',      mironName: 'log_GDPRAgreed',                                      type: 'internal',       weight: 1 },   // do inner miron!: log_GDPRAgreed 
                  { dest: 'goal',      mironName: 'setMironSlot{mironType:"speech",mironName:"say_Ok"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Ok"} 
                  { dest: 'goal',      mironName: 'set_ConsentFlag',                                     type: 'internalSpeech', weight: 1 },   // do inner miron!: set_ConsentFlag 
                  { dest: 'goal',      mironName: 'set_VisitorRegistered',                               type: 'internalSpeech', weight: 1 },   // do inner miron!: set_VisitorRegistered 
                  { dest: 'goal',      mironName: 'say_Something',                                       type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'inhibitWM', mironName: 'isConsentClicked',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isConsentClicked
      },
      { // RULE 1346 (1346): Play ring tone
        name:  'rule1346',
        index: 1346,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'take_Phone', type: 'rightHand', weight: 0.5 },   // is outer miron done?: take_Phone 
                    { src: 'previousRule', mironName: 'rule1536',   type: 'rule',      weight: 0.5 } ], // is previous rule active?: rule1536
                ],
        fanOut: [ { dest: 'goal', mironName: 'play_PhoneRinging', type: 'speech', weight: 1 } ], // do outer miron!: play_PhoneRinging 
      },
      { // RULE 1444 (1444): Propose to click one of the buttons
        name:  'rule1444',
        index: 1444,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:15,id:"timeToReadConsent"}', type: 'internal', weight: 0.5 },   // is outer miron done?: wait_Timeout{timeout:15,id:"timeToReadConsent"} 
                    { src: 'previousRule', mironName: 'rule1694',                                        type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule1694
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"propose_ToPressConsent"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"propose_ToPressConsent"} 
                  { dest: 'goal', mironName: 'say_Something',                                                       type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 1483 (1483): Clean faceId and consent flag
        name:  'rule1483',
        index: 1483,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1748', type: 'rule', weight: 1 } ], // is previous rule active?: rule1748 
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1818',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1818
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToStoreInterlocutorConsent', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToStoreInterlocutorConsent 
      },
      { // RULE 1506 (1506): Propose to click one of the buttons
        name:  'rule1506',
        index: 1506,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1688',                                        type: 'rule',     weight: 0.5 },   // is previous rule active?: rule1688 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:60,id:"timeToGiveConsent"}', type: 'internal', weight: 0.5 } ], // is outer miron done?: wait_Timeout{timeout:60,id:"timeToGiveConsent"}
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_GDPRNoReaction',      type: 'internal',       weight: 1 },   // do inner miron!: log_GDPRNoReaction 
                  { dest: 'activateWM', mironName: 'isNoGDPRReaction',        type: 'wm',             weight: 1 },   // activate wm!: isNoGDPRReaction 
                  { dest: 'goal',       mironName: 'clean_VisitorRegistered', type: 'internalSpeech', weight: 1 } ], // do inner miron!: clean_VisitorRegistered
      },
      { // RULE 1535 (1535): Inform that session will be restarted
        name:  'rule1535',
        index: 1535,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isNoReaction', type: 'wm',   weight: 0.5 },   // is wm activated?: isNoReaction 
                    { src: 'previousRule', mironName: 'rule553',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule553
                ],
        fanOut: [ { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"inform_Restarting"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_Restarting"} 
                  { dest: 'goal',    mironName: 'say_Something',                                                  type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'resetWM', mironName: 'isNoReaction',                                                   type: 'wm',             weight: 1 } ], // reset wm!: isNoReaction
      },
      { // RULE 1647 (1647): Check call status
        name:  'rule1647',
        index: 1647,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'request_ToCall_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_ToCall_Done 
                    { src: 'previousRule', mironName: 'rule1523',            type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1523
                ],
        fanOut: [],   
      },
      { // RULE 1657 (1657): Check call status
        name:  'rule1657',
        index: 1657,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1579',            type: 'rule',           weight: 0.5 },   // is previous rule active?: rule1579 
                    { src: 'intention',    mironName: 'request_ToCall_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ToCall_Done
                ],
        fanOut: [],   
      },
      { // RULE 1683 (1683): End of call
        name:  'rule1683',
        index: 1683,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1547', type: 'rule', weight: 1 } ], // is previous rule active?: rule1547 
                  [ { src: 'previousRule', mironName: 'rule1553', type: 'rule', weight: 1 } ], // is previous rule active?: rule1553 
                ],
        fanOut: [ { dest: 'goal', mironName: 'drop_Phone',          type: 'rightHand',      weight: 1 },   // do outer miron!: drop_Phone 
                  { dest: 'goal', mironName: 'request_ToCall_Done', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToCall_Done 
                  { dest: 'goal', mironName: 'setGazeTo_Front',     type: 'internalGaze',   weight: 1 },   // do inner miron!: setGazeTo_Front 
                  { dest: 'goal', mironName: 'lookAt_Something',    type: 'internalGaze',   weight: 1 } ], // do inner miron!: lookAt_Something
      },
      { // RULE 1688 (1688): Give some more time to read GDPR
        name:  'rule1688',
        index: 1688,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1444',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule1444 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:60,id:"timeToGiveConsent"}', type: 'internal', weight: 1 } ], // do inner miron!: wait_Timeout{timeout:60,id:"timeToGiveConsent"} 
      },
      { // RULE 1694 (1694): Give some time to read GDPR 
        name:  'rule1694',
        index: 1694,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1709', type: 'rule', weight: 1 } ], // is previous rule active?: rule1709 
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:15,id:"timeToReadConsent"}', type: 'internal', weight: 1 } ], // do inner miron!: wait_Timeout{timeout:15,id:"timeToReadConsent"} 
      },
      { // RULE 1709 (1709): Display GDPR screen
        name:  'rule1709',
        index: 1709,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1733',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule1733
                ],
        fanOut: [ { dest: 'goal', mironName: 'display_GDPRConsent', type: 'rightHand', weight: 1 },   // do outer miron!: display_GDPRConsent 
                  { dest: 'goal', mironName: 'log_DisplayGDPR',     type: 'internal',  weight: 1 } ], // do inner miron!: log_DisplayGDPR
      },
      { // RULE 1842 (1842): Ask for full name or company name via keyboard because help requested
        name:  'rule1842',
        index: 1842,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1851',           type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule1851 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'ask_Something',                                                                                type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_Help_S3_",mironPostfix:"currentCase"}',         type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_Help_S3_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'generateMironSlot_Name',                                                                       type: 'internalSpeech', weight: 1 } ], // do inner miron!: generateMironSlot_Name
      },
      { // RULE 1851 (1851): Give help
        name:  'rule1851',
        index: 1851,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isHelpAsked',         type: 'wm',             weight: 0.5 },   // is wm activated?: isHelpAsked 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep3
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isHelpAsked',                                                                          type: 'wm',             weight: 1 },   // inhibit wm!: isHelpAsked 
                  { dest: 'goal',      mironName: 'say_Something',                                                                        type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',      mironName: 'setMironSlot{mironType:"speech",mironName:"say_Help_S3_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Help_S3_",mironPostfix:"currentCase"}
      },
      { // RULE 1905 (1905): Give help
        name:  'rule1905',
        index: 1905,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isHelpAsked',         type: 'wm',             weight: 0.5 },   // is wm activated?: isHelpAsked 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ActionStep4
                ],
        fanOut: [ { dest: 'goal',      mironName: 'setMironSlot{mironType:"speech",mironName:"say_Help_S4"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Help_S4"} 
                  { dest: 'goal',      mironName: 'say_Something',                                            type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'inhibitWM', mironName: 'isHelpAsked',                                              type: 'wm',             weight: 1 } ], // inhibit wm!: isHelpAsked
      },
      { // RULE 1914 (1914): Ask for full name or company name via keyboard because help requested
        name:  'rule1914',
        index: 1914,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule1905',           type: 'rule',           weight: 0.3333333333333333 },   // is previous rule active?: rule1905 
                    { src: 'inhibitedWM',  mironName: 'isInterrupted',      type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isInterrupted
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"ask_Help_S4_",mironPostfix:"currentCase"}',         type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"ask_Help_S4_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'ask_Something',                                                                                type: 'internalSpeech', weight: 1 },   // do inner miron!: ask_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"internalSpeech",mironName:"set_HintFor_",mironPostfix:"currentCase"} 
                  { dest: 'goal', mironName: 'generateMironSlot_Name',                                                                       type: 'internalSpeech', weight: 1 } ], // do inner miron!: generateMironSlot_Name
      },
      { // RULE 1496 (1496): C3 case
        name:  'rule1496',
        index: 1496,
        fanIn:  [
                  [ { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.2 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.2 } ], // is active?: contactFirstName
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 } ], // is active?: interlocutorCompany
                ],
        fanOut: [],   
      },
      { // RULE 1698 (1698): Inform that session will be restarted because this case is not treated
        name:  'rule1698',
        index: 1698,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isCaseNotHandled', type: 'wm',   weight: 0.5 },   // is wm activated?: isCaseNotHandled 
                    { src: 'previousRule', mironName: 'rule553',          type: 'rule', weight: 0.5 } ], // is previous rule active?: rule553
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isCaseNotHandled',                                                   type: 'wm',             weight: 1 },   // reset wm!: isCaseNotHandled 
                  { dest: 'goal',    mironName: 'say_Something',                                                      type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"inform_CaseNotHandled"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_CaseNotHandled"}
      },
      { // RULE 1930 (1930): C6 case
        name:  'rule1930',
        index: 1930,
        fanIn:  [
                  [ { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_CaseC6', type: 'internal', weight: 1 } ], // do inner miron!: log_CaseC6 
      },
      { // RULE 2005 (2005): Check what to do at start
        name:  'rule2005',
        index: 2005,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule523',                 type: 'rule',           weight: 0.5 },   // is previous rule active?: rule523 
                    { src: 'intention',    mironName: 'request_ToSayHello_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ToSayHello_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_CaseC0',                              type: 'internal', weight: 1 },   // do inner miron!: log_CaseC0 
                  { dest: 'goal', mironName: 'set_Slot{slot:"currentCase",value:"C0"}', type: 'internal', weight: 1 } ], // do inner miron!: set_Slot{slot:"currentCase",value:"C0"}
      },
      { // RULE 2019 (2019): Wait for visitor end of speech
        name:  'rule2019',
        index: 2019,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2005',          type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule2005 
                    { src: 'activatedWM',  mironName: 'isVisitorSpeaking', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isVisitorSpeaking 
                    { src: 'emptySlot',    mironName: 'noVisitToday',      type: 'slot', weight: 0.3333333333333333 } ], // is active?: noVisitToday
                ],
        fanOut: [ { dest: 'goal',      mironName: 'wait_ForVoiceAnswer',   type: 'internalSpeech', weight: 1 },   // do inner miron!: wait_ForVoiceAnswer 
                  { dest: 'inhibitWM', mironName: 'isV0',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',           type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isInterruptionEnabled', type: 'wm',             weight: 1 },   // inhibit wm!: isInterruptionEnabled 
                  { dest: 'inhibitWM', mironName: 'isV1',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                  type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2033 (2033): C0 case
        name:  'rule2033',
        index: 2033,
        fanIn:  [
                  [ { src: 'emptySlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'emptySlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'intention', mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                ],
        fanOut: [ { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C0"} 
                  { dest: 'goal',      mironName: 'log_CaseC0',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC0 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isVisitorUnderstood',                     type: 'wm',             weight: 1 },   // inhibit wm!: isVisitorUnderstood 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 1882 (1882): Perform DB query
        name:  'rule1882',
        index: 1882,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1893', type: 'rule', weight: 1 } ], // is previous rule active?: rule1893 
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_CheckIfNoVisitToday',  type: 'internal', weight: 1 },   // do inner miron!: log_CheckIfNoVisitToday 
                  { dest: 'goal', mironName: 'recall_VisitorAndContact', type: 'internal', weight: 1 } ], // do inner miron!: recall_VisitorAndContact
      },
      { // RULE 1893 (1893): Recall visit and contact info
        name:  'rule1893',
        index: 1893,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_CheckDBEmpty', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_CheckDBEmpty 
                ],
        fanOut: [ { dest: 'goal', mironName: 'set_LTMQuery', type: 'internalSpeech', weight: 1 } ], // do inner miron!: set_LTMQuery 
      },
      { // RULE 1997 (1997): No visit today
        name:  'rule1997',
        index: 1997,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2005',     type: 'rule', weight: 0.5 },   // is previous rule active?: rule2005 
                    { src: 'filledSlot',   mironName: 'noVisitToday', type: 'slot', weight: 0.5 } ], // is active?: noVisitToday
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_EndDialog 
      },
      { // RULE 2035 (2035): Inform that no visit planed for today
        name:  'rule2035',
        index: 2035,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'noVisitToday', type: 'slot', weight: 0.5 },   // is active?: noVisitToday 
                    { src: 'previousRule', mironName: 'rule553',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule553
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"inform_NoVisitToday"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_NoVisitToday"} 
                  { dest: 'goal', mironName: 'say_Something',                                                    type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 2146 (2146): Visitor is silent by keyboard
        name:  'rule2146',
        index: 2146,
        fanIn:  [
                  [ { src: 'inhibitedWM',  mironName: 'hasVisitorFinishedClicking', type: 'wm',   weight: 0.3333333333333333 },   // is wm inhibited?: hasVisitorFinishedClicking 
                    { src: 'previousRule', mironName: 'rule2150',                   type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule2150 
                    { src: 'activatedWM',  mironName: 'isVisitorAsweringByButton',  type: 'wm',   weight: 0.3333333333333333 } ], // is wm activated?: isVisitorAsweringByButton
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isNoInput',                   type: 'wm',             weight: 1 },   // activate wm!: isNoInput 
                  { dest: 'goal',       mironName: 'request_NextQuestion',        type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'log_VisitorIsSilentByButton', type: 'internal',       weight: 1 } ], // do inner miron!: log_VisitorIsSilentByButton
      },
      { // RULE 2150 (2150): Wait for visitor to answer by button
        name:  'rule2150',
        index: 2150,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2162', type: 'rule', weight: 1 } ], // is previous rule active?: rule2162 
                  [ { src: 'previousRule', mironName: 'rule2155', type: 'rule', weight: 1 } ], // is previous rule active?: rule2155 
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_WaitForVisitorToAnswerByButton',       type: 'internal', weight: 1 },   // do inner miron!: log_WaitForVisitorToAnswerByButton 
                  { dest: 'goal', mironName: 'wait_Timeout{timeout:3,id:"timeToClick"}', type: 'internal', weight: 1 } ], // do inner miron!: wait_Timeout{timeout:3,id:"timeToClick"}
      },
      { // RULE 2155 (2155): Init button answering process
        name:  'rule2155',
        index: 2155,
        fanIn:  [
                  [ { src: 'intention', mironName: 'wait_ForButtonAnswer', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: wait_ForButtonAnswer 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isVisitorAsweringByButton', type: 'wm',        weight: 1 },   // inhibit wm!: isVisitorAsweringByButton 
                  { dest: 'resetWM',   mironName: 'isVisitorUnderstood',       type: 'wm',        weight: 1 },   // reset wm!: isVisitorUnderstood 
                  { dest: 'inhibitWM', mironName: 'isTooNoisy',                type: 'wm',        weight: 1 },   // inhibit wm!: isTooNoisy 
                  { dest: 'goal',      mironName: 'display_Buttons',           type: 'rightHand', weight: 1 } ], // do outer miron!: display_Buttons
      },
      { // RULE 2158 (2158): Visitor answered by keyboard
        name:  'rule2158',
        index: 2158,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2150',                   type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule2150 
                    { src: 'activatedWM',  mironName: 'isVisitorAsweringByButton',  type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isVisitorAsweringByButton 
                    { src: 'activatedWM',  mironName: 'hasVisitorFinishedClicking', type: 'wm',   weight: 0.3333333333333333 } ], // is wm activated?: hasVisitorFinishedClicking
                ],
        fanOut: [ { dest: 'goal',    mironName: 'request_ToCheckAnswer',       type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToCheckAnswer 
                  { dest: 'resetWM', mironName: 'isNoInput',                   type: 'wm',             weight: 1 },   // reset wm!: isNoInput 
                  { dest: 'goal',    mironName: 'log_VisitorAnsweredByButton', type: 'internal',       weight: 1 } ], // do inner miron!: log_VisitorAnsweredByButton
      },
      { // RULE 2162 (2162): Visitor is answering
        name:  'rule2162',
        index: 2162,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isVisitorClicking',         type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isVisitorClicking 
                    { src: 'previousRule', mironName: 'rule2150',                  type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule2150 
                    { src: 'inhibitedWM',  mironName: 'isVisitorAsweringByButton', type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isVisitorAsweringByButton
                  [ { src: 'previousRule', mironName: 'rule2150',                                 type: 'rule',     weight: 0.3333333333333333 },   // is previous rule active?: rule2150 
                    { src: 'activatedWM',  mironName: 'isVisitorClicking',                        type: 'wm',       weight: 0.3333333333333333 },   // is wm activated?: isVisitorClicking 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:3,id:"timeToClick"}', type: 'internal', weight: 0.3333333333333333 } ], // is outer miron done?: wait_Timeout{timeout:3,id:"timeToClick"}
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isVisitorAsweringByButton',    type: 'wm',       weight: 1 },   // activate wm!: isVisitorAsweringByButton 
                  { dest: 'goal',       mironName: 'log_VisitorAnsweringByButton', type: 'internal', weight: 1 } ], // do inner miron!: log_VisitorAnsweringByButton
      },
      { // RULE 2348 (2348): At least one visit slot changed
        name:  'rule2348',
        index: 2348,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isMakingQuery',       type: 'wm',   weight: 0.5 },   // is wm activated?: isMakingQuery 
                    { src: 'changedSlot', mironName: 'interlocutorCompany', type: 'slot', weight: 0.5 } ], // is active?: interlocutorCompany
                  [ { src: 'activatedWM', mironName: 'isMakingQuery',   type: 'wm',   weight: 0.5 },   // is wm activated?: isMakingQuery 
                    { src: 'changedSlot', mironName: 'contactLastName', type: 'slot', weight: 0.5 } ], // is active?: contactLastName
                  [ { src: 'activatedWM', mironName: 'isMakingQuery',    type: 'wm',   weight: 0.5 },   // is wm activated?: isMakingQuery 
                    { src: 'changedSlot', mironName: 'contactFirstName', type: 'slot', weight: 0.5 } ], // is active?: contactFirstName
                  [ { src: 'activatedWM', mironName: 'isMakingQuery',        type: 'wm',   weight: 0.5 },   // is wm activated?: isMakingQuery 
                    { src: 'changedSlot', mironName: 'interlocutorLastName', type: 'slot', weight: 0.5 } ], // is active?: interlocutorLastName
                  [ { src: 'activatedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.5 },   // is wm activated?: isMakingQuery 
                    { src: 'changedSlot', mironName: 'interlocutorFirstName', type: 'slot', weight: 0.5 } ], // is active?: interlocutorFirstName
                  [ { src: 'activatedWM', mironName: 'isMakingQuery',     type: 'wm',   weight: 0.5 },   // is wm activated?: isMakingQuery 
                    { src: 'changedSlot', mironName: 'interlocutorTitle', type: 'slot', weight: 0.5 } ], // is active?: interlocutorTitle
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_AtLeastOneSlotChangedByDB', type: 'internal', weight: 1 },   // do inner miron!: log_AtLeastOneSlotChangedByDB 
                  { dest: 'activateWM', mironName: 'hasDBChangedAtLeastOneSlot',    type: 'wm',       weight: 1 } ], // activate wm!: hasDBChangedAtLeastOneSlot
      },
      { // RULE 2375 (2375): K0: Choose contact from button list
        name:  'rule2375',
        index: 2375,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1317',             type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule1317 
                    { src: 'filledSlot',   mironName: 'multipleContactFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleContactFound 
                    { src: 'filledSlot',   mironName: 'singleCompanyFound',   type: 'slot', weight: 0.3333333333333333 } ], // is active?: singleCompanyFound
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_DisplayC1K0',                         type: 'internal',       weight: 1 },   // do inner miron!: log_DisplayC1K0 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'activateWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // activate wm!: isSelection 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"K0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"K0"} 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 1759 (1759): MK: Make calls
        name:  'rule1759',
        index: 1759,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleCompanyFound',              type: 'slot', weight: 0.14285714285714285 },   // is active?: singleCompanyFound 
                    { src: 'previousRule', mironName: 'rule1317',                        type: 'rule', weight: 0.14285714285714285 },   // is previous rule active?: rule1317 
                    { src: 'filledSlot',   mironName: 'singleContactFound',              type: 'slot', weight: 0.14285714285714285 },   // is active?: singleContactFound 
                    { src: 'filledSlot',   mironName: 'singleVisitFound',                type: 'slot', weight: 0.14285714285714285 },   // is active?: singleVisitFound 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: 0.14285714285714285 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: 0.14285714285714285 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.14285714285714285 } ], // is wm inhibited?: isContactLastNameOnlyRecognized
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToMakeCalls',                            type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToMakeCalls 
                  { dest: 'goal', mironName: 'log_InformContact',                              type: 'internal',       weight: 1 },   // do inner miron!: log_InformContact 
                  { dest: 'goal', mironName: 'set_Slot{slot:"currentCase",value:"MakeCalls"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"MakeCalls"} 
                  { dest: 'goal', mironName: 'log_CaseC1Calls',                                type: 'internal',       weight: 1 } ], // do inner miron!: log_CaseC1Calls
      },
      { // RULE 2331 (2331): Close microphone
        name:  'rule2331',
        index: 2331,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isVoiceExpected', type: 'wm',             weight: 0.5 },   // is wm inhibited?: isVoiceExpected 
                    { src: 'intention',   mironName: 'ask_Something',   type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: ask_Something
                ],
        fanOut: [ { dest: 'goal', mironName: 'close_Microphone', type: 'rightHand', weight: 1 } ], // do outer miron!: close_Microphone 
      },
      { // RULE 2385 (2385): Ask something done
        name:  'rule2385',
        index: 2385,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'generateMironSlot_Text', type: 'speech', weight: 0.5 },   // is outer miron done?: generateMironSlot_Text 
                    { src: 'previousRule', mironName: 'rule782',                type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule782
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isSomethingAsked', type: 'wm', weight: 1 } ], // activate wm!: isSomethingAsked 
      },
      { // RULE 2399 (2399): Open microphone
        name:  'rule2399',
        index: 2399,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'ask_Something',   type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: ask_Something 
                    { src: 'activatedWM', mironName: 'isVoiceExpected', type: 'wm',             weight: 0.5 } ], // is wm activated?: isVoiceExpected
                ],
        fanOut: [ { dest: 'goal', mironName: 'open_Microphone', type: 'rightHand', weight: 1 } ], // do outer miron!: open_Microphone 
      },
      { // RULE 2086 (2086): Inform could not hear
        name:  'rule2086',
        index: 2086,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isContactNotInList',  type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isContactNotInList 
                    { src: 'activatedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep2
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_EndDialog 
      },
      { // RULE 2117 (2117): Inform that I do not have other contact to call
        name:  'rule2117',
        index: 2117,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isContactNotInList', type: 'wm',   weight: 0.5 },   // is wm activated?: isContactNotInList 
                    { src: 'previousRule', mironName: 'rule553',            type: 'rule', weight: 0.5 } ], // is previous rule active?: rule553
                ],
        fanOut: [ { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"inform_NoOtherContact"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_NoOtherContact"} 
                  { dest: 'goal',    mironName: 'say_Something',                                                      type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'resetWM', mironName: 'isContactNotInList',                                                 type: 'wm',             weight: 1 } ], // reset wm!: isContactNotInList
      },
      { // RULE 2221 (2221): Say my contact is not in the list
        name:  'rule2221',
        index: 2221,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'say_MyContactIsNotInList', type: 'speech', weight: 0.5 },   // is outer miron recognized?: say_MyContactIsNotInList 
                    { src: 'activatedWM', mironName: 'isSelection',              type: 'wm',     weight: 0.5 } ], // is wm activated?: isSelection
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isContactNotInList', type: 'wm', weight: 1 } ], // activate wm!: isContactNotInList 
      },
      { // RULE 2095 (2095): Hide keyboard
        name:  'rule2095',
        index: 2095,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isKeyboardExpected', type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isKeyboardExpected 
                    { src: 'intention',   mironName: 'ask_Something',      type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: ask_Something 
                    { src: 'inhibitedWM', mironName: 'isButtonExpected',   type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isButtonExpected
                ],
        fanOut: [],   
      },
      { // RULE 2108 (2108): Display keyboard
        name:  'rule2108',
        index: 2108,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'ask_Something',      type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: ask_Something 
                    { src: 'activatedWM', mironName: 'isKeyboardExpected', type: 'wm',             weight: 0.5 } ], // is wm activated?: isKeyboardExpected
                ],
        fanOut: [],   
      },
      { // RULE 2253 (2253): Display buttons
        name:  'rule2253',
        index: 2253,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isButtonExpected', type: 'wm',             weight: 0.5 },   // is wm activated?: isButtonExpected 
                    { src: 'intention',   mironName: 'ask_Something',    type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: ask_Something
                ],
        fanOut: [],   
      },
      { // RULE 2257 (2257): Hide buttons
        name:  'rule2257',
        index: 2257,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'ask_Something',      type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: ask_Something 
                    { src: 'inhibitedWM', mironName: 'isButtonExpected',   type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isButtonExpected 
                    { src: 'inhibitedWM', mironName: 'isKeyboardExpected', type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isKeyboardExpected
                ],
        fanOut: [],   
      },
      { // RULE 2277 (2277): Select voice device
        name:  'rule2277',
        index: 2277,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.125 },   // is wm inhibited?: isSelection 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV4 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.125 },   // is inner miron recognized?: request_ActionStep2 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.125 } ], // is wm inhibited?: isV5
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.125 },   // is wm inhibited?: isSelection 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV4 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.125 },   // is inner miron recognized?: request_ActionStep1 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.125 } ], // is wm inhibited?: isV5
                  [ { src: 'activatedWM', mironName: 'isV0',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep1
                  [ { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep2 
                    { src: 'activatedWM', mironName: 'isV0',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isSelection
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV1',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep1
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV1',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep2
                  [ { src: 'activatedWM', mironName: 'isV2',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep1
                  [ { src: 'activatedWM', mironName: 'isV2',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep2
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV3',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV3 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep1
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV3',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV3 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep2
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV4',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV4 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep1
                  [ { src: 'activatedWM', mironName: 'isV4',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV4 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep2
                  [ { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep1 
                    { src: 'activatedWM', mironName: 'isV5',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV5 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isSelection
                  [ { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep2 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV5',                type: 'wm',             weight: 0.3333333333333333 } ], // is wm activated?: isV5
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isButtonExpected',   type: 'wm', weight: 1 },   // inhibit wm!: isButtonExpected 
                  { dest: 'inhibitWM',  mironName: 'isKeyboardExpected', type: 'wm', weight: 1 },   // inhibit wm!: isKeyboardExpected 
                  { dest: 'activateWM', mironName: 'isVoiceExpected',    type: 'wm', weight: 1 } ], // activate wm!: isVoiceExpected
      },
      { // RULE 2378 (2378): Select keyboard device
        name:  'rule2378',
        index: 2378,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.125 },   // is inner miron recognized?: request_ActionStep4 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.125 },   // is wm inhibited?: isSelection 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.125 } ], // is wm inhibited?: isV5
                  [ { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.125 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.125 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV0 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV4 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.125 } ], // is wm inhibited?: isV5
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isVoiceExpected',    type: 'wm', weight: 1 },   // inhibit wm!: isVoiceExpected 
                  { dest: 'activateWM', mironName: 'isKeyboardExpected', type: 'wm', weight: 1 },   // activate wm!: isKeyboardExpected 
                  { dest: 'inhibitWM',  mironName: 'isButtonExpected',   type: 'wm', weight: 1 } ], // inhibit wm!: isButtonExpected
      },
      { // RULE 2501 (2501): Expect buttons
        name:  'rule2501',
        index: 2501,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV2',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep3
                  [ { src: 'activatedWM', mironName: 'isV2',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV0 
                    { src: 'activatedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.125 },   // is wm activated?: isSelection 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV4 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.125 },   // is inner miron recognized?: request_ActionStep1 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.125 } ], // is wm inhibited?: isV5
                  [ { src: 'inhibitedWM', mironName: 'isV0',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV0 
                    { src: 'activatedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.125 },   // is wm activated?: isSelection 
                    { src: 'inhibitedWM', mironName: 'isV1',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV1 
                    { src: 'inhibitedWM', mironName: 'isV2',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV2 
                    { src: 'inhibitedWM', mironName: 'isV3',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV3 
                    { src: 'inhibitedWM', mironName: 'isV4',                type: 'wm',             weight: 0.125 },   // is wm inhibited?: isV4 
                    { src: 'intention',   mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 0.125 },   // is inner miron recognized?: request_ActionStep2 
                    { src: 'inhibitedWM', mironName: 'isV5',                type: 'wm',             weight: 0.125 } ], // is wm inhibited?: isV5
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV1',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'activatedWM', mironName: 'isV1',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep3
                  [ { src: 'activatedWM', mironName: 'isV0',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV0',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep3
                  [ { src: 'activatedWM', mironName: 'isV3',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV3 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep3
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV3',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV3 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV4',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV4 
                    { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep3
                  [ { src: 'activatedWM', mironName: 'isV4',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV4 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'activatedWM', mironName: 'isV5',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV5 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 } ], // is wm inhibited?: isSelection
                  [ { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep4 
                    { src: 'inhibitedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isSelection 
                    { src: 'activatedWM', mironName: 'isV5',                type: 'wm',             weight: 0.3333333333333333 } ], // is wm activated?: isV5
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isButtonExpected',   type: 'wm', weight: 1 },   // activate wm!: isButtonExpected 
                  { dest: 'inhibitWM',  mironName: 'isKeyboardExpected', type: 'wm', weight: 1 },   // inhibit wm!: isKeyboardExpected 
                  { dest: 'inhibitWM',  mironName: 'isVoiceExpected',    type: 'wm', weight: 1 } ], // inhibit wm!: isVoiceExpected
      },
      { // RULE 2584 (2584): Inform could not hear
        name:  'rule2584',
        index: 2584,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isV0',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isNoInput 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isNoInput 
                    { src: 'activatedWM', mironName: 'isV1',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isNoInput 
                    { src: 'activatedWM', mironName: 'isV2',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'activatedWM', mironName: 'isV3',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV3 
                    { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isNoInput 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'activatedWM', mironName: 'isV4',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV4 
                    { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isNoInput 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                  [ { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isNoInput 
                    { src: 'activatedWM', mironName: 'isV5',                type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isV5 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep4
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_EndDialog 
                  { dest: 'inhibitWM',  mironName: 'isV0',              type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isV1',              type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',              type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'activateWM', mironName: 'isNoReaction',      type: 'wm',             weight: 1 },   // activate wm!: isNoReaction 
                  { dest: 'goal',       mironName: 'hide_Buttons',      type: 'rightHand',      weight: 1 },   // do outer miron!: hide_Buttons 
                  { dest: 'inhibitWM',  mironName: 'isV3',              type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',              type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',              type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2590 (2590): Say my contact is not in the list
        name:  'rule2590',
        index: 2590,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isYesNoEnabled', type: 'wm',     weight: 0.5 },   // is wm activated?: isYesNoEnabled 
                    { src: 'intention',   mironName: 'say_YesIAm',     type: 'speech', weight: 0.5 } ], // is outer miron recognized?: say_YesIAm
                  [ { src: 'activatedWM', mironName: 'isYesNoEnabled', type: 'wm',     weight: -0.5 },   // is wm activated?: isYesNoEnabled 
                    { src: 'intention',   mironName: 'say_NoIAmNot',   type: 'speech', weight: -0.5 } ], // is outer miron recognized?: say_NoIAmNot
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isNameDisconfirmed', type: 'wm', weight: 1 },   // inhibit wm!: isNameDisconfirmed 
                  { dest: 'activateWM', mironName: 'isNameConfirmed',    type: 'wm', weight: 1 } ], // activate wm!: isNameConfirmed
      },
      { // RULE 2610 (2610): Say my contact is not in the list
        name:  'rule2610',
        index: 2610,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'say_NoIAmNot',   type: 'speech', weight: 0.5 },   // is outer miron recognized?: say_NoIAmNot 
                    { src: 'activatedWM', mironName: 'isYesNoEnabled', type: 'wm',     weight: 0.5 } ], // is wm activated?: isYesNoEnabled
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isNameConfirmed',    type: 'wm', weight: 1 },   // inhibit wm!: isNameConfirmed 
                  { dest: 'activateWM', mironName: 'isNameDisconfirmed', type: 'wm', weight: 1 } ], // activate wm!: isNameDisconfirmed
      },
      { // RULE 2628 (2628): Ask something
        name:  'rule2628',
        index: 2628,
        fanIn:  [
                  [ { src: 'intention', mironName: 'clean_RecognitionStates', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: clean_RecognitionStates 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isContactNotInList', type: 'wm', weight: 1 },   // inhibit wm!: isContactNotInList 
                  { dest: 'resetWM',   mironName: 'isRepeat',           type: 'wm', weight: 1 },   // reset wm!: isRepeat 
                  { dest: 'resetWM',   mironName: 'isHelp',             type: 'wm', weight: 1 },   // reset wm!: isHelp 
                  { dest: 'inhibitWM', mironName: 'isNameConfirmed',    type: 'wm', weight: 1 },   // inhibit wm!: isNameConfirmed 
                  { dest: 'inhibitWM', mironName: 'isNameDisconfirmed', type: 'wm', weight: 1 } ], // inhibit wm!: isNameDisconfirmed
      },
      { // RULE 2691 (2691): C0 case
        name:  'rule2691',
        index: 2691,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule2262',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule2262
                ],
        fanOut: [ { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"C0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C0"} 
                  { dest: 'goal',       mironName: 'log_CaseC0',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC0 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'activateWM', mironName: 'isInterruptionEnabled',                   type: 'wm',             weight: 1 },   // activate wm!: isInterruptionEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'activateWM', mironName: 'isBasicQuestion',                         type: 'wm',             weight: 1 },   // activate wm!: isBasicQuestion 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2698 (2698): Inform could not hear
        name:  'rule2698',
        index: 2698,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'activatedWM',  mironName: 'isV0',               type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4859
                  [ { src: 'activatedWM',  mironName: 'isV1',               type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4859
                  [ { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'activatedWM',  mironName: 'isV2',               type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4859
                  [ { src: 'activatedWM',  mironName: 'isV3',               type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV3 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4859
                  [ { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'activatedWM',  mironName: 'isV4',               type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV4 
                    { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4859
                  [ { src: 'activatedWM',  mironName: 'isV5',               type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV5 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4859
                ],
        fanOut: [ { dest: 'goal',      mironName: 'clean_VisitSlots',                type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_VisitSlots 
                  { dest: 'inhibitWM', mironName: 'isInterruptionEnabled',           type: 'wm',             weight: 1 },   // inhibit wm!: isInterruptionEnabled 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                  type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isFirstNameOnlyRecognized',       type: 'wm',             weight: 1 },   // inhibit wm!: isFirstNameOnlyRecognized 
                  { dest: 'inhibitWM', mironName: 'isCompanyOnlyRecognized',         type: 'wm',             weight: 1 },   // inhibit wm!: isCompanyOnlyRecognized 
                  { dest: 'inhibitWM', mironName: 'isContactLastNameOnlyRecognized', type: 'wm',             weight: 1 } ], // inhibit wm!: isContactLastNameOnlyRecognized
      },
      { // RULE 2714 (2714): Try a DB Query without company name
        name:  'rule2714',
        index: 2714,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isV0',                            type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isNameConfirmed 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isContactLastNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule4823',                        type: 'rule', weight: 0.16666666666666666 } ], // is previous rule active?: rule4823
                  [ { src: 'activatedWM',  mironName: 'isNameConfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isV1',            type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'previousRule', mironName: 'rule4823',        type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4823
                  [ { src: 'activatedWM',  mironName: 'isNameConfirmed', type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isV2',            type: 'wm',   weight: 0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'previousRule', mironName: 'rule4823',        type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule4823
                  [ { src: 'activatedWM',  mironName: 'isV0',                            type: 'wm',   weight: -0.1111111111111111 },   // is wm activated?: isV0 
                    { src: 'previousRule', mironName: 'rule4817',                        type: 'rule', weight: -0.1111111111111111 },   // is previous rule active?: rule4817 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: -0.1111111111111111 },   // is wm activated?: isNameConfirmed 
                    { src: 'emptySlot',    mironName: 'interlocutorCompany',             type: 'slot', weight: -0.1111111111111111 },   // is active?: interlocutorCompany 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: -0.1111111111111111 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: -0.1111111111111111 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: -0.1111111111111111 },   // is wm inhibited?: isContactLastNameOnlyRecognized 
                    { src: 'emptySlot',    mironName: 'contactFirstName',                type: 'slot', weight: -0.1111111111111111 },   // is active?: contactFirstName 
                    { src: 'emptySlot',    mironName: 'contactLastName',                 type: 'slot', weight: -0.1111111111111111 } ], // is active?: contactLastName
                ],
        fanOut: [ { dest: 'goal',      mironName: 'clean_CompanyAndContact', type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_CompanyAndContact 
                  { dest: 'inhibitWM', mironName: 'isV0',                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isV1',                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2130 (2130): This extra step allows to have the next step after the reset
        name:  'rule2130',
        index: 2130,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_NextQuestion 
                ],
        fanOut: [ { dest: 'goal', mironName: 'next_Step', type: 'internalSpeech', weight: 1 } ], // do inner miron!: next_Step 
      },
      { // RULE 2082 (2082): Prevent visit slot change to trigger DB query
        name:  'rule2082',
        index: 2082,
        fanIn:  [
                  [ { src: 'intention', mironName: 'clean_InterlocutorName', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: clean_InterlocutorName 
                  [ { src: 'intention', mironName: 'clean_VisitSlots', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: clean_VisitSlots 
                  [ { src: 'intention', mironName: 'clean_CompanyAndContact', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: clean_CompanyAndContact 
                  [ { src: 'intention', mironName: 'clean_Contact', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: clean_Contact 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isQueryEnabled', type: 'wm', weight: 1 } ], // inhibit wm!: isQueryEnabled 
      },
      { // RULE 2262 (2262): Inform could not hear
        name:  'rule2262',
        index: 2262,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2698', type: 'rule', weight: 1 } ], // is previous rule active?: rule2698 
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_MyMistake"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_MyMistake"} 
                  { dest: 'goal', mironName: 'say_Something',                                              type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 2249 (2249): Say hello
        name:  'rule2249',
        index: 2249,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2271',             type: 'rule', weight: 0.5 },   // is previous rule active?: rule2271 
                    { src: 'emptySlot',    mironName: 'interlocutorLastName', type: 'slot', weight: 0.5 } ], // is active?: interlocutorLastName
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_Hello"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Hello"} 
                  { dest: 'goal', mironName: 'say_Something',                                          type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 2271 (2271): Get phase of day
        name:  'rule2271',
        index: 2271,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ToSayHello', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToSayHello 
                ],
        fanOut: [ { dest: 'goal', mironName: 'get_PhaseOfDay', type: 'internal', weight: 1 } ], // do inner miron!: get_PhaseOfDay 
      },
      { // RULE 2313 (2313): Allow detection of slot changes
        name:  'rule2313',
        index: 2313,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1208', type: 'rule', weight: 1 } ], // is previous rule active?: rule1208 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isMakingQuery',              type: 'wm',             weight: 1 },   // inhibit wm!: isMakingQuery 
                  { dest: 'goal',      mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToAnalyseSituation
      },
      { // RULE 2517 (2517): Say I am Meisy
        name:  'rule2517',
        index: 2517,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule2249',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule2249
                ],
        fanOut: [ { dest: 'goal', mironName: 'say_Something',                                             type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_IAmMeisy"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_IAmMeisy"}
      },
      { // RULE 2526 (2526): Welcome message done
        name:  'rule2526',
        index: 2526,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2517',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule2517 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                  [ { src: 'previousRule', mironName: 'rule4120',           type: 'rule',           weight: 0.5 },   // is previous rule active?: rule4120 
                    { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something_Done
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToSayHello_Done', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToSayHello_Done 
      },
      { // RULE 2549 (2549): Ask first question
        name:  'rule2549',
        index: 2549,
        fanIn:  [
                  [ { src: 'inhibitedWM',  mironName: 'isVisitorSpeaking', type: 'wm',   weight: 0.3333333333333333 },   // is wm inhibited?: isVisitorSpeaking 
                    { src: 'previousRule', mironName: 'rule2005',          type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule2005 
                    { src: 'emptySlot',    mironName: 'noVisitToday',      type: 'slot', weight: 0.3333333333333333 } ], // is active?: noVisitToday
                ],
        fanOut: [ { dest: 'goal',      mironName: 'request_ToAnalyseDB',   type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToAnalyseDB 
                  { dest: 'inhibitWM', mironName: 'isInterruptionEnabled', type: 'wm',             weight: 1 },   // inhibit wm!: isInterruptionEnabled 
                  { dest: 'inhibitWM', mironName: 'isBasicQuestion',       type: 'wm',             weight: 1 },   // inhibit wm!: isBasicQuestion 
                  { dest: 'inhibitWM', mironName: 'isSelection',           type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isV0',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isV1',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                  type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                  type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2302 (2302): I am interrupted
        name:  'rule2302',
        index: 2302,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule947',       type: 'rule', weight: 0.5 } ], // is previous rule active?: rule947
                ],
        fanOut: [],   
      },
      { // RULE 2518 (2518): My speech was interrupted by new information from visitor
        name:  'rule2518',
        index: 2518,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isInterruptable',   type: 'wm', weight: 0.3333333333333333 },   // is wm activated?: isInterruptable 
                    { src: 'activatedWM', mironName: 'isLastSpeechKnown', type: 'wm', weight: 0.3333333333333333 },   // is wm activated?: isLastSpeechKnown 
                    { src: 'inhibitedWM', mironName: 'isYesNoEnabled',    type: 'wm', weight: 0.3333333333333333 } ], // is wm inhibited?: isYesNoEnabled
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isInterrupted',       type: 'wm',       weight: 1 },   // activate wm!: isInterrupted 
                  { dest: 'goal',       mironName: 'log_IWasInterrupted', type: 'internal', weight: 1 },   // do inner miron!: log_IWasInterrupted 
                  { dest: 'inhibitWM',  mironName: 'isInterruptable',     type: 'wm',       weight: 1 } ], // inhibit wm!: isInterruptable
      },
      { // RULE 2571 (2571): Check what visitor said
        name:  'rule2571',
        index: 2571,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule2518',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule2518
                ],
        fanOut: [ { dest: 'goal',      mironName: 'request_ToCheckAnswer', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToCheckAnswer 
                  { dest: 'inhibitWM', mironName: 'isInterrupted',         type: 'wm',             weight: 1 } ], // inhibit wm!: isInterrupted
      },
      { // RULE 2656 (2656): Thank visitor with name
        name:  'rule2656',
        index: 2656,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2671',                 type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule2671 
                    { src: 'emptySlot',    mironName: 'noNameVLastNameFound',     type: 'slot', weight: 0.3333333333333333 },   // is active?: noNameVLastNameFound 
                    { src: 'inhibitedWM',  mironName: 'isUserVisuallyRecognized', type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isUserVisuallyRecognized
                ],
        fanOut: [ { dest: 'goal', mironName: 'say_Something',                                                   type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_ThanksWithName"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_ThanksWithName"}
      },
      { // RULE 2671 (2671): Disable interruption
        name:  'rule2671',
        index: 2671,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ToMakeCalls', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToMakeCalls 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isInterruptionEnabled', type: 'wm',        weight: 1 },   // inhibit wm!: isInterruptionEnabled 
                  { dest: 'goal',      mironName: 'hide_Buttons',          type: 'rightHand', weight: 1 },   // do outer miron!: hide_Buttons 
                  { dest: 'goal',      mironName: 'hide_Keyboard',         type: 'rightHand', weight: 1 } ], // do outer miron!: hide_Keyboard
      },
      { // RULE 2686 (2686): Enable interruption
        name:  'rule2686',
        index: 2686,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isInterruptionEnabled', type: 'wm',             weight: 0.5 },   // is wm activated?: isInterruptionEnabled 
                    { src: 'intention',   mironName: 'say_Something',         type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: say_Something
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isInterruptable', type: 'wm', weight: 1 } ], // activate wm!: isInterruptable 
      },
      { // RULE 2693 (2693): Disable interruption
        name:  'rule2693',
        index: 2693,
        fanIn:  [
                  [ { src: 'actionDone',  mironName: 'generateMironSlot_Text', type: 'speech', weight: 0.5 },   // is outer miron done?: generateMironSlot_Text 
                    { src: 'activatedWM', mironName: 'isInterruptionEnabled',  type: 'wm',     weight: 0.5 } ], // is wm activated?: isInterruptionEnabled
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isInterruptable', type: 'wm', weight: 1 } ], // inhibit wm!: isInterruptable 
      },
      { // RULE 2726 (2726): I am interrupted
        name:  'rule2726',
        index: 2726,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule347',       type: 'rule', weight: 0.5 } ], // is previous rule active?: rule347
                ],
        fanOut: [],   
      },
      { // RULE 2738 (2738): I am interrupted
        name:  'rule2738',
        index: 2738,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule966',       type: 'rule', weight: 0.5 } ], // is previous rule active?: rule966
                ],
        fanOut: [],   
      },
      { // RULE 2747 (2747): I am interrupted
        name:  'rule2747',
        index: 2747,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule380',       type: 'rule', weight: 0.5 } ], // is previous rule active?: rule380
                ],
        fanOut: [],   
      },
      { // RULE 2769 (2769): I am interrupted
        name:  'rule2769',
        index: 2769,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule1851',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1851
                ],
        fanOut: [],   
      },
      { // RULE 2779 (2779): I am interrupted
        name:  'rule2779',
        index: 2779,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule1245',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1245
                ],
        fanOut: [],   
      },
      { // RULE 2797 (2797): I am interrupted
        name:  'rule2797',
        index: 2797,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule495',       type: 'rule', weight: 0.5 } ], // is previous rule active?: rule495
                ],
        fanOut: [],   
      },
      { // RULE 2810 (2810): I am interrupted
        name:  'rule2810',
        index: 2810,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule1273',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1273
                ],
        fanOut: [],   
      },
      { // RULE 2820 (2820): I am interrupted
        name:  'rule2820',
        index: 2820,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule1905',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1905
                ],
        fanOut: [],   
      },
      { // RULE 2830 (2830): I am interrupted
        name:  'rule2830',
        index: 2830,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule441',       type: 'rule', weight: 0.5 } ], // is previous rule active?: rule441
                ],
        fanOut: [],   
      },
      { // RULE 2840 (2840): I am interrupted
        name:  'rule2840',
        index: 2840,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isInterrupted', type: 'wm',   weight: 0.5 },   // is wm activated?: isInterrupted 
                    { src: 'previousRule', mironName: 'rule1215',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1215
                ],
        fanOut: [],   
      },
      { // RULE 2908 (2908): Visitor unknown so end of dialog
        name:  'rule2908',
        index: 2908,
        fanIn:  [
                  [ { src: 'emptySlot',    mironName: 'interlocutorCompany',             type: 'slot', weight: 0.1111111111111111 },   // is active?: interlocutorCompany 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: 0.1111111111111111 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isV0',                            type: 'wm',   weight: 0.1111111111111111 },   // is wm activated?: isV0 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: 0.1111111111111111 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: 0.1111111111111111 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.1111111111111111 },   // is wm inhibited?: isContactLastNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule4817',                        type: 'rule', weight: 0.1111111111111111 },   // is previous rule active?: rule4817 
                    { src: 'emptySlot',    mironName: 'contactFirstName',                type: 'slot', weight: 0.1111111111111111 },   // is active?: contactFirstName 
                    { src: 'emptySlot',    mironName: 'contactLastName',                 type: 'slot', weight: 0.1111111111111111 } ], // is active?: contactLastName
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isVisitorUnknown',  type: 'wm',             weight: 1 },   // activate wm!: isVisitorUnknown 
                  { dest: 'inhibitWM',  mironName: 'isV0',              type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',       mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_EndDialog 
                  { dest: 'inhibitWM',  mironName: 'isV1',              type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',              type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV3',              type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',              type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',              type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3036 (3036): V0: Verify visitor fullname
        name:  'rule3036',
        index: 3036,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1390',     type: 'rule', weight: 0.5 },   // is previous rule active?: rule1390 
                    { src: 'filledSlot',   mironName: 'noVisitFound', type: 'slot', weight: 0.5 } ], // is active?: noVisitFound
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'goal',       mironName: 'log_CaseC2V0',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC2V0 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V0"} 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'activateWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // activate wm!: isV0 
                  { dest: 'goal',       mironName: 'log_CheckIdentity',                       type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2617 (2617): MK: Make calls
        name:  'rule2617',
        index: 2617,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1390',         type: 'rule', weight: 0.5 },   // is previous rule active?: rule1390 
                    { src: 'filledSlot',   mironName: 'singleVisitFound', type: 'slot', weight: 0.5 } ], // is active?: singleVisitFound
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_CaseC2Calls',                                type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC2Calls 
                  { dest: 'goal', mironName: 'set_Slot{slot:"currentCase",value:"MakeCalls"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"MakeCalls"} 
                  { dest: 'goal', mironName: 'log_InformContact',                              type: 'internal',       weight: 1 },   // do inner miron!: log_InformContact 
                  { dest: 'goal', mironName: 'request_ToMakeCalls',                            type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToMakeCalls
      },
      { // RULE 2678 (2678): K0: Choose contact from button list
        name:  'rule2678',
        index: 2678,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'multipleContactFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleContactFound 
                    { src: 'previousRule', mironName: 'rule1390',             type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule1390 
                    { src: 'filledSlot',   mironName: 'singleCompanyFound',   type: 'slot', weight: 0.3333333333333333 } ], // is active?: singleCompanyFound
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"K0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"K0"} 
                  { dest: 'activateWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // activate wm!: isSelection 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',       mironName: 'log_DisplayC2K0',                         type: 'internal',       weight: 1 },   // do inner miron!: log_DisplayC2K0 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2833 (2833): C2 case
        name:  'rule2833',
        index: 2833,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'multipleCompanyFound', type: 'slot', weight: 0.5 },   // is active?: multipleCompanyFound 
                    { src: 'previousRule', mironName: 'rule1390',             type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1390
                ],
        fanOut: [ { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'goal',      mironName: 'log_CaseC2',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC2 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C2"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C2"} 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 2848 (2848): Remember I clicked I agree
        name:  'rule2848',
        index: 2848,
        fanIn:  [
                  [ { src: 'intention', mironName: 'say_IAgree', type: 'speech', weight: 1 } ], // is outer miron recognized?: say_IAgree 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isConsentClicked', type: 'wm', weight: 1 } ], // activate wm!: isConsentClicked 
      },
      { // RULE 2870 (2870): Remember I clicked I disagree
        name:  'rule2870',
        index: 2870,
        fanIn:  [
                  [ { src: 'intention', mironName: 'say_IDisagree', type: 'speech', weight: 1 } ], // is outer miron recognized?: say_IDisagree 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isDenyClicked', type: 'wm', weight: 1 } ], // activate wm!: isDenyClicked 
      },
      { // RULE 3078 (3078): C3 case
        name:  'rule3078',
        index: 3078,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'multipleVLastNameFound', type: 'slot', weight: 0.5 },   // is active?: multipleVLastNameFound 
                    { src: 'previousRule', mironName: 'rule1496',               type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1496
                  [ { src: 'previousRule', mironName: 'rule3785', type: 'rule', weight: 1 } ], // is previous rule active?: rule3785 
                ],
        fanOut: [ { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C3"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C3"} 
                  { dest: 'goal',      mironName: 'log_CaseC3',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC3 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3094 (3094): K0: Choose contact from button list
        name:  'rule3094',
        index: 3094,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleVLastNameFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: singleVLastNameFound 
                    { src: 'filledSlot',   mironName: 'multipleContactFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleContactFound 
                    { src: 'previousRule', mironName: 'rule1496',             type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule1496
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_DisplayC3K0',                         type: 'internal',       weight: 1 },   // do inner miron!: log_DisplayC3K0 
                  { dest: 'activateWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // activate wm!: isSelection 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"K0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"K0"} 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3103 (3103): MK: Make calls
        name:  'rule3103',
        index: 3103,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleVisitFound', type: 'slot', weight: 0.5 },   // is active?: singleVisitFound 
                    { src: 'previousRule', mironName: 'rule1496',         type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1496
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToMakeCalls',                            type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToMakeCalls 
                  { dest: 'goal', mironName: 'log_InformContact',                              type: 'internal',       weight: 1 },   // do inner miron!: log_InformContact 
                  { dest: 'goal', mironName: 'set_Slot{slot:"currentCase",value:"MakeCalls"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"MakeCalls"} 
                  { dest: 'goal', mironName: 'log_CaseC3Calls',                                type: 'internal',       weight: 1 } ], // do inner miron!: log_CaseC3Calls
      },
      { // RULE 3108 (3108): V1: Verify firstname
        name:  'rule3108',
        index: 3108,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'noVisitFound', type: 'slot', weight: 0.5 },   // is active?: noVisitFound 
                    { src: 'previousRule', mironName: 'rule1496',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule1496
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_CheckIdentity1',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity1 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V1"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V1"} 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'log_CaseC3V1',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC3V1 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'activateWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // activate wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 4328 (4328): C2 case
        name:  'rule4328',
        index: 4328,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleContactFound',   type: 'slot', weight: 0.25 },   // is active?: singleContactFound 
                    { src: 'filledSlot',   mironName: 'singleVLastNameFound', type: 'slot', weight: 0.25 },   // is active?: singleVLastNameFound 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.25 },   // is active?: multipleVisitFound 
                    { src: 'previousRule', mironName: 'rule1496',             type: 'rule', weight: 0.25 } ], // is previous rule active?: rule1496
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C2"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C2"} 
                  { dest: 'goal',      mironName: 'log_CaseC2',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC2 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 4361 (4361): C2 case
        name:  'rule4361',
        index: 4361,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'multipleCompanyFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleCompanyFound 
                    { src: 'filledSlot',   mironName: 'singleContactFound',   type: 'slot', weight: 0.3333333333333333 },   // is active?: singleContactFound 
                    { src: 'previousRule', mironName: 'rule1317',             type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule1317
                ],
        fanOut: [ { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'goal',      mironName: 'log_CaseC2',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC2 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C2"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C2"} 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 4409 (4409): We have only a first name
        name:  'rule4409',
        index: 4409,
        fanIn:  [
                  [ { src: 'emptySlot',   mironName: 'contactLastName',       type: 'slot', weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot',   mironName: 'contactFirstName',      type: 'slot', weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'emptySlot',   mironName: 'interlocutorLastName',  type: 'slot', weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot',  mironName: 'interlocutorFirstName', type: 'slot', weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'changedSlot', mironName: 'interlocutorFirstName', type: 'slot', weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.16666666666666666 } ], // is wm inhibited?: isMakingQuery
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isFirstNameOnlyRecognized',       type: 'wm', weight: 1 },   // activate wm!: isFirstNameOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm', weight: 1 },   // inhibit wm!: isCompanyOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm', weight: 1 } ], // inhibit wm!: isContactLastNameOnlyRecognized
      },
      { // RULE 2789 (2789): Enable query for next time
        name:  'rule2789',
        index: 2789,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isQueryEnabled', type: 'wm', weight: 1 } ], // is wm inhibited?: isQueryEnabled 
                  [ { src: 'previousRule', mironName: 'rule1370',       type: 'rule', weight: 0.5 },   // is previous rule active?: rule1370 
                    { src: 'inhibitedWM',  mironName: 'isQueryEnabled', type: 'wm',   weight: 0.5 } ], // is wm inhibited?: isQueryEnabled
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isQueryEnabled', type: 'wm', weight: 1 } ], // activate wm!: isQueryEnabled 
      },
      { // RULE 2805 (2805): Make DB Query
        name:  'rule2805',
        index: 2805,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2714', type: 'rule', weight: 1 } ], // is previous rule active?: rule2714 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_ToAnalyseDB',             type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToAnalyseDB 
                  { dest: 'activateWM', mironName: 'hasVisitorChangedAtLeastOneSlot', type: 'wm',             weight: 1 } ], // activate wm!: hasVisitorChangedAtLeastOneSlot
      },
      { // RULE 2933 (2933): V0: Verify visitor fullname
        name:  'rule2933',
        index: 2933,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleCompanyFound',        type: 'slot', weight: 0.2 },   // is active?: singleCompanyFound 
                    { src: 'filledSlot',   mironName: 'singleContactFound',        type: 'slot', weight: 0.2 },   // is active?: singleContactFound 
                    { src: 'filledSlot',   mironName: 'singleVisitFound',          type: 'slot', weight: 0.2 },   // is active?: singleVisitFound 
                    { src: 'activatedWM',  mironName: 'isFirstNameOnlyRecognized', type: 'wm',   weight: 0.2 },   // is wm activated?: isFirstNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule1317',                  type: 'rule', weight: 0.2 } ], // is previous rule active?: rule1317
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_CaseC1V0OnlyFirstName', type: 'internal', weight: 1 } ], // do inner miron!: log_CaseC1V0OnlyFirstName 
      },
      { // RULE 2982 (2982): Prepare to make query
        name:  'rule2982',
        index: 2982,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule1370',       type: 'rule', weight: 0.5 },   // is previous rule active?: rule1370 
                    { src: 'activatedWM',  mironName: 'isQueryEnabled', type: 'wm',   weight: 0.5 } ], // is wm activated?: isQueryEnabled
                ],
        fanOut: [ { dest: 'goal',       mironName: 'log_AtLeastOneSlotChangedByVisitor', type: 'internal',       weight: 1 },   // do inner miron!: log_AtLeastOneSlotChangedByVisitor 
                  { dest: 'activateWM', mironName: 'hasVisitorChangedAtLeastOneSlot',    type: 'wm',             weight: 1 },   // activate wm!: hasVisitorChangedAtLeastOneSlot 
                  { dest: 'goal',       mironName: 'reset_Steps',                        type: 'internalSpeech', weight: 1 } ], // do inner miron!: reset_Steps
      },
      { // RULE 2994 (2994): Step needed for timing reason
        name:  'rule2994',
        index: 2994,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule611', type: 'rule', weight: 1 } ], // is previous rule active?: rule611 
                ],
        fanOut: [],   
      },
      { // RULE 3089 (3089): Try a DB Query without company name
        name:  'rule3089',
        index: 3089,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isV0',                      type: 'wm',   weight: 0.25 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',           type: 'wm',   weight: 0.25 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isFirstNameOnlyRecognized', type: 'wm',   weight: 0.25 },   // is wm activated?: isFirstNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule4800',                  type: 'rule', weight: 0.25 } ], // is previous rule active?: rule4800
                  [ { src: 'activatedWM',  mironName: 'isCompanyOnlyRecognized', type: 'wm',   weight: 0.25 },   // is wm activated?: isCompanyOnlyRecognized 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',         type: 'wm',   weight: 0.25 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isV0',                    type: 'wm',   weight: 0.25 },   // is wm activated?: isV0 
                    { src: 'previousRule', mironName: 'rule4800',                type: 'rule', weight: 0.25 } ], // is previous rule active?: rule4800
                  [ { src: 'activatedWM',  mironName: 'isV0',                            type: 'wm',   weight: 0.25 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: 0.25 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.25 },   // is wm activated?: isContactLastNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule4800',                        type: 'rule', weight: 0.25 } ], // is previous rule active?: rule4800
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV0',                            type: 'wm', weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isV1',                            type: 'wm', weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                            type: 'wm', weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                  type: 'wm', weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isFirstNameOnlyRecognized',       type: 'wm', weight: 1 },   // inhibit wm!: isFirstNameOnlyRecognized 
                  { dest: 'inhibitWM', mironName: 'isV3',                            type: 'wm', weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                            type: 'wm', weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isCompanyOnlyRecognized',         type: 'wm', weight: 1 },   // inhibit wm!: isCompanyOnlyRecognized 
                  { dest: 'inhibitWM', mironName: 'isContactLastNameOnlyRecognized', type: 'wm', weight: 1 },   // inhibit wm!: isContactLastNameOnlyRecognized 
                  { dest: 'inhibitWM', mironName: 'isV5',                            type: 'wm', weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3140 (3140): Make DB Query
        name:  'rule3140',
        index: 3140,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule3089', type: 'rule', weight: 1 } ], // is previous rule active?: rule3089 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_ToAnalyseDB',             type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToAnalyseDB 
                  { dest: 'activateWM', mironName: 'hasVisitorChangedAtLeastOneSlot', type: 'wm',             weight: 1 } ], // activate wm!: hasVisitorChangedAtLeastOneSlot
      },
      { // RULE 3785 (3785): C4 case
        name:  'rule3785',
        index: 3785,
        fanIn:  [
                  [ { src: 'filledSlot', mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                ],
        fanOut: [ { dest: 'goal',      mironName: 'log_CaseC4',                type: 'internal', weight: 1 },   // do inner miron!: log_CaseC4 
                  { dest: 'inhibitWM', mironName: 'isFirstNameOnlyRecognized', type: 'wm',       weight: 1 } ], // inhibit wm!: isFirstNameOnlyRecognized
      },
      { // RULE 3936 (3936): C2 case
        name:  'rule3936',
        index: 3936,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4002',              type: 'rule', weight: 0.25 },   // is previous rule active?: rule4002 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',    type: 'slot', weight: 0.25 },   // is active?: multipleVisitFound 
                    { src: 'filledSlot',   mironName: 'singleVFirstNameFound', type: 'slot', weight: 0.25 },   // is active?: singleVFirstNameFound 
                    { src: 'filledSlot',   mironName: 'singleContactFound',    type: 'slot', weight: 0.25 } ], // is active?: singleContactFound
                ],
        fanOut: [ { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'goal',      mironName: 'log_CaseC2',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC2 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C2"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C2"} 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3969 (3969): V2: Verify lastname
        name:  'rule3969',
        index: 3969,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4002',     type: 'rule', weight: 0.5 },   // is previous rule active?: rule4002 
                    { src: 'filledSlot',   mironName: 'noVisitFound', type: 'slot', weight: 0.5 } ], // is active?: noVisitFound
                ],
        fanOut: [ { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'activateWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // activate wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'goal',       mironName: 'log_CaseC5V2',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC5V2 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V2"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V2"} 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',       mironName: 'log_CheckIdentity2',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity2 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3974 (3974): MK: Make calls
        name:  'rule3974',
        index: 3974,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4002',         type: 'rule', weight: 0.5 },   // is previous rule active?: rule4002 
                    { src: 'filledSlot',   mironName: 'singleVisitFound', type: 'slot', weight: 0.5 } ], // is active?: singleVisitFound
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_CaseC5Calls',                                type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC5Calls 
                  { dest: 'goal', mironName: 'set_Slot{slot:"currentCase",value:"MakeCalls"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"MakeCalls"} 
                  { dest: 'goal', mironName: 'log_InformContact',                              type: 'internal',       weight: 1 },   // do inner miron!: log_InformContact 
                  { dest: 'goal', mironName: 'request_ToMakeCalls',                            type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToMakeCalls
      },
      { // RULE 3983 (3983): K0: Choose contact from button list
        name:  'rule3983',
        index: 3983,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4002',              type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule4002 
                    { src: 'filledSlot',   mironName: 'multipleContactFound',  type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleContactFound 
                    { src: 'filledSlot',   mironName: 'singleVFirstNameFound', type: 'slot', weight: 0.3333333333333333 } ], // is active?: singleVFirstNameFound
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"K0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"K0"} 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'activateWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // activate wm!: isSelection 
                  { dest: 'goal',       mironName: 'log_DisplayC5K0',                         type: 'internal',       weight: 1 },   // do inner miron!: log_DisplayC5K0 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3998 (3998): C5 case
        name:  'rule3998',
        index: 3998,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4002',                type: 'rule', weight: 0.5 },   // is previous rule active?: rule4002 
                    { src: 'filledSlot',   mironName: 'multipleVFirstNameFound', type: 'slot', weight: 0.5 } ], // is active?: multipleVFirstNameFound
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'goal',      mironName: 'log_CaseC5',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC5 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C5"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C5"} 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 4002 (4002): C5 case
        name:  'rule4002',
        index: 4002,
        fanIn:  [
                  [ { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.2 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'previousRule', mironName: 'rule1930', type: 'rule', weight: 1 } ], // is previous rule active?: rule1930 
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.2 },   // is active?: contactFirstName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 } ], // is active?: interlocutorFirstName
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'filledSlot', mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 } ], // is active?: interlocutorFirstName
                ],
        fanOut: [],   
      },
      { // RULE 4371 (4371): Make DB Query
        name:  'rule4371',
        index: 4371,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4376', type: 'rule', weight: 1 } ], // is previous rule active?: rule4376 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_ToAnalyseDB',             type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToAnalyseDB 
                  { dest: 'activateWM', mironName: 'hasVisitorChangedAtLeastOneSlot', type: 'wm',             weight: 1 } ], // activate wm!: hasVisitorChangedAtLeastOneSlot
      },
      { // RULE 4376 (4376): Try a DB Query without company name
        name:  'rule4376',
        index: 4376,
        fanIn:  [
                  [ { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'activatedWM',  mironName: 'isV3',                            type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isV3 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isNameConfirmed 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isContactLastNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule4837',                        type: 'rule', weight: 0.16666666666666666 } ], // is previous rule active?: rule4837
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV4',           type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV3',           type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV2',           type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV1',           type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled', type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isV0',           type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',      mironName: 'clean_Contact',  type: 'internalSpeech', weight: 1 },   // do inner miron!: clean_Contact 
                  { dest: 'inhibitWM', mironName: 'isV5',           type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 4400 (4400): Make call
        name:  'rule4400',
        index: 4400,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isV4',                            type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isV4 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'activatedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isContactLastNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule4845',                        type: 'rule', weight: 0.16666666666666666 } ], // is previous rule active?: rule4845
                ],
        fanOut: [ { dest: 'goal',      mironName: 'request_ToMakeCalls', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToMakeCalls 
                  { dest: 'inhibitWM', mironName: 'isV0',                type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isV1',                type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV3',                type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',      type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isV5',                type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 5714 (5714): C7 case
        name:  'rule5714',
        index: 5714,
        fanIn:  [
                  [ { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 } ], // is inner miron recognized?: request_ToAnalyseSituation
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.2 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 } ], // is active?: interlocutorFirstName
                ],
        fanOut: [],   
      },
      { // RULE 5752 (5752): V3: Verify company
        name:  'rule5752',
        index: 5752,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'noVisitFound', type: 'slot', weight: 0.5 },   // is active?: noVisitFound 
                    { src: 'previousRule', mironName: 'rule5714',     type: 'rule', weight: 0.5 } ], // is previous rule active?: rule5714
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'activateWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // activate wm!: isV3 
                  { dest: 'goal',       mironName: 'log_CaseC7V3',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC7V3 
                  { dest: 'goal',       mironName: 'log_CheckIdentity3',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity3 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V3"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V3"} 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 5799 (5799): V4: Verify fullname
        name:  'rule5799',
        index: 5799,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleVisitFound',     type: 'slot', weight: 0.3333333333333333 },   // is active?: singleVisitFound 
                    { src: 'previousRule', mironName: 'rule5714',             type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule5714 
                    { src: 'emptySlot',    mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.3333333333333333 } ], // is active?: noNameVLastNameFound
                ],
        fanOut: [ { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V4"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V4"} 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'log_CheckIdentity4',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity4 
                  { dest: 'goal',       mironName: 'log_CaseC7V4',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC7V4 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'activateWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // activate wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 5805 (5805): MK: Make calls
        name:  'rule5805',
        index: 5805,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleVisitFound',     type: 'slot', weight: 0.3333333333333333 },   // is active?: singleVisitFound 
                    { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: noNameVLastNameFound 
                    { src: 'previousRule', mironName: 'rule5714',             type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule5714
                  [ { src: 'previousRule', mironName: 'rule5714',             type: 'rule', weight: 0.25 },   // is previous rule active?: rule5714 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.25 },   // is active?: multipleVisitFound 
                    { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.25 },   // is active?: noNameVLastNameFound 
                    { src: 'filledSlot',   mironName: 'singleContactFound',   type: 'slot', weight: 0.25 } ], // is active?: singleContactFound
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToMakeCalls',                            type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToMakeCalls 
                  { dest: 'goal', mironName: 'log_InformContact',                              type: 'internal',       weight: 1 },   // do inner miron!: log_InformContact 
                  { dest: 'goal', mironName: 'set_Slot{slot:"currentCase",value:"MakeCalls"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"MakeCalls"} 
                  { dest: 'goal', mironName: 'log_CaseC7Calls',                                type: 'internal',       weight: 1 } ], // do inner miron!: log_CaseC7Calls
      },
      { // RULE 5834 (5834): C7 case
        name:  'rule5834',
        index: 5834,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule5714',             type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule5714 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleVisitFound 
                    { src: 'emptySlot',    mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.3333333333333333 } ], // is active?: noNameVLastNameFound
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C7"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C7"} 
                  { dest: 'goal',      mironName: 'log_CaseC7',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC7 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3371 (3371): We have only a company name
        name:  'rule3371',
        index: 3371,
        fanIn:  [
                  [ { src: 'changedSlot', mironName: 'interlocutorCompany',   type: 'slot', weight: 0.14285714285714285 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot',  mironName: 'interlocutorCompany',   type: 'slot', weight: 0.14285714285714285 },   // is active?: interlocutorCompany 
                    { src: 'emptySlot',   mironName: 'interlocutorLastName',  type: 'slot', weight: 0.14285714285714285 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',   mironName: 'contactLastName',       type: 'slot', weight: 0.14285714285714285 },   // is active?: contactLastName 
                    { src: 'emptySlot',   mironName: 'contactFirstName',      type: 'slot', weight: 0.14285714285714285 },   // is active?: contactFirstName 
                    { src: 'emptySlot',   mironName: 'interlocutorFirstName', type: 'slot', weight: 0.14285714285714285 },   // is active?: interlocutorFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.14285714285714285 } ], // is wm inhibited?: isMakingQuery
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isCompanyOnlyRecognized',         type: 'wm', weight: 1 },   // activate wm!: isCompanyOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm', weight: 1 },   // inhibit wm!: isContactLastNameOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm', weight: 1 } ], // inhibit wm!: isFirstNameOnlyRecognized
      },
      { // RULE 3542 (3542): V4: Verify fullname
        name:  'rule3542',
        index: 3542,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isCompanyOnlyRecognized', type: 'wm',   weight: 0.2 },   // is wm activated?: isCompanyOnlyRecognized 
                    { src: 'filledSlot',   mironName: 'singleVisitFound',        type: 'slot', weight: 0.2 },   // is active?: singleVisitFound 
                    { src: 'filledSlot',   mironName: 'singleContactFound',      type: 'slot', weight: 0.2 },   // is active?: singleContactFound 
                    { src: 'filledSlot',   mironName: 'singleCompanyFound',      type: 'slot', weight: 0.2 },   // is active?: singleCompanyFound 
                    { src: 'previousRule', mironName: 'rule1317',                type: 'rule', weight: 0.2 } ], // is previous rule active?: rule1317
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // activate wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'goal',       mironName: 'log_CaseC1V4OnlyCompany',                 type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC1V4OnlyCompany 
                  { dest: 'goal',       mironName: 'log_CheckIdentity4',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity4 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V4"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V4"} 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3883 (3883): Thank visitor without name
        name:  'rule3883',
        index: 3883,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule2671',             type: 'rule', weight: 0.5 },   // is previous rule active?: rule2671 
                    { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.5 } ], // is active?: noNameVLastNameFound
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_Thanks"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_Thanks"} 
                  { dest: 'goal', mironName: 'say_Something',                                           type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 4008 (4008): Prevent interruption of first question
        name:  'rule4008',
        index: 4008,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isBasicQuestion',     type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isBasicQuestion 
                    { src: 'inhibitedWM', mironName: 'isVeryFirstQuestion', type: 'wm',             weight: 0.3333333333333333 },   // is wm inhibited?: isVeryFirstQuestion 
                    { src: 'intention',   mironName: 'request_ActionStep1', type: 'internalSpeech', weight: 0.3333333333333333 } ], // is inner miron recognized?: request_ActionStep1
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isInterruptionEnabled', type: 'wm', weight: 1 },   // inhibit wm!: isInterruptionEnabled 
                  { dest: 'inhibitWM', mironName: 'isBasicQuestion',       type: 'wm', weight: 1 } ], // inhibit wm!: isBasicQuestion
      },
      { // RULE 4117 (4117): We have not only a first name
        name:  'rule4117',
        index: 4117,
        fanIn:  [
                  [ { src: 'filledSlot',  mironName: 'interlocutorFirstName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorFirstName 
                    { src: 'changedSlot', mironName: 'interlocutorLastName',  type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'contactFirstName',      type: 'slot', weight: 0.3333333333333333 },   // is active?: contactFirstName 
                    { src: 'filledSlot',  mironName: 'interlocutorFirstName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'contactLastName',       type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'filledSlot',  mironName: 'interlocutorFirstName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isFirstNameOnlyRecognized', type: 'wm', weight: 1 } ], // inhibit wm!: isFirstNameOnlyRecognized 
      },
      { // RULE 4214 (4214): We have not only a company name
        name:  'rule4214',
        index: 4214,
        fanIn:  [
                  [ { src: 'filledSlot',  mironName: 'interlocutorCompany',   type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorCompany 
                    { src: 'changedSlot', mironName: 'interlocutorFirstName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'interlocutorLastName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorLastName 
                    { src: 'filledSlot',  mironName: 'interlocutorCompany',  type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorCompany 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',        type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'contactFirstName',    type: 'slot', weight: 0.3333333333333333 },   // is active?: contactFirstName 
                    { src: 'filledSlot',  mironName: 'interlocutorCompany', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorCompany 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',       type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'contactLastName',     type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'filledSlot',  mironName: 'interlocutorCompany', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorCompany 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',       type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isCompanyOnlyRecognized', type: 'wm', weight: 1 } ], // inhibit wm!: isCompanyOnlyRecognized 
      },
      { // RULE 3568 (3568): C8 case
        name:  'rule3568',
        index: 3568,
        fanIn:  [
                  [ { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.2 },   // is inner miron recognized?: request_ToAnalyseSituation 
                    { src: 'filledSlot', mironName: 'contactLastName',            type: 'slot',           weight: 0.2 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.2 },   // is active?: interlocutorCompany 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.2 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.2 } ], // is active?: interlocutorFirstName
                ],
        fanOut: [],   
      },
      { // RULE 3667 (3667): C9 case
        name:  'rule3667',
        index: 3667,
        fanIn:  [
                  [ { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot', mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isCompanyOnlyRecognized', type: 'wm',             weight: 1 },   // inhibit wm!: isCompanyOnlyRecognized 
                  { dest: 'goal',      mironName: 'log_CaseC9',              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC9 
                  { dest: 'goal',      mironName: 'clean_VisitSlots',        type: 'internalSpeech', weight: 1 } ], // do inner miron!: clean_VisitSlots
      },
      { // RULE 3690 (3690): C0 case
        name:  'rule3690',
        index: 3690,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule3667', type: 'rule', weight: 1 } ], // is previous rule active?: rule3667 
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"C0"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C0"} 
                  { dest: 'goal',       mironName: 'log_CaseC0',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC0 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'activateWM', mironName: 'isInterruptionEnabled',                   type: 'wm',             weight: 1 },   // activate wm!: isInterruptionEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isVisitorUnderstood',                     type: 'wm',             weight: 1 },   // inhibit wm!: isVisitorUnderstood 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV4
      },
      { // RULE 3748 (3748): We have not only a company name
        name:  'rule3748',
        index: 3748,
        fanIn:  [
                  [ { src: 'filledSlot',  mironName: 'contactLastName', type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'changedSlot', mironName: 'contactLastName', type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',   type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'filledSlot',  mironName: 'contactLastName',  type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'changedSlot', mironName: 'contactFirstName', type: 'slot', weight: 0.3333333333333333 },   // is active?: contactFirstName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',    type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'filledSlot',  mironName: 'contactLastName',      type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'changedSlot', mironName: 'interlocutorLastName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',        type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'interlocutorFirstName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorFirstName 
                    { src: 'filledSlot',  mironName: 'contactLastName',       type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                  [ { src: 'changedSlot', mironName: 'interlocutorCompany', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorCompany 
                    { src: 'filledSlot',  mironName: 'contactLastName',     type: 'slot', weight: 0.3333333333333333 },   // is active?: contactLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',       type: 'wm',   weight: 0.3333333333333333 } ], // is wm inhibited?: isMakingQuery
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isContactLastNameOnlyRecognized', type: 'wm', weight: 1 } ], // inhibit wm!: isContactLastNameOnlyRecognized 
      },
      { // RULE 3763 (3763): We have only a company name
        name:  'rule3763',
        index: 3763,
        fanIn:  [
                  [ { src: 'emptySlot',   mironName: 'interlocutorFirstName', type: 'slot', weight: 0.14285714285714285 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',   mironName: 'contactFirstName',      type: 'slot', weight: 0.14285714285714285 },   // is active?: contactFirstName 
                    { src: 'filledSlot',  mironName: 'contactLastName',       type: 'slot', weight: 0.14285714285714285 },   // is active?: contactLastName 
                    { src: 'filledSlot',  mironName: 'interlocutorLastName',  type: 'slot', weight: 0.14285714285714285 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',   mironName: 'interlocutorCompany',   type: 'slot', weight: 0.14285714285714285 },   // is active?: interlocutorCompany 
                    { src: 'changedSlot', mironName: 'contactLastName',       type: 'slot', weight: 0.14285714285714285 },   // is active?: contactLastName 
                    { src: 'inhibitedWM', mironName: 'isMakingQuery',         type: 'wm',   weight: 0.14285714285714285 } ], // is wm inhibited?: isMakingQuery
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isContactLastNameOnlyRecognized', type: 'wm', weight: 1 },   // activate wm!: isContactLastNameOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm', weight: 1 },   // inhibit wm!: isCompanyOnlyRecognized 
                  { dest: 'inhibitWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm', weight: 1 } ], // inhibit wm!: isFirstNameOnlyRecognized
      },
      { // RULE 4800 (4800): Make the folowing in steps 2,3,4
        name:  'rule4800',
        index: 4800,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                ],
        fanOut: [],   
      },
      { // RULE 4817 (4817): Make the folowing in steps 2,3,4
        name:  'rule4817',
        index: 4817,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                ],
        fanOut: [],   
      },
      { // RULE 4823 (4823): Make the folowing in steps 2,3,4
        name:  'rule4823',
        index: 4823,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                ],
        fanOut: [],   
      },
      { // RULE 4837 (4837): Make the folowing in steps 2,3,4
        name:  'rule4837',
        index: 4837,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                ],
        fanOut: [],   
      },
      { // RULE 4845 (4845): Make the folowing in steps 2,3,4
        name:  'rule4845',
        index: 4845,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                ],
        fanOut: [],   
      },
      { // RULE 4859 (4859): Make the folowing in steps 2,3,4
        name:  'rule4859',
        index: 4859,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                ],
        fanOut: [],   
      },
      { // RULE 4871 (4871): Release node
        name:  'rule4871',
        index: 4871,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4823', type: 'rule', weight: 1 } ], // is previous rule active?: rule4823 
                  [ { src: 'activatedWM',  mironName: 'isV2',            type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed', type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isNameConfirmed 
                    { src: 'previousRule', mironName: 'rule4823',        type: 'rule', weight: -0.3333333333333333 } ], // is previous rule active?: rule4823
                  [ { src: 'activatedWM',  mironName: 'isV1',            type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed', type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isNameConfirmed 
                    { src: 'previousRule', mironName: 'rule4823',        type: 'rule', weight: -0.3333333333333333 } ], // is previous rule active?: rule4823
                  [ { src: 'activatedWM',  mironName: 'isV0',                            type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isV0 
                    { src: 'previousRule', mironName: 'rule4823',                        type: 'rule', weight: -0.16666666666666666 },   // is previous rule active?: rule4823 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isNameConfirmed 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: -0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: -0.16666666666666666 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: -0.16666666666666666 } ], // is wm inhibited?: isContactLastNameOnlyRecognized
                ],
        fanOut: [],   
      },
      { // RULE 4883 (4883): Release node
        name:  'rule4883',
        index: 4883,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isV0',                            type: 'wm',   weight: -0.1111111111111111 },   // is wm activated?: isV0 
                    { src: 'previousRule', mironName: 'rule4817',                        type: 'rule', weight: -0.1111111111111111 },   // is previous rule active?: rule4817 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: -0.1111111111111111 },   // is wm activated?: isNameConfirmed 
                    { src: 'emptySlot',    mironName: 'interlocutorCompany',             type: 'slot', weight: -0.1111111111111111 },   // is active?: interlocutorCompany 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: -0.1111111111111111 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: -0.1111111111111111 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: -0.1111111111111111 },   // is wm inhibited?: isContactLastNameOnlyRecognized 
                    { src: 'emptySlot',    mironName: 'contactFirstName',                type: 'slot', weight: -0.1111111111111111 },   // is active?: contactFirstName 
                    { src: 'emptySlot',    mironName: 'contactLastName',                 type: 'slot', weight: -0.1111111111111111 } ], // is active?: contactLastName
                  [ { src: 'previousRule', mironName: 'rule4817', type: 'rule', weight: 1 } ], // is previous rule active?: rule4817 
                ],
        fanOut: [],   
      },
      { // RULE 4888 (4888): Release node
        name:  'rule4888',
        index: 4888,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4800', type: 'rule', weight: 1 } ], // is previous rule active?: rule4800 
                  [ { src: 'previousRule', mironName: 'rule4800',                  type: 'rule', weight: -0.25 },   // is previous rule active?: rule4800 
                    { src: 'activatedWM',  mironName: 'isV0',                      type: 'wm',   weight: -0.25 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',           type: 'wm',   weight: -0.25 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isFirstNameOnlyRecognized', type: 'wm',   weight: -0.25 } ], // is wm activated?: isFirstNameOnlyRecognized
                  [ { src: 'previousRule', mironName: 'rule4800',                type: 'rule', weight: -0.25 },   // is previous rule active?: rule4800 
                    { src: 'activatedWM',  mironName: 'isV0',                    type: 'wm',   weight: -0.25 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',         type: 'wm',   weight: -0.25 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isCompanyOnlyRecognized', type: 'wm',   weight: -0.25 } ], // is wm activated?: isCompanyOnlyRecognized
                  [ { src: 'previousRule', mironName: 'rule4800',                        type: 'rule', weight: -0.25 },   // is previous rule active?: rule4800 
                    { src: 'activatedWM',  mironName: 'isV0',                            type: 'wm',   weight: -0.25 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: -0.25 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: -0.25 } ], // is wm activated?: isContactLastNameOnlyRecognized
                ],
        fanOut: [],   
      },
      { // RULE 4899 (4899): Release node
        name:  'rule4899',
        index: 4899,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4837', type: 'rule', weight: 1 } ], // is previous rule active?: rule4837 
                  [ { src: 'previousRule', mironName: 'rule4837',                        type: 'rule', weight: -0.16666666666666666 },   // is previous rule active?: rule4837 
                    { src: 'activatedWM',  mironName: 'isV3',                            type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isV3 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isNameConfirmed 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: -0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: -0.16666666666666666 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: -0.16666666666666666 } ], // is wm inhibited?: isContactLastNameOnlyRecognized
                ],
        fanOut: [],   
      },
      { // RULE 4904 (4904): Release node
        name:  'rule4904',
        index: 4904,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4845', type: 'rule', weight: 1 } ], // is previous rule active?: rule4845 
                  [ { src: 'previousRule', mironName: 'rule4845',                        type: 'rule', weight: -0.16666666666666666 },   // is previous rule active?: rule4845 
                    { src: 'activatedWM',  mironName: 'isV4',                            type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isV4 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isNameConfirmed 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: -0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'activatedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: -0.16666666666666666 } ], // is wm inhibited?: isContactLastNameOnlyRecognized
                ],
        fanOut: [],   
      },
      { // RULE 4910 (4910): Release node
        name:  'rule4910',
        index: 4910,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4859', type: 'rule', weight: 1 } ], // is previous rule active?: rule4859 
                  [ { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: -0.3333333333333333 },   // is previous rule active?: rule4859 
                    { src: 'activatedWM',  mironName: 'isV0',               type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: -0.3333333333333333 } ], // is wm activated?: isNameDisconfirmed
                  [ { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: -0.3333333333333333 },   // is previous rule active?: rule4859 
                    { src: 'activatedWM',  mironName: 'isV1',               type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV1 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: -0.3333333333333333 } ], // is wm activated?: isNameDisconfirmed
                  [ { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: -0.3333333333333333 },   // is previous rule active?: rule4859 
                    { src: 'activatedWM',  mironName: 'isV2',               type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV2 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: -0.3333333333333333 } ], // is wm activated?: isNameDisconfirmed
                  [ { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: -0.3333333333333333 },   // is previous rule active?: rule4859 
                    { src: 'activatedWM',  mironName: 'isV3',               type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV3 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: -0.3333333333333333 } ], // is wm activated?: isNameDisconfirmed
                  [ { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: -0.3333333333333333 },   // is previous rule active?: rule4859 
                    { src: 'activatedWM',  mironName: 'isV4',               type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV4 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: -0.3333333333333333 } ], // is wm activated?: isNameDisconfirmed
                  [ { src: 'activatedWM',  mironName: 'isNameDisconfirmed', type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'activatedWM',  mironName: 'isV5',               type: 'wm',   weight: -0.3333333333333333 },   // is wm activated?: isV5 
                    { src: 'previousRule', mironName: 'rule4859',           type: 'rule', weight: -0.3333333333333333 } ], // is previous rule active?: rule4859
                ],
        fanOut: [],   
      },
      { // RULE 4971 (4971): V5: Verify company
        name:  'rule4971',
        index: 4971,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleVisitFound', type: 'slot', weight: 0.5 },   // is active?: singleVisitFound 
                    { src: 'previousRule', mironName: 'rule3568',         type: 'rule', weight: 0.5 } ], // is previous rule active?: rule3568
                  [ { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.25 },   // is active?: multipleVisitFound 
                    { src: 'filledSlot',   mironName: 'singleCompanyFound',   type: 'slot', weight: 0.25 },   // is active?: singleCompanyFound 
                    { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.25 },   // is active?: noNameVLastNameFound 
                    { src: 'previousRule', mironName: 'rule3568',             type: 'rule', weight: 0.25 } ], // is previous rule active?: rule3568
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // activate wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'goal',       mironName: 'log_CaseC8V5',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC8V5 
                  { dest: 'goal',       mironName: 'log_CheckIdentity5',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity5 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V5"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V5"} 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'activateWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 } ], // activate wm!: isV5
      },
      { // RULE 5118 (5118): Release node
        name:  'rule5118',
        index: 5118,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isContactLastNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: -0.16666666666666666 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: -0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isNameConfirmed 
                    { src: 'activatedWM',  mironName: 'isV5',                            type: 'wm',   weight: -0.16666666666666666 },   // is wm activated?: isV5 
                    { src: 'previousRule', mironName: 'rule5123',                        type: 'rule', weight: -0.16666666666666666 } ], // is previous rule active?: rule5123
                  [ { src: 'previousRule', mironName: 'rule5123', type: 'rule', weight: 1 } ], // is previous rule active?: rule5123 
                ],
        fanOut: [],   
      },
      { // RULE 5123 (5123): Make the folowing in steps 2,3,4
        name:  'rule5123',
        index: 5123,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                ],
        fanOut: [],   
      },
      { // RULE 5134 (5134): Make call
        name:  'rule5134',
        index: 5134,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule5123',                        type: 'rule', weight: 0.16666666666666666 },   // is previous rule active?: rule5123 
                    { src: 'activatedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isContactLastNameOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isCompanyOnlyRecognized',         type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isCompanyOnlyRecognized 
                    { src: 'inhibitedWM',  mironName: 'isFirstNameOnlyRecognized',       type: 'wm',   weight: 0.16666666666666666 },   // is wm inhibited?: isFirstNameOnlyRecognized 
                    { src: 'activatedWM',  mironName: 'isV5',                            type: 'wm',   weight: 0.16666666666666666 },   // is wm activated?: isV5 
                    { src: 'activatedWM',  mironName: 'isNameConfirmed',                 type: 'wm',   weight: 0.16666666666666666 } ], // is wm activated?: isNameConfirmed
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV5',                type: 'wm',             weight: 1 },   // inhibit wm!: isV5 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',      type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isV4',                type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV3',                type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV2',                type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV1',                type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV0',                type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',      mironName: 'request_ToMakeCalls', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_ToMakeCalls
      },
      { // RULE 3525 (3525): C8-1 case
        name:  'rule3525',
        index: 3525,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleVisitFound 
                    { src: 'emptySlot',    mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: noNameVLastNameFound 
                    { src: 'previousRule', mironName: 'rule3568',             type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule3568
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV5',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV5 
                  { dest: 'inhibitWM', mironName: 'isV2',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV1',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                            type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isSelection',                               type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isV0',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                      type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',      mironName: 'log_CaseC8-1',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC8-1 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C8-1"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C8-1"} 
                  { dest: 'inhibitWM', mironName: 'isV3',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                      type: 'wm',             weight: 1 } ], // inhibit wm!: isV4
      },
      { // RULE 3594 (3594): C8-2 case
        name:  'rule3594',
        index: 3594,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.25 },   // is active?: noNameVLastNameFound 
                    { src: 'filledSlot',   mironName: 'multipleCompanyFound', type: 'slot', weight: 0.25 },   // is active?: multipleCompanyFound 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.25 },   // is active?: multipleVisitFound 
                    { src: 'previousRule', mironName: 'rule3568',             type: 'rule', weight: 0.25 } ], // is previous rule active?: rule3568
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV4',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV4 
                  { dest: 'inhibitWM', mironName: 'isV3',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C8-2"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C8-2"} 
                  { dest: 'goal',      mironName: 'log_CaseC8-2',                              type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC8-2 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                      type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'inhibitWM', mironName: 'isV0',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM', mironName: 'isSelection',                               type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                            type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isV1',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isV2',                                      type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV5',                                      type: 'wm',             weight: 1 } ], // inhibit wm!: isV5
      },
      { // RULE 3648 (3648): V5: Verify company
        name:  'rule3648',
        index: 3648,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'singleCompanyFound',              type: 'slot', weight: 0.2 },   // is active?: singleCompanyFound 
                    { src: 'filledSlot',   mironName: 'singleContactFound',              type: 'slot', weight: 0.2 },   // is active?: singleContactFound 
                    { src: 'filledSlot',   mironName: 'singleVisitFound',                type: 'slot', weight: 0.2 },   // is active?: singleVisitFound 
                    { src: 'activatedWM',  mironName: 'isContactLastNameOnlyRecognized', type: 'wm',   weight: 0.2 },   // is wm activated?: isContactLastNameOnlyRecognized 
                    { src: 'previousRule', mironName: 'rule1317',                        type: 'rule', weight: 0.2 } ], // is previous rule active?: rule1317
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 },   // activate wm!: isV5 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V5"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V5"} 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'log_CheckIdentity5',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity5 
                  { dest: 'goal',       mironName: 'log_CaseC8V5',                            type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC8V5 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'activateWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 } ], // activate wm!: isV4
      },
      { // RULE 3919 (3919): My speech was interrupted by new information from visitor
        name:  'rule3919',
        index: 3919,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isYesNoEnabled',    type: 'wm', weight: 0.3333333333333333 },   // is wm inhibited?: isYesNoEnabled 
                    { src: 'inhibitedWM', mironName: 'isLastSpeechKnown', type: 'wm', weight: 0.3333333333333333 },   // is wm inhibited?: isLastSpeechKnown 
                    { src: 'activatedWM', mironName: 'isInterruptable',   type: 'wm', weight: 0.3333333333333333 } ], // is wm activated?: isInterruptable
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isInterrupted',           type: 'wm',       weight: 1 },   // inhibit wm!: isInterrupted 
                  { dest: 'goal',      mironName: 'log_IIgnoreInterruption', type: 'internal', weight: 1 },   // do inner miron!: log_IIgnoreInterruption 
                  { dest: 'inhibitWM', mironName: 'isInterruptable',         type: 'wm',       weight: 1 } ], // inhibit wm!: isInterruptable
      },
      { // RULE 3494 (3494): Visitor did not answer with yes or no
        name:  'rule3494',
        index: 3494,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isNameConfirmed',      type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameConfirmed 
                    { src: 'inhibitedWM', mironName: 'isNameDisconfirmed',   type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameDisconfirmed 
                    { src: 'activatedWM', mironName: 'isV0',                 type: 'wm',             weight: 0.25 },   // is wm activated?: isV0 
                    { src: 'intention',   mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 0.25 } ], // is inner miron recognized?: request_NextQuestion
                  [ { src: 'inhibitedWM', mironName: 'isNameConfirmed',      type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameConfirmed 
                    { src: 'inhibitedWM', mironName: 'isNameDisconfirmed',   type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameDisconfirmed 
                    { src: 'activatedWM', mironName: 'isV1',                 type: 'wm',             weight: 0.25 },   // is wm activated?: isV1 
                    { src: 'intention',   mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 0.25 } ], // is inner miron recognized?: request_NextQuestion
                  [ { src: 'inhibitedWM', mironName: 'isNameConfirmed',      type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameConfirmed 
                    { src: 'inhibitedWM', mironName: 'isNameDisconfirmed',   type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameDisconfirmed 
                    { src: 'activatedWM', mironName: 'isV2',                 type: 'wm',             weight: 0.25 },   // is wm activated?: isV2 
                    { src: 'intention',   mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 0.25 } ], // is inner miron recognized?: request_NextQuestion
                  [ { src: 'inhibitedWM', mironName: 'isNameConfirmed',      type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameConfirmed 
                    { src: 'inhibitedWM', mironName: 'isNameDisconfirmed',   type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameDisconfirmed 
                    { src: 'activatedWM', mironName: 'isV3',                 type: 'wm',             weight: 0.25 },   // is wm activated?: isV3 
                    { src: 'intention',   mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 0.25 } ], // is inner miron recognized?: request_NextQuestion
                  [ { src: 'inhibitedWM', mironName: 'isNameConfirmed',      type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameConfirmed 
                    { src: 'inhibitedWM', mironName: 'isNameDisconfirmed',   type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameDisconfirmed 
                    { src: 'activatedWM', mironName: 'isV4',                 type: 'wm',             weight: 0.25 },   // is wm activated?: isV4 
                    { src: 'intention',   mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 0.25 } ], // is inner miron recognized?: request_NextQuestion
                  [ { src: 'inhibitedWM', mironName: 'isNameConfirmed',      type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameConfirmed 
                    { src: 'inhibitedWM', mironName: 'isNameDisconfirmed',   type: 'wm',             weight: 0.25 },   // is wm inhibited?: isNameDisconfirmed 
                    { src: 'activatedWM', mironName: 'isV5',                 type: 'wm',             weight: 0.25 },   // is wm activated?: isV5 
                    { src: 'intention',   mironName: 'request_NextQuestion', type: 'internalSpeech', weight: 0.25 } ], // is inner miron recognized?: request_NextQuestion
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isVisitorUnderstood',      type: 'wm',       weight: 1 },   // inhibit wm!: isVisitorUnderstood 
                  { dest: 'goal',      mironName: 'log_CaseMissingYesNoInVx', type: 'internal', weight: 1 } ], // do inner miron!: log_CaseMissingYesNoInVx
      },
      { // RULE 3624 (3624): Security Timer
        name:  'rule3624',
        index: 3624,
        fanIn:  [
                  [ { src: 'intention', mironName: 'say_startRegistration', type: 'speech', weight: 1 } ], // is outer miron recognized?: say_startRegistration 
                  [ { src: 'intention', mironName: 'say_Something', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: say_Something 
                  [ { src: 'intention', mironName: 'ask_Something', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: ask_Something 
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:45,id:"SecurityTimer"}', type: 'internal', weight: 1 } ], // do inner miron!: wait_Timeout{timeout:45,id:"SecurityTimer"} 
      },
      { // RULE 3679 (3679): End Dialog
        name:  'rule3679',
        index: 3679,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:45,id:"SecurityTimer"}', type: 'internal', weight: 0.5 },   // is inner miron done?: wait_Timeout{timeout:45,id:"SecurityTimer"} 
                    { src: 'previousRule', mironName: 'rule3624',                                    type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule3624
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isCriticalError',   type: 'wm',             weight: 1 },   // activate wm!: isCriticalError 
                  { dest: 'goal',       mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_EndDialog 
                  { dest: 'goal',       mironName: 'clear_AllRules',    type: 'internal',       weight: 1 } ], // do inner miron!: clear_AllRules
      },
      { // RULE 3904 (3904): Inform critical error occured
        name:  'rule3904',
        index: 3904,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isCriticalError', type: 'wm',   weight: 0.5 },   // is wm activated?: isCriticalError 
                    { src: 'previousRule', mironName: 'rule553',         type: 'rule', weight: 0.5 } ], // is previous rule active?: rule553
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isCriticalError',                                                   type: 'wm',             weight: 1 },   // reset wm!: isCriticalError 
                  { dest: 'goal',    mironName: 'say_Something',                                                     type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal',    mironName: 'setMironSlot{mironType:"speech",mironName:"inform_CriticalError"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"inform_CriticalError"}
      },
      { // RULE 3825 (3825): Something is Detected by Proximity Sensor
        name:  'rule3825',
        index: 3825,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'somebody_Detected', type: 'vision', weight: 0.5 },   // is outer miron recognized?: somebody_Detected 
                    { src: 'previousRule', mironName: 'rule4436',          type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule4436
                  [ { src: 'intention', mironName: 'somebody_Detected', type: 'vision', weight: 1 } ], // is outer miron recognized?: somebody_Detected 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isSomethingInFrontOfMe', type: 'wm',       weight: 1 },   // activate wm!: isSomethingInFrontOfMe 
                  { dest: 'goal',       mironName: 'log_PresenceDetected',   type: 'internal', weight: 1 } ], // do inner miron!: log_PresenceDetected
      },
      { // RULE 4182 (4182): User Face is Not Recognized
        name:  'rule4182',
        index: 4182,
        fanIn:  [
                  [ { src: 'emptySlot',    mironName: 'interlocutorLastName', type: 'slot', weight: 0.5 },   // is active?: interlocutorLastName 
                    { src: 'previousRule', mironName: 'rule4433',             type: 'rule', weight: 0.5 } ], // is previous rule active?: rule4433
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isUserVisuallyRecognized',         type: 'wm',       weight: 1 },   // inhibit wm!: isUserVisuallyRecognized 
                  { dest: 'goal',      mironName: 'log_VisitorNotVisuallyRecognized', type: 'internal', weight: 1 } ], // do inner miron!: log_VisitorNotVisuallyRecognized
      },
      { // RULE 4198 (4198): User Face is Recognized
        name:  'rule4198',
        index: 4198,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'interlocutorLastName', type: 'slot', weight: 0.5 },   // is active?: interlocutorLastName 
                    { src: 'previousRule', mironName: 'rule4433',             type: 'rule', weight: 0.5 } ], // is previous rule active?: rule4433
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isUserVisuallyRecognized',      type: 'wm',       weight: 1 },   // activate wm!: isUserVisuallyRecognized 
                  { dest: 'goal',       mironName: 'log_VisitorVisuallyRecognized', type: 'internal', weight: 1 } ], // do inner miron!: log_VisitorVisuallyRecognized
      },
      { // RULE 4224 (4224): User Face is Detected by Camera
        name:  'rule4224',
        index: 4224,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ToRecallIdentityOfFaceId', type: 'internalSpeech', weight: 0.25 },   // is inner miron recognized?: request_ToRecallIdentityOfFaceId 
                    { src: 'emptySlot',   mironName: 'interlocutorFirstName',            type: 'slot',           weight: 0.25 },   // is active?: interlocutorFirstName 
                    { src: 'emptySlot',   mironName: 'interlocutorLastName',             type: 'slot',           weight: 0.25 },   // is active?: interlocutorLastName 
                    { src: 'activatedWM', mironName: 'isFaceRecognitionEnabled',         type: 'wm',             weight: 0.25 } ], // is wm activated?: isFaceRecognitionEnabled
                ],
        fanOut: [ { dest: 'goal', mironName: 'recall_IdentityOfFaceId{label:"interlocutor"}', type: 'internal', weight: 1 } ], // do inner miron!: recall_IdentityOfFaceId{label:"interlocutor"} 
      },
      { // RULE 4272 (4272): User is Temporarily Not Detected by Camera
        name:  'rule4272',
        index: 4272,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4287',        type: 'rule',   weight: 0.5 },   // is previous rule active?: rule4287 
                    { src: 'intention',    mironName: 'noface_Detected', type: 'vision', weight: 0.5 } ], // is outer miron recognized?: noface_Detected
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:3,id:"outOfCamera"}', type: 'internal', weight: 1 } ], // do inner miron!: wait_Timeout{timeout:3,id:"outOfCamera"} 
      },
      { // RULE 4287 (4287): User Face is Detected by Camera
        name:  'rule4287',
        index: 4287,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'face_Detected', type: 'vision', weight: 0.5 },   // is outer miron recognized?: face_Detected 
                    { src: 'previousRule', mironName: 'rule4272',      type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule4272
                  [ { src: 'intention', mironName: 'face_Detected', type: 'vision', weight: 1 } ], // is outer miron recognized?: face_Detected 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_ToRecallIdentityOfFaceId', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToRecallIdentityOfFaceId 
                  { dest: 'activateWM', mironName: 'isUserLookingAtMe',                type: 'wm',             weight: 1 },   // activate wm!: isUserLookingAtMe 
                  { dest: 'goal',       mironName: 'log_VisitorLookingAtMe',           type: 'internal',       weight: 1 } ], // do inner miron!: log_VisitorLookingAtMe
      },
      { // RULE 4305 (4305): User is Looking Away
        name:  'rule4305',
        index: 4305,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:3,id:"outOfCamera"}', type: 'internal', weight: 0.5 },   // is inner miron done?: wait_Timeout{timeout:3,id:"outOfCamera"} 
                    { src: 'previousRule', mironName: 'rule4272',                                 type: 'rule',     weight: 0.5 } ], // is previous rule active?: rule4272
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isUserLookingAtMe',         type: 'wm',       weight: 1 },   // inhibit wm!: isUserLookingAtMe 
                  { dest: 'goal',      mironName: 'log_VisitorNotLookingAtMe', type: 'internal', weight: 1 } ], // do inner miron!: log_VisitorNotLookingAtMe
      },
      { // RULE 4411 (4411): Nothing Detected Anymore by Proximity Sensor
        name:  'rule4411',
        index: 4411,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4436',                                    type: 'rule',     weight: 0.5 },   // is previous rule active?: rule4436 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:1,id:"outOfProximity"}', type: 'internal', weight: 0.5 } ], // is inner miron done?: wait_Timeout{timeout:1,id:"outOfProximity"}
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isSomethingInFrontOfMe', type: 'wm',       weight: 1 },   // inhibit wm!: isSomethingInFrontOfMe 
                  { dest: 'goal',      mironName: 'log_NoPresenceDetected', type: 'internal', weight: 1 } ], // do inner miron!: log_NoPresenceDetected
      },
      { // RULE 4436 (4436): Nothing Detected by Proximity Sensor
        name:  'rule4436',
        index: 4436,
        fanIn:  [
                  [ { src: 'intention', mironName: 'nobody_Detected', type: 'vision', weight: 1 } ], // is outer miron recognized?: nobody_Detected 
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:1,id:"outOfProximity"}', type: 'internal', weight: 1 } ], // do inner miron!: wait_Timeout{timeout:1,id:"outOfProximity"} 
      },
      { // RULE 4498 (4498): Initialisation
        name:  'rule4498',
        index: 4498,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isSomethingInFrontOfMe', type: 'wm', weight: 1 } ], // inhibit wm!: isSomethingInFrontOfMe 
      },
      { // RULE 4540 (4540): Open camera only after start registration
        name:  'rule4540',
        index: 4540,
        fanIn:  [
                  [ { src: 'intention', mironName: 'say_startRegistration', type: 'speech', weight: 1 } ], // is outer miron recognized?: say_startRegistration 
                ],
        fanOut: [ { dest: 'goal',       mironName: 'open_Camera',              type: 'rightHand', weight: 1 },   // do outer miron!: open_Camera 
                  { dest: 'activateWM', mironName: 'isFaceRecognitionEnabled', type: 'wm',        weight: 1 } ], // activate wm!: isFaceRecognitionEnabled
      },
      { // RULE 4549 (4549): Disable face recognition
        name:  'rule4549',
        index: 4549,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ToSayHello', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ToSayHello 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isFaceRecognitionEnabled', type: 'wm', weight: 1 } ], // inhibit wm!: isFaceRecognitionEnabled 
      },
      { // RULE 4565 (4565): Initialisation
        name:  'rule4565',
        index: 4565,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isFaceRecognitionEnabled', type: 'wm', weight: 1 },   // inhibit wm!: isFaceRecognitionEnabled 
                  { dest: 'inhibitWM', mironName: 'isUserLookingAtMe',        type: 'wm', weight: 1 } ], // inhibit wm!: isUserLookingAtMe
      },
      { // RULE 4608 (4608): Initialisation
        name:  'rule4608',
        index: 4608,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isUserVisuallyRecognized', type: 'wm', weight: 1 } ], // inhibit wm!: isUserVisuallyRecognized 
      },
      { // RULE 3812 (3812): End dialog
        name:  'rule3812',
        index: 3812,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'activatedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isSelection 
                    { src: 'activatedWM', mironName: 'isNoInput',           type: 'wm',             weight: 0.3333333333333333 } ], // is wm activated?: isNoInput
                ],
        fanOut: [ { dest: 'goal',       mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_EndDialog 
                  { dest: 'resetWM',    mironName: 'isNoInput',         type: 'wm',             weight: 1 },   // reset wm!: isNoInput 
                  { dest: 'activateWM', mironName: 'isNoReaction',      type: 'wm',             weight: 1 },   // activate wm!: isNoReaction 
                  { dest: 'goal',       mironName: 'hide_Buttons',      type: 'rightHand',      weight: 1 } ], // do outer miron!: hide_Buttons
      },
      { // RULE 4539 (4539): K1: Choose contact from button list
        name:  'rule4539',
        index: 4539,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4674',             type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule4674 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.3333333333333333 },   // is active?: multipleVisitFound 
                    { src: 'filledSlot',   mironName: 'multipleContactFound', type: 'slot', weight: 0.3333333333333333 } ], // is active?: multipleContactFound
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV5 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"K1"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"K1"} 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'activateWM', mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // activate wm!: isSelection 
                  { dest: 'goal',       mironName: 'log_DisplayC10K1',                        type: 'internal',       weight: 1 },   // do inner miron!: log_DisplayC10K1 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM',  mironName: 'isV4',                                    type: 'wm',             weight: 1 } ], // inhibit wm!: isV4
      },
      { // RULE 4582 (4582): C10 case
        name:  'rule4582',
        index: 4582,
        fanIn:  [
                  [ { src: 'emptySlot',    mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.25 },   // is active?: noNameVLastNameFound 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.25 },   // is active?: multipleVisitFound 
                    { src: 'previousRule', mironName: 'rule4674',             type: 'rule', weight: 0.25 },   // is previous rule active?: rule4674 
                    { src: 'filledSlot',   mironName: 'singleContactFound',   type: 'slot', weight: 0.25 } ], // is active?: singleContactFound
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isV5',                                     type: 'wm',             weight: 1 },   // inhibit wm!: isV5 
                  { dest: 'inhibitWM', mironName: 'isV2',                                     type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM', mironName: 'isV1',                                     type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM', mironName: 'isYesNoEnabled',                           type: 'wm',             weight: 1 },   // inhibit wm!: isYesNoEnabled 
                  { dest: 'inhibitWM', mironName: 'isSelection',                              type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM', mironName: 'isV0',                                     type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',      mironName: 'request_NextQuestion',                     type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',      mironName: 'log_CaseC7',                               type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC7 
                  { dest: 'goal',      mironName: 'set_Slot{slot:"currentCase",value:"C10"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"C10"} 
                  { dest: 'inhibitWM', mironName: 'isV3',                                     type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'inhibitWM', mironName: 'isV4',                                     type: 'wm',             weight: 1 } ], // inhibit wm!: isV4
      },
      { // RULE 4603 (4603): V4: Verify fullname
        name:  'rule4603',
        index: 4603,
        fanIn:  [
                  [ { src: 'emptySlot',    mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: noNameVLastNameFound 
                    { src: 'previousRule', mironName: 'rule4674',             type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule4674 
                    { src: 'filledSlot',   mironName: 'singleVisitFound',     type: 'slot', weight: 0.3333333333333333 } ], // is active?: singleVisitFound
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isV5',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV5 
                  { dest: 'activateWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 },   // activate wm!: isV4 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'goal',       mironName: 'log_CaseC10V4',                           type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC10V4 
                  { dest: 'goal',       mironName: 'log_CheckIdentity4',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity4 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V4"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V4"} 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 } ], // do inner miron!: set_YesNoButtons
      },
      { // RULE 4674 (4674): C10 case
        name:  'rule4674',
        index: 4674,
        fanIn:  [
                  [ { src: 'filledSlot', mironName: 'interlocutorCompany',        type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorCompany 
                    { src: 'emptySlot',  mironName: 'contactLastName',            type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactLastName 
                    { src: 'emptySlot',  mironName: 'contactFirstName',           type: 'slot',           weight: 0.16666666666666666 },   // is active?: contactFirstName 
                    { src: 'emptySlot',  mironName: 'interlocutorLastName',       type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorLastName 
                    { src: 'emptySlot',  mironName: 'interlocutorFirstName',      type: 'slot',           weight: 0.16666666666666666 },   // is active?: interlocutorFirstName 
                    { src: 'intention',  mironName: 'request_ToAnalyseSituation', type: 'internalSpeech', weight: 0.16666666666666666 } ], // is inner miron recognized?: request_ToAnalyseSituation
                ],
        fanOut: [],   
      },
      { // RULE 4710 (4710): V5: Verify company
        name:  'rule4710',
        index: 4710,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4674',             type: 'rule', weight: 0.3333333333333333 },   // is previous rule active?: rule4674 
                    { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.3333333333333333 },   // is active?: noNameVLastNameFound 
                    { src: 'filledSlot',   mironName: 'singleVisitFound',     type: 'slot', weight: 0.3333333333333333 } ], // is active?: singleVisitFound
                  [ { src: 'filledSlot',   mironName: 'singleContactFound',   type: 'slot', weight: 0.25 },   // is active?: singleContactFound 
                    { src: 'filledSlot',   mironName: 'noNameVLastNameFound', type: 'slot', weight: 0.25 },   // is active?: noNameVLastNameFound 
                    { src: 'filledSlot',   mironName: 'multipleVisitFound',   type: 'slot', weight: 0.25 },   // is active?: multipleVisitFound 
                    { src: 'previousRule', mironName: 'rule4674',             type: 'rule', weight: 0.25 } ], // is previous rule active?: rule4674
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isV5',                                    type: 'wm',             weight: 1 },   // activate wm!: isV5 
                  { dest: 'goal',       mironName: 'set_YesNoButtons',                        type: 'internalSpeech', weight: 1 },   // do inner miron!: set_YesNoButtons 
                  { dest: 'inhibitWM',  mironName: 'isV2',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV2 
                  { dest: 'inhibitWM',  mironName: 'isV1',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV1 
                  { dest: 'activateWM', mironName: 'isYesNoEnabled',                          type: 'wm',             weight: 1 },   // activate wm!: isYesNoEnabled 
                  { dest: 'inhibitWM',  mironName: 'isSelection',                             type: 'wm',             weight: 1 },   // inhibit wm!: isSelection 
                  { dest: 'inhibitWM',  mironName: 'isV0',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV0 
                  { dest: 'goal',       mironName: 'set_Slot{slot:"currentCase",value:"V5"}', type: 'internal',       weight: 1 },   // do inner miron!: set_Slot{slot:"currentCase",value:"V5"} 
                  { dest: 'goal',       mironName: 'request_NextQuestion',                    type: 'internalSpeech', weight: 1 },   // do inner miron!: request_NextQuestion 
                  { dest: 'goal',       mironName: 'log_CheckIdentity5',                      type: 'internal',       weight: 1 },   // do inner miron!: log_CheckIdentity5 
                  { dest: 'goal',       mironName: 'log_CaseC10V5',                           type: 'internal',       weight: 1 },   // do inner miron!: log_CaseC10V5 
                  { dest: 'inhibitWM',  mironName: 'isV3',                                    type: 'wm',             weight: 1 },   // inhibit wm!: isV3 
                  { dest: 'activateWM', mironName: 'isV4',                                    type: 'wm',             weight: 1 } ], // activate wm!: isV4
      },
      { // RULE 5291 (5291): Initialization
        name:  'rule5291',
        index: 5291,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isKeyboardExpected', type: 'wm', weight: 1 },   // inhibit wm!: isKeyboardExpected 
                  { dest: 'inhibitWM',  mironName: 'isButtonExpected',   type: 'wm', weight: 1 },   // inhibit wm!: isButtonExpected 
                  { dest: 'activateWM', mironName: 'isVoiceExpected',    type: 'wm', weight: 1 } ], // activate wm!: isVoiceExpected
      },
      { // RULE 5298 (5298): Initialization
        name:  'rule5298',
        index: 5298,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isCriticalError',    type: 'wm', weight: 1 },   // reset wm!: isCriticalError 
                  { dest: 'resetWM', mironName: 'isVisitorUnknown',   type: 'wm', weight: 1 },   // reset wm!: isVisitorUnknown 
                  { dest: 'resetWM', mironName: 'isContactNotInList', type: 'wm', weight: 1 },   // reset wm!: isContactNotInList 
                  { dest: 'resetWM', mironName: 'isCaseNotHandled',   type: 'wm', weight: 1 },   // reset wm!: isCaseNotHandled 
                  { dest: 'resetWM', mironName: 'isNoReaction',       type: 'wm', weight: 1 },   // reset wm!: isNoReaction 
                  { dest: 'resetWM', mironName: 'isNobodyAnswered',   type: 'wm', weight: 1 },   // reset wm!: isNobodyAnswered 
                  { dest: 'resetWM', mironName: 'isDialogCompleted',  type: 'wm', weight: 1 },   // reset wm!: isDialogCompleted 
                  { dest: 'resetWM', mironName: 'NoGDPRReaction',     type: 'wm', weight: 1 } ], // reset wm!: NoGDPRReaction
      },
      { // RULE 5326 (5326): Ignore end of timer
        name:  'rule5326',
        index: 5326,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule3624',          type: 'rule',           weight: 0.5 },   // is previous rule active?: rule3624 
                    { src: 'intention',    mironName: 'request_InitPhase', type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_InitPhase
                ],
        fanOut: [],   
      },
      { // RULE 4120 (4120): 
        name:  'rule4120',
        index: 4120,
        fanIn:  [
                  [ { src: 'filledSlot',   mironName: 'interlocutorTitle',    type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorTitle 
                    { src: 'filledSlot',   mironName: 'interlocutorLastName', type: 'slot', weight: 0.3333333333333333 },   // is active?: interlocutorLastName 
                    { src: 'previousRule', mironName: 'rule2271',             type: 'rule', weight: 0.3333333333333333 } ], // is previous rule active?: rule2271
                ],
        fanOut: [ { dest: 'goal', mironName: 'say_Something',                                                           type: 'internalSpeech', weight: 1 },   // do inner miron!: say_Something 
                  { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_HelloVisitorRecognized"}', type: 'internal',       weight: 1 } ], // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_HelloVisitorRecognized"}
      },
      { // RULE 4433 (4433): Query result
        name:  'rule4433',
        index: 4433,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4224',                                      type: 'rule',     weight: 0.5 },   // is previous rule active?: rule4224 
                    { src: 'actionDone',   mironName: 'recall_IdentityOfFaceId{label:"interlocutor"}', type: 'internal', weight: 0.5 } ], // is inner miron done?: recall_IdentityOfFaceId{label:"interlocutor"}
                ],
        fanOut: [],   
      },
      { // RULE 4460 (4460): Skip GDPR because FaceId is unreliable
        name:  'rule4460',
        index: 4460,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isV0',                     type: 'wm',   weight: 0.25 },   // is wm activated?: isV0 
                    { src: 'activatedWM',  mironName: 'isUserVisuallyRecognized', type: 'wm',   weight: 0.25 },   // is wm activated?: isUserVisuallyRecognized 
                    { src: 'activatedWM',  mironName: 'isNameDisconfirmed',       type: 'wm',   weight: 0.25 },   // is wm activated?: isNameDisconfirmed 
                    { src: 'previousRule', mironName: 'rule4501',                 type: 'rule', weight: 0.25 } ], // is previous rule active?: rule4501
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'skipGDPR',                 type: 'wm', weight: 1 },   // activate wm!: skipGDPR 
                  { dest: 'inhibitWM',  mironName: 'isUserVisuallyRecognized', type: 'wm', weight: 1 } ], // inhibit wm!: isUserVisuallyRecognized
      },
      { // RULE 4466 (4466): Initialization
        name:  'rule4466',
        index: 4466,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'skipGDPR', type: 'wm', weight: 1 } ], // reset wm!: skipGDPR 
      },
      { // RULE 4501 (4501): Make the folowing in steps 2,3,4
        name:  'rule4501',
        index: 4501,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep3 
                  [ { src: 'intention', mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep4 
                  [ { src: 'intention', mironName: 'request_ActionStep2', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_ActionStep2 
                ],
        fanOut: [],   
      },
      { // RULE 4642 (4642): Release node
        name:  'rule4642',
        index: 4642,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4501', type: 'rule', weight: 1 } ], // is previous rule active?: rule4501 
                  [ { src: 'activatedWM', mironName: 'isV0',                     type: 'wm', weight: -0.3333333333333333 },   // is wm activated?: isV0 
                    { src: 'activatedWM', mironName: 'isUserVisuallyRecognized', type: 'wm', weight: -0.3333333333333333 },   // is wm activated?: isUserVisuallyRecognized 
                    { src: 'activatedWM', mironName: 'isNameDisconfirmed',       type: 'wm', weight: -0.3333333333333333 } ], // is wm activated?: isNameDisconfirmed
                ],
        fanOut: [],   
      },
      { // RULE 4664 (4664): Reactivate timer (Bug in Behavior Engine)
        name:  'rule4664',
        index: 4664,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'keyboard_Type', type: 'signal', weight: 0.5 },   // is outer miron recognized?: keyboard_Type 
                    { src: 'previousRule', mironName: 'rule737',       type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule737
                ],
        fanOut: [],   
      },
      { // RULE 4693 (4693): Ask to have debug mode on
        name:  'rule4693',
        index: 4693,
        fanIn:  [
                  [ { src: 'intention', mironName: 'ask_DebugModeOn', type: 'speech', weight: 1 } ], // is outer miron recognized?: ask_DebugModeOn 
                ],
        fanOut: [ { dest: 'goal', mironName: 'show_Thought', type: 'rightHand', weight: 1 } ], // do outer miron!: show_Thought 
      },
      { // RULE 4746 (4746): Ask to have debug mode off
        name:  'rule4746',
        index: 4746,
        fanIn:  [
                  [ { src: 'intention', mironName: 'ask_DebugModeOff', type: 'speech', weight: 1 } ], // is outer miron recognized?: ask_DebugModeOff 
                  [ { src: 'intention', mironName: 'be_Alive', type: 'signal', weight: 1 } ], // is outer miron recognized?: be_Alive 
                ],
        fanOut: [ { dest: 'goal', mironName: 'hide_Thought', type: 'rightHand', weight: 1 } ], // do outer miron!: hide_Thought 
      },
      { // RULE 4785 (4785): Ask to have virtual telephony off
        name:  'rule4785',
        index: 4785,
        fanIn:  [
                  [ { src: 'intention', mironName: 'ask_VirtualTelephonyOff', type: 'speech', weight: 1 } ], // is outer miron recognized?: ask_VirtualTelephonyOff 
                  [ { src: 'intention', mironName: 'be_Alive', type: 'signal', weight: 1 } ], // is outer miron recognized?: be_Alive 
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isVirtualTelephony', type: 'wm', weight: 1 } ], // inhibit wm!: isVirtualTelephony 
      },
      { // RULE 4802 (4802): Ask to have virtual telephony on
        name:  'rule4802',
        index: 4802,
        fanIn:  [
                  [ { src: 'intention', mironName: 'ask_VirtualTelephonyOn', type: 'speech', weight: 1 } ], // is outer miron recognized?: ask_VirtualTelephonyOn 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isVirtualTelephony', type: 'wm', weight: 1 } ], // activate wm!: isVirtualTelephony 
      },
      { // RULE 4843 (4843): Info at start concerning debug voice commands
        name:  'rule4843',
        index: 4843,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'goal', mironName: 'log_DebugVoiceCommand', type: 'internal', weight: 1 } ], // do inner miron!: log_DebugVoiceCommand 
      },
      { // RULE 4923 (4923): Take the phone
        name:  'rule4923',
        index: 4923,
        fanIn:  [
                  [ { src: 'inhibitedWM', mironName: 'isVirtualTelephony', type: 'wm',             weight: 0.5 },   // is wm inhibited?: isVirtualTelephony 
                    { src: 'intention',   mironName: 'request_ToCall',     type: 'internalSpeech', weight: 0.5 } ], // is inner miron recognized?: request_ToCall
                ],
        fanOut: [ { dest: 'goal', mironName: 'take_Phone',       type: 'rightHand',    weight: 1 },   // do outer miron!: take_Phone 
                  { dest: 'goal', mironName: 'setGazeTo_Left',   type: 'internalGaze', weight: 1 },   // do inner miron!: setGazeTo_Left 
                  { dest: 'goal', mironName: 'lookAt_Something', type: 'internalGaze', weight: 1 } ], // do inner miron!: lookAt_Something
      },
      { // RULE 4963 (4963): I start calling
        name:  'rule4963',
        index: 4963,
        fanIn:  [
                  [ { src: 'intention', mironName: 'call_Started', type: 'signal', weight: 1 } ], // is outer miron recognized?: call_Started 
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isCallStarted',                         type: 'wm',       weight: 1 },   // activate wm!: isCallStarted 
                  { dest: 'goal',       mironName: 'wait_Timeout{timeout:30,id:"Calling"}', type: 'internal', weight: 1 },   // do inner miron!: wait_Timeout{timeout:30,id:"Calling"} 
                  { dest: 'inhibitWM',  mironName: 'isCallEnded',                           type: 'wm',       weight: 1 },   // inhibit wm!: isCallEnded 
                  { dest: 'inhibitWM',  mironName: 'isCallTooLong',                         type: 'wm',       weight: 1 } ], // inhibit wm!: isCallTooLong
      },
      { // RULE 4991 (4991): User Clicked a Button
        name:  'rule4991',
        index: 4991,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'call_Ended', type: 'signal', weight: 0.5 },   // is outer miron recognized?: call_Ended 
                    { src: 'previousRule', mironName: 'rule4963',   type: 'rule',   weight: 0.5 } ], // is previous rule active?: rule4963
                  [ { src: 'intention', mironName: 'call_Ended', type: 'signal', weight: 1 } ], // is outer miron recognized?: call_Ended 
                ],
        fanOut: [ { dest: 'inhibitWM',  mironName: 'isCallStarted', type: 'wm', weight: 1 },   // inhibit wm!: isCallStarted 
                  { dest: 'activateWM', mironName: 'isCallEnded',   type: 'wm', weight: 1 },   // activate wm!: isCallEnded 
                  { dest: 'inhibitWM',  mironName: 'isCallTooLong', type: 'wm', weight: 1 } ], // inhibit wm!: isCallTooLong
      },
      { // RULE 4995 (4995): No end of call detected
        name:  'rule4995',
        index: 4995,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4963',                              type: 'rule',     weight: 0.5 },   // is previous rule active?: rule4963 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:30,id:"Calling"}', type: 'internal', weight: 0.5 } ], // is inner miron done?: wait_Timeout{timeout:30,id:"Calling"}
                  [ { src: 'intention',    mironName: 'call_Ended', type: 'signal', weight: -0.5 },   // is outer miron recognized?: call_Ended 
                    { src: 'previousRule', mironName: 'rule4963',   type: 'rule',   weight: -0.5 } ], // is previous rule active?: rule4963
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isCallTooLong', type: 'wm',        weight: 1 },   // activate wm!: isCallTooLong 
                  { dest: 'goal',       mironName: 'call_Hangup',   type: 'rightHand', weight: 1 } ], // do outer miron!: call_Hangup
      },
      { // RULE 5013 (5013): Start call
        name:  'rule5013',
        index: 5013,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4923',   type: 'rule',      weight: 0.5 },   // is previous rule active?: rule4923 
                    { src: 'actionDone',   mironName: 'take_Phone', type: 'rightHand', weight: 0.5 } ], // is outer miron done?: take_Phone
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isCallStarted',    type: 'wm',        weight: 1 },   // reset wm!: isCallStarted 
                  { dest: 'goal',    mironName: 'call_PhoneNumber', type: 'rightHand', weight: 1 },   // do outer miron!: call_PhoneNumber 
                  { dest: 'resetWM', mironName: 'isCallEnded',      type: 'wm',        weight: 1 } ], // reset wm!: isCallEnded
      },
      { // RULE 5034 (5034): Phone should be ringing
        name:  'rule5034',
        index: 5034,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'call_PhoneNumber', type: 'rightHand', weight: 0.5 },   // is outer miron done?: call_PhoneNumber 
                    { src: 'previousRule', mironName: 'rule5013',         type: 'rule',      weight: 0.5 } ], // is previous rule active?: rule5013
                ],
        fanOut: [ { dest: 'goal', mironName: 'play_PhoneRinging', type: 'speech', weight: 1 } ], // do outer miron!: play_PhoneRinging 
      },
      { // RULE 4344 (4344): I start calling
        name:  'rule4344',
        index: 4344,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InitPhase', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InitPhase 
                ],
        fanOut: [ { dest: 'resetWM', mironName: 'isCallStarted', type: 'wm', weight: 1 },   // reset wm!: isCallStarted 
                  { dest: 'resetWM', mironName: 'isCallEnded',   type: 'wm', weight: 1 },   // reset wm!: isCallEnded 
                  { dest: 'resetWM', mironName: 'isCallTooLong', type: 'wm', weight: 1 } ], // reset wm!: isCallTooLong
      },
      { // RULE 4493 (4493): Make a short pause to allow callee to bring the phone to its ear
        name:  'rule4493',
        index: 4493,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isCallStarted', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallStarted 
                    { src: 'previousRule', mironName: 'rule5034',      type: 'rule', weight: 0.5 } ], // is previous rule active?: rule5034
                ],
        fanOut: [ { dest: 'goal', mironName: 'wait_Timeout{timeout:2,id:"LetUserHear"}', type: 'internal', weight: 1 } ], // do inner miron!: wait_Timeout{timeout:2,id:"LetUserHear"} 
      },
      { // RULE 4510 (4510): Call Answered
        name:  'rule4510',
        index: 4510,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4493',                                 type: 'rule',     weight: 0.5 },   // is previous rule active?: rule4493 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:2,id:"LetUserHear"}', type: 'internal', weight: 0.5 } ], // is inner miron done?: wait_Timeout{timeout:2,id:"LetUserHear"}
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_PhoneItsMeisy"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_PhoneItsMeisy"} 
                  { dest: 'goal', mironName: 'say_Something',                                                  type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 4681 (4681): Call Answered
        name:  'rule4681',
        index: 4681,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule4510',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule4510
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_InformAtPhone',    type: 'internalSpeech',  weight: 1 },   // do inner miron!: request_InformAtPhone 
                  { dest: 'goal', mironName: 'setAnimationTo_Happiness', type: 'internalEmotion', weight: 1 },   // do inner miron!: setAnimationTo_Happiness 
                  { dest: 'goal', mironName: 'animate_In',               type: 'internalEmotion', weight: 1 } ], // do inner miron!: animate_In
      },
      { // RULE 4733 (4733): inform at phone
        name:  'rule4733',
        index: 4733,
        fanIn:  [
                  [ { src: 'intention', mironName: 'request_InformAtPhone', type: 'internalSpeech', weight: 1 } ], // is inner miron recognized?: request_InformAtPhone 
                ],
        fanOut: [],   
      },
      { // RULE 4756 (4756): Clean type of call flags
        name:  'rule4756',
        index: 4756,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallEnded 
                    { src: 'previousRule', mironName: 'rule4733',    type: 'rule', weight: 0.5 } ], // is previous rule active?: rule4733
                  [ { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallEnded 
                    { src: 'previousRule', mironName: 'rule5077',    type: 'rule', weight: 0.5 } ], // is previous rule active?: rule5077
                  [ { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallEnded 
                    { src: 'previousRule', mironName: 'rule5090',    type: 'rule', weight: 0.5 } ], // is previous rule active?: rule5090
                  [ { src: 'previousRule', mironName: 'rule5105', type: 'rule', weight: 1 } ], // is previous rule active?: rule5105 
                ],
        fanOut: [ { dest: 'goal',      mironName: 'request_InformAtPhone_Done', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_InformAtPhone_Done 
                  { dest: 'inhibitWM', mironName: 'isCallToContact',            type: 'wm',             weight: 1 },   // inhibit wm!: isCallToContact 
                  { dest: 'inhibitWM', mironName: 'isCallToMST',                type: 'wm',             weight: 1 } ], // inhibit wm!: isCallToMST
      },
      { // RULE 4789 (4789): Wait in case contact would speak
        name:  'rule4789',
        index: 4789,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'request_InformAtPhone_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: request_InformAtPhone_Done 
                    { src: 'previousRule', mironName: 'rule4681',                   type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule4681
                  [ { src: 'previousRule', mironName: 'rule4925', type: 'rule', weight: 1 } ], // is previous rule active?: rule4925 
                ],
        fanOut: [ { dest: 'goal', mironName: 'setAnimationTo_Happiness',                  type: 'internalEmotion', weight: 1 },   // do inner miron!: setAnimationTo_Happiness 
                  { dest: 'goal', mironName: 'wait_Timeout{timeout:2,id:"LetUserSpeak"}', type: 'internal',        weight: 1 },   // do inner miron!: wait_Timeout{timeout:2,id:"LetUserSpeak"} 
                  { dest: 'goal', mironName: 'animate_Out',                               type: 'internalEmotion', weight: 1 } ], // do inner miron!: animate_Out
      },
      { // RULE 4925 (4925): Wait for contact to finish speaking
        name:  'rule4925',
        index: 4925,
        fanIn:  [
                  [ { src: 'actionDone',   mironName: 'wait_Timeout{timeout:2,id:"LetUserSpeak"}', type: 'internal', weight: 0.3333333333333333 },   // is inner miron done?: wait_Timeout{timeout:2,id:"LetUserSpeak"} 
                    { src: 'activatedWM',  mironName: 'isVisitorSpeaking',                         type: 'wm',       weight: 0.3333333333333333 },   // is wm activated?: isVisitorSpeaking 
                    { src: 'previousRule', mironName: 'rule4789',                                  type: 'rule',     weight: 0.3333333333333333 } ], // is previous rule active?: rule4789
                ],
        fanOut: [],   
      },
      { // RULE 4931 (4931): Say good bye
        name:  'rule4931',
        index: 4931,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4789',                                  type: 'rule',     weight: 0.3333333333333333 },   // is previous rule active?: rule4789 
                    { src: 'actionDone',   mironName: 'wait_Timeout{timeout:2,id:"LetUserSpeak"}', type: 'internal', weight: 0.3333333333333333 },   // is inner miron done?: wait_Timeout{timeout:2,id:"LetUserSpeak"} 
                    { src: 'inhibitedWM',  mironName: 'isVisitorSpeaking',                         type: 'wm',       weight: 0.3333333333333333 } ], // is wm inhibited?: isVisitorSpeaking
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_PhoneSalutation"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_PhoneSalutation"} 
                  { dest: 'goal', mironName: 'say_Something',                                                    type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 5002 (5002): Call Ended successfully
        name:  'rule5002',
        index: 5002,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule4931',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule4931
                  [ { src: 'previousRule', mironName: 'rule4931',    type: 'rule', weight: 0.5 },   // is previous rule active?: rule4931 
                    { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 } ], // is wm activated?: isCallEnded
                  [ { src: 'previousRule', mironName: 'rule4789',    type: 'rule', weight: 0.5 },   // is previous rule active?: rule4789 
                    { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 } ], // is wm activated?: isCallEnded
                ],
        fanOut: [ { dest: 'goal', mironName: 'call_Hangup', type: 'rightHand', weight: 1 } ], // do outer miron!: call_Hangup 
      },
      { // RULE 5032 (5032): Call Ended without answer
        name:  'rule5032',
        index: 5032,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule4681',    type: 'rule', weight: 0.5 },   // is previous rule active?: rule4681 
                    { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 } ], // is wm activated?: isCallEnded
                  [ { src: 'previousRule', mironName: 'rule4510',    type: 'rule', weight: 0.5 },   // is previous rule active?: rule4510 
                    { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 } ], // is wm activated?: isCallEnded
                  [ { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallEnded 
                    { src: 'previousRule', mironName: 'rule4493',    type: 'rule', weight: 0.5 } ], // is previous rule active?: rule4493
                  [ { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallEnded 
                    { src: 'previousRule', mironName: 'rule5034',    type: 'rule', weight: 0.5 } ], // is previous rule active?: rule5034
                ],
        fanOut: [ { dest: 'inhibitWM', mironName: 'isCallSuccessful', type: 'wm', weight: 1 } ], // inhibit wm!: isCallSuccessful 
      },
      { // RULE 5043 (5043): Call not Answered or finished
        name:  'rule5043',
        index: 5043,
        fanIn:  [
                  [ { src: 'previousRule', mironName: 'rule5002',    type: 'rule', weight: 0.5 },   // is previous rule active?: rule5002 
                    { src: 'activatedWM',  mironName: 'isCallEnded', type: 'wm',   weight: 0.5 } ], // is wm activated?: isCallEnded
                  [ { src: 'previousRule', mironName: 'rule5032', type: 'rule', weight: 1 } ], // is previous rule active?: rule5032 
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_ToCall_Done', type: 'internalSpeech', weight: 1 },   // do inner miron!: request_ToCall_Done 
                  { dest: 'goal', mironName: 'drop_Phone',          type: 'rightHand',      weight: 1 },   // do outer miron!: drop_Phone 
                  { dest: 'goal', mironName: 'setGazeTo_Front',     type: 'internalGaze',   weight: 1 },   // do inner miron!: setGazeTo_Front 
                  { dest: 'goal', mironName: 'lookAt_Something',    type: 'internalGaze',   weight: 1 } ], // do inner miron!: lookAt_Something
      },
      { // RULE 5077 (5077): Inform contact person
        name:  'rule5077',
        index: 5077,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isCallToContact', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallToContact 
                    { src: 'previousRule', mironName: 'rule4733',        type: 'rule', weight: 0.5 } ], // is previous rule active?: rule4733
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_ContactVisitorWaitingAtLobby"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_ContactVisitorWaitingAtLobby"} 
                  { dest: 'goal', mironName: 'say_Something',                                                                 type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 5090 (5090): Inform MST because contact not reachable
        name:  'rule5090',
        index: 5090,
        fanIn:  [
                  [ { src: 'activatedWM',  mironName: 'isCallToMST', type: 'wm',   weight: 0.5 },   // is wm activated?: isCallToMST 
                    { src: 'previousRule', mironName: 'rule4733',    type: 'rule', weight: 0.5 } ], // is previous rule active?: rule4733
                ],
        fanOut: [ { dest: 'goal', mironName: 'setMironSlot{mironType:"speech",mironName:"say_MSTVisitorWaitingAtLobby"}', type: 'internal',       weight: 1 },   // do inner miron!: setMironSlot{mironType:"speech",mironName:"say_MSTVisitorWaitingAtLobby"} 
                  { dest: 'goal', mironName: 'say_Something',                                                             type: 'internalSpeech', weight: 1 } ], // do inner miron!: say_Something
      },
      { // RULE 5105 (5105): Call successful
        name:  'rule5105',
        index: 5105,
        fanIn:  [
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule5090',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule5090
                  [ { src: 'intention',    mironName: 'say_Something_Done', type: 'internalSpeech', weight: 0.5 },   // is inner miron recognized?: say_Something_Done 
                    { src: 'previousRule', mironName: 'rule5077',           type: 'rule',           weight: 0.5 } ], // is previous rule active?: rule5077
                ],
        fanOut: [ { dest: 'activateWM', mironName: 'isCallSuccessful', type: 'wm', weight: 1 } ], // activate wm!: isCallSuccessful 
      },
      { // RULE 5098 (5098): Inform could not hear
        name:  'rule5098',
        index: 5098,
        fanIn:  [
                  [ { src: 'intention',   mironName: 'request_ActionStep3', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep3 
                    { src: 'activatedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isSelection 
                    { src: 'activatedWM', mironName: 'isContactNotInList',  type: 'wm',             weight: 0.3333333333333333 } ], // is wm activated?: isContactNotInList
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_EndDialog 
      },
      { // RULE 5158 (5158): Inform could not hear
        name:  'rule5158',
        index: 5158,
        fanIn:  [
                  [ { src: 'activatedWM', mironName: 'isSelection',         type: 'wm',             weight: 0.3333333333333333 },   // is wm activated?: isSelection 
                    { src: 'intention',   mironName: 'request_ActionStep4', type: 'internalSpeech', weight: 0.3333333333333333 },   // is inner miron recognized?: request_ActionStep4 
                    { src: 'activatedWM', mironName: 'isContactNotInList',  type: 'wm',             weight: 0.3333333333333333 } ], // is wm activated?: isContactNotInList
                ],
        fanOut: [ { dest: 'goal', mironName: 'request_EndDialog', type: 'internalSpeech', weight: 1 } ], // do inner miron!: request_EndDialog 
      },
    ];
  } 