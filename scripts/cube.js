// 3D Cube Navigation Controller
document.addEventListener('DOMContentLoaded', function() {
  const cube = document.getElementById('dynamicCube');

  // Pause auto-rotation on cube hover, resume on mouse leave
  cube.addEventListener('mouseenter', () => {
    cube.style.animationPlayState = 'paused';
  });

  cube.addEventListener('mouseleave', () => {
    cube.style.animationPlayState = 'running';
  });
});