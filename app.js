const searchSong = async () => {
  const searchText = document.getElementById("searchBar").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displaySong(data.data);
  } catch (error) {
    displayerror("some thing worng");
  }
};
const displaySong = (songs) => {
  const songContainer = document.getElementById("songContainer");
  songContainer.innerHTML = "";

  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
<div class="col-md-9">
    <h3 class="lyrics-name">${song.title}</h3>
    <p class="author lead">Album by <span>${song.artist.name}</span></p>
    <audio controls>
  <source src="${song.preview}" type="audio/ogg">
  </audio>
</div>
<div class="col-md-3 text-md-right text-center">
    <button onclick="getLyris('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
</div>
    `;
    songContainer.appendChild(songDiv);
  });
};
const getLyris = async (artist, title) => {
  const url = `
  https://api.lyrics.ovh/v1/${artist}/${title}
  `;
  const res = await fetch(url);
  const data = await res.json();
  songLyrics(data.lyrics);
};
const songLyrics = (lyrics) => {
  const div = document.getElementById("songLyrics");
  div.innerText = lyrics;
};
const displayerror = (error) => {
  const something = document.getElementById("error");
  something.innerText = error;
};
