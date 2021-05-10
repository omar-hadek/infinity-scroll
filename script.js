const imageContainer = document.getElementById('image-container');
//Unsplash Api
let count = 10;
const apiKey = 'AD_IANiq0w4Dsrm24prfDjTB3l3ng3LS7AxjY6Qe0s8'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}
function displayphotos() {
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

// On Load
getPhotos();