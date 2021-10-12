const refs = {
   startBtn: document.querySelector('[data-action="start"]'),
   stopBnt: document.querySelector('[data-action="stop"]')
}
const { startBtn, stopBnt } = refs 
class CountdownTimer{
   constructor({targetDate,selector }) { // переменные 
      this.timerId = document.querySelector(selector);
      this.day = this.timerId.querySelector('[data-value="days"]');
      this.hour = this.timerId.querySelector('[data-value=hours]');
      this.min = this.timerId.querySelector('[data-value=mins]');
      this.sec = this.timerId.querySelector('[data-value=secs]');
      this.intervalId = null
      this.isActive = false
      this.startTime = targetDate 
      const {days, hours, mins,secs} = this.getTimeComponents(0) 
      this.updateTime(days, hours, mins, secs)
      this.start()
   }
   start() {
      if (this.isActive) {   // проверка на активность функции
         console.log('КОЛАЙДЕР УЖЕ ЗАПУЩЕН')
         return  // если да, активна = выход, если нет запускаем код ниже
      }
      console.log('КОЛАЙДЕР ЗАПУЩЕН')
      this.isActive = true
      this.intervalId = setInterval(() => {
         const currentTime=Date.now() // текущая
         const deltaTime = Math.abs(currentTime - this.startTime)   // осталось  по модулю
         const {days, hours, mins,secs} = this.getTimeComponents(deltaTime)
         this.updateTime(days, hours, mins,secs)
         console.log(`${days}: ${hours}: ${mins}: ${secs}`)
      }, 1000)
   }
   stop() {
      if (!this.isActive) {   // проверка на НЕ активность функции
         console.log('КОЛАЙДЕР УЖЕ ОСТАНОВЛЕН')
         return  // если да, НЕ активна = выход, если нет запускаем код ниже
      }
      console.log('КОЛАЙДЕР ОСТАНОВЛЕН')
      clearInterval(this.intervalId) // остановка цикла
      this.isActive = false // делаем счетчик неактивным для возможности запустить заново
      const {days, hours, mins,secs} = this.getTimeComponents(0) 
      this.updateTime(days, hours, mins,secs)
   }
   getTimeComponents(deltaTime) { // функция считает и отдает дни, часы минуты и секунды
      const days = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)))
      const hours = this.pad(Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      const mins = this.pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)))
      const secs = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000))
      return {days, hours, mins,secs}
   }
   pad(value) { // функция делает красоту, добавляет 0 там где нужно
      return String(value).padStart(2, '0')
   }
   updateTime( days, hours, mins, secs ) { // функция которая публикует резутьтат в хтмл
      this.day.textContent = days
      this.hour.textContent = hours
      this.min.textContent = mins
      this.sec.textContent = secs
   }
}
const timer = new CountdownTimer({
   targetDate: new Date('Oct 31, 2021'),
   selector: '#timer-1'
})
startBtn.addEventListener('click', timer.start.bind(timer))
stopBnt.addEventListener('click', timer.stop.bind(timer))