
import React, {
	FC,
}							from "react"

import Card					from "@mui/material/Card"
import CardActions			from "@mui/material/CardActions"
import CardContent			from "@mui/material/CardContent"
import Typography			from "@mui/material/Typography"

//

export type IProps = {
	city: string,
	description: string,
	feelsLike: number,
	humidity: number,
	temp: number,
	tempMax: number,
	tempMin: number,
	windSpeed: number,
}

//

export const CityCard: FC<IProps> = (props) => {
	return (
		<Card className="city-card" sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{props.description}
				</Typography>
				<Typography variant="h5" component="div">
					{props.city}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					feels like {props.feelsLike}&deg;
					|
					humidity {props.humidity}%
				</Typography>
				<Typography variant="body2">
					Temp {props.temp}&deg;
					<br />
					Min {props.tempMin}&deg;
					<br />
					Max {props.tempMax}&deg;
				</Typography>
			</CardContent>
			<CardActions>
			</CardActions>
		</Card>
	)
}

export default CityCard
