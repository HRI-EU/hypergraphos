class RuleOrModel {
  constructor( ruleId, orId ) {
    this.orId = orId;
    this.ruleId = ruleId;
  }
  Begin_OR() {
    switch( this.ruleId ) {
      case 1:
        switch( this.orId ) {
          case 1: return([
            //:[§{ src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i },   %t// %i 
            [ 'actionDone',   'rule100',   'rule', '2', 'comment 1'],
            //:  { src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i },   %t// %i
            [ 'previousRule', 'request_1', 'internal', '5', 'comment 2' ],
            //:  { src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i }§], %t// %i
            [ 'goal',         'say_hello', 'speech', '6', 'comment 3'], 
          ])
          case 3: return([
            [ 'actionDone',   'rule100',   'rule', '2', 'comment 1'],
            [ 'previousRule', 'request_1', 'internal', '5', 'comment 2' ],
            [ 'goal',         'say_hello', 'speech', '6', 'comment 3'],
          ]);
        }
      case 2:
        switch( this.orId ) {
          case 1: return([
            //:[§{ src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i },   %t// %i 
            [ 'actionDone',   'rule200',   'rule', '2', 'comment 1'],
            //:  { src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i },   %t// %i
            [ 'previousRule', 'request_1', 'internal', '5', 'comment 2' ],
            //:  { src: '%i', %tmironName: '%i', %ttype: '%i', %tweight: %i }§], %t// %i
            [ 'goal',         'say_hello', 'speech', '6', 'comment 3'], 
          ])
          case 2: return([
            [ 'actionDone',   'rule200',   'rule', '2', 'comment 1'],
            [ 'previousRule', 'request_1', 'internal', '5', 'comment 2' ],
            [ 'goal',         'say_hello', 'speech', '6', 'comment 3'],
          ]);
          case 3: return([
            [ 'actionDone',   'rule200',   'rule', '2', 'comment 1'],
            [ 'previousRule', 'request_1', 'internal', '5', 'comment 2' ],
            [ 'goal',         'say_hello', 'speech', '6', 'comment 3'],
          ]);
        }
    }
  }
}
class RuleModel {
  constructor( ruleId ) {
    this.ruleId = ruleId;
  }
  Begin_Header_Rule() {
    switch( this.ruleId ) {
      case 1: return([
        //:{ // RULE %b (%b): %b
        [ '100', 'nn-xx', 'this is a rule' ],
        //:  name:  '%b',
        [ 'rule100' ],
        //:  index: %b,
        [ '100' ]
      ]);
      case 2: return([
        [ '200', 'nn-xx', 'this is another rule' ],
        [ 'rule200' ],
        [ '200' ]
      ]);
      case 3: return([
        [ '300', 'nn-xx', 'this is yet another rule' ],
        [ 'rule300' ],
        [ '300' ]
      ]);
    }
  }
  Loop_Begin_FanIn() {
    switch( this.ruleId ) {
      case 1: return([ 
        new RuleOrModel( this.ruleId, 1 ), 
        new RuleOrModel( this.ruleId, 3 ), 
      ]);
      case 2: return([ 
        new RuleOrModel( this.ruleId, 1 ), 
        new RuleOrModel( this.ruleId, 2 ), 
        new RuleOrModel( this.ruleId, 3 ), 
      ]);
      case 3: return([]);
    }
  }
  Begin_FanOut() {
    switch( this.ruleId ) {
      case 1: return([
        [ 'activateWM',   'isOk',   'wm', '333', 'comment 1'],
        [ 'inhibitWM', 'isWeatherNiceToday', 'wm', '555', 'comment 2' ],
        [ 'goal',         'say_hello', 'speech', '666', 'comment 3'],
      ]);
      case 2: return([
        [ 'activateWM',   'isOk',   'wm', '333', 'comment 1'],
        [ 'inhibitWM', 'isWeatherNiceToday', 'wm', '555', 'comment 2' ],
        [ 'goal',         'say_hello', 'speech', '666', 'comment 3'],
      ]);
      case 3: return([]);
    }
  }
}
class RootModel {
  constructor() {
    // Create Index
  }
  Define_FileName() {
    return([ 
      //:// %b
      [ '../../graph/MainGraph.graphml' ],
    ]);
  }
  Define_Avatar() {
    return([
      //:function getRuleList_%b() {
      [ 'Meisy' ],
    ]);
  }
  Begin_Header_Info() {
    return([
      //:// VERSION: %b
      [ '7.0' ],
      //:// GENERATED: %b
      [ '20.02.2020' ],
    ]);
  }
  Loop_Begin_Rule() {
    return([ new RuleModel(1), new RuleModel(2), new RuleModel(3) ]);
  }
}


module.exports = new RootModel();