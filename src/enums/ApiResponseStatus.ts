
/**
 * We don't follow the typical program exit nomenclature,
 * such as `0` => success/noErrors.
 *
 * Instead we expect a value in order to evaluate the status.
 */
export enum ApiResponseStatus {
	Unknown,
	Success,
	Info,
	Warning,
	Error,
}

export default ApiResponseStatus
