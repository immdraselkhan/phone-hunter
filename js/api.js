const searchBar = (fieldValue, dataLimit = true) => {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('search-bar').value = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${fieldValue}`)
    .then(res => res.json())
    .then(data => getPhones(data.data, dataLimit))
};

const getPhones = (phones, dataLimit) => {
    const allPhones = phones;
    if (phones == 0) {
        document.getElementById('not-found').classList.remove('hidden');
        document.getElementById('home-banner').classList.remove('hidden');
    }
    else {
        document.getElementById('not-found').classList.add('hidden');
        document.getElementById('home-banner').classList.add('hidden');
    };

    if (phones.length > 12 && dataLimit) {
        phones = phones.slice(0, 12);
        document.getElementById('view-all').classList.remove('hidden');
        document.getElementById('view-all').children[0].addEventListener('click', function() {
            document.getElementById('view-all').classList.add('hidden');
            getPhones (allPhones, false);
        });
    };
    document.getElementById('phones-container').innerHTML = '';
    phones.forEach(phone => {
        const {image, phone_name, slug} = phone;
        const displayPhone = `
            <div class="p-5 space-y-5 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
                <img class="rounded-t-lg" src="${image}" alt="${phone_name}">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${phone_name}</h5>
                    <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <button onclick="getSlug('${slug}')" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded cursor-pointer">See details<svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                </div>
            </div>
        `;
        document.getElementById('phones-container').innerHTML += displayPhone;
    });
    document.getElementById('spinner').classList.add('hidden');
};

const getSlug = slugs => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
        .then(res => res.json())
        .then(slugs => displaySlug(slugs.data))
};

const displaySlug = moreInfo => {
    document.getElementById('modal-box').innerHTML = '';
    const {brand, name, releaseDate} = moreInfo;
    const {displaySize, memory, storage} = moreInfo.mainFeatures;
    const addModal = `
        <div class="w-[90%] sm:w-2/4 max-w-sm sm:max-w-screen-sm bg-white rounded">
            <div class="flex justify-between items-center border-b mt-2 px-8 py-3">
                <h3 class="text-xl font-semibold">${name}</h3>
                <button onclick="closeModal()" type="button" class="text-white px-3 py-1.5 bg-blue-700 hover:bg-blue-800 rounded">Close</button>
            </div>
            <div class="text-md mb-2 px-8 py-5 space-y-3">
                <p><span class="font-bold">Brand:</span> ${brand}</p>
                <p><span class="font-bold">Release Date:</span> ${releaseDate}</p>
                <p><span class="font-bold">Display Size:</span> ${displaySize}</p>
                <p><span class="font-bold">RAM:</span> ${memory}</p>
                <p><span class="font-bold">ROM:</span> ${storage}</p>
            </div>
        </div>
    `;
    document.getElementById('modal-box').innerHTML += addModal;

    const modalBox = document.getElementById('modal-box');
    modalBox.classList.add('scale-100');
    closeModal = () => {
        modalBox.classList.remove('scale-100');
    };
};