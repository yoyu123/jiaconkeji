var SEPARATION = 100, AMOUNTX = 30, AMOUNTY = 30;
function set(className,way){
	var container;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouseX = 0, mouseY = 0;
var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;
var windowHalfX = innerWidth / 2;
var windowHalfY = innerHeight / 2;
init();
animate();
function init() {
  container = document.getElementsByClassName(className)[0]
  camera = new THREE.PerspectiveCamera( 105, innerWidth / innerHeight, 1, 10000 );
  camera.position.x = 300;
  camera.position.y = 100;
  camera.position.z = 2000;
  scene = new THREE.Scene();
  particles = new Array();
  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial( {
    color: 0xd4d4d4,
    program: function ( context ) {
      context.beginPath();
      context.arc( 0, 0, 0.5, 0, PI2, true );
      context.fill();
    }
  } );
  var i = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
      particle = particles[ i ++ ] = new THREE.Sprite( material );
      particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
      particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
      scene.add( particle );
    }
  }
  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  //- console.log(innerHeight);
  renderer.setSize( innerWidth, innerHeight);
  container.appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  //document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {

  if(innerWidth == window.innerWidth){
    if((Math.abs(innerHeight - window.innerHeight) == 29)||(Math.abs(innerHeight - window.innerHeight) == 38)||(Math.abs(innerHeight - window.innerHeight) == 79)||(Math.abs(innerHeight - window.innerHeight) == 219)||(Math.abs(innerHeight - window.innerHeight) == 72)||(Math.abs(innerHeight - window.innerHeight) == 198))
    return;
  }

  innerWidth = window.innerWidth;
  windowHalfX = innerWidth / 2;
  windowHalfY = innerHeight / 2;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( innerWidth, innerHeight - 50);
}

function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
  if ( event.touches.length === 1 ) {
    //event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    //event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

var raf = null;
$(window).scroll(function(){
  if($(window).scrollTop() < innerHeight+800 && raf == null){
    animate();
  }else if($(window).scrollTop() > innerHeight+800 && raf != null){
    window.cancelAnimationFrame(raf);
    raf = null;
  }
});
function animate() {
  raf = requestAnimationFrame( animate );
  render();
}
function render() {
  camera.position.y += ( mouseX - camera.position.y ) * .007;
  // camera.position.y += ( - mouseY - camera.position.y ) * 0;
  camera.lookAt( scene.position );
  var i = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
      particle = particles[ i++ ];
		particle.position.y = way==1?( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
        ( Math.sin( ( iy + count ) * 0.5 ) * 50 ):( Math.sin( ( ix - count ) * 0.3 ) * 50 ) +
        ( Math.sin( ( iy - count ) * 0.5 ) * 50 );
      particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
        ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
    }
  }
  renderer.render( scene, camera );
  count += 0.1;
}
}
set('canvas',1);
set('canvas-2',1);