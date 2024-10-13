console.log('api.js added');

let currentPets = [];

// 4 ta url theke data fetch kore nilam
// 1) only 4 categoryr icon and name fetch
const getCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/peddy/categories';
    let response = await fetch(url);
    let obj = await response.json();

    console.log(obj);
    displayButtons(obj.categories)

}

// 2) all categoryr shb pet fetch
const getAllPets = async () => {
    const spinner = document.getElementById('spinner');
    const selectPets = document.getElementById('selectPets');
    spinner.classList.remove('hidden');
    selectPets.classList.remove('border-bordercolor', 'border-[1px]', 'rounded-lg');

    const url = 'https://openapi.programming-hero.com/api/peddy/pets';
    let response = await fetch(url);
    let obj = await response.json();

    setTimeout(() => {
        spinner.classList.add('hidden');
        selectPets.classList.add('border-bordercolor', 'border-[1px]', 'rounded-lg');
        displayPets(obj.pets);
    }, 2000); 

   


}

// 3) category wise pet info fetch
const getPetByCategory = async (category) => {
    //alert(category);
    const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
    let response = await fetch(url);
    let obj = await response.json();

    displayPets(obj.data);
}

// 3) Id wise pet info fetch
const getPetById = async (petId) => {
    //alert(category);
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    let response = await fetch(url);

    let obj = await response.json();
    return obj.petData;
}




// functions starts here.......
const displayButtons = (categories) => {
    // console.log(categories);
    //button create kore felbo

    const container = document.getElementById('btn-container');
    
    categories.forEach(i => {      // loop + arrow function -> ekta function looper vitor repeatedly execute korteci
        // console.log(i);
        const btn = document.createElement('button');
        btn.classList.add('category-btn', 'w-[120px]', 'lg:w-[180px]', 'flex', 'gap-2', 'md:gap-4', 'justify-center', 'items-center', 'py-[10px]', 'hover:bg-bordercolor', 'border-darkteal',   'border-opacity-15', 'border-[1px]', 'rounded-lg');
        btn.innerHTML = `<img class="h-6 w-6  lg:h-10 lg:w-10" src="${i.category_icon}" alt="">
                         <p class="text-black font-bold text-base md:text-xl"> ${i.category} </p>`

        container.append(btn);

        //console.log(i.category); 

        //button e click korle change -> addeventListener
        btn.addEventListener('click', () => {
            removeActiveButton();
            btn.classList.remove('border-opacity-15', 'border-[1px]', 'rounded-lg');
            btn.classList.add('border-[1.5px]', 'rounded-full', 'bg-darkteal', 'bg-opacity-20');

            getPetByCategory(i.category);  //getPetByCategory(dog/cat/bird);
        })

    });
}
const removeActiveButton = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(let i of buttons){
        i.classList.remove('border-[1.5px]', 'rounded-full', 'bg-darkteal', 'bg-opacity-20');
        i.classList.add('border-opacity-15', 'border-[1px]', 'rounded-lg');
    }
}






// show all the pets in left side
const displayPets = (pets) => {
    currentPets = pets;

    const container = document.getElementById('allPets');
    container.innerHTML = "";
    console.log(pets);

    if(pets.length == 0){
        container.classList.remove('grid');
        container.innerHTML = 
        `<div class="h-[420px] bg-slate-50 rounded-lg flex justify-center items-center">
            <div class="max-w-[600px]">
                <img class="mx-auto mb-4" src="assets/images/error.webp" alt="">
                <p class="text-center text-black font-bold mb-4 text-2xl md:3xl"> No Information Available </p>
                <p class="text-center text-lightash">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.  
                </p>
            </div>
        </div>`;
        
        return;
    }

    container.classList.add('grid');         // -> jodi pet thake tahole grid add korte hbe,,nahole ekta bird e giye abar ashle grid class thakbe na
    pets.forEach(i => {
        const card = document.createElement('div');

        card.classList.add('card', 'border-bordercolor', 'border-[1px]');
        card.innerHTML =   
        `<figure class="h-[180px] p-4">
            <img class="h-full w-full object-cover rounded-lg" src="${i.image}" alt="i.category" />
        </figure>
        <div class="card-body py-0 px-4 gap-1">
            <h5 class="text-black font-bold text-lg"> ${i.pet_name || 'Unknown'} </h2>
            <div class="flex gap-2 items-center">
                <img class="w-5 h-5" src="assets/icons/breed.jpg" alt="">
                <p class="text-black text-opacity-70"> Breed: ${i.breed || 'Unknown'} </p>
            </div>
            <div class="flex gap-2 items-center">
                <img class="w-5 h-5" src="assets/icons/birth.png" alt="">
                <p class="text-black text-opacity-70"> Birth: ${i.date_of_birth || 'Unknown'} </p>
            </div>
            <div class="flex gap-2 items-center">
                <img class="w-5 h-5" src="assets/icons/gender.png" alt="">
                <p class="text-black text-opacity-70"> Gender: ${i.gender || 'Unknown'} </p>
            </div>
            <div class="flex gap-2 items-center">
                <img class="w-5 h-5" src="assets/icons/price.png" alt="">
                <p class="text-black text-opacity-70"> Price : ${i.price || 'Unknown'}$ </p>
            </div>
        </div>
        <div class="card-actions m-4 pt-2 border-ash border-t-[1px] border-opacity-10 flex justify-between">
            <button id="like-${i.petId}" class="btn h-10 min-h-10 bg-white border-darkteal border-opacity-15"> <img src="assets/icons/thumps.svg" alt=""></button>
            <button id="adopt-${i.petId}" class="btn h-10 min-h-10 text-darkteal bg-white border-darkteal border-opacity-15"> Adopt </button>
            <button id="details-${i.petId}" class="btn h-10 min-h-10 text-darkteal bg-white border-darkteal border-opacity-15"> Details </button>
        </div>`;

        container.append(card);

        // like button er jonne 
        const likeBtn = document.getElementById(`like-${i.petId}`);
        likeBtn.addEventListener('click', async () => {
            const petData = await getPetById(`${i.petId}`); 

            addToLeft(petData);
        })

        // adopt modal e show korar jonne
        const adoptBtn = document.getElementById(`adopt-${i.petId}`);
        adoptBtn.addEventListener('click', () => {
            showAdoptModal();
        })

        //details modal e show korar jonne -> class name details
        const detailsBtn = document.getElementById(`details-${i.petId}`);
        detailsBtn.addEventListener('click', async () => {
            const petData = await getPetById(`${i.petId}`);  
            
            showDetailsModal(petData);
        })
                    
    })
}

