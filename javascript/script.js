'use strict';
const container = document.querySelector('.container');
const titles = document.querySelectorAll(".title");
const searchContainer = document.querySelector('.search-container');
const profileContainer = document.querySelector('.profile-container');
const follow = document.querySelector('.follow');
const mode = document.querySelector('.mode');
const texts = document.querySelectorAll('.light');
const btnSearch = document.querySelector('.btn-search');
const error = document.querySelector('.err');
const login = document.querySelector('.login');
const type = document.querySelector(".type");
const id = document.querySelector('.id');
const description = document.querySelector('.description');
const date = document.querySelector('.date');
const rep = document.querySelector('.rep');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const locationContainer = document.querySelector('.location');
const website = document.querySelector('.website');
const twitter = document.querySelector('.twitter');
const company = document.querySelector('.company');
const inputData = document.querySelector('.search-input');
const userImage = document.querySelector('.user-image');
let check = true;

mode.addEventListener('click', () => {
    if (check === true ){
        mode.innerHTML = '<span>dark</span> <img src="assets/icon-moon.svg" alt="moon">';
        check = false;
        changeLight();
    }else {
        mode.innerHTML = '<span>light</span> <img src="assets/icon-sun.svg" alt="sun">';
        check = true;
        changeDark();
    }
})
const changeDark = () => {
    container.classList.add('back-ground-dark');
    searchContainer.classList.add('dark-container');
    profileContainer.classList.add('dark-container');
    follow.classList.add('dark-container');
    container.classList.remove('back-ground-light');
    searchContainer.classList.remove('light-container');
    profileContainer.classList.remove('light-container');
    follow.classList.remove('light-container-follow');
    titles.forEach(function (title) {
        title.classList.add("text-light-secondary");
        title.classList.remove("text-dark-secondary");
    });
    texts.forEach(function (text) {
        text.classList.add('text-light');
    });
}
const changeLight = () => {
    container.classList.remove('back-ground-dark');
    searchContainer.classList.remove('dark-container');
    profileContainer.classList.remove('dark-container');
    follow.classList.remove('dark-container');
    container.classList.add('back-ground-light');
    searchContainer.classList.add('light-container');
    profileContainer.classList.add('light-container');
    follow.classList.add('light-container-follow');
    
    titles.forEach(function (title) {
        title.classList.remove("text-light-secondary");
        title.classList.add("text-dark-secondary");
    });
    texts.forEach(function (text) {
        text.classList.remove('text-light');
    });
}
const getData = async (login) => {
    try {
        const url = await fetch(`https://api.github.com/users/${login}`);
        const data = await url.json();
        console.log(data);
        if (data?.login) {
            error.classList.add("hidden");
            profileContainer.classList.remove("hidden");
            display(data);
        } else {
            profileContainer.classList.add("hidden");
            error.classList.remove("hidden");
        }

    } catch (e) {
        alert(e);
    }
}

getData("FatemeNasiri122")

btnSearch.addEventListener('click', () => getData(inputData.value));


const display = (user) => {
    login.innerHTML = `<span class=${user.name ? "" : "not-available"}>${user.name ? user.name : "not available"}</span>`;
    type.innerHTML = `<span class=${user.type ? "" : "not-available"}>${user.type ? user.type : "not available"}</span>`;
    id.innerHTML = `<span class=${user.login ? "" : "not-available"}>${user.login ? `@${user.login}` : "not available"}</span>`;
    description.innerHTML = `<span class=${user.bio ? "" : "not-available"}>${user.bio ? user.bio : "no bio available"}</span>`;
    date.innerHTML = `<span class=${user.created_at.split("T")[0] ? "" : "not-available"}>${user.created_at.split("T")[0]? user.created_at.split("T")[0] : "not available"}</span>`;
    rep.innerHTML = `<span class=${user.public_repos ? "" : "not-available"}>${user.public_repos ? user.public_repos : "not available"}</span>`;
    followers.innerHTML = `<span class=${user.followers ? "" : "not-available"}>${user.followers ? user.followers : "not available"}</span>`;
    following.innerHTML = `<span class=${user.following ? "" : "not-available"}>${user.following ? user.following : "0"}</span>`;
    locationContainer.innerHTML = `<span class=${user.location ? "" : "not-available"}>${user.location ? user.location : "not available"}</span>`;
    website.innerHTML = user.html_url ? `<a href=${user.html_url}><span style="overflow: hidden">${user.html_url}</span></a>` : "not available";
    twitter.innerHTML = `<span class=${user.twitter_username ? "" : "not-available"}>${user.twitter_username ? `@${user.twitter_username}` : "not available"}</span>`;
    company.innerHTML = `<span class=${user.company ? "" : "not-available"}>${user.company? user.company : "not available"}</span>`;
    userImage.src = `${user.avatar_url}`
}