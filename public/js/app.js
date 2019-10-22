const frm = document.querySelector('form');
const inpt = document.querySelector('input');
const local = document.querySelector('.local');
const forecast = document.querySelector('.forecast');

frm.onsubmit = (e) => {
    e.preventDefault();

    const lctn = inpt.value;
    
    if(lctn === ""){
        alert("Type a location");
        return;
    }
    local.textContent = 'loading...';

    fetch(`/weather?address=${lctn}`).then((response) =>{
        response.json().then((data)=> {
            const {daily, rainProbability, temperature} = data.forecast;
            console.log(data);
            
            if(daily){
                local.textContent = data.location;    
                forecast.textContent = `${daily} A temperatura está ${temperature}°c e a probabilidade de chuva é de ${rainProbability * 100}%`;
            }else{
                local.textContent = "Faça uma nova pesquisa"
            }
        })
    });
}



