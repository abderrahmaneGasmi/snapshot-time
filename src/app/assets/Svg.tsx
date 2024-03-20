import React, { MouseEventHandler } from "react";
interface svgProps {
  id?: string;
  click?: MouseEventHandler;
  classlist?: string;
  view?: string;
  path?: string;
  pathlist?: string[];
  style?: React.CSSProperties;
  pathtags?: { [key: string]: any };
}

export default function Svg(props: svgProps) {
  return (
    <svg
      id={props.id}
      onClick={props.click}
      className={props.classlist}
      viewBox={props.view}
      style={props.style}
      {...props.pathtags}
    >
      <g>{props.path && <path d={props.path}></path>}</g>
    </svg>
  );
}
