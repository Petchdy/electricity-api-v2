const request = require('supertest');
const app = require('../index');
describe('Electricity API Endpoints', () => {
    // Test Case 1: Total Usage 
    it('should return total electricity usage for all years', async () => {
        const response = await request(app).get('/api/usage/total-by-year');
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
    });

    // Test Case 2: Specific Province Usage 
    it('should return electricity usage for a specific province and year', async () => {
        const response = await request(app).get('/api/usage/Bangkok/2565');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('province_name', 'Bangkok');
        expect(response.body).toHaveProperty('year', 2565);
    });

    // Test Case 2.1: Specific Province Usage Not Found
    it('should return not found message for non-existing province/year', async () => {
        const response = await request(app).get('/api/usage/NonExistingProvince/1999');
        expect(response.body.message).toBe('Data not found');
    });

    // Test Case 3: Verify Data Structure for Users 
    it('should return total electricity users for all years', async () => {
        const response = await request(app).get('/api/users-history/Bangkok');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

});