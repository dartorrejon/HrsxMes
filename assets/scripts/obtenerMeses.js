
const año = new Date().getFullYear();
const boton = document.querySelector('form');

//Funcion para obtener los dias del mes
function obtenerDias(year, month){
   const date = new Date(year,month,1);
   date.setMonth(month+1);
   date.setDate(date.getDate()-1)
   return date.getDate();
}

boton.addEventListener('submit', ev => {
   let horas= 0;
   ev.preventDefault();
   
   const select = document.querySelector('select');
   const elegido = select.selectedIndex
   const mes = parseInt(select.options[elegido].value) //Guardamos el valor del mes seleccionado

   fetch(`http://nolaborables.com.ar/api/v2/feriados/${año}?formato=mensual`)
      .then(res => res.json())
      .then(data => {
         let arrayFeriados = Object.keys(data[mes]).map(str => parseInt(str,10)) // Parseamos todos los elementos string a int en base 10
         const dias = obtenerDias(año,mes) //Obtenemos los dias del mes

         //Si es Enero o Diciembre se agregan 12 horas
         if(mes==0 || mes == 11){
            horas += 12;
         }

         for(let i=0;i<dias;i++){
            let dia = i+1
            let diaSemana = new Date(año,mes,dia).getDay()
          
            if(diaSemana == 2) continue;
            if(diaSemana == 6 && !arrayFeriados.includes(dia)){
               horas += 10;
               continue; 
            }
            if(diaSemana == 0){
               horas += 12;
               continue;
            }
            if(arrayFeriados != [] && arrayFeriados.includes(dia)){
               horas += 12;
            }else{
               horas +=7;
            }
           
         }
         let output = document.querySelector('.output-container');
         output.innerHTML = '';
         const h3 = document.createElement('h3');
         const p = document.createElement('p');
         h3.textContent = `Horas totales en el mes de ${select.options[elegido].textContent}: ${horas} `;
         if(horas<240)
         p.textContent = `Te hacen falta ${240-horas} hrs para cumplir con el objetivo de 240 hrs mensuales.`
         if(horas>225){
            h3.style.color = 'green';
            p.style.color = 'green';
            h3.textContent += "😀👍"
         }else{
            h3.style.color = 'red';
            p.style.color = 'red';
            h3.textContent += "😞👎"
         }
        
         output.appendChild(h3);
         output.appendChild(p);
     
      });
});







