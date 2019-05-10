import {Row} from '@shared';
import {Text} from '@shared/components/text/Text';
import {Touchable, TouchableProps} from '@shared/components/touchable/Touchable';
import {InjectedThemeServiceProps} from '@shared/services/theme/ThemeService';
import {DIInject} from '@shared/utils/di/DIUtil';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react';
import * as React from 'react';
import {LayoutAnimation, StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';

export type ButtonProps = Partial<TouchableProps> &
    Partial<InjectedThemeServiceProps> &
    {
        title?: string,
        before?: React.ReactNode
        after?: React.ReactNode
        style?: StyleProp<ViewStyle>
        textStyle?: StyleProp<TextStyle>
        activeStyle?: StyleProp<ViewStyle>
        textColor?: string
        color?: string
        accent?: boolean
        primary?: boolean
        secondary?: boolean
        shadow?: boolean
        children?: React.ReactNode | string

        filled?: boolean
        /**
         * Outlined buttons are medium-emphasis buttons.
         * They contain actions that are important, but aren’t the primary action in an app.
         */
        outlined?: boolean
        /**
         * Text buttons are typically used for less-pronounced actions, including those located:
         * In dialogs
         * In cards
         * In cards, text buttons help maintain an emphasis on card content.
         */
        borderLess?: boolean

        onSubmit?: (data) => void
    }

interface State {
    isPressed: boolean
}

@DIInject('$theme')
@observer
export class Button extends React.Component<ButtonProps, State> {

    state = {
        isPressed: false
    };

    render() {
        let {
            before,
            after,
            borderLess,
            color,
            filled,
            outlined,
            onPressIn,
            onPressOut,
            textColor,
            shadow = filled,
            title,
            style,
            textStyle,
            onPress,
            onSubmit,
            children,
            ...otherProps
        } = this.props;

        if (typeof children === 'string') {
            children = this.createTitle(children)
        }

        let btnStyles = this.createButtonStyle();

        if (shadow) {
            if (this.state.isPressed) {
                btnStyles.push(this.props.$theme!.styles.boxShadowBottomLight);
            } else {
                btnStyles.push(this.props.$theme!.styles.boxShadowBottom)
            }
        }

        return (
            <Touchable
                {...otherProps}
                onPress={this.onPress}
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
            >
                <Row style={btnStyles}>
                    {
                        before
                    }
                    {!!title && this.createTitle(title)}
                    {
                        children
                    }
                    {
                        after
                    }
                </Row>
            </Touchable>
        )
    }

    @autobind
    onPress(e) {
        this.props.onPress && this.props.onPress(e)
    }

    get color() {
        let color = this.props.color;
        let colors = this.props.$theme!.colors;
        if (!color) {
            if (this.props.accent) {
                color = colors.accentColor
            } else if (this.props.primary) {
                color = colors.primaryColor
            } else if (this.props.secondary) {
                color = colors.secondaryColor
            }
        }
        return color;
    }

    get textColor() {
        let textColor = this.props.color;
        let colors = this.props.$theme!.colors;
        if (!textColor) {
            if (this.props.accent) {
                textColor = colors.accentTextColor
            } else if (this.props.primary) {
                textColor = colors.primaryTextColor
            } else if (this.props.secondary) {
                textColor = colors.secondaryTextColor
            }
        }
        return textColor;
    }

    @autobind
    createButtonStyle() {
        let style: ViewStyle | undefined;

        if (this.props.filled) {
            style = {backgroundColor: this.color}
        } else if (this.props.outlined) {
            style = {borderColor: this.color, borderWidth: 1}
        }

        return [styles.button, style, this.props.style]
    }

    @autobind
    createTitleStyle(): StyleProp<TextStyle> {
        let style: TextStyle | undefined;

        if (this.props.filled) {
            style = {color: this.textColor}
        } else if (this.props.outlined) {
            style = {color: this.color || this.textColor}
        }
        if (this.props.borderLess) {
            style = {borderColor: this.color || this.textColor}
        }
        return [styles.title, style, this.props.textStyle]
    }

    @autobind
    createTitle(title: string | Text): React.ReactNode {

        return (
            <Text style={this.createTitleStyle()}>
                {title}
            </Text>
        )
    }

    @autobind
    private handlePressIn(e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({isPressed: true});
        this.props.onPressIn && this.props.onPressIn(e)
    }

    @autobind
    private handlePressOut(e) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({isPressed: false});
        this.props.onPressOut && this.props.onPressOut(e)
    }

}


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 2
    },

    title: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});
