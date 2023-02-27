const { gql } = require("apollo-server-express");
// import { GraphQLScalarType} from 'graphql';

const typeDefs = gql`
scalar Date

type customerSchema {
    customerId: Int
    firstName: String
    lastName: String
    birthDate: Date
    gender: String
    picture: String
    businessUnit: String
    churnRisk: Float
    openSales: Int
    revenueYTD: Int
    costYTD: Int
    bonusEligible: String
    meetingsYTD: Int
}
type CardSchema {
    SpecialityProducts: Int
    Corporate: Int
    ResearchDevelopment: Int
    Manufacturing: Int
}

type QuaterSchema {
    Q4:Int
    Q3:Int
    Q2:Int
    Q1:Int
}

type ChartSchema {
    SpecialityProducts:QuaterSchema
    Corporate: QuaterSchema
    ResearchDevelopment: QuaterSchema
    Manufacturing: QuaterSchema
}

type AttributionSchema {
    card:CardSchema
    chart:ChartSchema
}

type DashboardSchema {
    attribution:AttributionSchema
}
type managerSchema {
    
    managerId: Int
    firstName: String
    lastName: String
    customerIds: [Int]
    customerData: [customerSchema!]
   
}

type Query {
    getAllCustomer:[managerSchema]
    getManagerById(managerId:Int):managerSchema
    getManagerByName(Name:String):managerSchema
    
}
`;
module.exports = typeDefs;
