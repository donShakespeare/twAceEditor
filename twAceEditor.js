/*
  jquery.twAceEditor.js 
  View your TinyMCE source code in the best Code editor, AceEditor - pure CDN!
  Sidebyside or popped up - with live preview - no nonsense!

  https://github.com/donShakespeare/twAceEditor
  Demo: http://www.leofec.com/modx-revolution/
  (c) 2016 by donShakespeare for MODx awesome TinymceWrapper

  Usage:

  tinymce.init({
    external_plugins: {
      twAceEditor: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twAceEditor.js", //plugin location
    },
    twAceEditorPoppedOrInline: 1, //1 for popped (default), 0 for inline
    twAceEditorEMMETsrcURL: "", // emmet version must be for Ace
    twAceEditorCDN: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/", //default
    twAceEditorSettings: { // pass in any Ace official setting you like to overwrite default behaviour
      fontSize: 23,
      theme: "ace/theme/monokai",
      mode: "ace/mode/php"
    },
    toolbar: "code",
    contextmenu: "code"
});
*/
aceInnerInitRTE = function(userAceSettings) {
  var defaultAceSettings = {
    mode: "ace/mode/html",
    wrap: "free",
    displayIndentGuides: true,
    fontSize: 15,
    tabSize: 2
    }
  var settings = $.extend({}, defaultAceSettings, userAceSettings);
  return settings;
}
function popAce(target, title, width, height, okay) {
  target = $(target);
  targetid = target.attr("id");
  var $inline = $('<div>').hide().insertBefore(target);
  tinymce.activeEditor.windowManager.open({
    title: title ? title : "Modal Window",
    width: width ? width : window.innerWidth / 1.2,
    height: height ? height : 300,
    classes: "popCode",
    items: [{
      classes: "popAceEditor",
      type: 'container',
      onPostRender: function() {
        $(target).appendTo(".mce-popAceEditor > .mce-container-body");
        setTimeout(function(){
          $(".mce-popCode").removeClass("mce-container").find("*").removeClass("mce-container");
          $(".mce-popCode .mce-close").remove();
        },100)
      }
    }],
    buttons: [
      {
        text: okay ? okay : "Okay",
        active: true,
        onclick: function() {
          $inline.replaceWith(target);
          tinymce.activeEditor.windowManager.close();
        }
      }
    ]
  });

}

function killCodeAce(target) {
  // tinymce.activeEditor.windowManager.confirm("Done? Your content will be updated upon closing...", function(s) {
  //   if (s) {
      // $("#" + target).html(window["codeT" + target].getValue());
      aceSetContentsilent = true;
      window["codeT" + target].remove();
      $(".coder." + target).remove();
      tinymce.activeEditor.windowManager.close();
    // }
    //  else {
    //   return false;
    // }
  // })
}

