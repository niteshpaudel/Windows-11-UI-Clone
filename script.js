//function to display the current time
function formatTime(date, includeAmPm = false) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  if (includeAmPm) {
    return `${hours}:${minutes} ${amPm}`;
  } else {
    return `${hours}:${minutes}`;
  }
}

function displayTime() {
  const now = new Date();
  const clockTime = formatTime(now, false);
  document.getElementById('clock').textContent = clockTime;

  const taskBarTime = formatTime(now, true);
  document.getElementById('task-bar-time').textContent = taskBarTime;
}

setInterval(displayTime, 60000);
displayTime();

// Function to display the current temperature and update weather icon
function displayTemperature(temperature, iconCode) {
  const temperatureElement = document.getElementById('temperature');
  const weatherIconElement = document.querySelector('.weather-icon');

  temperatureElement.textContent = `${temperature} °C`;

  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  weatherIconElement.src = iconUrl;
  weatherIconElement.alt = 'Weather Icon';
}

// Fetch weather data including the temperature and icon from openweathermap API
async function fetchWeatherData() {
  const apiKey = ''; // Replace with your API key
  const city = 'Srinagar'; // Replace with your city or area
  const units = 'metric';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.main && data.main.temp && data.weather && data.weather[0].icon) {
      const temperature = data.main.temp.toFixed(1);
      const iconCode = data.weather[0].icon;
      displayTemperature(temperature, iconCode);
    } else {
      displayTemperature('N/A', '');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    displayTemperature('N/A', '');
  }
}

//fetch and display
fetchWeatherData();



//function to display current day, date and month
function getCurrentDate(forTaskBar = false) {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  const dayNo = now.getDate();
  const monthNo = now.getMonth() + 1;
  if (forTaskBar) {
    return `${monthNo}/${dayNo}/${year}`;
  }
  else {
    return `${dayOfWeek}, ${monthName} ${year}`;
  }
}
function displayDate() {
  const currentDate = getCurrentDate();
  const currentDateTaskBar = getCurrentDate(true);
  document.getElementById('dateInfo').textContent = currentDate;
  document.getElementById('calendarDateInfo').textContent = currentDate;
  document.getElementById('task-bar-date').textContent = currentDateTaskBar;
}
displayDate();

//code to change colour of task bar when input is focused
const searchInput = document.getElementById('search');
const iconI2 = document.querySelector('.icon.i2');

searchInput.addEventListener('focus', () => {
  iconI2.classList.add('focus');
});

searchInput.addEventListener('blur', () => {
  iconI2.classList.remove('focus');
});


//code for music player
const artistTitle = document.getElementById('current-artist');
const artistSongTitle = document.getElementById('current-song');
const coverImage = document.getElementById('music-cover');
const musicPlayer = document.querySelector('.music-player');
const music = document.getElementById('song');
const playMusic = document.getElementById('play-song-button');
const nextMusic = document.getElementById('next-song-button');
const previousMusic = document.getElementById('previous-song-button');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');

