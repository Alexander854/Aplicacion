const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
    '@lottiefiles/dotlottie-react': require.resolve('react-native-web'),
};

module.exports = config;
