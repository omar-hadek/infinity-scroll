const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
//Unsplash Api
let imagesCount = 0;
let imagesTotal = 0;
let ready = true;
let count = 3;
let photosArray= [];
const apiKey = 'AD_IANiq0w4Dsrm24prfDjTB3l3ng3LS7AxjY6Qe0s8'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// create a and img element  function 
function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}

// image load function
function imageloaded() {
    imagesCount++;
    if (imagesCount === imagesTotal) {  
        ready == true;
        loader.hidden = true;
        count = 10;
    }
}


//displaying the photos 
function displayphotos() {
    //imagesCount = 0;
    imagesTotal = photosArray.length;
    // run the function for each object in the array
    photosArray.forEach((photo) => {

        //create <a> element on html
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create image element on html
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        
        //append both item and image to their parents
        item.appendChild(img);
        imageContainer.appendChild(item);

        // event listener check when each image is loaded
        img.addEventListener('load', imageloaded);
            
    });
    
}

//Get photos from Unsplash Api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayphotos();
    } catch (error) {
        
    }
}

//infinit scroll function 
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 ) {
        ready = false;
        getPhotos();
    }
})


