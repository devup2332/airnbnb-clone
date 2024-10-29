import Svg, { Path } from "react-native-svg";

interface IconPhoneProps {
  width?: number;
  height?: number;
}

const IconPhone = ({ width, height }: IconPhoneProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
      <Path d="M11 4h2" />
      <Path d="M12 17v.01" />
    </Svg>
  );
};
export default IconPhone;
