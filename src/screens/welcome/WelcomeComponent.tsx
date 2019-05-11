import {Button, Col, InjectedThemeServiceProps, MultiBackHandler, Row, Screen} from '@shared';
import React, {Component} from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import {Image as AnimatedImage} from 'react-native-animatable';
import {TextField} from 'react-native-material-textfield';

type WelcomeComponentProps =
    InjectedThemeServiceProps & {
    oSavePress: () => void
    onRandomisePress: () => void
    onBackPress: (count: number) => void | boolean
    image: ImageSourcePropType
    animation?: string
    onNumberChanged: (num: string) => void
    numberValue: string
}


export class WelcomeComponent extends Component<WelcomeComponentProps> {
    render() {
        return (
            <Screen style={styles.container}>
                {
                    !!this.props.image &&
                    <AnimatedImage
                        animation={this.props.animation}
                        duration={2500}
                        delay={150}
                        style={{flex: 1, width: '90%'}}
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
                        onChangeText={this.props.onNumberChanged}
                        value={this.props.numberValue}
                        label={'Enter a number'}
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        maxLength={1}
                    />

                    <Row>
                        <Button
                            style={{flex: 1}}
                            title={'Save'}
                            onPress={this.props.oSavePress}
                            filled
                            accent
                        />
                        <View style={{width: 16}}/>
                        <Button
                            style={{flex: 1}}
                            title={'Randomise'}
                            onPress={this.props.onRandomisePress}
                            accent
                            outlined
                        />
                    </Row>
                </Col>
                <MultiBackHandler
                    timeout={500}
                    maxCount={2}
                    onPress={this.props.onBackPress}/>
            </Screen>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    textInput: {}

});