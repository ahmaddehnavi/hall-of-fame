import {observer} from 'mobx-react';
import * as React from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';

type Props = TextProps & {
    bold?: boolean
    title?: string
}

@observer
export class Text extends React.Component<Props> {
    render() {

        return (
            <RNText
                {...this.props}
                children={this.props.title || this.props.children}
                style={[this.props.bold ? styles.textBold : styles.text, this.props.style]}
            />
        )
    }
}


const styles = StyleSheet.create({
    text: {
        // todo default normal font,
        textAlign: 'left'
    },
    textBold: {
        // todo default bold font,
        textAlign: 'left'
    },
});