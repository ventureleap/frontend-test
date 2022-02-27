// Get data asynchronously
import axios from "axios"

const getAsync = async url => {
    const data = await axios
        .get(url)
        .then(res => res.data)
        .catch(err => console.log(err))

    return data
}

export default getAsync
