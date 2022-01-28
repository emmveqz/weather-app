
export type IWeatherApiPayload = {
	cod: number,
	id: number,
	main: {
		temp: number,
		feels_like: number,
		temp_min: number,
		temp_max: number,
		humidity: number,
	},
	name: string,
	sys: {
		sunrise: number,
		sunset: number,
	},
	weather: Array<{
		description: string,
	}>,
	wind: {
		speed: number,
		deg: number,
	},
}

export default IWeatherApiPayload
