import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
    NativeModules,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    ViewPropTypes,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Metrics from './metrics';
import colors from './colors';

import CreditCard from './CardView';
import CCInput from './CCInput';
import { InjectedProps } from './connectToState';

const s = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: Metrics.doubleMargin
    },
    form: {
        marginTop: 20
    },

    inputContainer: {
        flexDirection: 'row',

        justifyContent: 'center',
        height: Metrics.loginButtonHeight,
        width: Metrics.screenWidth,
        marginTop: Metrics.doubleMargin,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: colors.lightGrey,
        shadowOpacity: 0.5,
        elevation: 2,
        borderRadius: 5,
        backgroundColor: colors.white,
        padding: Metrics.baseMargin,

        margin: 2
    },
    viewStyle: {
        flexDirection: 'row',

        justifyContent: 'space-between'
    },
    inputLabel: {
        color: colors.lightGrey,
        fontSize: Metrics.fontEnlarge,

        width: 60
    },
    input: {
        fontSize: 18,

        width: Metrics.screenWidth - 40,
        flex: 1,

        marginLeft: Metrics.semibaseMargin
    }
});

const CVC_INPUT_WIDTH = 0.38 * metrics.screenWidth;
const EXPIRY_INPUT_WIDTH = CVC_INPUT_WIDTH;

const CARD_NUMBER_INPUT_WIDTH = Metrics.screenWidth - 40;

const PREVIOUS_FIELD_OFFSET = 40;

/* eslint react/prop-types: 0 */ export default class CreditCardInput extends Component {
    static propTypes = {
        ...InjectedProps,
        labels: PropTypes.object,
        placeholders: PropTypes.object,

        labelStyle: Text.propTypes.style,
        inputStyle: Text.propTypes.style,
        inputContainerStyle: ViewPropTypes.style,

        validColor: PropTypes.string,
        invalidColor: PropTypes.string,
        placeholderColor: PropTypes.string,

        cardImageFront: PropTypes.number,
        cardImageBack: PropTypes.number,
        cardScale: PropTypes.number,
        cardFontFamily: PropTypes.string,
        cardBrandIcons: PropTypes.object,

        allowScroll: PropTypes.bool,

        additionalInputsProps: PropTypes.objectOf(
            PropTypes.shape(TextInput.propTypes)
        )
    };

    static defaultProps = {
        cardViewSize: {},
        labels: {
            name: 'CARDHOLDER\'S NAME',
            number: '',
            expiry: '',
            cvc: '',
            postalCode: 'POSTAL CODE'
        },
        placeholders: {
            name: 'Full Name',
            number: 'Card Number',
            expiry: 'EXP',
            cvc: 'CVV',
            postalCode: '34567'
        },
        inputContainerStyle: { width: Metrics.screenWidth - 40 },
        validColor: '',
        invalidColor: 'red',
        placeholderColor: colors.lightGrey,
        allowScroll: false,
        additionalInputsProps: {}
    };

    componentDidMount = () => this._focus(this.props.focused);

    componentWillReceiveProps = newProps => {
        // if (this.props.focused !== newProps.focused)
        //     this._focus(newProps.focused);
    };

    _focus = field => {
        if (!field) return;

        const scrollResponder = this.refs.Form.getScrollResponder();
        const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

        NativeModules.UIManager.measureLayoutRelativeToParent(
            nodeHandle,
            e => {
                throw e;
            },
            x => {
                scrollResponder.scrollTo({
                    x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0),
                    animated: true
                });
                this.refs[field].focus();
            }
        );
    };

    _inputProps = field => {
        const {
            inputStyle,
            labelStyle,
            validColor,
            invalidColor,
            placeholderColor,
            placeholders,
            labels,
            values,
            status,
            onFocus,
            onChange,
            onBecomeEmpty,
            onBecomeValid,
            additionalInputsProps
        } = this.props;

        return {
            inputStyle: [s.input, inputStyle],
            labelStyle: [s.inputLabel, labelStyle],
            validColor,
            invalidColor,
            placeholderColor,
            ref: field,
            field,

            label: labels[field],
            placeholder: placeholders[field],
            value: values[field],
            status: status[field],

            onFocus,
            onChange,
            onBecomeEmpty,
            onBecomeValid,

            additionalInputProps: additionalInputsProps[field]
        };
    };

    render() {
        const {
            cardImageFront,
            cardImageBack,
            inputContainerStyle,
            values: { number, expiry, cvc, name, type },
            focused,
            allowScroll,
            requiresName,
            requiresCVC,
            requiresPostalCode,
            cardScale,
            cardFontFamily,
            cardBrandIcons
        } = this.props;

        return (
            <TouchableOpacity
                style={s.container}
                activeOpacity={1}
                onPress={() => Keyboard.dismiss()}
            >
                <CreditCard
                    focused={focused}
                    brand={type}
                    scale={cardScale}
                    fontFamily={cardFontFamily}
                    imageFront={cardImageFront}
                    imageBack={cardImageBack}
                    customIcons={cardBrandIcons}
                    name={requiresName ? name : ' '}
                    number={number}
                    expiry={expiry}
                    cvc={cvc}
                />
                <ScrollView
                    ref="Form"
                    keyboardShouldPersistTaps="always"
                    scrollEnabled={allowScroll}
                    showsHorizontalScrollIndicator={false}
                    style={s.form}
                >
                    <CCInput
                        {...this._inputProps('number')}
                        keyboardType="numeric"
                        maxLength={19}
                        returnKeyType="done"
                        containerStyle={[
                            s.inputContainer,
                            inputContainerStyle,
                            { width: CARD_NUMBER_INPUT_WIDTH }
                        ]}
                    />
                    <View style={s.viewStyle}>
                        <CCInput
                            {...this._inputProps('expiry')}
                            keyboardType="numeric"
                            maxLength={5}
                            returnKeyType="done"
                            containerStyle={[
                                s.inputContainer,
                                inputContainerStyle,
                                { width: EXPIRY_INPUT_WIDTH }
                            ]}
                        />
                        {requiresCVC && (
                            <CCInput
                                {...this._inputProps('cvc')}
                                keyboardType="numeric"
                                maxLength={3}
                                returnKeyType="done"
                                containerStyle={[
                                    s.inputContainer,
                                    inputContainerStyle,
                                    { width: CVC_INPUT_WIDTH }
                                ]}
                            />
                        )}
                    </View>
                </ScrollView>
            </TouchableOpacity>
        );
    }
}
