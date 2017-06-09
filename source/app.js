(function () {
  "use strict"

  // Check for IE9+
  if (!window.addEventListener) {
    return 
  }

  // Set options
  var options = INSTALL_OPTIONS
  var isPreview = INSTALL_ID == 'preview'
  var element


  // This runs every time the options are updated.
  function updateElement() {
    var ecwidStoreId = options.ecwidAccount ? options.ecwidAccount.userId : 1003
    element = INSTALL.createElement(options.location, element)

    element.className = "ecwid-store"
    element.id = "ecwid-store"

    // Display Ecwid Store
    window.ecwid_script_defer = true
    window.ecwid_dynamic_widgets = true

    if (typeof Ecwid != 'undefined') {
      Ecwid.destroy()
    }

    window._xnext_initialization_scripts = [
      {
        widgetType: 'ProductBrowser',
        id: element.id,
        arg: ["categoriesPerRow=3","views=grid(3,10) list(30) table(30)","categoryView=grid","searchView=list"]
      }, 
      {
        widgetType: 'Minicart',
        arg: ["layout=MiniAttachToProductBrowser"]
      }
    ]

    if (!document.getElementById('ecwid-script')) {
      var script = document.createElement('script')
      script.charset = 'utf-8'
      script.type = 'text/javascript'
      script.src = 'https://app.ecwid.com/script.js?' + ecwidStoreId + '&data_platform=cloudflare'
      script.id = 'ecwid-script'
      document.body.appendChild(script);

    } else {
      if (typeof Ecwid == 'object') {
        ecwid_onBodyDone();
      }
    }
  }


  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions
      updateElement()
    }
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement)
  }
  else {
    updateElement()
  }

}())
