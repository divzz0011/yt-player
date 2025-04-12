function extractVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  
  function playVideo() {
    const link = document.getElementById('youtubeLink').value;
    const start = parseInt(document.getElementById('startTime').value) || 0;
    const videoId = extractVideoID(link);
  
    if (videoId) {
      const embedURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${start}`;
      document.getElementById('youtubePlayer').src = embedURL;
      document.getElementById('thumbnailPreview').innerHTML = "";
      document.getElementById('videoInfo').innerHTML = "";
    } else {
      alert("Link YouTube tidak valid!");
    }
  }
  
  function previewThumbnail() {
    const link = document.getElementById('youtubeLink').value;
    const videoId = extractVideoID(link);
  
    if (videoId) {
      const thumbURL = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      document.getElementById('thumbnailPreview').innerHTML =
        `<img src="${thumbURL}" alt="Thumbnail Video" />`;
  
      fetchVideoInfo(videoId);
    } else {
      alert("Link YouTube tidak valid!");
    }
  }
  
  function fetchVideoInfo(videoId) {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  
    document.getElementById('loading').style.display = "block";
  
    fetch(oembedUrl)
      .then(res => res.json())
      .then(data => {
        document.getElementById('videoInfo').innerHTML =
          `<strong>${data.title}</strong> — oleh <em>${data.author_name}</em>`;
      })
      .catch(() => {
        document.getElementById('videoInfo').innerText = "Gagal memuat info video.";
      })
      .finally(() => {
        document.getElementById('loading').style.display = "none";
      });
  }
  
  function downloadVideo(format) {
    const link = document.getElementById('youtubeLink').value;
    const videoId = extractVideoID(link);
  
    if (!videoId) {
      alert("Link YouTube tidak valid!");
      return;
    }
  
    let downloadURL = "";
  
    if (format === 'mp3') {
      downloadURL = `https://en1.savefrom.net/102-youtube-music-downloader-10up.html/${videoId}`;
    } else if (format === 'mp4') {
      downloadURL = `https://en1.savefrom.net/21-youtube-to-mp4-37Nq.html/${videoId}`;
    }
  
    window.open(downloadURL, '_blank');
  }
  
  // Drag and Drop
  const dropZone = document.getElementById('dropZone');
  
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
  
    const data = e.dataTransfer.getData("text");
    if (data.includes("youtube.com") || data.includes("youtu.be")) {
      document.getElementById('youtubeLink').value = data;
      previewThumbnail();
    } else {
      alert("Tolong drop link YouTube yang valid.");
    }
  });
  