import { createMuiTheme } from '@material-ui/core/styles';
import {
    // cyan500,
    // grey100, grey500, grey400, grey300,
    // purple500,
    // pinkA200,
    // darkBlack, fullBlack,
    white,
} from '@material-ui/core/colors';

const palette = {
    primary: {
      main: "#4fb573", // Regen Green
    },
    common: {
      white: "#FFF",
    },
    // primary2Color: purple500,
    // primary3Color: grey400,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // secondaryTextColor: fade(darkBlack, 0.54),
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
};

const theme = createMuiTheme({
  palette,
  fontFamily: ['Lato', 'sans-serif'].join(','),
	appBar: {
    // color: white,
    // padding: "40px",
    textColor: white,
    // height: spacing.desktopKeylineIncrement,
    // titleFontWeight: typography.fontWeightNormal,
    // padding: spacing.desktopGutter,
  },
  button: {
      // height: 36,
      // minWidth: 88,
      // iconButtonSize: spacing.iconSize * 2,
      // padding: "20px",
      textColor: white,
  },
  card: {
    // titleColor: fade(palette.textColor, 0.87),
    // subtitleColor: fade(palette.textColor, 0.54),
    // fontWeight: typography.fontWeightMedium,
  },
  cardMedia: {
    // color: darkWhite,
    // overlayContentBackground: lightBlack,
    // titleColor: darkWhite,
    // subtitleColor: lightWhite,
  },
  cardText: {
    // textColor: palette.textColor,
  },
  datePicker: {
    // headerColor: palette.primary1Color,
    // selectColor: palette.primary1Color,
  },
  flatButton: {
    color: palette.primary1Color,
    // buttonFilterColor: '#999999',
    // disabledTextColor: fade(palette.textColor, 0.3),
    textColor: white,
    // primaryTextColor: white,
    // secondaryTextColor: palette.accent1Color,
    // fontSize: typography.fontStyleButtonFontSize,
    // fontWeight: typography.fontWeightMedium,
  },
  listItem: {
    // nestedLevelDepth: 18,
    // secondaryTextColor: palette.secondaryTextColor,
    // leftIconColor: grey600,
    // rightIconColor: grey600,
  },
  menu: {
    // backgroundColor: palette.canvasColor,
    // containerBackgroundColor: palette.canvasColor,
  },
  menuItem: {
    // dataHeight: 32,
    // height: 48,
    // hoverColor: fade(palette.textColor, 0.1),
    // padding: spacing.desktopGutter,
    // selectedTextColor: palette.accent1Color,
    // rightIconDesktopFill: grey600,
  },
  title: {
    fontFamily: ['Muli', 'sans-serif'].join(','),
  }
});

export default theme;
