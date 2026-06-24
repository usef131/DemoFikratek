import api from './api'

export const investorService = {
     //get all investors
     getInvestors: (params) =>
     api.get('/investors', { params }),

}