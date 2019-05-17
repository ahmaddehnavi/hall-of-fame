import {Button, Col, InjectedThemeServiceProps, Row} from '@shared';
import autobind from 'autobind-decorator';
import React, {Component} from 'react';
import {ImageSourcePropType, StyleProp, View, ViewStyle} from 'react-native';
import {Image as AnimatedImage} from 'react-native-animatable';
import {TextField} from 'react-native-material-textfield';

type WelcomeComponentProps =
    InjectedThemeServiceProps & {
    oSavePress: () => void
    onRandomisePress: () => void
    image?: ImageSourcePropType
    animation?: string
    onNumberChanged: (num: number) => void
    inputValue: string
    style?: StyleProp<ViewStyle>

    buttonSaveTitle?: string
    buttonRandomiseTitle?: string
    inputLabel?: string
}


export class WelcomeComponent extends Component<WelcomeComponentProps> {

    static defaultProps: Partial<WelcomeComponentProps> = {
        buttonSaveTitle: 'Save',
        buttonRandomiseTitle: 'Randomise',
        inputLabel: 'Enter a number'
    };

    @autobind
    handleTextChanged(num: string) {
        this.props.onNumberChanged(Number(num))
    }

    render() {
        return (
            <Col style={[{flex: 1}, this.props.style]}>
                {
                    !!this.props.image &&
                    <AnimatedImage
                        animation={this.props.animation}
                        duration={2500}
                        delay={150}
                        style={{flex: 1, width: '90%', marginHorizontal: '5%'}}
                        resizeMode={'contain'}
                        source={this.props.image}
                    />
                }
                <Col style={{
                    paddingHorizontal: this.props.$theme.dimens.screen.paddingHorizontal,
                    paddingVertical: this.props.$theme.dimens.screen.paddingVertical,
                    backgroundColor: '#fff'
                }}>
                    <TextField
                        onChangeText={this.handleTextChanged}
                        value={this.props.inputValue}
                        label={this.props.inputLabel}
                        keyboardType={'numeric'}
                        maxLength={1}
                    />

                    <Row>
                        <Button
                            testID={'btn-save'}
                            style={{flex: 1}}
                            title={this.props.buttonSaveTitle}
                            onPress={this.props.oSavePress}
                            filled
                            accent
                        />
                        <View style={{width: 16}}/>
                        <Button
                            testID={'btn-randomise'}
                            style={{flex: 1}}
                            title={this.props.buttonRandomiseTitle}
                            onPress={this.props.onRandomisePress}
                            accent
                            outlined
                        />
                    </Row>
                </Col>
            </Col>
        )
    }
}
