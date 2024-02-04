let divIndex = 0;
let currDivId = 'app';

// Default document source for blank documents
const defaultSource = '<h2>Title Here</h2>'+
                      '<p>Type document content here...</p>';

// Add Custom Block to SmartBlock extensions
const cbInfo = {
  tagName: 'div',
  className: 'acms-alert',
  customName: 'alert',
  icon: '!'
};
const cb = new SmartBlock.CustomBlock( cbInfo );
SmartBlock.Extensions.push( cb );
// Create the SmartBlock editor
const sbInfo = {
  html: defaultSource,
  extensions: SmartBlock.Extensions,
  onChange: function(result) {
    console.log(result.json, result.html);
  },
};
SmartBlock.Editor( `#${currDivId}`, sbInfo );


function load2() {
  const editorDiv = document.getElementById( 'editor' );
  if( editorDiv ) {
    editorDiv.innerHTML = '';
  }
  
  currDivId = `app${divIndex++}`;
  const elemDiv = document.createElement( currDivId );
  editorDiv.appendChild( elemDiv );

  const sbInfo = {
    html: this.defaultSource,
    extensions: SmartBlock.Extensions,
    onChange: function(result) {
      console.log(result.json, result.html);
    },
  };
}