import React from 'react';
import { Text as NativeText } from 'react-native';

export default React.forwardRef(function Text(
  {
    mono,
    bold,
    size,
    color,
    colorName = 'foreground',
    sub,
    disabled,
    style,
    ...rest
  },
  ref
) {
//   const theme = useTheme();
  const baseColor = color
  const textColor = disabled
    ? disabledColor(baseColor)
    : sub
    ? subColor(baseColor)
    : baseColor;
  return (
    <NativeText
      ref={ref}
      style={[
        {
            fontFamily: "Inter-SemiBoldItalic",
          fontWeight: bold ? 'bold' : 'normal',
          fontSize: size,
          color: textColor,
        },
        style,
      ]}
      {...rest}
    />
  );
});