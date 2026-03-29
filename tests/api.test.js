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

    // ----------------- Additional Test Cases -----------------

    // Test Case 1.1: Total electricity usage for each year (valid)
    it('should return total electricity usage for each year', async () => {
        const response = await request(app).get('/api/usage/total-by-year');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('2564', 189246962684.69);
        expect(response.body).toHaveProperty('2565', 196062945539.25003);
        expect(response.body).toHaveProperty('2566', 202866914583.00);
    });

    // Test Case 1.2: Total electricity usage for each year (invalid endpoint)
    it('should return total electricity usage for each year', async () => {
        const response = await request(app).get('/api/usage/total-by-year/Bankok/2565');
        expect(response.status).toBe(404); // Expecting 404 for invalid endpoint
    });

    // Test Case 2.1: Total electricity users for each year (valid)
    it('should return total electricity users for each year', async () => {
        const response = await request(app).get('/api/users/total-by-year');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('2564', 25366780);
        expect(response.body).toHaveProperty('2565', 25849213);
        expect(response.body).toHaveProperty('2566', 26266339);
    });

    // Test Case 2.2: Total electricity users for each year (invalid endpoint)
    it('should return not found for invalid endpoint', async () => {
        const response = await request(app).get('/api/users/total-by-year/Bangkok/2565');
        expect(response.status).toBe(404);
    });

    // Test Case 3.1: Usage by province and year (valid)
    it('should return usage by province and year', async () => {
        const response = await request(app).get('/api/usage/Bangkok/2565');
        expect(response.status).toBe(200);
        answer = {"backup_power_kwh": 23101000, "ev_charging_kwh": 10514506, "government_state_enterprise_kwh": 135930324, "interruptible_rate_kwh": 0, "large_business_kwh": 10727410582, "medium_business_kwh": 5755020369, "province_code": 10, "province_name": "Bangkok", "public_electricity_kwh": 340548981, "residential_kwh": 11025773549, "small_business_kwh": 5347811010, "specialized_business_kwh": 1661512000, "temporary_electricity_kwh": 259879685, "water_pumping_kwh": 0, "year": 2565}
        expect(response.body).toEqual(answer);
    });

    // Test Case 3.2: Usage by province and year (invalid province)
    it('should return not found for invalid province', async () => {
        const response = await request(app).get('/api/usage/InvalidProvince/2565');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Data not found');
    });

    // Test Case 4.1: Users by province and year (valid)
    it('should return users by province and year', async () => {
        const response = await request(app).get('/api/users/Bangkok/2565');
        expect(response.status).toBe(200);
        answer = {"backup_power_count": 1, "ev_charging_count": 272, "government_state_enterprise_count": 291, "interruptible_rate_count": 0, "large_business_count": 1608, "medium_business_count": 16666, "province_code": 10, "province_name": "Bangkok", "public_electricity_count": 0, "residential_count": 2637636, "small_business_count": 248336, "specialized_business_count": 2666, "temporary_electricity_count": 19306, "water_pumping_count": 0, "year": 2565}
        expect(response.body).toEqual(answer);
    });

    // Test Case 4.2: Users by province and year (invalid year)
    it('should return not found for invalid year', async () => {
        const response = await request(app).get('/api/users/Bangkok/1999');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Data not found');
    });

    // Test Case 5.1: Usage history for a specific province (valid)
    it('should return usage history for a specific province', async () => {
        const response = await request(app).get('/api/usage-history/Bangkok');
        expect(response.status).toBe(200);
        answer = [{"backup_power_kwh": 2592872, "ev_charging_kwh": 61532417, "government_state_enterprise_kwh": 137411688, "interruptible_rate_kwh": 0, "large_business_kwh": 11131271080, "medium_business_kwh": 6065548506, "province_code": 10, "province_name": "Bangkok", "public_electricity_kwh": 342098921, "residential_kwh": 11938107549, "small_business_kwh": 5769709301, "specialized_business_kwh": 1931826247, "temporary_electricity_kwh": 280211761, "water_pumping_kwh": 0, "year": 2566}, {"backup_power_kwh": 23101000, "ev_charging_kwh": 10514506, "government_state_enterprise_kwh": 135930324, "interruptible_rate_kwh": 0, "large_business_kwh": 10727410582, "medium_business_kwh": 5755020369, "province_code": 10, "province_name": "Bangkok", "public_electricity_kwh": 340548981, "residential_kwh": 11025773549, "small_business_kwh": 5347811010, "specialized_business_kwh": 1661512000, "temporary_electricity_kwh": 259879685, "water_pumping_kwh": 0, "year": 2565}, {"backup_power_kwh": 1772000, "ev_charging_kwh": 0, "government_state_enterprise_kwh": 127931603, "interruptible_rate_kwh": 0, "large_business_kwh": 10031686498, "medium_business_kwh": 5364038944, "province_code": 10, "province_name": "Bangkok", "public_electricity_kwh": 339214907, "residential_kwh": 11287289475, "small_business_kwh": 5074172447, "specialized_business_kwh": 1363891339, "temporary_electricity_kwh": 253734899, "water_pumping_kwh": 0, "year": 2564}]
        expect(response.body).toEqual(answer);
    });

    // Test Case 5.2: Usage history for a specific province (invalid province)
    it('should return empty array for invalid province', async () => {
        const response = await request(app).get('/api/usage-history/InvalidProvince');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    // 6. API: User history for a specific province 
    it('should return user history for a specific province', async () => {
        const response = await request(app).get('/api/users-history/Bangkok');
        expect(response.status).toBe(200);
        answer = [
                    {"backup_power_count": 1, "ev_charging_count": 459, "government_state_enterprise_count": 300, "interruptible_rate_count": 0, "large_business_count": 1637, "medium_business_count": 16863, "province_code": 10, "province_name": "Bangkok", "public_electricity_count": 0, "residential_count": 2697320, "small_business_count": 250921, "specialized_business_count": 2739, "temporary_electricity_count": 20230, "water_pumping_count": 0, "year": 2566},
                    {"backup_power_count": 1, "ev_charging_count": 272, "government_state_enterprise_count": 291, "interruptible_rate_count": 0, "large_business_count": 1608, "medium_business_count": 16666, "province_code": 10, "province_name": "Bangkok", "public_electricity_count": 0, "residential_count": 2637636, "small_business_count": 248336, "specialized_business_count": 2666, "temporary_electricity_count": 19306, "water_pumping_count": 0, "year": 2565}, 
                    {"backup_power_count": 1, "ev_charging_count": 0, "government_state_enterprise_count": 290, "interruptible_rate_count": 0, "large_business_count": 1578, "medium_business_count": 16699, "province_code": 10, "province_name": "Bangkok", "public_electricity_count": 0, "residential_count": 2596490, "small_business_count": 248454, "specialized_business_count": 2783, "temporary_electricity_count": 18485, "water_pumping_count": 0, "year": 2564}
                ]      
        expect(response.body).toEqual(answer);
    });
    
    // Test Case 6.2: User history for a specific province (invalid province)
    it('should return empty array for invalid province', async () => {
        const response = await request(app).get('/api/users-history/InvalidProvince');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

});