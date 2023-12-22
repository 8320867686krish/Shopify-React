//Default array option for Enabled/Disabled
export const optionsFontFamily = [
    { label: 'sans-serif', value: 'sans-serif', type: 'google' },
    { label: 'Roboto Condensed', value: 'Roboto Condensed', type: 'google' },
    { label: 'Oswald', value: 'Oswald', type: 'google' },
    { label: 'Open Sans', value: 'Open Sans', type: 'google' },
    { label: 'Raleway', value: 'Raleway', type: 'google' },
    { label: 'Pacifico', value: 'Pacifico', type: 'google' },
    { label: 'Poppins', value: 'Poppins', type: 'google' }
];

//Default array option for Enabled/Disabled
export const optionsEnabledDisabled = [
    { label: 'Enabled', value: 1 },
    { label: 'Disabled', value: 0 }
];

//Validate image types.
export const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

//Convert string to array.
export const convertStrToArr = (str, splitText = ',') => {
    return str.split(splitText)
}

//Convert array to string.
export const convertArrToStr = (arr, joinText = ',') => {
    return arr.join(joinText);
    // return arr.toString();
}

//Get the configuration data from the api.
export const fetchMethod = async (methodType = "POST", methodName, headers, request, contentType = "application/json") => {
    // console.log('fetchmethod :', methodType, methodName, headers, request)
    try {
        const requestData = {
            method: methodType
        };

        if (methodType === 'POST') {
            requestData.body = JSON.stringify(request)
        }

        if (headers !== '') {
            requestData.headers = {
                "Content-Type": contentType,
                token: btoa(headers),
            }
        }

        const response = await fetch(
            API_PREFIX + methodName,
            requestData
        );

        if (!response.ok) {
            let error = '';
            // Check for server error (status code in the 500 range)
            // Handle 500 error
            if (response.status >= 500 && response.status < 600)
                error = 'Internal Server Error';
            else
                error = 'Error fetching data'; // Handle other errors (e.g., 404 Not Found)
            return { error };
        }

        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { error: 'Network error' };
    }
}