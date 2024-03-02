// console.log('Hello I am Working')
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    const showAllBtn = document.getElementById('show-all-btn');
    phoneContainer.textContent = '';
    // console.log(phones.length);
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }
    // console.log('show all', isShowAll)
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        // phoneCard.classList.add('card', 'bg-base-100', 'shadow-xl');
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="phone" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleProgress(false);
}

const handleSearch = (isShowAll) => {
    toggleProgress(true);
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleProgress = (isLoading) => {
    const progress = document.getElementById('toggleProgress');
    if(isLoading){
        progress.classList.remove('hidden');
    }
    else{
        progress.classList.add('hidden');
    }
}

const showAllBtn = () => {
    handleSearch(true);
}

const showDetails = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(data.data);
    showModal(phone);
}

const showModal = (phone) => {
    console.log(phone) 
    const showModal = document.getElementById('show-modal');
    showModal.innerHTML = `
    <img class="mx-auto w-fit" src="${phone.image}" alt="">
    <h3 class="font-bold text-xl">${phone.name}</h3>
    <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">Slug: </span>${phone?.mainFeatures?.slug}</p>
    <p><span class="font-bold">Release Data: </span>${phone?.releaseDate}</p>
    <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
    <p><span class="font-bold">GPS: </span>${phone?.others?.GPS??'Unavailable'}</p>
    `;
    showAllD.showModal();
}

// loadPhone();