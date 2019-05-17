jest.mock('react-native-sound');
jest.mock('Image');
jest.mock('Alert', () => {
    return {
        alert: jest.fn()
    };
});
