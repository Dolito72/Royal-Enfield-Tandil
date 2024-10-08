const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach(container => {
    const video = container.querySelector('.eventos-video');
    const playButton = container.querySelector('.play-button');

    playButton.addEventListener('click', function() {
        video.play(); // Reproduce el video
        playButton.style.display = 'none'; // Oculta el botón Play
    });

    // Mostrar el botón de Play si el video se pausa
    video.addEventListener('pause', function() {
        playButton.style.display = 'flex'; // Muestra el botón Play
    });
});
