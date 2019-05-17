jest.mock('react-native-sound');
jest.mock('Image', () => 'Image');
jest.mock('Alert', () => {
    return {
        alert: jest.fn()
    };
});
jest.mock('AsyncStorage', async () => {
    return {
        setItem: jest.fn(),
        getItem: jest.fn(),
    }
});

