document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const thumb = document.getElementById('slider-thumb');
  const sliderValue = document.getElementById('slider-value');
  const sliderWidth = slider.clientWidth;
  let isDragging = false;

  thumb.addEventListener('mousedown', function(event) {
    isDragging = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(event) {
    if (!isDragging) return;

    const rect = slider.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > sliderWidth) offsetX = sliderWidth;

    thumb.style.left = `${offsetX}px`;
    const value = Math.round((offsetX / sliderWidth) * 100);
    sliderValue.textContent = value;
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('wheel', function(event) {
    event.preventDefault();

    const delta = event.deltaY;
    const step = sliderWidth / 100;
    let currentOffsetX = parseFloat(thumb.style.left) || 0;

    if (delta > 0) {
      currentOffsetX -= step;
    } else {
      currentOffsetX += step;
    }

    if (currentOffsetX < 0) currentOffsetX = 0;
    if (currentOffsetX > sliderWidth) currentOffsetX = sliderWidth;
  
    thumb.style.left = `${currentOffsetX}px`;
    const value = Math.round((currentOffsetX / sliderWidth) * 100);
    sliderValue.textContent = value;
  });
  thumb.style.left = '0px';
  sliderValue.textContent = '0';
});