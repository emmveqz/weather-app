
import type ApiResponseStatus from "../enums/ApiResponseStatus"

//

export type IApiResponse<T> = {
	data?: T,
	msg?: string,
	status: ApiResponseStatus,
}

export default IApiResponse
