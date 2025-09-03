export async function fetchCars() {
    const headers = {
        'x-rapidapi-key': '4ec9c6e9a1msh14ade4642bf4240p13ba29jsn63025478f307',
		'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla',
     { headers: headers,
    
     });

    const result = await response.json();

    return result;
}