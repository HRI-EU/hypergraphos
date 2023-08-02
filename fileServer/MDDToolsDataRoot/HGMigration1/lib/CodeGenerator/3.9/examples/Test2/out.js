//=============================
// THIS CODE IS GENERATED FROM:
// ../../graph/MainGraph.graphml
// PLEASE DO NOT EDIT BY HAND
// VERSION: 7.0
// GENERATED: 20.02.2020
//=============================

function getRuleList_Meisy() {
  return [
    //////////////////////
    // Define Rules
    //////////////////////
    { // RULE 100 (nn-xx): this is a rule
      name:  'rule100',
      index: 100,
      fanIn:  [
                [ { src: 'actionDone',   mironName: 'rule100',   type: 'rule',     weight: 2 },   // comment 1 
                  { src: 'previousRule', mironName: 'request_1', type: 'internal', weight: 5 },   // comment 2 
                  { src: 'goal',         mironName: 'say_hello', type: 'speech',   weight: 6 } ], // comment 3
                [ { src: 'actionDone',   mironName: 'rule100',   type: 'rule',     weight: 2 },   // comment 1 
                  { src: 'previousRule', mironName: 'request_1', type: 'internal', weight: 5 },   // comment 2 
                  { src: 'goal',         mironName: 'say_hello', type: 'speech',   weight: 6 } ], // comment 3
              ],
      fanOut: [ { dest: 'activateWM', mironName: 'isOk',               type: 'wm',     weight: 333 },   // comment 1 
                { dest: 'inhibitWM',  mironName: 'isWeatherNiceToday', type: 'wm',     weight: 555 },   // comment 2 
                { dest: 'goal',       mironName: 'say_hello',          type: 'speech', weight: 666 } ], // comment 3
    },
    { // RULE 200 (nn-xx): this is another rule
      name:  'rule200',
      index: 200,
      fanIn:  [
                [ { src: 'actionDone',   mironName: 'rule200',   type: 'rule',     weight: 2 },   // comment 1 
                  { src: 'previousRule', mironName: 'request_1', type: 'internal', weight: 5 },   // comment 2 
                  { src: 'goal',         mironName: 'say_hello', type: 'speech',   weight: 6 } ], // comment 3
                [ { src: 'actionDone',   mironName: 'rule200',   type: 'rule',     weight: 2 },   // comment 1 
                  { src: 'previousRule', mironName: 'request_1', type: 'internal', weight: 5 },   // comment 2 
                  { src: 'goal',         mironName: 'say_hello', type: 'speech',   weight: 6 } ], // comment 3
                [ { src: 'actionDone',   mironName: 'rule200',   type: 'rule',     weight: 2 },   // comment 1 
                  { src: 'previousRule', mironName: 'request_1', type: 'internal', weight: 5 },   // comment 2 
                  { src: 'goal',         mironName: 'say_hello', type: 'speech',   weight: 6 } ], // comment 3
              ],
      fanOut: [ { dest: 'activateWM', mironName: 'isOk',               type: 'wm',     weight: 333 },   // comment 1 
                { dest: 'inhibitWM',  mironName: 'isWeatherNiceToday', type: 'wm',     weight: 555 },   // comment 2 
                { dest: 'goal',       mironName: 'say_hello',          type: 'speech', weight: 666 } ], // comment 3
    },
    { // RULE 300 (nn-xx): this is yet another rule
      name:  'rule300',
      index: 300,
      fanIn:  [
              ],
      fanOut: [],   
    },
  ];
} 