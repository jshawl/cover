function cover( selector ){
  document.body.addEventListener("click", function(event){
    uncover()
  })
  document.body.addEventListener("keyup", function(event){
    if(event.keyCode == 27){
      uncover()
    }
  })
  var images = document.querySelectorAll(selector)
  var i = 0, len = images.length
  for( ; i < len; i++ ){
    var image = images[i]
    image.addEventListener("click", function(event){
      event.preventDefault()
      event.stopPropagation()
      var obg = document.querySelector("[data-cover]")
      if( obg ) {
	return uncover()
      }
      var bg = document.createElement("div")
      bg.setAttribute("data-cover","true")
      bg.style.left = event.target.offsetLeft + "px"
      bg.setAttribute("data-cover-left", bg.style.left)
      bg.style.top = (event.target.offsetTop - window.scrollY) + "px"
      bg.setAttribute("data-cover-top", bg.style.top)
      bg.style.position = "fixed"
      bg.style.width = event.target.offsetWidth + "px"
      bg.setAttribute("data-cover-width", bg.style.width)
      bg.style.height = event.target.offsetHeight + "px"
      bg.setAttribute("data-cover-height", bg.style.height)
      var r = gcd(event.target.offsetWidth, event.target.offsetHeight)
      var rx = event.target.offsetWidth / r
      var ry = event.target.offsetHeight / r
      var wx = window.innerWidth
      var wy = window.innerHeight
      bg.style.transition = "all .2s ease"
      var t = event.target.cloneNode()
      t.style.width = "100%"
      bg.appendChild(t)
      setTimeout(function(){
	if( ( rx * wx ) > ( ry * wy ) ){
	  var height = wy / ry
	  bg.style.height = (wy / ry) + "px"
	  var width = wx
	  bg.style.width = wx + "px"
	} else {
	  var height = wy
	  bg.style.height = wy + "px"
	  var width = ( rx * wy ) / ry
	  bg.style.width = width + "px"
	}
	bg.style.top = ( ( wy / 2 ) - ( height / 2 ) ) + "px"
	bg.style.left = ( ( wx / 2 ) - ( width / 2 ) ) + "px"
      }, 0)
      document.body.insertBefore(bg, document.body.children[0])
    })
  }

  function gcd (a, b) {
    return (b == 0) ? a : gcd (b, a%b);
  }

  function uncover(){
    var obg = document.querySelector("[data-cover]")
    if( obg ) {
      obg.style.left = obg.getAttribute("data-cover-left")
      obg.style.top = obg.getAttribute("data-cover-top")
      obg.style.width = obg.getAttribute("data-cover-width")
      obg.style.height = obg.getAttribute("data-cover-height")
      obg.className = "shrinking"
      setTimeout(function(){
	return document.body.removeChild(obg)
      }, 200)
      return
    }
  }
}