/** Lecture muette contrôlée, avec un poster au repos sous mouvement réduit. */
export function initHeroVideo(
  video: HTMLVideoElement,
  toggle: HTMLButtonElement,
  preference = window.matchMedia('(prefers-reduced-motion: reduce)'),
): void {
  const update = () => {
    const playing = !video.paused && !video.ended;
    toggle.textContent = playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo';
    toggle.setAttribute('aria-pressed', String(playing));
  };
  const play = () => { void video.play().catch(update); };
  const applyPreference = () => {
    video.autoplay = !preference.matches;
    if (preference.matches) {
      video.pause();
      video.preload = 'none';
      video.load();
    } else {
      video.preload = 'metadata';
      play();
    }
    update();
  };

  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  video.addEventListener('ended', update);
  toggle.addEventListener('click', () => {
    if (video.paused || video.ended) play();
    else video.pause();
  });
  preference.addEventListener('change', applyPreference);
  applyPreference();
}
