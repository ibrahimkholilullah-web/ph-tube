//time setup 
function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecound = time % 3600;
    const minute = parseInt(remainingSecound / 60);
    remainingSecound = remainingSecound % 60;

    return `${hour} Hour ${minute} Minute ${remainingSecound} Secound`

}
// create a categories
const createCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
// create video section
const createVideo = (searchText = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideo(data.videos))
    .catch((error) => console.log(error))
}
/// active class remove funtion
const activeBtnRemove =() =>{
    const removeClass = document.getElementsByClassName('remove-btn');
    for(let btn of removeClass ){
        btn.classList.remove('active')
    }
}
/// id funtion here
const loadCategoryVideo = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        activeBtnRemove()
        const newBtn = document.getElementById(`btn-${id}`)
        newBtn.classList.add('active')
        displayVideo(data.category)
    })
    .catch((error) => console.log(error))
}
//lode detais section
const loadDetails = async (videoId)=>{
    console.log(videoId)
    const url = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await url.json();
    displayDitails(data.video)
}
// display ditails 
const displayDitails = (video) =>{
    console.log(video)
    const detailsContainer = document.getElementById('modal-contant');
    detailsContainer.innerHTML= `
    <img src=${video.thumbnail} />
    <p class="py-2">${video.description}</p>
    `

    document.getElementById('customModal').showModal()
}
// display video section

const displayVideo = (videos) =>{
    const videoContainer = document.getElementById('video-section')
    videoContainer.innerHTML= "";
    if(videos.length ==0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class="flex justify-center items-center flex-col gap-5">
        <img src="Photo/Icon.png"  />
        <p class="text-lg font-bold">No Contant More is this Category</p>
        </div>
        `
    }else{
        videoContainer.classList.add('grid')
    }
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = 'card card-compact shadow-xl'
        card.innerHTML= `
         <figure class='h-[200px] relative'>
         <img class = "h-full w-full object-cover"
           src=${video.thumbnail}
           alt="Shoes" />
           ${video.others.posted_date?.length == 0 ? "" :
            ` <span class="absolute right-2 bottom-2 text-sm text-white bg-black rounded-lg p-1">${getTimeString(video.others.posted_date)}</span>`}
          
        </figure>
        <div class="py-2 px-1 flex gap-2">
          <div>
          <img class = 'w-10 h-10 rounded-full object-cover' src=${video.authors[0].profile_picture}>
          </div>
          <div>
          <h2 class = 'text-lg font-bold'>${video.title}</h2>
          <div class="flex gap-2 items-center">
          <p class="text-gray-400">${video.authors[0].profile_name}</p>
          ${video.authors[0].verified == true ? `<img class = "w-5 h-5" src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png' />` : ""}
          
          </div>
          
          <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm border-orange-400 bg-red-300">Details</button></p>
          </div>
        </div>
        `
    videoContainer.append(card)
    })
}

// display categori add
const displayCategories = (data) =>{
    const categoriesSection = document.getElementById('categories-section');
    data.forEach(element => {
        const butto = document.createElement('div')
        butto.innerHTML = `
        <button id="btn-${element.category_id}" 
        class='btn remove-btn' onclick="loadCategoryVideo(${element.category_id})">${element.category}</button>
        `
    
        categoriesSection.append(butto)
    });
    
}
document.getElementById('Search-input').addEventListener('keyup', (e)=>{
    createVideo(e.target.value)
})
createCategories()
createVideo();