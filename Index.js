console.log('connected')

$('.github-box').mouseenter(function(){
    console.log("github mouse enter");
    $('#github-logo').css("filter", 'invert(73%) sepia(59%) saturate(5851%) hue-rotate(360deg) brightness(107%) contrast(106%)');
    // $('.github-box').css("box-shadow", 'inset -6px -6px 26px rgba(255, 255, 255 ,0.83), inset 6px 6px 16px rgba(217, 210, 200, 0.51)');
    
})
$('.github-box').mouseleave(function(){
    $('#github-logo').css("filter", 'none')
    // $('.github-box').css("box-shadow", '-6px -6px 26px rgba(255, 255, 255 ,0.83), 6px 6px 16px rgba(217, 210, 200, 0.51)');
    
})
$('.linkedin-box').mouseenter(function(){
    $('#linkedin-logo').css("filter", 'brightness(0) saturate(100%)invert(73%) sepia(59%) saturate(5851%) hue-rotate(360deg) brightness(107%) contrast(106%)')
    // $('.linkedin-box').css("box-shadow", 'inset -6px -6px 26px rgba(255, 255, 255 ,0.83), inset 6px 6px 16px rgba(217, 210, 200, 0.51)');
})
$('.linkedin-box').mouseleave(function(){
    $('#linkedin-logo').css("filter", 'none');
    // $('.linkedin-box').css("box-shadow", '-6px -6px 26px rgba(255, 255, 255 ,0.83), 6px 6px 16px rgba(217, 210, 200, 0.51)');
})
// $('.resume-box').mouseenter(function(){
//     console.log("done");
//     $('#cv-head').css("color", "#EFEEEE");
// })
// $('.resume-box').mouseleave(function(){
//   $('#cv-head').css("color", "#212529");
// })
// $('.resume-box').mouseenter(function(){
//   $('#cv-logo').css("filter", 'brightness(0) saturate(100%)invert(73%) sepia(59%) saturate(5851%) hue-rotate(360deg) brightness(107%) contrast(106%)')
//   $('.resume-box').css("box-shadow", 'inset -6px -6px 26px rgba(255, 255, 255 ,0.83), inset 6px 6px 16px rgba(217, 210, 200, 0.51)');
// })
// $('.resume-box').mouseleave(function(){
//   $('#cv-logo').css("filter", 'none');
//   $('.resume-box').css("box-shadow", '-6px -6px 26px rgba(255, 255, 255 ,0.83), 6px 6px 16px rgba(217, 210, 200, 0.51)');
// })


// box-shadow: -6px -6px 26px rgba(255, 255, 255 ,0.83), 6px 6px 16px rgba(217, 210, 200, 0.51);
































let wrapper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function writingAll (stringTarget, container){
  wrapper = document.querySelector('['+container+']')
  const stringsContainer = document.getElementsByClassName(stringTarget)
     
  while(wrapper){
    for (i=0; i <  stringsContainer.length ; i++){
      const string = stringsContainer[i].textContent
      await write(string)
      await sleep(1000)
      await erase()
      await sleep(1000)
    };
  }
};

async function write(text){    
  let index = 0
  while(index < text.length){
    const timeout = 100
    await sleep(timeout)
    index++
    wrapper.innerHTML = text.substring(0, index)
  }
};


async function erase() {
  while(wrapper.textContent.length){
    const timeout = 100
    await sleep(timeout)
    wrapper.textContent = wrapper.textContent.substring(0, wrapper.textContent.length - 2)
  }
};

writingAll('item', 'data-text');

