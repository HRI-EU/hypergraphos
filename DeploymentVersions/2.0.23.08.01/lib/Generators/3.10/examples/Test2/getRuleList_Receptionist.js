//=============================
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

//[# Define Avatar #][LinePattern,$]
//:function getRuleList_$b() {
function getRuleList_Receptionist() {
  return [
    //////////////////////
    // Define Rules
    //////////////////////
    //[# Loop Begin Rule #]
    //[# Begin Header Rule #]
    //:{ // RULE %b (%b): %b
    //:  name:  '%b',
    //:  index: %b,
    { // RULE 7 (n4::n723): MEISY ----> Dialog end
      name: 'rule7',
      index: 7,
      //[# End Header Rule #]
      fanIn:  [
                //[# Loop Begin FanIn #]
                //[# Begin OR #][ArrayPattern]
                //:[§{ src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i },   %t// %i 
                //:  { src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i }§], %t// %i
                [ { src: 'previousRule',  mironName: 'rule6',                                                                             type: 'rule',           weight:  0.50000 },   // INTERNAL STATE MEISY
                 { src: 'actionDone',    mironName: 'request_EndApplication',                                                            type: 'internalSpeech', weight:  0.50000 } ], // IS INTERNAL SPEECH DONE
                //[# End OR #]
                //[# Loop End FanIn #]
                //[# Begin Skip #]
                [{ src: 'actionDone',    mironName: 'wait_Timeout{timeout:180,id:6}',                                                    type: 'internal',       weight:  0.50000 },  // IS INTERNAL ACTION DONE
                 { src: 'previousRule',  mironName: 'rule6',                                                                             type: 'rule',           weight:  0.50000 }], // INTERNAL STATE MEISY
                //[# End Skip #]
              ],
      //[# Begin FanOut #][ArrayPattern]
      //:fanOut: [§{ dest: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i },   %t// %i 
      //:          { dest: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i }§], %t// %i
      fanOut: [ { dest: 'goal',          mironName: 'clear_AllRules',                                                                    type: 'internal',       weight:  1.00000 },   // DO INTERNAL ACTION
                { dest: 'goal',          mironName: 'request_BeginApplication',                                                          type: 'internalSpeech', weight:  1.00000 },   // DO INTERNAL SPEECH
                { dest: 'goal',          mironName: 'hide_Keyboard',                                                                     type: 'rightHand',      weight:  1.00000 },   // DO RIGHT HAND ACTION
                { dest: 'goal',          mironName: 'hide_MessageWindow',                                                                type: 'rightHand',      weight:  1.00000 },   // DO RIGHT HAND ACTION
                { dest: 'goal',          mironName: 'log_EndSession',                                                                    type: 'internal',       weight:  1.00000 } ], // DO INTERNAL ACTION
      //[# End FanOut #]
    },
    //[# Loop End Rule #]
    //[# Begin Skip #]
    { // RULE 1 (n4::n0): MEISY ----> Allow all actions to be effective
      name: 'rule1',
      index: 1,
      fanIn:  [
                [{ src:  'intention',     mironName: 'be_Alive',                                                                          type: 'signal',         weight:  1.00000 }], // IS SIGNAL RECOGNIZED
              ],
      fanOut:   [{ dest: 'activateWM',    mironName: 'perform_Speech',                                                                    type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_RightHand',                                                                 type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_LeftHand',                                                                  type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_Body',                                                                      type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_Gaze',                                                                      type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_EyeLid',                                                                    type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_Vision',                                                                    type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_Emotion',                                                                   type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_Internal',                                                                  type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'perform_Signal',                                                                    type: 'canDo',          weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'inhibitWM', mironName: 'perform_InternalSpeech',                                                            type: 'canDo',          weight:  1.00000 },  // INHIBIT WORKING MEMORY
                  { dest: 'activateWM',    mironName: 'isDebug',                                                                           type: 'wm',             weight:  1.00000 },  // ACTIVATE WORKING MEMORY
                  { dest: 'inhibitWM',    mironName: 'isDictionaryNeedsUpdate',                                                           type: 'wm',             weight:  1.00000 }], // INHIBIT WORKING MEMORY
    },
    { // RULE 2 (n4::n937): MEISY ----> Wait for DB to startup for dictionary update
      name: 'rule2',
      index: 2,
      fanIn:  [
                [{ src:  'previousRule',  mironName: 'rule1',                                                                             type: 'rule',           weight:  1.00000 }], // INTERNAL STATE MEISY
              ],
      fanOut:   [{ dest: 'goal',          mironName: 'wait_Timeout{timeout:1,id:2}',                                                      type: 'internal',       weight:  1.00000 },  // DO INTERNAL ACTION
                  { dest: 'goal',          mironName: 'drop_Phone',                                                                        type: 'rightHand',      weight:  1.00000 },  // DO RIGHT HAND ACTION
                  { dest: 'goal',          mironName: 'set_DialogTimeOutDefault',                                                          type: 'internalSpeech', weight:  1.00000 }], // DO INTERNAL SPEECH
    },
    { // RULE 3 (n4::n1025): MEISY ----> Start Application
      name: 'rule3',
      index: 3,
      fanIn:  [
                [{ src:  'previousRule',  mironName: 'rule2',                                                                             type: 'rule',           weight:  0.50000 },  // INTERNAL STATE MEISY
                  { src:  'actionDone',    mironName: 'wait_Timeout{timeout:1,id:2}',                                                      type: 'internal',       weight:  0.50000 }], // IS INTERNAL ACTION DONE
              ],
      fanOut:   [{ dest: 'goal',          mironName: 'request_BeginApplication',                                                          type: 'internalSpeech', weight:  1.00000 }], // DO INTERNAL SPEECH
    },
    { // RULE 5 (n4::n721): MEISY ----> Application started
      name: 'rule5',
      index: 5,
      fanIn:  [
                [{ src:  'actionDone',    mironName: 'request_BeginApplication',                                                          type: 'internalSpeech', weight:  1.00000 }], // IS INTERNAL SPEECH DONE
              ],
    },
    { // RULE 6 (n4::n740): MEISY ----> Dialog started
      name: 'rule6',
      index: 6,
      fanIn:  [
                [{ src:  'previousRule',  mironName: 'rule5',                                                                             type: 'rule',           weight:  0.50000 },  // INTERNAL STATE MEISY
                  { src:  'actionDone',    mironName: 'request_StartDialog',                                                               type: 'internalSpeech', weight:  0.50000 }], // IS INTERNAL SPEECH DONE
              ],
      fanOut:   [{ dest: 'goal',          mironName: 'wait_Timeout{timeout:180,id:6}',                                                    type: 'internal',       weight:  1.00000 },  // DO INTERNAL ACTION
                  { dest: 'goal',          mironName: 'log_StartSession',                                                                  type: 'internal',       weight:  1.00000 }], // DO INTERNAL ACTION
    },
  //[# End Skip #]
  ];
} 