const songs = [
  {
    title: 'Perfect',
    audio: 'https://dl.mr-jatt1.com/siteuploads/files/sfd16/7695/Perfect(Mr-Jatt1.com).mp3', //you can also specify path where your music is stored
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96', //you can also specify path where your cover image is stored
    artist: 'Ed Sheeran'
  },
  {
    title: 'Gasolina',
    audio: 'https://dl.mr-jatt1.com/siteuploads/files/sfd19/9070/Gasolina(Mr-Jatt1.com).mp3',
    coverImage: 'https://i1.sndcdn.com/artworks-000165580486-kjo1ps-t500x500.jpg',
    artist: 'Daddy Yankee'
  },
  {
    title: 'Maan Meri Jaan(Afterlife)',
    audio: 'https://dl.mr-jatt1.com/siteuploads/files/sfd19/9086/Maan%20Meri%20Jaan%20(Afterlife)(Mr-Jatt1.com).mp3',
    coverImage: 'https://c.saavncdn.com/184/Maan-Meri-Jaan-Afterlife-English-2023-20230310134919-500x500.jpg',
    artist: 'KING x Nick Jonas'
  },
  {
    title: 'Shinunoga E-Wa',
    audio: 'https://storage.zamona.net/upload/sounds/2020/03/zamona-net-fujii-kaze-shinunoga-e-wa.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d00001e026c2151ee7481148a5299b643',
    artist: 'Fujii Kaze'
  },
  {
    title: 'Happier Than Ever',
    audio: 'https://storage.zamona.net/upload/sounds/2020/012/zamona-net-billie-eilish-happier-than-ever.mp3',
    coverImage: 'https://pbs.twimg.com/media/E7kM81FXoAkWsjd.jpg:large',
    artist: 'Billie Eilish'
  },
  {
    title: 'Double Take',
    audio: 'https://dl.mr-jatt1.com/siteuploads/files/sfd17/8073/Double%20Take(Mr-Jatt1.com).mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273834f16100678d3e800fb5fb9',
    artist: 'Dhruv'
  },
  {
    title: 'STAY',
    audio: 'https://dl.mr-jatt1.com/siteuploads/files/sfd15/7095/STAY(Mr-Jatt1.com).mp3',
    coverImage: 'https://i1.sndcdn.com/artworks-ny0AFuWrQaHTD419-p84mHA-t500x500.jpg',
    artist: 'The Kid LAROI x Justin Beiber'
  },
  {
    title: 'Golden Hour',
    audio: 'https://storage.zamona.net/upload/sounds/2021/01/zamona-net-jvke-golden-hour-fujii-kaze-remix.mp3',
    coverImage: 'https://i.ytimg.com/vi/8hjX4BO2-ao/maxresdefault.jpg',
    artist: 'JVKE x Fujii Kaze'
  },
  {
    title: 'Baarishon Mein',
    audio: 'https://dl.mr-jatt1.com/siteuploads/files/sfd15/7053/Baarishon%20Mein(Mr-Jatt1.com).mp3',
    coverImage: 'https://c.saavncdn.com/476/Baarishon-Mein-Hindi-2022-20220707173221-500x500.jpg',
    artist: 'Darshan Raval'
  },
  {
    title: 'No Competition',
    audio: 'https://cdnsongs.com/music/data/Single_Track/202010/No_Competition/128/No_Competition_1.mp3',
    coverImage: 'https://c.saavncdn.com/679/No-Competition-Punjabi-2020-20220803120106-500x500.jpg',
    artist: 'Jass Manak x DIVINE'
  },
  //more songs can be added here
];

//function to load the song into the music player
let songIndex = Math.floor(Math.random() * songs.length);
loadSong(songs[songIndex])
function loadSong(song) {
  artistSongTitle.innerText = song.title;
  artistTitle.innerText = song.artist;
  music.src = song.audio;
  coverImage.src = song.coverImage;
  const totalDurationElement = document.getElementById('total-duration');

  //event listener to display the total duration of the song & loadedmetadata has been used for fast retrieval of the total duration
  music.addEventListener('loadedmetadata', () => {
    const totalDurationMinutes = Math.floor(music.duration / 60);
    const totalDurationSeconds = Math.floor(music.duration % 60);
    const totalDurationFormatted = `${totalDurationMinutes}:${totalDurationSeconds.toString().padStart(2, '0')}`;
    totalDurationElement.textContent = totalDurationFormatted;
  });
}

//event listener to display the current duration of the song
const currentTimeElement = document.getElementById('current-time');
music.addEventListener('timeupdate', () => {
  const currentTimeMinutes = Math.floor(music.currentTime / 60);
  const currentTimeSeconds = Math.floor(music.currentTime % 60);
  const currentTimeFormatted = `${currentTimeMinutes}:${currentTimeSeconds.toString().padStart(2, '0')}`;
  currentTimeElement.textContent = currentTimeFormatted;
});

//event listener to loop the playlist
music.addEventListener('ended', () => {
  if (songIndex == (songs.length) - 1) {
    songIndex = 0;
  }
  else {
    songIndex++;
  }
  loadSong(songs[songIndex]);
  playSong();
  progressBar.style.width = '0%';
});

//function to play the song 
function playSong() {
  musicPlayer.classList.add('play');
  playMusic.querySelector('i.fas').classList.remove('fa-play');
  playMusic.querySelector('i.fas').classList.add('fa-pause');
  music.play();
}

//function to pause song 
function pauseSong() {
  musicPlayer.classList.remove('play');
  playMusic.querySelector('i.fas').classList.remove('fa-pause');
  playMusic.querySelector('i.fas').classList.add('fa-play');
  music.pause();
}

