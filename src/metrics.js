import { Dimensions, Platform } from 'react-native';

//  we set our base mobile device height
const baseUnitHeight = Platform.OS === 'ios' ? 667 : 667;

const baseUnitWidth = 375;

const { height, width } = Dimensions.get('window');

class NormalizeSize {
  constructor() {
    this.normalize = this.normalize.bind(this);
  }

  normalize = (size, isBasedOnWidth) => {
    return isBasedOnWidth
      ? size / baseUnitWidth * width
      : size / baseUnitHeight * height;
  };
}
module.exports = new NormalizeSize();
