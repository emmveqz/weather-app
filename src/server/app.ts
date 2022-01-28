
import express				from "express"
import {
	promises as fs,
	constants as fsConstants,
}							from "fs"
import fetch, {
	Response,
}							from "node-fetch"
import path					from "path"
import ApiResponseStatus	from "../enums/ApiResponseStatus"
import type {
	IApiResponse,
	IWeatherApiPayload,
}							from "../interfaces"

//

const HTTP_PORT		= 8181
const PUBLIC_DIR	= path.resolve(__dirname,	"../../public")
const apiKey		= "89a35b48a9b4dd75c19e0df34874d986"
const apiUrl		= `https://api.openweathermap.org/data/2.5/weather?zip={zip},us&units=imperial&appid=${apiKey}`

//

const getApiResponse = <T>(status: ApiResponseStatus, data?: T, msg?: string): IApiResponse<T> => {
	return {
		data,
		msg,
		status,
	}
}

const parseZipCodes = (urlParam?: string): string[] => {
	return !urlParam
		? []
		: urlParam.split(",").filter((zip) => !!zip.length)
}

const getWeather = async (zipCodes: string[]): Promise<IApiResponse<IWeatherApiPayload[]>> => {
	let responses: Response[]
	let jsons: IWeatherApiPayload[]

	try {
		responses = await Promise.all(zipCodes
			.map( (zip) => fetch(apiUrl.replace("{zip}", zip)) ),
		)

		jsons = await Promise.all(responses
			.map( (response) => response.json() ),
		)
	}
	catch (err) {
		console.log(err)

		return {
			status: ApiResponseStatus.Error,
			data: [],
			msg: (err as Error).message,
		}
	}

	return {
		status: ApiResponseStatus.Success,
		data: jsons
			// tslint:disable-next-line: triple-equals
			.filter((json) => json.cod == 200)
			.map(({
				cod,
				id,
				main,
				name,
				sys,
				weather,
				wind,
			}) => ({
				cod,
				id,
				main,
				name,
				sys,
				weather,
				wind,
			})),
	}
}

const requestFile = async (url: string): Promise<string> => {
	const fileName = url === "/"
		? "index.html"
		: (url[0] === "/" ? url.substr(1) : url)

	const fullFileName = path.resolve(PUBLIC_DIR, fileName)

	try {
		await fs.access(fullFileName, fsConstants.F_OK)
		return fullFileName
	}
	catch (err) {
		console.log(err)
		return path.resolve(PUBLIC_DIR, "404.html")
	}
}

const server = express()

server.get("/api/weather(/)?:zipCodes?", async (req, resp) => {
	console.log(req.url)

	const zipCodes = parseZipCodes(req.params.zipCodes)

	if (!zipCodes.length) {
		resp.json( getApiResponse(ApiResponseStatus.Error, null, "zip codes missing") )
		return
	}

	resp.json( await getWeather(zipCodes) )
})

server.get("/api*", async (req, resp) => {
	console.log(req.url)

	resp.json( getApiResponse(ApiResponseStatus.Error, null, "not implemented yet") )
})

server.get("/*", async (req, resp) => {
	console.log(req.url)

	resp.sendFile( await requestFile(req.url) )
})

server
	.listen(HTTP_PORT, "0.0.0.0", () => {
		console.log("started server on ", HTTP_PORT)
	})