// const flyInObject = document.querySelector(".fly-in-object")
const flyInObjectParent = document.querySelector(".fly-in-object-parent")
const flyInObjectChildren = flyInObjectParent.querySelectorAll("*")

flyInObjectChildren.forEach( child => {
  child.classList.toggle("fly-in-object")
})

// add loading screen at first loading
let loadingDuration = 300
let animationGap = 100

window.onload = () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.body.classList.remove("overflow-hidden")
    flyInObjectChildren.forEach((child, index) => {
      setTimeout(() => {
        child.classList.toggle("fly-in")
      }, index * animationGap)
    })
  }, loadingDuration)
}

// add pagination
const
  body = document.body,
  fullPageContainers = document.querySelectorAll(".full-page--container")

let nextIndex = 0, scrollDuration = 600

// add "wheel" eventlistener to body 
body.addEventListener('wheel', event => {
  event.preventDefault()
  
  nextIndex = event.deltaY > 0
    ? Math.min(nextIndex + 1, fullPageContainers.length - 1)
    : Math.max(nextIndex - 1, 0)

  smoothScroll(fullPageContainers, nextIndex, scrollDuration)
}, {passive: false})

// scroll animation
const smoothScroll = (targetElements, targetIndex, scrollDuration) => {
  let startTime = null

  const
    target = targetElements[targetIndex],
    targetPosition = target.offsetTop,
    startPosition = window.scrollY,
    distance = targetPosition - startPosition
  
  const animateScroll = currentTime => {
    if (startTime == null) startTime = currentTime
    
    const
      timeElapsed = currentTime - startTime,
      run = easeInOutCubic(timeElapsed, startPosition, distance, scrollDuration)
    
    window.scrollTo(0, run)

    if (timeElapsed < scrollDuration) {
      requestAnimationFrame(animateScroll)
    }
  }

  const easeInOutCubic = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  } 
  
  requestAnimationFrame(animateScroll)
}

const navItems = document.querySelectorAll(".nav-item")

navItems.forEach((navItem, index) => {
  navItem.addEventListener("click", () => {
    smoothScroll(fullPageContainers, index, scrollDuration)
  })
})