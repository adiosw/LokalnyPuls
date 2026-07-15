const slider=document.getElementById('profitSlider'),sliderValue=document.getElementById('sliderValue'),lostProfit=document.getElementById('lostProfit');
function formatNumber(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ");}
function calculateLoss(p){const clients=200,conv=0.4;return Math.round(clients*conv*p);}
function updateCalculator(){const v=parseInt(slider.value);sliderValue.textContent=formatNumber(v)+' zł';lostProfit.textContent=formatNumber(calculateLoss(v))+' zł';}
slider.addEventListener('input',updateCalculator);
updateCalculator();