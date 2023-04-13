import { default as ReactSelect } from "react-select";
import Option from "./MultiSelectOption";

const MultiSelectDropdown = (props) => { 

	const {options, handleChange, defaultValue, isMulti, className } = props

		return (
			<div className="multiSelectDropDown">
				<span
					className="d-inline-block"
					data-toggle="popover"
					data-trigger="focus"
					data-content=""
				>
				<ReactSelect
					options={options}
					isMulti={isMulti}
					closeMenuOnSelect={false}
					hideSelectedOptions={false}
					components={{
						Option
					}}
					onChange={handleChange}
					allowSelectAll={true}
					defaultValue={defaultValue}
					classNamePrefix={className}
				/>
				</span>
			</div>
		)
}

export default MultiSelectDropdown;