
import React, {
	FC,
	useState,
	useCallback,
}							from "react"
import Button				from "@mui/material/Button"
import {
	CityCard,
	IProps as ICityCardProps,
}							from "./components/CityCard"
import {
	ZipCodePrompt,
	IProps as IZipCodePromptProps,
}							from "./components/ZipCodePrompt"
import ApiResponseStatus	from "../enums/ApiResponseStatus"
import type {
	IApiResponse,
	IWeatherApiPayload,
}							from "../interfaces/index"

//

export type IProps = {
}

//

const MAX_CITIES = 5
const API_ENDPOINT = "/api/weather/"

//

export const App: FC<IProps> = () => {
	const [
		prompts,
		setPrompts,
	] = useState<IZipCodePromptProps[]>([])

	const [
		cards,
		setCards,
	] = useState<ICityCardProps[]>([])

	const zipCodeChangeHandler = useCallback<NonNullable<IZipCodePromptProps["onZipCodeChange"]>>((elId: string, newVal: string) => {
		setPrompts((prev) => {
			const idx = prev.findIndex((zip) => zip.elId === elId)
			prev[idx].zip = newVal

			return prev
		})
	}, [0])

	const addCityClickHandler = useCallback(() => {
		if (prompts.length >= MAX_CITIES) {
			return
		}

		setPrompts( (prev) => prev.concat([{
				elId: `zip-code-${prev.length}`,
				idx: prev.length,
				zip: "",
			}])
		)
	}, [prompts.length])

	const getWeatherClickHandler = useCallback(async () => {
		let resp: Response
		let result: IApiResponse<IWeatherApiPayload[]>

		try {
			resp = await fetch( API_ENDPOINT + prompts.map((obj) => obj.zip).join(",") )
			result = await resp.json()
		}
		catch (err) {
			alert(`error: ${(err as Error).message}`)
			return
		}

		if (result.status !== ApiResponseStatus.Success) {
			alert(`${ApiResponseStatus[result.status]}: ${result.msg}`)
			return
		}

		setCards(result.data?.map( ({ main, name, weather, wind }) => ({
				city: name,
				description: weather[0]?.description,
				feelsLike: main.feels_like,
				humidity: main.humidity,
				temp: main.temp,
				tempMax: main.temp_max,
				tempMin: main.temp_min,
				windSpeed: wind.speed,
			}) ) ?? [],
		)
	}, [prompts.length])

	return (
		<div>
			<div>
			{
				prompts.map((obj) =>
					<ZipCodePrompt
						{ ...obj }
						key={obj.elId}
						onZipCodeChange={zipCodeChangeHandler}
					/>
				)
			}
			</div>
			<div className="some-margin">
				<Button
					onClick={addCityClickHandler}
					variant="outlined"
				>
					Add City
				</Button>
			</div>
			<div className="some-margin">
				<Button
					onClick={getWeatherClickHandler}
					variant="contained"
				>
					Get Weather
				</Button>
			</div>
			<div className="cards-container">
			{
				cards.map((obj, idx) =>
					<CityCard
						{ ...obj }
						key={idx}
					/>
				)
			}
			</div>
		</div>
	)
}

export default App
