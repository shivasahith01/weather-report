let container=document.querySelector('.container')
let search=document.querySelector('.search-box button')
let weatherBox=document.querySelector('.weather-box')
let weatherDetails=document.querySelector('.weather-details')
let error=document.querySelector(".not-found")
let cityHide=document.querySelector(".city-hide")
search.addEventListener("click",()=>{
    const APIkey='4a43289e3224c3de30c586de81c8542f';
    let city=document.querySelector('.search-box input').value;
    console.log(city);

    if(city=='')
        return;
    
   window.fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
    .then(response=>response.json())
    .then((data)=>{

        if(data.cod=='404'){
            cityHide.textContent=city;
            container.style.height='400px';
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active');
            error.classList.add('active');
            cityHide.style.display='block'
            return;
        }
      

        console.log(data);
        let image=document.querySelector('.weather-box img');
        let temperature=document.querySelector('.weather-box .temperature');
        let description=document.querySelector('.weather-box .description');
        let humidity=document.querySelector('.weather-details .humidity span');
        let wind=document.querySelector('.weather-details .wind span');

        if(cityHide.textContent==city){
            return;
        }else{
            cityHide.textContent=city;
            container.style.height='550px'
            weatherBox.classList.add('active')
            weatherDetails.classList.add('active')
            error.classList.remove('active')
            cityHide.style.display='block'

            console.log(data.weather[0].main);
            switch(data.weather[0].main){
                case 'Clear':
                    image.src='./image/clear.png';
                    break;
    
                    case 'Rain':
                        image.src='./image/rain.png';
                        break;
                
                        case 'Snow':
                            image.src='./image/snow.png';
                            break;
    
    
                            case 'Clouds':
                                image.src='./image/cloud.png';
                                break; 
                                
                                
                                case 'Mist':
                                    image.src='./image/mist.png';
                                    break; 
    
                                    case 'Haze':
                                    image.src='./image/mist.png';
                                    break; 
    
    
                    default:
                        image.src='./image/cloud.png'
            }
            console.log(parseInt(data.main.temp));
            console.log(data.weather[0].description);
            console.log(data.main.humidity);
            console.log(`${parseInt(data.wind.speed)}Km/h`);
            temperature.innerHTML=`${parseInt(data.main.temp)}<span>°C</span>`
            description.innerHTML=`${data.weather[0].description}`;
            humidity.innerHTML=`${data.main.humidity}%`;
            wind.innerHTML=`${parseInt(data.wind.speed)}Km/h`
        }
    })
})

