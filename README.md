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
  twAceEditorSettings: { // pass in any Ace official setting you like to overwrite default behaviour
    twAceEditorCDNbase: "",
    twPoppedTitle: "",
    twPopped: 0, // popped (default) or inline
    twPoppedWidth: "",
    twPoppedHeight: "",
    twEmmetUrl: "", // emmet.js version must be for Ace
    twViewInlineButtonText: "View Inline",
    twCloseButtonText: "Close",
    twLoadCSS: 0, //default 1
    twInlineWidth: "auto",
    twInlineHeight: 250
  },
  toolbar: "code",
  contextmenu: "code"
});
```
This will replace that old pesty-looking native viewer you are used to.

##ENJOY
