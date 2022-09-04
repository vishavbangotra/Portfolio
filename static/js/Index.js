console.log('connected')

// navbar loading
$(function(){
  $("#nav-placeholder").load("nav.html");
});
const myDetail = `
An Engineering student at UIET Panjab University, Chandigarh with strong fundamenals in algorithms and problem solving.
`;


document.getElementById('about-me-detail').innerHTML = myDetail;
$('#linkedin-logo').css("filter", 'brightness(0%)')

$('#github-logo').mouseenter(function(){
    console.log("github mouse enter");
    $('#github-logo').css("filter", 'invert(73%) sepia(59%) saturate(5851%) hue-rotate(360deg) brightness(107%) contrast(106%)');
    
})
$('#github-logo').mouseleave(function(){
    $('#github-logo').css("filter", 'none')
    
})
$('#linkedin-logo').mouseenter(function(){
    $('#linkedin-logo').css("filter", 'brightness(0) saturate(100%)invert(73%) sepia(59%) saturate(5851%) hue-rotate(360deg) brightness(107%) contrast(106%)')
})
$('#linkedin-logo').mouseleave(function(){
  $('#linkedin-logo').css("filter", 'brightness(0%)')
})

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