//event listener for play button
playMusic.addEventListener('click', () => {
  if (music.paused) {
    playSong();
  }
  else {
    pauseSong();
  }
})

//event listener for next button
nextMusic.addEventListener('click', () => {
  songIndex++;
  if (songIndex == songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  if (musicPlayer.classList.contains('play')) {
    playSong();
  }
});

//event listener for previous button
previousMusic.addEventListener('click', () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  if (musicPlayer.classList.contains('play')) {
    playSong();
  }
});

//event listener to update the progress bar when the music is playing
music.addEventListener('timeupdate', () => {
  const progressPercent = (music.currentTime / music.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
});


//event listener to seek the song
progressBarContainer.addEventListener('click', (e) => {
  const seekTime = (e.offsetX / progressBarContainer.clientWidth) * music.duration;
  music.currentTime = seekTime;
});


//event listeners to display taskbar elements when clicked
let isRotated = false;
const taskBarArrowContainer = document.getElementById('arrow-up');
const taskBarArrow = document.getElementById('arrow-icon');
taskBarArrowContainer.addEventListener('click', () => {
  if (isRotated) {
    document.getElementById('arrow-hidden-icons').classList.remove('show');
    taskBarArrow.style.transform = 'rotate(0deg)';
  } else {
    document.getElementById('arrow-hidden-icons').classList.add('show');
    taskBarArrow.style.transform = 'rotate(180deg)';
  }
  isRotated = !isRotated;
});

document.addEventListener('click', (event) => {
  if (!taskBarArrowContainer.contains(event.target)) {
    document.getElementById('arrow-hidden-icons').classList.remove('show');
    taskBarArrow.style.transform = 'rotate(0deg)';
  }
  languageContainer.classList.remove('come-up');
});

const activeLanguages = document.querySelectorAll('.active-language');
activeLanguages.forEach(language => {
  language.addEventListener('click', () => {
    if (!language.classList.contains('active')) {
      activeLanguages.forEach(otherLanguage => {
        otherLanguage.classList.remove('active');
      });
      language.classList.add('active');
    }
  });
});
const showLanguages = document.querySelector('.keyboard');
const languageContainer = document.querySelector('.keyboard-elements');
showLanguages.addEventListener('click', (event) => {
  event.stopPropagation();
  languageContainer.classList.toggle('come-up');
});

const fillIcons = document.querySelectorAll('.ic-on');
fillIcons.forEach(myIcon => {
  myIcon.addEventListener('click', () => {
    myIcon.classList.toggle('fill');
  })
})

function addToggleEventListener(triggerElement, targetElement, toggleClass) {
  triggerElement.addEventListener('click', (event) => {
    event.stopPropagation();
    targetElement.classList.toggle(toggleClass);
  });

  document.addEventListener('click', (event) => {
    if (!targetElement.contains(event.target)) {
      targetElement.classList.remove(toggleClass);
    }
  });
}

const showBatteryWifiSound = document.querySelector('.battery-wifi-sound');
const batteryWifiSound = document.querySelector('.wifi-sound-battery');
addToggleEventListener(showBatteryWifiSound, batteryWifiSound, 'show-wifi-sound-battery');

const showNotificationCalendar = document.querySelector('.calendar');
const notificationCalendarContainer = document.querySelector('.notification-calendar-container');
addToggleEventListener(showNotificationCalendar, notificationCalendarContainer, 'notification-calendar-container-show');

const showStartIcons = document.querySelector('.start-button');
const startIcons = document.querySelector('.start-button-container');
addToggleEventListener(showStartIcons, startIcons, 'show-start-button-icons')

const increment = document.getElementById('increase');
const decrement = document.getElementById('decrease');
const timer = document.getElementById('timer');
let timerVal = 30;

increment.addEventListener('click', () => {
  if (timerVal < 240) {
    if (timerVal >= 30) {
      timerVal += 15;
    } else if (timerVal < 30) {
      timerVal += 5;
    }
    updateTimer();
  }
});

decrement.addEventListener('click', () => {
  if (timerVal > 30) {
    timerVal -= 15;
  } else if (timerVal <= 30) {
    if (timerVal > 5) {
      timerVal -= 5;
    }
  }
  updateTimer();
});

function updateTimer() {
  timer.textContent = timerVal;
}
