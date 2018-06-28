import { Dimensions } from 'react-native';
import NormalizeSize from './metricsNormalize';

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  baseTop: NormalizeSize.normalize(5),
  baseMargin: NormalizeSize.normalize(10),
  semibaseMargin: NormalizeSize.normalize(15),
  fontSmall: 14,
  fontXtraSmall: 13,
  fontMedium: 15,
  fontXtraMedium: 17,
  fontLarger: 18,
  fontEnlarge: 20,
  fontLarge: 22,
  fontSemiLarge: 21,
  fontBig: 24,
  fontEnhancer: 26,
  fontEnhance: 28,
  fontSizer: 30,
  fontNormal: 16,
  fontXtralarge: 45,
  loginButton: 40,
  doubleBaseMargin: NormalizeSize.normalize(20),
  doubleMargin: NormalizeSize.normalize(23),
  smallSection: NormalizeSize.normalize(25),
  doubleBasePadding: NormalizeSize.normalize(30),
  xdoubleBasePadding: NormalizeSize.normalize(40),

  doubleSection: NormalizeSize.normalize(50),
  xdoubleSection: NormalizeSize.normalize(55),
  tripleBaseSection: NormalizeSize.normalize(70),
  xtripleBasePadding: NormalizeSize.normalize(80),
  tripledSection: NormalizeSize.normalize(75),
  xxdoubleSection: NormalizeSize.normalize(60),

  spinnerViewHeight: NormalizeSize.normalize(100),
  spinnerHeight: NormalizeSize.normalize(150),
  doubleViewHeight: NormalizeSize.normalize(200),
  xdoubleViewHeight: NormalizeSize.normalize(250),
  tripleViewHeight: NormalizeSize.normalize(300),
  xtripleViewHeight: NormalizeSize.normalize(350),
  logoHeight: NormalizeSize.normalize(128),
  logoWidth: NormalizeSize.normalize(268),
  profileHeight: NormalizeSize.normalize(100),
  profileWidth: NormalizeSize.normalize(240),
  markerHeight: NormalizeSize.normalize(39),
  markerWidth: NormalizeSize.normalize(27),
  textInputWidth: NormalizeSize.normalize(270),
  screenWidth: width,
  screenHeight: height,
  loginButtonWidth:
    NormalizeSize.normalize(width) - NormalizeSize.normalize(40),
  loginButtonHeight: NormalizeSize.normalize(57),
  imageLogo: {
    height: NormalizeSize.normalize(32),
    width: NormalizeSize.normalize(32)
  },
  onBoardingLogo: {
    height: NormalizeSize.normalize(78),
    width: NormalizeSize.normalize(180)
  },
  onProviderLogo: {
    height: NormalizeSize.normalize(150),
    width: NormalizeSize.normalize(250)
  },
  serviceModal: {
    marginTop: NormalizeSize.normalize(16),
    servicesMargin: NormalizeSize.normalize(10),
    servicesCardHeight: NormalizeSize.normalize(31),
    textInputHeight: NormalizeSize.normalize(117)
  }
};

export default metrics;
