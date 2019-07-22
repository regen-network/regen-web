import {blue} from '@material-ui/core/colors';

const palette = {
  primary: {
    main: "#4fb573", // Regen Green
    contrastText: "#FFF"
  },
  secondary: {
    main: "#ffc433"
  },
  common: {
    white: "#FFF",
    light: "#fefefe",
    grey: "#585E66",
    black: "#202020"
  },
  accent: {
    yellow: "#ffc433",
    red: "#de4526",
    blue: "#3d7acf"
  }
};

const theme = {
  themeName: "Green Theme",
  palette,
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },
  // appBar: {
  //   // color: white,
  //   // padding: "40px",
  //   textColor: white,
  //   // height: spacing.desktopKeylineIncrement,
  //   // titleFontWeight: typography.fontWeightNormal,
  //   // padding: spacing.desktopGutter,
  // },
  // button: {
  //     // height: 36,
  //     // minWidth: 88,
  //     // iconButtonSize: spacing.iconSize * 2,
  //     // padding: "20px",
  //     textColor: white,
  // },
  // card: {
  //   // titleColor: fade(palette.textColor, 0.87),
  //   // subtitleColor: fade(palette.textColor, 0.54),
  //   // fontWeight: typography.fontWeightMedium,
  // },
  // cardMedia: {
  //   // color: darkWhite,
  //   // overlayContentBackground: lightBlack,
  //   // titleColor: darkWhite,
  //   // subtitleColor: lightWhite,
  // },
  // cardText: {
  //   // textColor: palette.textColor,
  // },
  // datePicker: {
  //   // headerColor: palette.primary1Color,
  //   // selectColor: palette.primary1Color,
  // },
  // flatButton: {
  //   color: palette.primary1Color,
  //   // buttonFilterColor: '#999999',
  //   // disabledTextColor: fade(palette.textColor, 0.3),
  //   textColor: white,
  //   // primaryTextColor: white,
  //   // secondaryTextColor: palette.accent1Color,
  //   // fontSize: typography.fontStyleButtonFontSize,
  //   // fontWeight: typography.fontWeightMedium,
  // },
  // listItem: {
  //   // nestedLevelDepth: 18,
  //   // secondaryTextColor: palette.secondaryTextColor,
  //   // leftIconColor: grey600,
  //   // rightIconColor: grey600,
  // },
  // menu: {
  //   // backgroundColor: palette.canvasColor,
  //   // containerBackgroundColor: palette.canvasColor,
  // },
  // menuItem: {
  //   // dataHeight: 32,
  //   // height: 48,
  //   // hoverColor: fade(palette.textColor, 0.1),
  //   // padding: spacing.desktopGutter,
  //   // selectedTextColor: palette.accent1Color,
  //   // rightIconDesktopFill: grey600,
  // },
  // listItemText: {
  //   color: "green"
  // },
  // title: {
  //   fontFamily: ['Muli', 'sans-serif'].join(','),
  // }
};

export default theme;

export const theme2 =
  {
    themeName: "Blue Theme",
    palette: {
      primary: {
        main: '#1a237e',
      },
      secondary: blue,
    },
  };
