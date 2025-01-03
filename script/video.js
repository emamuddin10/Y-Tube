function getTimeString(time){
  // get hour and rest second 
  const hour = parseInt(time/3600)
  let remainingSecond = time % 3600
  let minite = parseInt(remainingSecond/60)
  remainingSecond = remainingSecond % 60
  return `${hour} hour ${minite} minite ${remainingSecond} second ago`
}

// REMOVE ACTIVE CLASS 
const removeActiveClass= ()=>{
  const buttons = document.getElementsByClassName('category-btn')
  console.log(buttons)
  for(let btn of buttons){
    btn.classList.remove("active")
  }
}

//  1. fecth load and show catagories on html
// create function load categories
const loadCategories = () => {
  // fecth data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log("kutaw bul korco", error));
  console.log("hi  i am load categories");
};

const loadCategoriesVideos=(id)=>{
  // alert(id)
  // fecth data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
    // sobar active class remove korabo
    removeActiveClass()
    // sudur id class k active rakte bolbo
      const activeBtn = document.getElementById(`btn-${id}`)
      activeBtn.classList.add("active")
      displayVideos(data.category)

    })
    .catch((error) => console.log("kutaw bul korco", error));
}

// load videos
const loadVideos = (searchText ="") => {
  // fecth data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log("kutaw bul korco", error));
  console.log("hi  i am load categories");
};
// create function display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML=" "
  if(videos.length == 0){
    videosContainer.classList.remove("grid")
    videosContainer.innerHTML = `
     <div class="min-h-28 flex flex-col justify-center items-center ">
       <img  src="assets/Icon.png" />
       <h2 class="text-xl font-bold ">
       No Content Here in this Categories
       </h2>
     </div>
    `
    return;

  }
  else{
    videosContainer.classList.add("grid")
  }
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList= 'card card-compact '

    card.innerHTML = `
   <figure class=" h-[200px] relative">
     <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${video.others.posted_date.length === 0 ? "" : `      <span class="absolute text-xs bg-slate-200 px-4 py-2 bottom-1 right-2 rounded-lg"> ${getTimeString(video.others.posted_date)}</span>`}
   </figure>
   <div class=" flex gap-5 py-7">
    <div>
      <img class="w-[50px] h-[50px] rounded-full object-cover" src= ${video.authors[0].profile_picture} />
    </div>
    <div>
      <h2 class="font-bold">${video.title} </h2>
      <div class="flex items-center gap-5">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>

        ${video.authors[0].verified == true ? `
          <img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>
          ` : "" 
         
        }
      </div>
      <p>${video.others.views}</p>
      <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error text-white">Details </button>
      
    </div>
    
  </div>
       `;
   videosContainer.appendChild(card)
  });
};
// create function display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((item) => {
    console.log(item.category);
    // create a button
    // const button = document.createElement("button");
    // button.classList = "btn justify=between center";
    // button.innerText = item.category;
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML =`
    <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class='btn category-btn'>${item.category}  </button>
    `
    
  
    //  set the element
    categoriesContainer.appendChild(buttonContainer);
  });
};
// LOAD DISPLAY DETAILS 
const loadDetails=async(videoId)=>{
 const url =  `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
 const res =await fetch(url)
 const data = await res.json()
 displayDetails(data.video)
}
// Display Details
const displayDetails = (video)=>{
  console.log(video)
  const detailsContainer = document.getElementById('modal-content')
  detailsContainer.innerHTML=`
  <img src=${video.thumbnail}/>
  <p> ${video.description} </P>
  `

  // way-1 
  document.getElementById('showModalData').click() 
  //way-2
  // document.getElementById("customModal").showModal()
}

document.getElementById('search-input').addEventListener('keyup',(event)=>{
   loadVideos(event.target.value)
})

loadCategories();
loadVideos();