// like button -> left e add kora
const addToLeft = (pet) => {
    const container = document.createElement('div');
    container.innerHTML = 
    `<img class="rounded-md w-full h-[80px]" src="${pet.image}" alt="">
    `

    document.getElementById('selectPets').append(container);

}

// adopt button -> modal e click korle modal show
const showAdoptModal = () => {
    console.log('adopted called')
    let count = 3;
    const countEl = document.getElementById('countdown');

    document.getElementById('adopt-modal').showModal();


    countEl.innerText = count;
    const interval = setInterval(() => {
        count--;
        countEl.innerText = count;

        if(count===0){
            clearInterval(interval);
            document.getElementById('adopt-modal').close();
        }
    }, 1000);
   
}

// details button -> e click korle modal show
const showDetailsModal = (pet) => {
    const container = document.getElementById('modal-container');
    container.innerHTML = 
    `<img class="rounded-md w-full h-[180px]" src="${pet.image}" alt="">
    <h5 class="text-black font-bold text-lg my-[6px]"> ${pet.pet_name} </h5>
    <div class="flex gap-1 flex-wrap mb-2">
        <div class="w-[48%] flex gap-2 items-center">
            <img class="w-5 h-5" src="assets/icons/breed.jpg" alt="">
            <p class="text-black text-opacity-70 text-sm"> Breed: ${pet.breed} </p>
        </div>
        <div class="w-[48%] flex gap-2 items-center">
            <img class="w-5 h-5" src="assets/icons/birth.png" alt="">
            <p class="text-black text-opacity-70  text-sm"> Birth: ${pet.date_of_birth} </p>
        </div>
        <div class="w-[48%] flex gap-2 items-center">
            <img class="w-5 h-5" src="assets/icons/gender.png" alt="">
            <p class="text-black text-opacity-70 text-sm"> Gender: ${pet.gender} </p>
        </div>
        <div class="w-[48%] flex gap-2 items-center">
            <img class="w-5 h-5" src="assets/icons/price.png" alt="">
            <p class="text-black text-opacity-70 text-sm"> Price : ${pet.price}$ </p>
        </div>
        <div class="w-full flex gap-2 items-center">
            <img class="w-5 h-5" src="assets/icons/price.png" alt="">
            <p class="text-black text-opacity-70 text-sm"> Vaccinated status : ${pet.vaccinated_status} </p>
        </div>
    </div>
    <div class="border-bordercolor border-t-[1px] py-2">
        <h5 class="text-black font-bold text-base">Details Information</h5> 
        <p class="text-black text-opacity-70 text-sm">
        ${pet.pet_details}
        </p> 
    </div>
    <div class="py-2">
        <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
            <button class="w-full text-darkteal bg-darkteal bg-opacity-10 border-darkteal border-[1px] border-opacity-20 py-2 rounded-lg"> Cancel </button>
        </form>
    </div>`

    
    document.getElementById('details-modal').showModal();           
}




// sort functionality 
document.getElementById('sortBtn').addEventListener('click', () => {
    if (currentPets.length === 0){
        return;
    }

    // Sort the pets by price in descending order
    const sortedPets = currentPets.sort((a, b) => {
        // Handle cases where price is missing
        const priceA = a.price ? parseFloat(a.price) : 0;
        const priceB = b.price ? parseFloat(b.price) : 0;
        return priceB - priceA;
    });

    displayPets(sortedPets); 
})




getCategory();
getAllPets();
