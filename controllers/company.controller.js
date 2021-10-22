// const crypto = require("crypto"); // return required number of characters
// const router = require("../routes");
const fs = require("fs");
const { title } = require("process");
const companyController = {};






// As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings and receive
// back an array of 20 companies sorted by average ratings(average high score computed of all 5 criteria)
// combined compared to all other companies in asc order by default.

companyController.getAllCompanies = (req, res, next) => {
    const limit = 20
    const {page} = req.query || 1 
    const {city, sortBy} = req.query 
    const requestPage = parseInt(page)||1
    try {
        let rawData = fs.readFileSync("data.json", "utf-8")
        let data = JSON.parse(rawData)
        let result;

// As a client app I can make a GET request to http://localhost:5000/companies?city=Miami and 
// receive back a list of companies that have jobs located in Miami.
        if(city){
        result = data.jobs.filter((el) => el.city == city)
        // console.log("this is jobs in city", result)
        return res.status(200).send({result})
        }

//As a client app I can make a GET request to http://localhost:5000/companies and 
//receive back an array of 20 companies.
// As a client app I can make a GET request to http://localhost:5000/companies?page=2 and 
// receive an array, the 2nd array of 20 companies(nums 20-40).
// As a client app I can make a GET request to http://localhost:5000/companies?page=3 and 
// receive an array, the 3rd array of 20 companies(nums 40-60).
// As a client app I can make a GET request to http://localhost:5000/companies?page=n and 
// receive an array, the nth array of 20 companies.
        result = data.companies.slice((requestPage-1)*limit, requestPage*limit)
        console.log("result length", result.length)

//// As a client app I can make a GET request to http://localhost:5000/companies?city=Miami,New%20York. and 
// receive back a list of companies with jobs in those cities Miami & New York.        

        return res.status(200).send({result})
    } catch (error) {
        return next(error)
    }
}





module.exports = companyController