import {NavigationActions} from 'react-navigation';

let _navigator: {
  dispatch: (arg0: import('react-navigation').NavigationNavigateAction) => void;
};

export function setTopLevelNavigator(navigatorRef: {
  dispatch: (arg0: import('react-navigation').NavigationNavigateAction) => void;
}) {
  _navigator = navigatorRef;
}

export function navigate(routeName: string, params: object) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
