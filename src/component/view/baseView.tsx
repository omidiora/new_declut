import React, { ReactNode } from "react";
import { Platform,  StatusBarStyle } from "react-native";
import { BaseViewContainer } from "./styled";
import { useTheme } from "@emotion/react";
import FocusAwareStatusBar from "./statusbar";


export type BaseViewProps = {
    children?: ReactNode;
    focusBarStyle?: StatusBarStyle,
    backgroundColor?: string
}

export const BaseView: React.FC<BaseViewProps> = ({
    focusBarStyle,
    backgroundColor,
    children
}) => {
    const {colors, dark} = useTheme();
    const barStyle = Platform.select({ 
        ios: focusBarStyle ?? `${dark ? "light" : "dark"}-content`,
        android: focusBarStyle ?? `${dark ? "light" : "dark"}-content`,
    })

    return (
        <BaseViewContainer
            contentContainerStyle={{ flex: 1 }}
            behavior={Platform.select({ ios: 'height', android: undefined })}
            keyboardVerticalOffset={Platform.select({
                ios: 0,
                // android: height + heightPixel(100)
            })}
            enabled={true}
            backgroundColor={backgroundColor}
        >
            <FocusAwareStatusBar
                backgroundColor={Platform.OS === 'ios' ? '#F9FAFB' : '#F9FAFB'}
                // translucent={true}
                barStyle={barStyle}
            />

            {children}
        </BaseViewContainer>
    )
}