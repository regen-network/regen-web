import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useToggleLayer, anchor } from "react-laag";
import Link from './link';

const useStyles = makeStyles((theme: Theme) => ({
  io: {},
}));

interface dropDownProps {
  name: string;
  children?: JSX.Element;
}
export default function DropdownCategory(props: dropDownProps): JSX.Element {
	const [element, toggleLayerProps] = useToggleLayer(
		// render the layer
		({ layerProps, isOpen }) => isOpen && <div {...layerProps} />,
		// provide some options, like placement
		{ placement: { anchor: anchor.BOTTOM_CENTER } }
		);
	const classes = useStyles({});
	// TODO: Add search/menu logic
	return (
		{element}
		<div onClick={toggleLayerProps.openFromMouseEvent}>Click me!</div><div className="{classes.io}">{props.name}</div>);
}
