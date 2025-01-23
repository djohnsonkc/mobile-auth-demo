import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import './PillButtonsStyles.css'

function PillButtons({ defaultOptions, overflowHidden = true, options, onSelectOption, allowMultiple = true, allowHover = true, alignment = '' }) {
    const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

    const handleCheckboxChangeButton = (option) => {

        if (allowMultiple) {

            // let copyList = cloneDeep(selectedOptions || [])
            // one less library just for pure copying
            let copyList = JSON.parse(JSON.stringify(selectedOptions))
            const found = copyList.find((s) => s.value === option.value);
            console.log("found", found)
            if (found) {
                if (copyList.map(obj => obj.value).includes(option.value)) {
                    copyList = copyList.filter((s) => s.value !== option.value);
                }
                else {
                    copyList.push(option)
                }


            }
            else {
                copyList.push(option)
            }

            console.log("copyList", copyList)
            onSelectOption(copyList)
            setSelectedOptions(copyList)
        }
        else {
            onSelectOption([option])
            setSelectedOptions([option])
        }

    };

    function getStyle(option) {

        const isSelected = selectedOptions?.map(obj => obj.value).includes(option.value);
        let style = `${isSelected ? 'selected ' : ''}`;

        if(!allowHover) {
            style += ' no-hover'
        }

        return style;
    }

    function getWrapperClass() {

        let classList = "animate-slide-up d-flex flex-row flex-nowrap gap-1"

        if(alignment && alignment === 'center') {
            return classList + " justify-content-center"
        }
        else {
            return classList
        }
    }

    return (

        <div className={`pill-container ${overflowHidden ? 'overflow-hidden' : '' }`}>
            <div className="animate-slide-up mt-0 pb-2 d-flex flex-row flex-nowrap gap-1">
                {options.map((option, optionIndex) => (
                    <div key={optionIndex}
                        className={`item-pill ${getStyle(option)}`}
                        onClick={() => handleCheckboxChangeButton(option)}>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>

    );
}

export default PillButtons;
