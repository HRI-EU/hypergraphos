SmartBlock.Extensions.push(new SmartBlock.CustomBlock({
  tagName: 'div',
  className: 'acms-alert',
  customName: 'alert',
  icon: '!'
}));

SmartBlock.Editor('#app', {
  html: '<h2>Hello World</h2><p>hello</p>',
  extensions: SmartBlock.Extensions,
  onChange: function(result) {
    console.log(result.json, result.html);
  }
});

let divIndex = 0;
let currDivId = 'app';

function load2() {
  const editorDiv = document.getElementById( 'editor' );
  if( editorDiv ) {
    editorDiv.innerHTML = '';
  }
  
  currDivId = `app${divIndex++}`;
  const elemDiv = document.createElement( currDivId );
  editorDiv.appendChild( elemDiv );

  SmartBlock.Editor( currDivId, {
    html: `<h2>Another Test ${divIndex}</h2><p>Test2</p>`,
    extensions: SmartBlock.Extensions,
    onChange: function(result) {
      console.log(result.json, result.html);
    }
  });
}