import { test, expect } from '@playwright/test';

// Test data
const TEST_USER = {
  email: 'test@example.com',
  password: 'testPassword123!',
  name: 'Test User'
};

const TEST_HOUSE = {
  address: '123 Test Street',
  landlord: {
    name: 'Test Landlord',
    email: 'landlord@test.com',
    phone: '07123456789'
  }
};

// Helper function to login
async function login(page) {
  await page.goto('/login');
  await page.fill('input[name="email"]', TEST_USER.email);
  await page.fill('input[name="password"]', TEST_USER.password);
  await page.click('button[type="submit"]');
  // Wait for navigation after login
  await page.waitForURL('**/house-setup');
}

test.describe('House Setup and Preferences Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('Complete flow: Register -> Create House -> Set Preferences', async ({ page }) => {
    // 1. Register new user
    await page.goto('/register');
    await page.fill('input[name="name"]', TEST_USER.name);
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.fill('input[name="confirmPassword"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    
    // Wait for registration to complete and redirect to house setup
    await page.waitForURL('**/house-setup');
    
    // 2. Create new house
    await page.click('button:has-text("Create New House")');
    await page.waitForURL('**/house-details');
    
    // Fill house details
    await page.fill('input[name="address"]', TEST_HOUSE.address);
    await page.fill('input[name="landlord_name"]', TEST_HOUSE.landlord.name);
    await page.fill('input[name="landlord_email"]', TEST_HOUSE.landlord.email);
    await page.fill('input[name="landlord_phone"]', TEST_HOUSE.landlord.phone);
    await page.click('button[type="submit"]');
    
    // Wait for house creation and redirect to welcome
    await page.waitForURL('**/welcome');
    
    // 3. Complete preferences conversation
    // Wait for initial AI message
    await page.waitForSelector('.message-list');
    
    // Send messages and wait for responses
    const messages = [
      "I prefer a quiet environment",
      "I'm looking for a house with good natural light",
      "I need a house with good internet connection"
    ];
    
    for (const message of messages) {
      await page.fill('input[placeholder*="message"]', message);
      await page.click('button:has-text("Send")');
      // Wait for AI response
      await page.waitForTimeout(1000); // Adjust based on your AI response time
    }
    
    // 4. Verify redirection to dashboard after completion
    await page.waitForURL('**/house-dashboard');
    
    // 5. Verify house_id is set in localStorage
    const houseId = await page.evaluate(() => localStorage.getItem('house_id'));
    expect(houseId).toBeTruthy();
  });

  test('Complete flow: Login -> Join House -> Set Preferences', async ({ page }) => {
    // 1. Login
    await login(page);
    
    // 2. Join existing house
    await page.click('button:has-text("Join Existing House")');
    await page.fill('input[name="houseId"]', 'test-house-id');
    await page.click('button:has-text("Join House")');
    
    // Wait for join process and redirect to welcome
    await page.waitForURL('**/welcome');
    
    // 3. Complete preferences conversation
    // Similar to the create house flow...
  });

  test('Error handling: Invalid house ID', async ({ page }) => {
    await login(page);
    
    // Try to join with invalid house ID
    await page.click('button:has-text("Join Existing House")');
    await page.fill('input[name="houseId"]', 'invalid-id');
    await page.click('button:has-text("Join House")');
    
    // Verify error message
    await expect(page.locator('text=House not found')).toBeVisible();
  });

  test('Error handling: Unauthorized access', async ({ page }) => {
    // Try to access house setup without login
    await page.goto('/house-setup');
    
    // Should redirect to login
    await page.waitForURL('**/login');
  });

  test('Error handling: Invalid preference data', async ({ page }) => {
    await login(page);
    // Create house...
    await page.goto('/welcome');
    
    // Try to save invalid preferences
    // This would depend on your specific validation rules
  });
});