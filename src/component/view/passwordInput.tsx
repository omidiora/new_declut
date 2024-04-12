import { useTheme } from '@emotion/react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputWrapperProps, InputWrapperBox, } from './basic';


export const PasswordInputComponent: React.FC<InputWrapperProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { colors } = useTheme();

    return (
        <InputWrapperBox
            secureTextEntry={!showPassword}
            containerStyle={{ paddingRight: 15 }}
            rightIcon={ 
                <TouchableOpacity  onPress={() => setShowPassword((prev) => !prev)}>
                    <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color={'black'}
                    />
                </TouchableOpacity>
            }
            {...props}
        />
    )
}