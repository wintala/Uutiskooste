import axios from "axios"

const baseUrl = "http://localhost:5000/api/"

const getData = () => {
	return axios.get(baseUrl + "current").then(r => r.data)
}

const getRange = (start, end) => {
	return axios.get(`${baseUrl}range?start=${start}&finnish=${end}`).then(r => r.data)
}

const getMetaData = () => {
	return axios.get(baseUrl + "metadata").then(r => r.data)
}

const sericeExports = {getData, getRange, getMetaData}

export default sericeExports