// Test script for data synchronization
// Run this in browser console to test the sync functionality

console.log('🧪 Testing data synchronization...');

// Clear existing data
localStorage.removeItem('userData');
console.log('🗑️ Cleared existing userData');

// Set test data that matches the profile
const testUserData = {
    firstName: 'Dinh',
    lastName: 'Vy',
    email: 'hoangyy@gmail.com',
    phone: '+84 0766629828',
    address: 'k733/5 ngô Quyền',
    city: 'danang',
    country: 'vietnam',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&auto=format',
    settings: {
        twoFactorAuth: true,
        loginNotifications: false,
        orderUpdates: true,
        deliveryUpdates: true,
        promotions: true,
        newRestaurants: false,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        autoPayment: true,
        saveReceipts: false
    }
};

// Save test data
localStorage.setItem('userData', JSON.stringify(testUserData));
console.log('💾 Saved test userData:', testUserData);

// Verify data was saved
const retrievedData = JSON.parse(localStorage.getItem('userData'));
console.log('✅ Retrieved userData:', retrievedData);

// Instructions
console.log(`
📋 Test Instructions:
1. Open Profile.html - data should match test values
2. Open Pay.html - delivery info should sync automatically
3. Click "Đồng bộ ngay" button to manually trigger sync
4. Modify data in Profile.html and save
5. Return to Pay.html to see updated information

🎯 Expected Results:
- Name: "Dinh Vy"
- Phone: "+84 0766629828"  
- Address: "k733/5 ngô Quyền, Đà Nẵng, Việt Nam"
`);
