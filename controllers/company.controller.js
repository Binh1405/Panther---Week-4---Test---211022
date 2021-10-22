const { crypto } = require("crypto");
const fs = require("fs");
const companyController = {};

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

// As a client app I can make a GET request to http://localhost:5000/companies?city=Miami,New%20York. and 
// receive back a list of companies with jobs in those cities Miami & New York. 
        if(city){
            // console.log(city.split(","))
            result = data.jobs.filter((el) => {
            if (city.split(",").includes(el.city))
            // console.log("this is the city", el.city)
            return true
            })
            return res.status(200).send({result})
            //this part costs me almost 2hours..
        }

// As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings and receive
// back an array of 20 companies sorted by average ratings(average high score computed of all 5 criteria)
// combined compared to all other companies in asc order by default.
// As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings&order=asc and receive back an array of 20 companies sorted by the top 5 average ratings combined compared to all other companies in asc order.
// As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings&order=desc and receive back an array of 20 companies sorted by the top 5 average ratings combined compared to all other companies in desc order.        
if(sortBy){
        //..
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
        return res.status(200).send({result})
    } catch (error) {
        return next(error)
    }
}

//As a client app I can make a POST request to add a new company with exact structure
companyController.createCompany = (req, res, next) => {
    console.log("create company")
    const {id, name, benefits, description, ratings, jobs, numberOfJobs, numberOfRatings} = req.body

    if(typeof id !=="string"||
        typeof name !=="string"||
        !Array.isArray(benefits)||
        benefits.length<1||
        typeof description !=="string"||
        !Array.isArray(ratings)||
        ratings.length<1||
        !Array.isArray(jobs)||
        jobs.length<1||
        typeof numberOfJobs !== "number"||
        numberOfJobs < 0||
        typeof numberOfRatings !== "number"||
        numberOfRatings <0
        ) 
        {throw new Error ("MISSING INFOS")
    }

    const companyStructure = {
        id: crypto
        .randomBytes(Math.ceil(10 / 2))
        .toString("hex")
        .slice(0, 10)
        .toUpperCase(),
        name,
        benefits,
        description,
        ratings,
        jobs,
        numberOfJobs, 
        numberOfRatings
    }

try {
    const rawData = fs.readFileSync("data.json", "utf-8")
    const data = JSON.parse(rawData)
    let result = data.companies

    result.push({companyStructure})
    data.companies = result
    const newData = JSON.stringify(data)
    fs.writeFileSync("data.json", newData)
    return res.status(200).send(jobStructure)
} catch (error) {
    return next(error)
}
}

//As a client app I can make a PUT request to http://localhost:5000/companies/:id and add a property 
//enterprise, which is true.
companyController.updateCompanyById = (req, res, next) => { 
    console.log("update company")
    const {id} = req.params

    try {
        if(!id) throw new Error("pls add id")
        const rawData = fs.readFileSync("data.json", "utf-8")
        const data = JSON.parse(rawData)
        let result = data.companies
        const original = result.find((e) => e.id === id)
        if(!original) throw new Error ("job with id not found")
        console.log("found", original)
        original.enterprise = true;
        const update = result.map((e) => {
            if (e.id === id){
                e.enterprise = true
            }
            return e
        }) 
        data.companies = update;
        const newData = JSON.stringify(data)
        fs.writeFileSync("data.json", newData)

        return res.status(200).send(newData)
    } catch (error) {
        return next(error)
    }
}

//As a client app I can make a DELETE request to http://localhost:5000/companies/:id delete a 
//company by id.
companyController.deleteCompanyById = (req, res, next) => { 
    console.log("delete company")
    const {id} = req.params

    try {
        if(!id) throw new Error("pls add id")
        const rawData = fs.readFileSync("data.json", "utf-8")
        const data = JSON.parse(rawData)
        let result = data.companies
        const newArray = result.filter((e) => e.id !== id)
        // console.log("new array of companies", newArray)
        data.companies = newArray
        const newData = JSON.stringify(data)
        fs.writeFileSync("data.json", newData)
        return res.status(200).send("Successfully delete")
    } catch (error) {
        return next(error)
    }
}

module.exports = companyController