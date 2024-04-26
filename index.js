const day = document.querySelector('#day')
const date = document.querySelector('#date')
const png = document.querySelector('#png')
const temp = document.querySelector('#temp')
const condition = document.querySelector('#condition')

//forecastUI selection
const forecastday1Day = document.querySelector('#day1_day')
const forecastday2Day = document.querySelector('#day2_day')
const forecastday3Day = document.querySelector('#day3_day')

const forecastday1Emoji  = document.querySelector('#day1_png')
const forecastday2Emoji  = document.querySelector('#day2_png')
const forecastday3Emoji  = document.querySelector('#day3_png')

const forecastday1Temp = document.querySelector('#day1_temp')
const forecastday2Temp = document.querySelector('#day2_temp')
const forecastday3Temp = document.querySelector('#day3_temp')


const inputfield = document.querySelector('.input_box')
// console.log(inputfield)

//fetching data from weatherAPI

async function fetchData(inputCity){
    //Making the api request
   
    try {
        const currenttempurl = `https://api.weatherapi.com/v1/current.json?key=219f545a9aec438cbbc33602241404&q=${inputCity}&aqi=no`
        
        


        const response = await fetch(currenttempurl)
        // console.log(response)

        const responseBody = await response.json()
        console.log(responseBody)

        const currentTemp = responseBody.current.temp_c
        console.log(currentTemp)

        const currentCondition = responseBody.current.condition.text
        console.log(currentCondition)

        const location_name = responseBody.location.name
        console.log(location_name)

        const localTimeAndDate = responseBody.location.localtime
        console.log(localTimeAndDate)

        const localDate =  localTimeAndDate.split(' ')[0]
        const locatTime = localTimeAndDate.split(' ')[1]

        // console.log(localDate)
        // console.log(locatTime)

        const localDay = (new Date(localDate)).toLocaleDateString('en-us', {weekday:'long'})
        console.log(localDay)

        const currentConditionEmoji = responseBody.current.condition.icon
        console.log(currentConditionEmoji)
    
        updateUI(localDay, localDate, location_name,currentConditionEmoji, currentTemp, currentCondition)
    } catch (error) {
        console.log(error)
    }
}

async function fetchDataHistory (inputCity){

    try {
        
        const forecasturl = `http://api.weatherapi.com/v1/forecast.json?key=219f545a9aec438cbbc33602241404&q=${inputCity}&days=7&aqi=no&alerts=no
        `

        const forecastResponse = await fetch(forecasturl)

        const forecastResponseBody = await forecastResponse.json()

        console.log(forecastResponseBody)
        // console.log(forecastResponseBody.forecast.forecastday.length)
        let forecastdata = forecastResponseBody.forecast.forecastday
        let dayTemp = []
        let dayOFForecastTemp = []
        let dayEmoji = []
        for(let i=0;i<forecastdata.length;i++){
            dayTemp[i] = forecastdata[i].day.avgtemp_c
            // console.log(dayTemp[i])

            dayOFForecastTemp[i] = forecastdata[i].date
            // console.log(dayOFForecastTemp[i])

            dayEmoji[i] = forecastdata[i].day.condition.icon
            // console.log(dayEmoji[i])

            // forecastUpdateUI(dayTemp[i], dayOFForecastTemp[i], dayEmoji[i])
        }

        const day1Temp  = dayTemp[0]
        const day2Temp  = dayTemp[1]
        const day3Temp  = dayTemp[2]


        const day1 = dayOFForecastTemp[0]
        console.log(day1)

        const day2 = dayOFForecastTemp[1]
        console.log(day2)

        const day3 = dayOFForecastTemp[2]
        console.log(day3)

        const day1Day = (new Date(day1)).toLocaleDateString('en-us', {weekday:'long'}) 
        console.log(day1Temp)
        
        const day2Day = (new Date(day2)).toLocaleDateString('en-us', {weekday:'long'})
        console.log(day2Temp)

        const day3Day = (new Date(day3)).toLocaleDateString('en-us', {weekday:'long'})
        console.log(day3Temp)
        


        const day1Emoji = dayEmoji[0]
        console.log(day1Emoji)

        const day2Emoji = dayEmoji[1]
        console.log(day2Emoji)

        const day3Emoji = dayEmoji[2]
        console.log(day3Emoji)



        forecastUpdateUI(forecastday1Day, forecastday1Emoji,forecastday1Temp ,day1Day,day1Emoji,day1Temp)
        forecastUpdateUI(forecastday2Day, forecastday2Emoji,forecastday2Temp,day2Day,day2Emoji,day2Temp)
        forecastUpdateUI(forecastday3Day, forecastday3Emoji,forecastday3Temp,day3Day,day3Emoji,day3Temp)
        
        


    } catch (error) {
        console.log(error)
    }
}


//Adding EventListener to the inputfield based on Enter key
inputfield.addEventListener('keypress', (e)=>{
    // console.log("enter is pressed")
    
    if(e.key == 'Enter'){
        const inputCity = inputfield.value
        console.log(inputCity)
        // e.preventDefault()

        fetchData(inputCity)
        fetchDataHistory(inputCity)
    }
    
})


//updateUI
function updateUI(TempDay, TempDate, tempLocation , emoji, temperature, conditionTemp){
    day.innerText = TempDay
    date.innerText = `${TempDate}, ${tempLocation}`
    png.src = emoji
    temp.innerText = `${temperature}`
    condition.innerText = conditionTemp
}

//updateForecastUI
function forecastUpdateUI (element1, element2,element3, forecastDays, forecastEmojiIcons, forecastTemperatures){
    element1.innerText = forecastDays
    element2.src = forecastEmojiIcons
    element3.innerText = forecastTemperatures
    // element.innerText = forecastEmojiIcons
    // forecastday1Day.innerText = forecastDays
    // forecastday2Day.innerText = forecastDays
    // forecastday3Day.innerText = forecastDays
    
    

    
    
    
}