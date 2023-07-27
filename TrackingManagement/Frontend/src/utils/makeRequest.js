import omitIsNil from "./omit"
import axios from "axios"
import Cookies from "js-cookie"
import {
  isObjectEmpty
} from "./arrHandle"

// const makeRequest = async ({
//   method,
//   url,
//   data,
//   headerOpt,
//   params
// }) => {
//   let options = {
//     method,
//     url,
//     data,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       "x-access-token": Cookies.get("x-access-token"),
//       ...headerOpt
//     },
//     params: params,
//   }

//   options = omitIsNil(options)

//   const result = await axios(options)
//   return result.data
// }

const makeRequest = async ({
  method,
  url,
  data,
  headerOpt,
  params
}) => {
  let options = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      "x-access-token": Cookies.get("x-access-token"),
      ...headerOpt
    },
  }

  let Url = url
  if (params) {
    Url = Url + "?" + new URLSearchParams(params)
  }
  options = omitIsNil(options)
  try {
    const response = await fetch(Url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const makeFileRequest = async ({
  method,
  url,
  data,
  headerOpt,
  params
}) => {
  let options = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      "x-access-token": Cookies.get("x-access-token"),
      "Content-Type":"application/json",
      ...headerOpt
    },
  }

  let Url = url
  if (params) {
    Url = Url + "?" + new URLSearchParams(params)
  }
  options = omitIsNil(options)
  try {
    const response = await fetch(Url, options);
    const data = await response.blob();
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const parseRequestParams = (params) => {
  let parseParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        parseParams.append(key, item)
      })
    } else {
      parseParams.append(key, value)
    }
  }
  return parseParams
}

export default makeRequest