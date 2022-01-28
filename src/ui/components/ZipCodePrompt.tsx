
import React, {
	ChangeEvent,
	FC,
	useCallback,
}							from "react"
import TextField			from "@mui/material/TextField"

//

export type IProps = {
	elId: string,
	idx: number,
	onZipCodeChange?: (elId: string, newVal: string) => void,
	zip: string,
}

//

export const ZipCodePrompt: FC<IProps> = (props) => {
	const changeHandler = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
		props.onZipCodeChange && props.onZipCodeChange(ev.target.id, ev.target.value)
	}, [0])

	return (
		<div className="zip-code-prompt">
			<TextField
				id={props.elId}
				label={`Zip code for city #${props.idx + 1}`}
				onChange={changeHandler}
				variant="outlined"
			/>
		</div>
	)
}

export default ZipCodePrompt