function popCodeAce(target,width,height) {
  popAce(".coder."+target, "Ace HTML Source Code", width, height, "View Inline")
}
tinymce.PluginManager.add('twAceEditor', function(editor) {
  var target = $("#" + editor.id);

  //editor.getContent({format : 'raw'})
  //or
  //getContent({source_view: true})
  function initAce(justPop) {
    if (justPop == 1) {
      popCodeAce(editor.id, editor.getParam("twAceEditorWIDTH",""), editor.getParam("twAceEditorHEIGHT",""));
    }
    // else if (!$('.coder.' + editor.id).length) {
    else if (justPop == 0) {
      var dt = target.attr("data-tiny")

      // for making AceEditor wrapper same width as RTE editor
      var tarClass = ''; 
      var tarWidth = ''; //not recommended

      if(editor.getParam("inline")){
        var edId = editor.id;
        // var tarClass = " " + $("#"+edId).attr('class');
        // var tarWidth = $("#"+edId).width()+'px';
        // var tarWidth = 'style="width:'+tarWidth+';"';
      }
      else{
        var edId = editor.getContainer().id;
        // var tarWidth = $("#"+edId).width()+'px';
        // var tarWidth = 'style="width:'+tarWidth+';"';
      }
      $("#" + edId).before("<div " + tarWidth + " class='coder " + editor.id + tarClass +"'><span type=button onclick='killCodeAce(\"" + editor.id + "\")' class=mce-close-button><i class='mce-ico mce-i-remove'></i></span><textarea class='codeT' id='codeT" + editor.id + "'>" + editor.getContent() + "</textarea>");
      $('.coder.' + editor.id).fadeIn();
      window["codeT" + editor.id] = ace.edit('codeT' + editor.id);
      window["codeT" + editor.id].$blockScrolling = Infinity;
      window["codeT" + editor.id].setAutoScrollEditorIntoView(true);
      if(typeof emmetForAceIsLoaded !== 'undefined' || editor.getParam("twAceEditorEMMETsrcURL") && editor.getParam("twAceEditorSettings",{}).enableEmmet ){
        window["codeT" + editor.id].setOption("enableEmmet", true);
      }
      window["codeT" + editor.id].setOptions(aceInnerInitRTE(editor.getParam("twAceEditorSettings",{})));
      window["codeT" + editor.id].resize();
      aceSetContentsilent = false;
      window["codeT" + editor.id].on("change", function() {
        if (aceSetContentsilent){
         return;
        }
        else{
          editor.setContent(window["codeT" + editor.id].getValue());
        }
      })
      editor.on("keyup ", function() {
        aceSetContentsilent = true;
        window["codeT" + editor.id].setValue(editor.getContent());
        aceSetContentsilent = false;
      })
      if(editor.getParam("twAceEditorPoppedOrInline",1) == 1){
        popCodeAce(editor.id)
      }
    } 
    else {
      if (!$('.coder.' + editor.id).length) {
        initAce(0)
      }
      else{
        popCodeAce(editor.id)
      }
    }
  }

  function loadAllace(style) {
    var mainCss = '<style id="mainCSSAceEditor">.x-window-body{overflow-x:hidden!important;}.codeT,.coder{position:relative}.codeT{width:100%;resize:vertical;color:#000;min-height:300px;margin:0 auto}.mce-popCode .ace_editor{height:300px;}.ace_editor{height:300px;width:100%;}.mce-popAceEditor,.mce-popAceEditor .mce-container-body{width:inherit!important}.coder > .mce-close-button{position:absolute;z-index:9;right:25px;top:0px;cursor:pointer;}.coder > .mce-close-button > .mce-ico{font-size:11px; color:red;}</style>';
    if(!$("#mainCSSAceEditor").length){
      $('head').append(mainCss);
    }
    if (typeof ace == 'undefined') {
      var basePath = editor.getParam("twAceEditorCDN","https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/");
      var scriptLoaderMain = new tinymce.dom.ScriptLoader();
      scriptLoaderMain.add(basePath+'ace.js');
      if(typeof emmetForAceIsLoaded == 'undefined' && editor.getParam("twAceEditorEMMETsrcURL")){
        scriptLoaderMain.add(editor.getParam("twAceEditorEMMETsrcURL"));
        scriptLoaderMain.add(basePath+'ext-emmet.js');
      }
      scriptLoaderMain.loadQueue(function() {
        setTimeout (function(){
          initAce(style);
        },500)
      });
    } else {
      initAce(style);
    }
  }

  editor.addButton('code', {
    type: "menubutton",
    classes: "twAceE",
    icon: 'code',
    tooltip: 'Toggle AceEditor',
    onPostRender: function(){
      $(".mce-twAceE .mce-caret").remove();
    },
    onclick: function(){
      if ($('.coder.' + editor.id).length) {
        $(".mce-"+editor.id+"popSource").parent().parent().css("visibility", "visible");
      }
      else{
        $(".mce-"+editor.id+"popSource").parent().parent().css("visibility", "hidden");
        loadAllace(0)
      }
    },
    menu:[
      {
        text:"Pop Source",
        classes: editor.id + "popSource",
        onclick: function(){
          if ($('.coder.' + editor.id).length) {
            loadAllace()
          }
        },
      }
      // ,{
      //   text:"Close Source",
      //   classes: editor.id + "closeSource",
      //   onclick: function(){
      //     killCodeAce(editor.id)
      //   }
      // }
    ]

  });
  editor.addMenuItem('code', {
    icon: 'code',
    text: 'AceEditor',
    context: 'tools',
    onclick: function(){
      loadAllace()
    }
  });
});
