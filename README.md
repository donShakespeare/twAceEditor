# twAceEditor.js
Awesome and beautiful source code viewer for TinyMCE -- <a href="http://www.leofec.com/modx-revolution/tinymce-floating-air-bubble-toolbar.html" target="_blank">DEMO</a>

View your TinyMCE source code in the best Code editor, twAceEditor - pure CDN!
Sidebyside or popped up - with live preview - no nonsense!

Usage:
```
tinymce.init({
  external_plugins: {
    twAceEditor: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twAceEditor.js", //plugin location
  },
  twtwAceEditorPoppedOrInline: 1, //1 for popped (default), 0 for inline
  twtwAceEditorEMMETsrcURL: "", // emmet version must be for twAceEditor
  twAceEditorSettings: { // pass in any twAceEditor official setting you like to overwrite default behaviour
    ...
   },
  toolbar: "code",
  contextmenu: "code"
});
```
This will replace that old pesty-looking native viewer you are used to.

##ENJOY
